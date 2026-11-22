# Cheatsheet: LLM attack patterns

Patterns to test against LLM applications you own or are authorized to review, with the defence that matters for each. This describes categories, not a payload list; practise the specifics in the labs linked from [resources.md](../resources.md).

## The core idea

A language model cannot reliably tell instructions from data. Anything in its context can steer it. Security comes from what the surrounding system allows the model to do, not from how the prompt is worded.

**The dangerous combination:** access to private data, exposure to untrusted content, and a way to send data out. With all three, an injection becomes data theft. Remove or gate one.

## Direct prompt injection (the user is the attacker)

| Pattern | Idea | Defence |
|---|---|---|
| Instruction override | Tell the model to disregard earlier instructions | Assume it will work. Keep secrets and authority out of the prompt |
| System prompt extraction | Ask for the instructions, directly or by translation, summary or continuation | Put nothing in the system prompt you could not publish |
| Role-play and hypotheticals | Wrap the request in fiction or a persona | Enforce policy outside the model for actions that matter |
| Encoding and obfuscation | Base64, other languages, spacing, homoglyphs | Classifiers help but are bypassable. Do not rely on input filters alone |
| Multi-turn build-up | Reach the goal in small steps across a conversation | Evaluate the conversation, not just the last message |
| Payload splitting | Deliver the request in parts the model assembles | As above |

## Indirect prompt injection (content is the attacker)

| Channel | Idea | Defence |
|---|---|---|
| Web pages | Hidden or visible instructions in a page the model reads | Treat fetched content as untrusted. No privileged tools in that context |
| Documents and email | Instructions in files, comments, metadata, email bodies | Same. Ask for approval before acting on content-derived requests |
| Images, audio, files | Instructions the model can read but a person may not notice | Same rules apply to every modality |
| Tool results and tool descriptions | A tool or MCP server returns instructions | Pin and review tools. Treat results as data |
| Retrieved knowledge | A poisoned document in the knowledge base | Control who can write to it. Show sources |
| Agent memory | Instructions stored now, acted on later | Control and review what is remembered |

## Exfiltration channels

| Channel | Idea | Defence |
|---|---|---|
| Rendered Markdown images | The model outputs an image URL carrying data to an attacker's server | Block or proxy external images. Allowlist domains |
| Links | The user is shown a link with data in it | Show full destinations. Restrict domains |
| Tool calls | Send email, post a message, make a web request | Approval for outbound actions. Egress allowlist |
| Code execution | Generated code makes a network call | Sandbox with no network |

## Output handling

Model output is untrusted input to whatever consumes it. If it reaches HTML, SQL, a shell, a file path or `eval`, the classic injection flaws return. Encode, parameterize and validate as for any user input.

## Retrieval and data

- **Cross-user leakage:** retrieval ignores who is asking. Enforce permissions at query time.
- **Over-sharing by the model:** the model reveals more of a retrieved document than the user should see. Filter before the model sees it.
- **Personal data in logs and traces:** often the easiest leak. Minimize and protect them.

## Agency

- **Excessive permissions:** the agent can do more than the task needs.
- **Confused deputy:** the agent uses its own authority on behalf of an attacker's instruction.
- **Unbounded loops and cost:** an injection makes the agent call tools repeatedly. Set step and spend limits.

## Supply chain

- **Malicious model files:** formats that execute code when loaded.
- **Compromised packages, plugins and tool servers.**
- See [ai-supply-chain.md](../checklists/ai-supply-chain.md).

## How to test, in order

1. Draw the data flow and mark every untrusted input and every action.
2. Test each untrusted input for injection, by hand.
3. Check each exfiltration channel.
4. Check retrieval permissions with two test users.
5. Check tool permissions and approvals.
6. Automate what you found so it runs again on every change.
7. Record results against the OWASP Top 10 for LLM Applications and MITRE ATLAS.
