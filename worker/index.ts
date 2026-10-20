/**
 * dev.luitiescobar.com Worker. Everything is a static asset; the Worker only runs first for /cv/*
 * (see `run_worker_first` in wrangler.jsonc): it serves the PDF and, in the background, sends the
 * owner a Telegram message the first time each visitor downloads each CV language.
 *
 * Secrets: TELEGRAM_BOT_TOKEN (@BotFather), TELEGRAM_CHAT_ID, CV_SALT. Without the Telegram ones it
 * still counts downloads but sends nothing.
 */

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  CV_SALT?: string;
}

const MAX_PER_HOUR = 30;
const CV = /^\/cv\/luiti-escobar-cv-(en|es)\.pdf$/;
// link previews, crawlers and scripts don't count as downloads
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|discord|slack|skype|curl|wget|python|node-fetch|axios|go-http|headless|lighthouse/i;

// Cloud and hosting networks: link scanners (Outlook/Defender Safe Links, LinkedIn, Slack...) open the PDF from
// there with a normal browser user agent. A recruiter's download comes from a home, office or mobile network.
const DATACENTER_ASN = new Set([
  8075, 8068, 8069, 8070, 8071, 8072, 8073, 8074, // Microsoft / Azure
  16509, 14618, 7224, // Amazon / AWS
  15169, 396982, 19527, 36040, 36384, 36492, 139070, // Google / Google Cloud
  13335, 209242, // Cloudflare
  54113, // Fastly
  14061, // DigitalOcean
  16276, 35540, // OVH
  24940, 213230, // Hetzner
  63949, 20940, 16625, // Linode / Akamai
  31898, // Oracle Cloud
  45102, 37963, // Alibaba
  132203, 45090, // Tencent
  20473, // Vultr / Choopa
  12876, // Scaleway
  51167, // Contabo
  60781, 16265, 28753, // Leaseweb
  36352, // ColoCrossing
  46606, // Unified Layer
]);
const DATACENTER_ORG = /amazon|aws|google cloud|google llc|microsoft|azure|digitalocean|ovh|hetzner|linode|akamai|oracle|alibaba|tencent|vultr|choopa|scaleway|contabo|leaseweb|colocrossing|cloudflare|fastly|hosting|datacenter|data center/i;

const fromDatacenter = (cf?: IncomingRequestCfProperties) =>
  !!cf && (DATACENTER_ASN.has(Number(cf.asn)) || DATACENTER_ORG.test(String(cf.asOrganization ?? '')));

const escapeHtml =(s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Anonymous visitor id: salted SHA-256 of IP + user agent. Nothing personal is stored. */
async function visitorId(request: Request, salt: string) {
  const ip = request.headers.get('cf-connecting-ip') ?? '';
  const ua = request.headers.get('user-agent') ?? '';
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}|${ip}|${ua}`));
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** "Escritorio · Chrome en Windows" from the user agent (rough on purpose) */
function device(ua: string): string {
  const kind = /iPad|Tablet/i.test(ua) ? 'Tablet' : /Mobi|iPhone|Android/i.test(ua) ? 'Móvil' : 'Escritorio';
  const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : '';
  const os = /iPhone|iPad|iOS/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android' : /Windows/.test(ua) ? 'Windows' : /Mac OS X|Macintosh/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : '';
  return [kind, [browser, os].filter(Boolean).join(' en ')].filter(Boolean).join(' · ');
}

/** page of this site the download started from, e.g. "/es/about/" */
function fromPage(request: Request, host: string): string | undefined {
  try {
    const ref = new URL(request.headers.get('referer') ?? '');
    return ref.host === host ? ref.pathname : ref.host || undefined;
  } catch {
    return undefined;
  }
}

async function recordDownload(request: Request, env: Env, lang: string) {
  const ua = request.headers.get('user-agent') ?? '';
  if (!ua || BOT.test(ua)) return;
  const cf = (request as Request & { cf?: IncomingRequestCfProperties }).cf;
  // scanners from cloud networks are neither counted nor announced
  if (fromDatacenter(cf)) return;
  const visitor = await visitorId(request, env.CV_SALT ?? 'luitiescobar-dev');
  const now = Date.now();
  const [inserted, total, recent] = await env.DB.batch<{ n: number }>([
    env.DB.prepare('INSERT OR IGNORE INTO cv_downloads (visitor, lang, created_at) VALUES (?, ?, ?)').bind(visitor, lang, now),
    env.DB.prepare('SELECT COUNT(*) AS n FROM cv_downloads'),
    env.DB.prepare('SELECT COUNT(*) AS n FROM cv_downloads WHERE created_at > ?').bind(now - 3_600_000),
  ]);
  // the same person opening it again (PDF viewers re-request the file) is not news
  if (!inserted.meta.changes) return;
  if ((recent.results[0]?.n ?? 0) > MAX_PER_HOUR) return;
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;

  const country =cf?.country && cf.country !== 'XX' && cf.country !== 'T1' ? new Intl.DisplayNames(['es'], { type: 'region' }).of(cf.country) : undefined;
  const place = [cf?.city, country].filter(Boolean).join(', ');
  const from = fromPage(request, new URL(request.url).host);
  const count = total.results[0]?.n ?? 0;
  const text = [
    '📄 <b>Alguien descargó tu CV</b>',
    '',
    `<b>CV de AI Developer, ${lang === 'es' ? 'español' : 'inglés'}</b>`,
    `${count} ${count === 1 ? 'descarga' : 'descargas'} en total`,
    '',
    place ? `📍 ${escapeHtml(place)}` : null,
    `💻 ${device(ua)}`,
    from ? `🔗 Desde ${escapeHtml(from)}` : null,
    '',
    'dev.luitiescobar.com',
  ].filter((line) => line !== null).join('\n');

  // accept the token even if it was pasted with a "bot" prefix, quotes or as part of an API URL
  const token = env.TELEGRAM_BOT_TOKEN.match(/\d+:[\w-]{30,}/)?.[0];
  if (!token) return console.error('telegram: TELEGRAM_BOT_TOKEN does not look like a bot token');
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  });
  if (!res.ok) console.error('telegram', res.status, await res.text());
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);
    const match = url.pathname.match(CV);
    if (match && request.method === 'GET' && response.ok) {
      ctx.waitUntil(recordDownload(request, env, match[1]).catch((e) => console.error('cv download', e)));
    }
    return response;
  },
} satisfies ExportedHandler<Env>;
