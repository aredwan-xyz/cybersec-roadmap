---
---

# Contributing

Thanks for helping. This repo stays useful only if it stays accurate and short.

## What is welcome

- **Corrections.** Wrong facts, outdated guidance, unclear wording.
- **Dead or moved links.**
- **Better resources.** One that replaces a weaker one beats one that adds to the list.
- **Gaps.** Something a learner needs that is missing. [docs/limitations.md](docs/limitations.md) lists the known ones.
- **Lab solutions.** A working `vulnerable/` and `fixed/` pair for one of the [labs](labs/README.md), with a test that shows the difference.
- **Translations**, in a folder named for the language.

## What is not

- Resources you sell or are paid to promote, unless you say so in the pull request.
- Lists of payloads, or anything aimed at systems the reader does not own.
- Tools or techniques whose main use is evading detection or causing damage.
- Real personal data, credentials or secrets, in any form.
- Large rewrites without an issue first.

## How

1. Open an issue for anything larger than a typo or a dead link.
2. One change per pull request.
3. For a new resource, say in one sentence why it earns its place and whether it is free.
4. Follow the existing format: `- [Name](url): what it is for`.
5. Check that links load. The link check runs on every pull request.

## Lab contributions

- Lab apps must bind to `localhost` and state in their README that they are intentionally vulnerable.
- Use synthetic data only.
- Include a test that shows the attack working against the vulnerable version and failing against the fixed one.

## Conduct

Be direct and be kind. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Licensing of contributions

By contributing you agree that written content is released under CC BY 4.0 and code under MIT, as described in [LICENSE.md](LICENSE.md).

## The website

The site at https://aredwan-xyz.github.io/cybersec-roadmap/ is built from these Markdown files by `site/build.mjs` and deployed on every push to `main`. Edit the Markdown, not the site. To preview locally:

```bash
cd site && npm install && npm run preview
```

Then open http://localhost:8790. Running `node site/check.mjs http://localhost:8790` crawls it for broken internal links.
