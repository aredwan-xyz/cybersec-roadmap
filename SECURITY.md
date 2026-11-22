# Security and scope

## Rules for using anything in this repository

- Test only systems you own, purpose-built labs, or bug bounty targets within their published scope.
- Get written authorization before reviewing anyone else's system. Use [templates/scope-and-authorization.md](templates/scope-and-authorization.md) as a starting point and get legal input before using it commercially.
- Use synthetic data in every lab. No real personal or client data in prompts, logs, screenshots or write-ups.
- Publish write-ups only for your own labs and retired challenges. Never for live targets or active competitions.

## Lab code

Anything under `labs/` is intentionally vulnerable once built. Run it locally only. Never deploy it to a public address, and never reuse its code in a real product.

## Reporting a problem with this repository

If you find a secret, personal data, or a dangerous error in this repo, open a private security advisory on GitHub or contact the owner through their GitHub profile. Please do not open a public issue for secrets or personal data.
