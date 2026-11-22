# Labs

Three labs built during weeks 4–6 of the [90-day plan](../ai-security-90-days/README.md). Each folder holds a specification. **No lab code exists yet: writing it is the exercise.**

| Lab | Week | You build | You show |
|---|---|---|---|
| [01-summarizer-injection](01-summarizer-injection/README.md) | 4 | A chatbot that summarizes a web page | Indirect prompt injection leaking a fake secret, then the fix |
| [02-rag-access-control](02-rag-access-control/README.md) | 5 | A small RAG app with two users | One user reading the other's documents, then the fix |
| [03-agent-exfiltration](03-agent-exfiltration/README.md) | 6 | An agent with three tools | An injected page making the agent send a fake secret out, then the hardening |

## Rules

- **Intentionally vulnerable.** Run on `localhost` only. Never deploy any lab to a public address. Never reuse lab code in a product.
- **Synthetic data only.** Fake users, fake secrets, fake documents.
- **A separate API key** with a low spend cap.
- **Pages you attack with are pages you control**, served locally.
- Keep the vulnerable version and the fixed version side by side (for example `vulnerable/` and `fixed/`), so the difference is the lesson.

## Each lab is done when

1. The attack works reliably against the vulnerable version.
2. The same attack fails against the fixed version.
3. A test reproduces both results automatically.
4. A write-up exists, using the [lab write-up template](../templates/lab-writeup.md).
