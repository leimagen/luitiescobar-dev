## Who Annie is

Annie Tanaka is an agent with her own email address whose job is finding work. I gave her a name and a face because she writes to people, and an email from Annie reads very differently from one sent by "the job script".

## Her day

Every morning at 07:00 UTC a GitHub Actions job wakes her up. She reads more than eleven remote job sources, from RemoteOK and We Work Remotely to company boards on Greenhouse and Lever, with keyword lists in English and Spanish. Claude Haiku scores each offer against a candidate profile and answers in JSON with a fit score and visa and region checks. The good ones get a tailored CV and cover letter as PDFs, one email per job. A Google Sheet logs everything, with a blacklist and an "applied" mark, so the same offer is never sent twice.

Every 15 minutes she checks her inbox. If I reply "applied" or "skip", or leave a note, she classifies it, updates the sheet and answers in character. If I ask for something she can't do, she emails me a suggested code change.

## Rules for a persona

Her prompt is strict. Short replies, no invented facts, never claiming a technical action she didn't take, and a JSON action block at the end of every reply so the code knows what to do next. The profile prompt is cached, and calls retry when the API reports it's overloaded.

## What went wrong

She once answered the same email three times, and four commits went into stopping duplicate replies. A missing comma in a Python list quietly joined two keywords into one. When I added a second candidate profile, details from one person showed up in the other's cover letters. That's the kind of bug you only allow once. Profiles are now separate classes on a shared base, with an example profile to copy for new candidates.

## Status

40 commits in one week of May 2026. She works, and she's paused while I focus on other projects.
