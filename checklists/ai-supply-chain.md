# Checklist: AI supply chain

## Models

- [ ] Models come from the original publisher or a verified organization
- [ ] Formats that can execute code on load (pickle-based files) are avoided; safetensors or an equivalent is preferred
- [ ] Downloaded models are scanned before loading (for example with ModelScan)
- [ ] Model versions and hashes are pinned and recorded
- [ ] The model licence and any use restrictions are known

## Hosted model providers

- [ ] Data-retention, training-use and region settings are set deliberately
- [ ] API keys are scoped per environment, stored in a secrets manager, and rotated
- [ ] Spend caps and alerts are set
- [ ] A fallback exists if the provider or model version is withdrawn

## Datasets and knowledge bases

- [ ] Source and licence of each dataset recorded
- [ ] Who can add to the knowledge base is controlled
- [ ] Ingested content is scanned for injected instructions and personal data
- [ ] Training or fine-tuning data is versioned

## Code dependencies

- [ ] Dependencies are pinned with a lock file
- [ ] A dependency scanner runs in CI
- [ ] New packages are checked for typosquatting and recent ownership changes
- [ ] Install scripts are reviewed for unfamiliar packages

## Plugins, tools and MCP servers

- [ ] Each is reviewed before installation and pinned to a version
- [ ] Each has the least access it needs

## Secrets

- [ ] No secrets in the repository or its history (scan with Gitleaks or similar)
- [ ] No secrets in prompts, notebooks, logs or screenshots
- [ ] `.env` files are ignored by git

## Build and deployment

- [ ] CI credentials are scoped and short-lived
- [ ] Container images are scanned and come from trusted bases
- [ ] What the deployed service can reach is documented and minimal

## Inventory

- [ ] A list exists of every model, dataset, provider, plugin and major dependency in use, with owner and version
