# Lab 02: RAG access control (week 5)

**Status:** specification only. No code yet.

## Goal

Show that asking the model to respect permissions is not access control, and that retrieval must enforce permissions itself.

## Build

A small local retrieval-augmented app with:

- two fake users, Alice and Bob, each with a handful of fake private documents;
- one shared vector store holding all documents;
- a chat endpoint that retrieves the most relevant documents and passes them to the model;
- a system prompt telling the model to answer only from the current user's documents.

## Attack

1. Signed in as Alice, ask questions whose answers are only in Bob's documents.
2. Try direct requests, then indirect ones (summaries, comparisons, "what else do you know about...").
3. Add a poisoned document as Bob that contains instructions, and observe its effect on Alice's session.

Record which of Bob's documents reached the model's context in Alice's session. That is the real failure, whatever the model then says.

## Fix

- Store an owner on every chunk and filter by the requesting user at query time.
- Confirm with logging that no other user's chunk ever enters the context.
- Decide who may write to the knowledge base, and treat ingested text as untrusted.
- Check what the application logs: are private documents now sitting in a log file?

## Done when

- A test signs in as each user and asserts that only that user's chunks are retrieved.
- The poisoned document cannot affect another user.
- The write-up shows before and after retrieval logs.
