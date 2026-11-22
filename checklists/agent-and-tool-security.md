# Checklist: agent and tool security

For agents that call tools, including MCP servers and coding agents.

## Design

- [ ] The agent's purpose is narrow and written down
- [ ] Private data, untrusted content and outbound communication are not all available in one context without a gate
- [ ] Untrusted content is processed in a context that has no privileged tools, where the design allows
- [ ] The plan of action is fixed before untrusted content is read, where the design allows

## Tools

- [ ] Each tool does one thing; no general "run command" or "fetch any URL" tool without strict limits
- [ ] Read tools and write tools are separated
- [ ] Outbound network access is limited to an allowlist
- [ ] File access is limited to a specific directory
- [ ] Tool arguments are validated in code against a schema and business rules
- [ ] Tool results are treated as untrusted input to the model

## Credentials

- [ ] The agent acts with the requesting user's permissions, not a shared super-user
- [ ] Tokens are short-lived and scoped to the task
- [ ] No credentials appear in prompts, tool descriptions or logs

## Approval

- [ ] Sending messages, spending money, deleting data, changing permissions and publishing all need human confirmation
- [ ] The confirmation shows exactly what will happen, in plain terms
- [ ] Auto-approval settings are off by default

## MCP and third-party tools

- [ ] Only servers from sources you trust are installed; versions are pinned
- [ ] Tool descriptions are reviewed, since they enter the model's context and can carry instructions
- [ ] A server's tool list changing after installation triggers a review
- [ ] Each server runs with the least access it needs

## Memory

- [ ] What gets written to long-term memory is controlled and reviewable
- [ ] Memory written from untrusted content is marked and can be purged
- [ ] One user's memory cannot reach another user

## Coding agents

- [ ] Repository content, issues, comments and web pages are treated as untrusted
- [ ] Command execution is sandboxed and network access is restricted
- [ ] Secrets are not present in the environment the agent runs in
- [ ] Changes are reviewed by a person before merge

## Limits and monitoring

- [ ] Maximum steps, tool calls, time and spend per task
- [ ] Every tool call is logged with its arguments and the triggering request
- [ ] Alerts on unusual destinations, volumes or tool sequences
- [ ] A kill switch exists and has been tested
