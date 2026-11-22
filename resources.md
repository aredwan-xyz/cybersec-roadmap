# Cybersecurity Resource Library

_Written 2026-11-22. Companion to [ROADMAP.md](ROADMAP.md) and [ai-security-90-days/README.md](ai-security-90-days/README.md)._

**Link check, 2026-11-22:** all 175 distinct links were requested. 172 returned a page. Three refused the automated request (HTTP 403), which usually means bot blocking, not a dead page; open these in a browser to confirm: Linux Journey, BleepingComputer, and the ISO/IEC 42001 page. Page titles were confirmed for 20 of the less certain links. The check proves a page loads, not that every description of it below is still accurate.

Pricing changes often. "Free" and "free tier" below reflect what I know, not a check made today; confirm on the site before relying on it.

**Rule for every lab and tool here:** use them only on systems you own, on purpose-built labs, or within a bug bounty program's published scope.

---

## 1. Start here (if you only open ten links)

- [PortSwigger Web Security Academy](https://portswigger.net/web-security): the best free web security training, with labs
- [TryHackMe](https://tryhackme.com): guided beginner paths in the browser, free tier
- [OverTheWire: Bandit](https://overthewire.org/wargames/bandit/): learn the Linux command line by playing, free
- [Professor Messer](https://www.professormesser.com): free Network+ and Security+ video courses
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/): the standard list of LLM application risks
- [Simon Willison on prompt injection](https://simonwillison.net/tags/prompt-injection/): the clearest running commentary on the problem
- [Embrace The Red](https://embracethered.com/blog/): real exploits against AI products, written up
- [Gandalf by Lakera](https://gandalf.lakera.ai): prompt injection as a game
- [MITRE ATT&CK](https://attack.mitre.org): the shared vocabulary for attacker behaviour
- [The DFIR Report](https://thedfirreport.com): real intrusions, step by step

---

## 2. Stage 0: lab setup

- [Kali Linux](https://www.kali.org): the standard attack distribution; has ARM builds
- [Ubuntu](https://ubuntu.com/download): a general Linux target and daily lab machine
- [VirtualBox](https://www.virtualbox.org): free virtualization
- [UTM](https://mac.getutm.app): virtualization for Apple Silicon Macs
- [Obsidian](https://obsidian.md): notes in plain Markdown
- [Bitwarden](https://bitwarden.com): open-source password manager with a free tier

## 3. Stage 1: IT foundations

### Networking
- [Professor Messer Network+](https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/): free video course
- [Cisco Networking Academy](https://www.netacad.com): free networking courses and Packet Tracer
- [Wireshark](https://www.wireshark.org): packet capture and analysis
- [Practical Networking](https://www.practicalnetworking.net): clear written explanations of subnetting, ARP, NAT, TLS
- [Subnetting practice](https://subnettingpractice.com): drills
- [How DNS works (comic)](https://howdns.works): a short visual explainer

### Linux and the command line
- [OverTheWire wargames](https://overthewire.org/wargames/): Bandit first, then Natas (web) and Leviathan
- [Linux Journey](https://linuxjourney.com): free structured Linux lessons
- [explainshell](https://explainshell.com): paste a command, see what each part does
- [The Linux Command Line (book, free online)](https://linuxcommand.org/tlcl.php)

### Windows and Active Directory
- [Microsoft Learn](https://learn.microsoft.com/en-us/training/): free official courses on Windows, Azure and identity
- [Sysinternals](https://learn.microsoft.com/en-us/sysinternals/): the essential Windows inspection tools, including Sysmon
- [Game of Active Directory (GOAD)](https://github.com/Orange-Cyberdefense/GOAD): a ready-made vulnerable AD lab
- [Microsoft Evaluation Center](https://www.microsoft.com/en-us/evalcenter): time-limited Windows Server and client images (x86)

### Programming
- [Automate the Boring Stuff with Python](https://automatetheboringstuff.com): free online
- [CS50](https://cs50.harvard.edu/x/): Harvard's free introduction to computer science
- [Nand2Tetris](https://www.nand2tetris.org): build a computer from logic gates; deep understanding of how machines work
- [Learn Git Branching](https://learngitbranching.js.org): interactive git practice

## 4. Stage 2: security fundamentals

- [Professor Messer Security+](https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/): free video course for the exam
- [CS50 Cybersecurity](https://cs50.harvard.edu/cybersecurity/): free introductory course
- [TryHackMe](https://tryhackme.com): the "Pre Security" and "Cyber Security 101" paths
- [Security Engineering by Ross Anderson](https://www.cl.cam.ac.uk/~rja14/book.html): the best big-picture book; chapters free online
- [Cryptopals](https://cryptopals.com): learn cryptography by breaking it
- [CryptoHack](https://cryptohack.org): gamified cryptography challenges
- [OAuth 2.0 Simplified](https://www.oauth.com): a readable guide to OAuth and OpenID Connect
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org): concise guidance on authentication, sessions, input handling and more

## 5. Stage 3: hands-on core

### Offensive practice
- [PortSwigger Web Security Academy](https://portswigger.net/web-security): all topics, with labs
- [Hack The Box](https://www.hackthebox.com): machines and challenges
- [Hack The Box Academy](https://academy.hackthebox.com): structured modules, some free
- [picoCTF](https://picoctf.org): beginner-friendly CTF with a permanent practice area
- [pwn.college](https://pwn.college): free, deep course on binary exploitation and systems
- [VulnHub](https://www.vulnhub.com): downloadable vulnerable machines
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/): a deliberately vulnerable web app to run yourself
- [DVWA](https://github.com/digininja/DVWA): another classic vulnerable web app
- [TCM Security Academy](https://academy.tcm-sec.com): affordable practical courses
- [IppSec](https://ippsec.rocks): searchable index of Hack The Box walkthrough videos
- [CTFtime](https://ctftime.org): calendar of CTF competitions and teams

### Defensive practice
- [CyberDefenders](https://cyberdefenders.org): blue-team investigation labs
- [Blue Team Labs Online](https://blueteamlabs.online): investigation challenges
- [LetsDefend](https://letsdefend.io): simulated SOC work
- [Malware Traffic Analysis](https://www.malware-traffic-analysis.net): real packet captures with exercises
- [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team): small tests that simulate attacker techniques so you can practise detecting them
- [Boss of the SOC datasets](https://github.com/splunk/botsv3): Splunk's public investigation datasets

### Reference while practising
- [HackTricks](https://book.hacktricks.wiki): a large field manual of techniques
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings): payloads and bypasses by vulnerability class
- [GTFOBins](https://gtfobins.github.io): Unix binaries that can be abused for privilege escalation
- [LOLBAS](https://lolbas-project.github.io): the Windows equivalent
- [CyberChef](https://gchq.github.io/CyberChef/): encode, decode and transform data in the browser

## 6. Cloud, containers and pipelines

- [flaws.cloud](http://flaws.cloud): a free walkthrough of common AWS mistakes
- [flaws2.cloud](http://flaws2.cloud): the sequel, with attacker and defender paths
- [CloudGoat](https://github.com/RhinoSecurityLabs/cloudgoat): deliberately vulnerable AWS environments
- [Hacking the Cloud](https://hackingthe.cloud): an encyclopedia of cloud attack techniques
- [AWS security documentation](https://docs.aws.amazon.com/security/): official guidance, including IAM
- [AWS Skill Builder](https://skillbuilder.aws): free official training
- [Kubernetes Goat](https://github.com/madhuakula/kubernetes-goat): a deliberately vulnerable Kubernetes cluster
- [OWASP Top 10 CI/CD Security Risks](https://owasp.org/www-project-top-10-ci-cd-security-risks/)
- [SLSA](https://slsa.dev): a framework for software supply-chain integrity
- [Trivy](https://github.com/aquasecurity/trivy): scan container images and code for vulnerabilities and secrets
- [Gitleaks](https://github.com/gitleaks/gitleaks): find secrets in git history

## 7. AI security

### Core reading
- [OWASP GenAI Security Project](https://genai.owasp.org): home of the LLM Top 10 and the agentic security work
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/)
- [MITRE ATLAS](https://atlas.mitre.org): attacker tactics and techniques against AI systems
- [Simon Willison: prompt injection](https://simonwillison.net/tags/prompt-injection/)
- [Simon Willison: the lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
- [Embrace The Red](https://embracethered.com/blog/)
- [Google Secure AI Framework (SAIF)](https://saif.google)
- [Microsoft AI Red Team](https://learn.microsoft.com/en-us/security/ai-red-team/): guidance and lessons from red teaming AI products
- [Model Context Protocol documentation](https://modelcontextprotocol.io): read the security guidance in the specification
- [CaMeL: Defeating Prompt Injections by Design (paper)](https://arxiv.org/abs/2503.18813)
- [Anthropic research](https://www.anthropic.com/research): includes work on agent safety and prompt injection

### Practice
- [Gandalf by Lakera](https://gandalf.lakera.ai): direct prompt injection levels
- [PortSwigger: Web LLM attacks](https://portswigger.net/web-security/llm-attacks): labs
- [Microsoft AI Red Teaming Playground Labs](https://github.com/microsoft/AI-Red-Teaming-Playground-Labs)
- [Damn Vulnerable LLM Agent](https://github.com/WithSecureLabs/damn-vulnerable-llm-agent)
- [HackAPrompt](https://www.hackaprompt.com): prompt-hacking competition and practice
- [Hack The Box Academy](https://academy.hackthebox.com): look for the AI Red Teamer path
- [huntr](https://huntr.com): bug bounty for AI and ML software; read the disclosures

### Tools
- [garak](https://github.com/NVIDIA/garak): LLM vulnerability scanner
- [PyRIT](https://github.com/Azure/PyRIT): Microsoft's red-teaming framework for generative AI
- [promptfoo red teaming](https://www.promptfoo.dev/docs/red-team/): test suites for LLM apps
- [ModelScan](https://github.com/protectai/modelscan): scan model files for unsafe code
- [safetensors](https://github.com/huggingface/safetensors): a model format that cannot execute code on load
- [Adversarial Robustness Toolbox](https://github.com/Trusted-AI/adversarial-robustness-toolbox): classical adversarial ML attacks and defences

### Governance
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI 600-1: Generative AI Profile (PDF)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [EU AI Act explorer](https://artificialintelligenceact.eu): unofficial but readable
- [ISO/IEC 42001](https://www.iso.org/standard/42001): AI management system standard (paid)

### Which AI resources go with which week of the 90-day plan

| Week | Use |
|---|---|
| 1–2 | PortSwigger Academy (authentication, access control, SQL injection, XSS, SSRF), OWASP Cheat Sheet Series |
| 3 | OWASP LLM Top 10, Simon Willison, Gandalf, PortSwigger Web LLM attacks |
| 4 | Embrace The Red case studies |
| 5 | OWASP LLM Top 10 entries on data leakage and poisoning, MITRE ATLAS |
| 6 | OWASP GenAI agentic guidance, MCP documentation, Damn Vulnerable LLM Agent |
| 7 | AWS security documentation, flaws.cloud, Gitleaks |
| 8 | ModelScan, safetensors, garak, PyRIT, promptfoo, Microsoft playground labs, MITRE ATLAS |
| 9 | CaMeL paper, Microsoft AI Red Team guidance |
| 10 | Google SAIF, OWASP Threat Modeling resources (section 10) |
| 11 | disclose.io and security.txt (section 13) |
| 12 | NIST AI RMF, NIST AI 600-1, EU AI Act explorer, privacy law links (section 10) |

## 8. OT, IoT and smart-building security

- [CISA: Industrial Control Systems](https://www.cisa.gov/topics/industrial-control-systems): advisories and free training
- [NIST SP 800-82: Guide to OT Security](https://csrc.nist.gov/pubs/sp/800/82/r3/final)
- [ISA/IEC 62443 standards](https://www.isa.org/standards-and-publications/isa-standards/isa-iec-62443-series-of-standards): the main industrial security standard family
- [OWASP Internet of Things Project](https://owasp.org/www-project-internet-of-things/)
- [OWASP Firmware Security Testing Methodology](https://github.com/scriptingxss/owasp-fstm)
- [BACnet International](https://bacnet.org): the building-automation protocol, including BACnet Secure Connect
- [SANS ICS](https://www.sans.org/industrial-control-systems-security/): posters, papers and courses
- [Dragos](https://www.dragos.com): annual OT threat reports
- [Shodan](https://www.shodan.io): see what kinds of devices are exposed to the internet. Look only; never connect to devices you do not own

## 9. Tools worth knowing

- [Nmap](https://nmap.org): network scanning
- [Burp Suite Community](https://portswigger.net/burp/communitydownload): web proxy and testing
- [ffuf](https://github.com/ffuf/ffuf): web fuzzing
- [Metasploit](https://www.metasploit.com): exploitation framework
- [Hashcat](https://hashcat.net/hashcat/): password cracking
- [BloodHound](https://github.com/SpecterOps/BloodHound): map Active Directory attack paths
- [Impacket](https://github.com/fortra/impacket): Windows network protocol tooling
- [Ghidra](https://ghidra-sre.org): reverse engineering
- [Volatility](https://volatilityfoundation.org): memory forensics
- [Wazuh](https://wazuh.com): open-source SIEM and endpoint monitoring
- [Security Onion](https://securityonionsolutions.com): a full network monitoring distribution
- [Zeek](https://zeek.org): network analysis
- [Suricata](https://suricata.io): intrusion detection
- [Sigma](https://github.com/SigmaHQ/sigma): vendor-neutral detection rules
- [YARA](https://virustotal.github.io/yara/): pattern matching for malware
- [VirusTotal](https://www.virustotal.com): check files and URLs. Never upload confidential files

## 10. Frameworks, standards and law

- [MITRE ATT&CK](https://attack.mitre.org)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CIS Controls](https://www.cisecurity.org/controls)
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks): hardening guides
- [OWASP Top 10 (web)](https://owasp.org/www-project-top-ten/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/): a checklist-style application security standard
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP Threat Modeling](https://owasp.org/www-community/Threat_Modeling)
- [Threat Modeling Manifesto](https://www.threatmodelingmanifesto.org)
- [CVE](https://www.cve.org) and the [National Vulnerability Database](https://nvd.nist.gov)
- [CISA Known Exploited Vulnerabilities](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- [CVSS](https://www.first.org/cvss/): the severity scoring system
- [Canadian Centre for Cyber Security](https://www.cyber.gc.ca): national guidance and alerts
- [PIPEDA overview](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/): Canada's private-sector privacy law
- [GDPR text and guides](https://gdpr.eu)

## 11. Books

Free online:
- [Security Engineering](https://www.cl.cam.ac.uk/~rja14/book.html), Ross Anderson
- [The Linux Command Line](https://linuxcommand.org/tlcl.php), William Shotts
- [Automate the Boring Stuff with Python](https://automatetheboringstuff.com), Al Sweigart

Paid:
- [Linux Basics for Hackers](https://nostarch.com/linuxbasicsforhackers), OccupyTheWeb
- [Penetration Testing](https://nostarch.com/pentesting), Georgia Weidman
- [Practical Malware Analysis](https://nostarch.com/malware), Sikorski and Honig
- [Hacking APIs](https://nostarch.com/hacking-apis), Corey Ball
- [Bug Bounty Bootcamp](https://nostarch.com/bug-bounty-bootcamp), Vickie Li
- [Black Hat Python](https://nostarch.com/black-hat-python2E), Justin Seitz
- The Web Application Hacker's Handbook, Stuttard and Pinto
- The Hacker Playbook 3, Peter Kim
- Applied Network Security Monitoring, Sanders and Smith
- Threat Modeling: Designing for Security, Adam Shostack
- The Cuckoo's Egg, Clifford Stoll
- Sandworm, Andy Greenberg

## 12. Certifications

Check the current exam version, price and prerequisites on each page.

- [Security Certification Roadmap](https://pauljerimy.com/security-certification-roadmap/): every certification on one chart, by level and domain
- [CompTIA](https://www.comptia.org): Security+, Network+, CySA+
- [ISC2](https://www.isc2.org/certifications): CISSP, CCSP
- [OffSec](https://www.offsec.com): OSCP and the advanced offensive certifications
- [GIAC](https://www.giac.org): the SANS-aligned specialist certifications
- [TCM Security certifications](https://certifications.tcm-sec.com): PNPT and others
- [Security Blue Team](https://www.securityblue.team): BTL1
- [INE](https://ine.com): eJPT
- [AWS Certification](https://aws.amazon.com/certification/)
- [Microsoft Credentials](https://learn.microsoft.com/en-us/credentials/)
- [ISACA](https://www.isaca.org/credentialing): CISA, CRISC, CISM

## 13. News, community, bug bounty and disclosure

### Daily and weekly reading
- [Krebs on Security](https://krebsonsecurity.com)
- [BleepingComputer](https://www.bleepingcomputer.com)
- [The Hacker News](https://thehackernews.com)
- [tl;dr sec](https://tldrsec.com): weekly newsletter, strong on application, cloud and AI security
- [SANS Internet Storm Center](https://isc.sans.edu)
- [Schneier on Security](https://www.schneier.com)
- [PortSwigger Research](https://portswigger.net/research)
- [Google Project Zero](https://googleprojectzero.blogspot.com)

### Podcasts
- [Risky Business](https://risky.biz)
- [Darknet Diaries](https://darknetdiaries.com)

### Community
- [OWASP chapters](https://owasp.org/chapters/): free local meetings
- [Security BSides](http://www.securitybsides.com): low-cost community conferences
- [DEF CON](https://defcon.org): including its AI Village

### Bug bounty and disclosure
- [HackerOne](https://www.hackerone.com)
- [Bugcrowd](https://www.bugcrowd.com)
- [Intigriti](https://www.intigriti.com)
- [disclose.io](https://disclose.io): safe-harbour terms and disclosure guidance
- [security.txt](https://securitytxt.org): the standard file for telling researchers how to report to you

### Career
- [roadmap.sh: Cyber Security](https://roadmap.sh/cyber-security): a community roadmap to compare against this one
- [NICE Workforce Framework](https://niccs.cisa.gov/workforce-development/nice-framework): standard definitions of security work roles
- [Job Bank: Cybersecurity Analyst outlook](https://www.jobbank.gc.ca/marketreport/outlook-occupation/296427/ca)
