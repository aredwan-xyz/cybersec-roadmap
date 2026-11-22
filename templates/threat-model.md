# Threat model: <system name>

- **Version and date:**
- **Author:**
- **Scope:** what is included and what is not

## 1. What are we building?

One paragraph. Then a data-flow diagram showing users, components, data stores, external services, the model, and every tool the model can call. Draw the trust boundaries.

## 2. Assets

| Asset | Why it matters | Where it lives |
|---|---|---|
| | | |

## 3. Actors

| Actor | Trusted? | What they can reach |
|---|---|---|
| Anonymous user | No | |
| Signed-in user | Partly | |
| Content the model reads (web pages, documents, emails, tool results) | No | |
| Administrator | Yes | |

## 4. Entry points

Every place data crosses a trust boundary. For an LLM system, list every source of text that enters the model's context.

| Entry point | Data | Trust level |
|---|---|---|
| | | |

## 5. Threats

Use STRIDE per component (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege). For LLM systems also ask: can untrusted content reach the model, can the model reach private data, and can the model send data out?

| ID | Threat | Component | Likelihood | Impact | Existing control | Proposed mitigation | Owner |
|---|---|---|---|---|---|---|---|
| T1 | | | | | | | |

## 6. Abuse cases

Short stories from the attacker's point of view. "As an attacker, I plant instructions in a document so that..."

## 7. Residual risk

What remains after the mitigations, and who has accepted it.

## 8. Review

- **Next review date:**
- **Triggers for an early review:** new tool added to the agent, new data source, new user type
