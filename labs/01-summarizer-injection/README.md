# Lab 01: summarizer injection (week 4)

**Status:** specification only. No code yet.

## Goal

Show that content a model reads can steer it, and that this becomes data theft when the model also holds something private and has a way to send data out.

## Build

A small local chatbot that:

- takes a URL from the user, fetches the page, and summarizes it;
- has a fake secret in its context (for example a made-up "internal note" or a fake API key string);
- renders the model's answer as Markdown in a browser.

Serve two test pages locally: a normal article, and the same article with instructions planted in it.

## Attack

1. Plant instructions in the page that tell the model to include the fake secret in its answer.
2. Extend it so the secret leaves the browser, by having the answer contain a Markdown image whose address points at a local "attacker" server you run, with the secret in the address.
3. Repeat once with the instructions hidden from a human reader (for example in an image or a file the model reads).

Record what the local attacker server receives.

## Fix

Apply and test, one at a time, so you learn which ones matter:

- Remove the secret from the model's context. Ask whether it needed to be there.
- Stop rendering images and links to arbitrary domains.
- Separate the summarizing call from anything holding private data.
- Add an output check for the secret's pattern, and note how easily it is bypassed.

## Done when

- The attack succeeds against the vulnerable version and fails against the fixed one.
- A test reproduces both.
- The write-up explains why wording the system prompt differently was not enough.

## Publish

This lab is artifact 1 of the 90-day plan.
