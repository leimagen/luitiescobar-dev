## The problem

My inbox had years of newsletters and a steady trickle of phishing. Gmail's filters help, but unsubscribing from a hundred senders one by one takes a whole weekend.

## What it does

Gmail Cleaner is a web app that runs on your own machine. You connect one or more Gmail accounts through an OAuth wizard and it scans up to 500 messages, scoring each sender by its headers, its authentication results, phishing keywords and a list of bulk-mail domains.

For newsletters it uses the standard List-Unsubscribe header. It never unsubscribes from a message it scores as phishing, because in phishing that link is the trap. Blocking a sender creates a Gmail filter that sends their future mail to the trash and clears what's already there.

It also checks your address against Have I Been Pwned, and Claude Haiku explains each breach in plain language with the steps to take. A small Chrome extension shows the count on a badge.

## Design choices

The spam scoring is a set of rules I can read and adjust. I kept AI for the part where a person needs help, which is turning a breach record into clear advice. Everything runs locally and the tokens stay in local files.

## Status

A one-day prototype, pushed as a single commit. It works on my accounts. Before anyone else uses it, the way it stores tokens needs a proper review.
