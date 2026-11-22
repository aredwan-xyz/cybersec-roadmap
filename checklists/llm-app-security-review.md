# Checklist: LLM application security review

For applications you own or are authorized to review. Organized around the OWASP Top 10 for LLM Applications; check the current list at https://genai.owasp.org/llm-top-10/ since the entries change between editions.

## Map the system first

- [ ] Data-flow diagram drawn, with trust boundaries
- [ ] Every source of text entering the model's context listed (user input, system prompt, retrieved documents, web pages, files, emails, tool results, memory)
- [ ] Every action the model can trigger listed (tools, API calls, database writes, messages sent)
- [ ] Every credential the application holds listed, with what each can do

## Prompt injection

- [ ] Untrusted content is treated as data, never as instructions, in the design (not only in the prompt wording)
- [ ] Direct injection tested: instruction override, role-play, encoding, multi-turn
- [ ] Indirect injection tested through every content source, including files and images
- [ ] The three conditions checked together: access to private data, exposure to untrusted content, ability to send data out. If all three hold, one is removed or gated

## Output handling

- [ ] Model output is encoded before rendering as HTML
- [ ] Markdown images and links to arbitrary domains are blocked or proxied (exfiltration channel)
- [ ] Model output never reaches SQL, a shell, `eval`, or a template engine unsanitized
- [ ] Structured output is validated against a schema before use

## Sensitive information

- [ ] The system prompt holds no secrets, keys or anything damaging if extracted
- [ ] Personal data is minimized in prompts and in logs
- [ ] Logs and traces have access control and a retention period
- [ ] Provider data-retention and training settings are known and set deliberately

## Retrieval (RAG) and embeddings

- [ ] Permissions are enforced at retrieval time for the requesting user, not by asking the model
- [ ] Tenants are separated in the vector store
- [ ] Who can write to the knowledge base is controlled; ingested content is treated as untrusted
- [ ] Sources are shown to the user where practical

## Agency and tools

- [ ] Each tool has the minimum permissions and scope
- [ ] Consequential or irreversible actions need human approval
- [ ] Tool inputs are validated server-side, independent of the model
- [ ] See [agent-and-tool-security.md](agent-and-tool-security.md)

## Supply chain

- [ ] See [ai-supply-chain.md](ai-supply-chain.md)

## Misinformation and over-reliance

- [ ] Users are told where output may be wrong
- [ ] High-stakes outputs have a verification step

## Consumption and cost

- [ ] Rate limits per user and per key
- [ ] Limits on input size, output tokens and tool-call loops
- [ ] Spend alerts and a hard cap with the provider

## Operations

- [ ] Security test suite runs in CI
- [ ] Abuse and anomaly logging in place, without logging private content
- [ ] An incident plan exists for "the model did something it should not have"
- [ ] A way for outsiders to report issues (`SECURITY.md` or `security.txt`)
