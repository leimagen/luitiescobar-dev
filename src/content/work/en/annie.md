## Who Annie was

Annie Tanaka was an agent with her own email address whose job was finding work. I built her to experiment with agents and automated interaction with the web: reading job boards, keeping a spreadsheet up to date and writing and answering email without me pressing a button. I gave her a name and a face because she wrote to people, and an email from Annie read very differently from one sent by "the job script".

## Her day

Every morning at 07:00 UTC a GitHub Actions job woke her up. She read more than eleven remote job sources, from RemoteOK and We Work Remotely to company boards on Greenhouse and Lever, with keyword lists in English and Spanish. Claude Haiku scored each offer against a candidate profile and answered in JSON with a fit score and visa and region checks. The good ones got a tailored CV and cover letter as PDFs, one email per job. A Google Sheet logged everything, with a blacklist and an "applied" mark, so the same offer was never sent twice.

Every 15 minutes she checked her inbox. If I replied "applied" or "skip", or left a note, she classified it, updated the sheet and answered in character. If I asked for something she couldn't do, she emailed me a suggested code change.

## Rules for a persona

Her prompt was strict. Short replies, no invented facts, never claiming a technical action she didn't take, and a JSON action block at the end of every reply so the code knew what to do next. The profile prompt was cached, and calls retried when the API reported it was overloaded.

## What went wrong

She once answered the same email three times, and four commits went into stopping duplicate replies. A missing comma in a Python list quietly joined two keywords into one. When I added a second candidate profile, details from one person showed up in the other's cover letters. That's the kind of bug you only allow once. Profiles became separate classes on a shared base, with an example profile to copy for new candidates.

## Where it ended

40 commits in one week of May 2026, and I haven't run her since. As an experiment it did its job: it showed me how an agent behaves once it acts on the web and writes to people on its own, and how many rules it needs before you can trust it with an inbox.
