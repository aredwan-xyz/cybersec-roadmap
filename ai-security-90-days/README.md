# AI Security: 90-Day Learning Plan

_Written 2026-11-22 and revised after a critical review; the known weak points are in [docs/limitations.md](../docs/limitations.md). **This file is the authority for the first 90 days.** Where the roadmap ([ROADMAP.md](../ROADMAP.md)) differs, this plan wins._

_Links for every resource named here are in [resources.md](../resources.md), section 7, with a week-by-week table. The links were checked on 2026-11-22; course contents and prices were not. Default to free tiers and check prices yourself before paying for anything._

## Ground rules

- **Budget:** 10 hours a week, 13 weeks, about 130 hours. Suggested split: 6 hours hands-on, 2 hours reading, 2 hours writing up.
- **Who it assumes:** someone who already builds web and AI applications but is new to security.
- **Legal line:** attack only your own apps, purpose-built labs, and bug bounty programs within their published scope. Never test a third party's AI product "to see what happens".
- **Data:** use synthetic data in every lab. No real personal or client data goes into test prompts, logs or write-ups.
- **Done means published.** Each phase ends with something a stranger can read at a public URL. Three artifacts in 90 days.
- **Checkpoints are by artifact, not by date.** If weeks slip, the plan may stretch to 16 weeks. The order does not change and no phase is skipped.

## Before week 1 (about 5 hours; do not skip)

1. **Validate the direction against real postings (3 hours).** Read 20 current postings for the roles you would want (AI security engineer, application security engineer, product security, OT/IoT security). For each, record: years of security experience required, location and remote policy, any security clearance or background-screening requirement, pay if stated, and the five most repeated skills. If clearance or status requirements appear, take the question to a qualified adviser.
2. **Allocate the hours (30 minutes).** Put the weekly sessions in your calendar and write down what they displace. If you cannot name what gives way, the plan will not happen.
3. **Baseline (1 hour).** Without looking anything up, write down: how a session cookie works, the difference between authentication and authorization, what an IAM role is, and how a system prompt differs from a user message. Gaps here tell you where weeks 1–2 need the most time.
4. **Confirm the prerequisites.** You need (a) one AI application of your own that you can attack and fix, and (b) a public place to publish by week 4. The portfolio is the preferred place. If it is not live by week 4, publish on a public channel you already have and move the piece later; do not let publishing wait on the site.
5. **Find one reviewer.** One person who knows security and will read your three write-ups critically. A local OWASP chapter or BSides community is the usual place to find one.

## Exit criteria

Stop and reconsider the direction, instead of pushing on, if any of these is true:

- The posting review shows almost no roles you could reach within 12–18 months (experience, location or clearance rules them out).
- Nothing is published by the end of week 6.
- Fewer than 20 hours are logged in the first four weeks.

Reconsidering can mean changing track, or dropping the pivot and adding a security section to the smart-building and AI work you already sell.

## The 90 days at a glance

| Phase | Weeks | Theme | Published artifact |
|---|---|---|---|
| 1. Foundations | 1–4 | Web/API security basics, how LLMs and LLM apps work, prompt injection | Write-up: "Prompt injection, explained by breaking my own chatbot" |
| 2. Attack depth | 5–8 | RAG and privacy, agents and tools, cloud identity, supply chain, automated red teaming | A vulnerable agent lab on GitHub plus a findings report |
| 3. Defence and proof | 9–13 | Defences, threat modelling, monitoring and disclosure, governance and engagement basics, capstone | Security assessment of one of your own live AI projects, with fixes shipped |

Review this plan at day 45 and day 90. The field moves quickly; replace anything that has gone stale.

---

## Phase 1: Foundations (weeks 1–4)

### Week 1: Web security basics I (access and identity)
- **Learn:** HTTP in depth, sessions and cookies, authentication vs authorization, trust boundaries, the OWASP Top 10 (web) at overview level.
- **Do:** install Burp Suite Community. Complete PortSwigger Web Security Academy apprentice labs for authentication and access control.
- **Output:** notes repo started; one page on "what trust boundaries are" in your own words.

### Week 2: Web security basics II (injection) and an LLM primer
- **Learn (web):** SQL injection, cross-site scripting, server-side request forgery, and why they share one root cause: data treated as instructions.
- **Learn (LLM primer, 2 hours):** tokens and context windows, system vs user vs tool messages, embeddings and retrieval, fine-tuning vs prompting, how tool calling works. The aim is to know what the model actually receives.
- **Do:** PortSwigger apprentice labs for SQL injection, XSS and SSRF. Log the full raw request for one LLM call in an app you built and label each part.
- **Output:** the labelled request, in your notes.

### Week 3: The LLM application as an attack surface, and direct prompt injection
- **Learn:** read the OWASP Top 10 for LLM Applications end to end. Read Simon Willison's writing on prompt injection, including the "lethal trifecta" (private data, untrusted content, a way to send data out). System prompt extraction, role-play and encoding tricks, multi-turn attacks, why filters fail.
- **Do:** draw the data-flow diagram of one LLM app you have built, marking every place untrusted text enters the context and every action the model can trigger. Complete Lakera's Gandalf (as far as you can) and the PortSwigger "Web LLM attacks" labs.
- **Output:** the annotated diagram and a log of which techniques worked and why.

### Week 4: Indirect prompt injection and insecure output handling
- **Learn:** injection through web pages, documents, emails and tool results; injection through images, audio and files (multimodal); data exfiltration through rendered Markdown images and links; LLM output flowing into SQL, shell or HTML. Read several of Johann Rehberger's "Embrace The Red" case studies.
- **Do:** build a tiny chatbot that summarizes a web page. Plant instructions in a page you control and make the bot leak a fake secret. Repeat once with instructions hidden in an image or file. Then fix it.
- **Output (publish, artifact 1):** write-up of the attack and the fix. Send it to your reviewer.

**Phase 1 checkpoint:** you can explain why prompt injection is not solved by "a better system prompt", and you have one public write-up that someone else has critiqued.

---

## Phase 2: Attack depth (weeks 5–8)

### Week 5: RAG, data and privacy attacks
- **Learn:** retrieval poisoning, cross-tenant leakage in vector stores, missing access control on retrieved documents, sensitive data in embeddings and logs, personal-data leakage from model outputs, membership inference and training-data poisoning at concept level.
- **Do:** build a small RAG app with two fake users. Show user A reading user B's documents through the model. Fix it by enforcing permissions at retrieval, not in the prompt.
- **Output:** before/after code in a repo.

### Week 6: Agents, tools, memory and MCP
- **Learn:** excessive agency, confused-deputy problems, tool-description poisoning, over-broad credentials, unsafe auto-approval, cross-agent injection, poisoning of long-term agent memory, and the specific risks of coding agents and IDE assistants (repository content as an injection channel, command execution). Read OWASP's agentic AI threat guidance and the MCP specification's security guidance.
- **Do:** build an agent with three tools (read file, fetch URL, send message). Use an injected web page to make it send a fake secret out. Work through an open vulnerable-agent project such as Damn Vulnerable LLM Agent.
- **Output:** attack chain documented step by step.

### Week 7: Cloud identity and secrets
- **Learn:** in one cloud (AWS or Azure): users vs roles, policies, least privilege, short-lived credentials vs long-lived keys, how a deployed app gets its permissions, secrets management, spend and rate limits on model APIs.
- **Do:** audit one deployed project of your own. List every credential it holds and what each can do. Reduce each to the minimum, move secrets out of code and git history, and add spend alerts on model calls.
- **Output:** a before/after permissions table.

### Week 8: Supply chain and automated red teaming
- **Learn:** malicious model files (pickle deserialization) and why safetensors exists, compromised packages and model hubs, MITRE ATLAS tactics and techniques, turning manual attacks into repeatable tests.
- **Do:** scan a downloaded model with an open-source model scanner (for example ModelScan). Run one or two open-source red-team tools (garak, PyRIT or promptfoo's red-team mode) against your week 4–6 apps. Map every finding to OWASP LLM Top 10 and ATLAS IDs.
- **Output (publish, artifact 2):** GitHub repo with your vulnerable agent lab, the test suite and a findings report. The README must state that the app is intentionally vulnerable and must never be deployed. Send it to your reviewer.

**Phase 2 checkpoint:** you can take an unfamiliar LLM app, list its likely weaknesses in 30 minutes, and demonstrate at least three in a lab.

---

## Phase 3: Defence and proof (weeks 9–13)

### Week 9: Defences that actually hold
- **Learn:** least privilege for tools, human approval for consequential actions, isolating untrusted content from privileged actions (dual-LLM and capability-based designs such as the CaMeL paper), output encoding, egress controls, input and output classifiers and their limits.
- **Do:** harden your week 6 agent. Rerun the week 8 test suite and record what still gets through.
- **Output:** a "defence in depth for agents" diagram.

### Week 10: Threat modelling and secure design review
- **Learn:** STRIDE applied to AI systems, trust-boundary analysis, abuse cases (including attackers using AI for phishing and impersonation against your users), Google's Secure AI Framework (SAIF) as a reference.
- **Do:** write a full threat model for one of your real, deployed AI projects: assets, actors, entry points, threats, mitigations, residual risk.
- **Output:** the threat model document (capstone section 1).

### Week 11: Monitoring, incident response and disclosure
- **Learn:** what to log from LLM apps without logging private data, detecting abuse and exfiltration, security regression tests in CI, responding to a prompt-injection incident. Responsible disclosure: how to report a flaw you find in someone else's product (their security contact or bounty program, what to include, giving time to fix before publishing, never accessing more data than needed to prove the issue).
- **Do:** add security tests to that project's CI and add basic abuse logging.
- **Output:** the merged changes, and a `SECURITY.md` in the project saying how others should report issues to you.

### Week 12: Governance and engagement basics
- **Learn (governance):** NIST AI Risk Management Framework and its generative AI profile, EU AI Act risk tiers, and the privacy law that applies to your users' data (PIPEDA in Canada, GDPR for EU users), at overview level.
- **Learn (engagement basics):** what must exist before you review anyone else's system: written authorization from someone entitled to give it, a defined scope and time window, rules of engagement, a confidentiality agreement, how findings are handed over, and a view on liability. Get a lawyer's input before using any template commercially.
- **Do:** map your capstone project's controls to the NIST AI RMF functions (Govern, Map, Measure, Manage) in one table. Draft a one-page scope and authorization template.
- **Output:** the mapping table (capstone section 3) and the draft template.

### Week 13: Capstone and publish
- **Do:** assemble the assessment of your own live project: threat model, test results before and after, fixes shipped, control mapping. Deploy the fixes. Publish the report.
- **Output (publish, artifact 3):** the assessment at a public URL. Send it to your reviewer.

**Phase 3 checkpoint:** three public artifacts that an outside reviewer has read, one hardened live product, and the ability to run a basic security check on an LLM application you built or were authorized to review.

---

## Weekly rhythm

| Session | Hours | Use |
|---|---|---|
| Two weekday evenings | 2 each | Reading and labs |
| One weekend block | 4 | Building and breaking |
| One short session | 2 | Write-up and notes |

If a week slips, cut the reading, never the hands-on work or the write-up. Log hours each week; the exit criteria depend on them.

## What to follow (15 minutes a day)

- Simon Willison's blog (prompt injection coverage)
- Embrace The Red (real-world AI exploit write-ups)
- OWASP GenAI Security Project announcements
- Security research posts from the major model labs and cloud providers
- huntr (AI/ML bug bounty) disclosures, for real vulnerability patterns

## After day 90

1. **Reread the 20 postings** and compare them with what you can now show. Decide whether to continue, narrow or change track.
2. **Offer a builder's security check, not a penetration test.** For two or three people you know who ship LLM features, review their design and run your test suite, with written authorization and an agreed scope first. Describe it honestly: a check by an engineer who has studied this for 90 days.
3. **Security+**, if the postings you want ask for it.
4. **PortSwigger Web Security Academy through practitioner level.** The plan covers about 20 apprentice labs; practitioner level is the next depth.
5. **Go deeper on one cloud's identity and access model.**
6. **Start the OT/smart-building track**, if the posting review supported it: apply the same threat-modelling method to a building-systems integration that uses AI.

## What this plan leaves out on purpose

- Classical adversarial machine learning maths (evasion and model-extraction research). Useful later; rarely what application teams hire for.
- General penetration testing and Active Directory. Covered in the roadmap; not needed for the first 90 days in this track.
- Certifications during the 90 days. Published work is the stronger signal in a field this young; Security+ comes after.
