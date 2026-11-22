# Cybersecurity Roadmap: Absolute Beginner to Expert

_Written 2026-11-22 and revised after a critical review; the known weak points are in [docs/limitations.md](docs/limitations.md). Certification names, prices and exam formats change often; check the vendor's page before paying for anything._

_Every resource named in this roadmap is linked in [resources.md](resources.md), organized by stage._

_For the first 90 days on the AI security track, [ai-security-90-days/README.md](ai-security-90-days/README.md) is the authority. Where this roadmap differs, that plan wins._

## The honest shape of it

| Stage | Typical time (10–15 hrs/week) | You can do this at the end |
|---|---|---|
| 0. Setup and mindset | 2 weeks | Run a home lab, know the legal lines |
| 1. IT foundations | 3–4 months | Explain how a packet gets from your laptop to a website; live in a Linux terminal |
| 2. Security fundamentals | 2–3 months | Pass Security+; read a breach report and follow it |
| 3. Hands-on core (attack and defend) | 6 months | Root easy lab machines; investigate an alert from logs |
| 4. Specialize | 6–12 months | Hold a junior role or do paid work in one track |
| 5. Professional depth | Years 2–5 | Lead engagements or investigations without supervision |
| 6. Expert | Year 5 onward | Find new things, teach others, set strategy |

"Expert" takes about five years of real work, not courses. Job-ready in one track takes 12–18 months of consistent effort. Nothing shortens this except hours spent with your hands on systems.

**The one rule that outranks everything else:** only test systems you own or have written permission to test. Unauthorized access is a crime almost everywhere, even when "just looking". Labs, CTFs and bug bounty programs with a published scope are where you practise.

---

## Stage 0: Setup and mindset (weeks 1–2)

**Do**

- Install VirtualBox, VMware or UTM (Apple Silicon). Create one Kali Linux VM and one Ubuntu VM.
- Create accounts on TryHackMe, Hack The Box Academy, and PortSwigger Web Security Academy.
- Start a notes system (Obsidian or plain Markdown in a git repo). Write down every command you learn and why it worked. This becomes your personal playbook and later your portfolio.
- Start a password manager and turn on MFA everywhere. Practise what you will preach.
- **Baseline yourself.** Before Stage 1, write down from memory how DNS, TCP, TLS, file permissions and a session cookie work. Skip what you can already explain; spend the time on what you cannot.
- **Check your hardware.** Most lab images, including Windows Server evaluation ISOs, are built for x86 processors. On an Apple Silicon Mac, use ARM builds where they exist (Kali and Ubuntu have them) and a cloud or hosted lab for Windows and Active Directory work. Plan for at least 16 GB of memory if you run several VMs locally.
- **Set a budget.** Add up what you intend to spend in year one on platform subscriptions, certification exams and cloud lab time, using current prices from each vendor. Almost everything in Stages 0–3 has a free option; exams are the main cost.
- **Allocate the hours.** Put the weekly sessions in a calendar and write down what they displace.

**Mindset**

- Security is understanding how things work, then how they break. If you skip the "how it works" part, you become someone who runs tools without knowing what the output means.
- Aim for 70% hands-on, 30% reading and video.
- Being stuck for hours is the normal state. Try for 30–60 minutes before reading a walkthrough, then redo the box without it a week later.

---

## Stage 1: IT foundations (months 1–4)

Most beginners skip this stage and stall later. Don't.

### Networking

- OSI and TCP/IP models, IP addressing and subnetting, MAC vs IP, ARP
- TCP vs UDP, the three-way handshake, ports
- DNS, DHCP, HTTP/HTTPS, TLS, SSH, SMB, SMTP
- Routing, NAT, VLANs, firewalls, VPNs, proxies
- **Practice:** capture your own traffic in Wireshark and explain every packet in a page load. Build a small network in Cisco Packet Tracer.
- **Resources:** Professor Messer Network+ videos (free), Cisco Networking Academy "Networking Basics" (free), TryHackMe "Pre Security" path

### Linux

- File system, permissions, users and groups, processes, services, package managers
- Bash: pipes, redirection, grep, find, awk, sed, cron
- SSH, logs under `/var/log`, basic hardening
- **Practice:** OverTheWire "Bandit" (all levels), then run Linux as your daily lab environment
- **Resources:** "Linux Basics for Hackers" (OccupyTheWeb), linuxjourney.com

### Windows and Active Directory

- Registry, services, event logs, PowerShell basics, NTFS permissions
- Active Directory: domains, users, groups, GPOs, Kerberos at a conceptual level
- **Practice:** build a small AD lab (one domain controller, one workstation) from evaluation ISOs on an x86 machine, or use a hosted AD lab if your computer is ARM-based

### Programming

- **Python** first: scripts that parse logs, call APIs, scan ports, automate boring tasks
- **Bash** and a little **PowerShell**
- Read-level understanding of **JavaScript** and **SQL** (essential for web security)
- Later, for depth: C and a little assembly
- **Resource:** "Automate the Boring Stuff with Python" (free online)

**Checkpoint:** you can explain what happens when you type a URL and press Enter, at the DNS, TCP, TLS and HTTP level, and you can write a 50-line Python script without copying it.

---

## Stage 2: Security fundamentals (months 4–6)

### Concepts

- CIA triad, authentication vs authorization, least privilege, defence in depth, zero trust
- Cryptography in practice: symmetric vs asymmetric, hashing, salting, digital signatures, certificates and PKI, what TLS actually protects
- Threats: malware families, phishing and social engineering, ransomware, supply-chain attacks, insider threat
- Vulnerability basics: CVE, CVSS, patching, misconfiguration
- Frameworks to know by name and purpose: MITRE ATT&CK, the Cyber Kill Chain, NIST CSF, OWASP Top 10, CIS Controls
- Risk: likelihood times impact, threat modelling (STRIDE), security controls (preventive, detective, corrective)
- Identity, which most modern attacks go through: passwords and MFA, single sign-on, OAuth 2.0 and OpenID Connect, SAML, session and token handling, service accounts and API keys
- Privacy and data protection: what personal data is, breach-notification duties, and the laws that apply where you work (PIPEDA in Canada, GDPR for EU residents), at overview level
- Professional practice: written authorization, scope, rules of engagement and responsible disclosure. Learn these before you ever touch a system that is not yours

### Certification

- **CompTIA Security+** is the standard first cert and the most common HR filter for entry roles. Study with Professor Messer's free course plus practice exams.
- Skip CEH unless a specific employer demands it. It is expensive and practitioners rate it poorly.

### Habit

- Follow the field 15 minutes a day: Krebs on Security, The Hacker News, BleepingComputer, the Risky Business and Darknet Diaries podcasts. Read one real incident write-up a week (the DFIR Report is excellent) and map it to ATT&CK.

**Checkpoint:** Security+ passed or passable, and you can read a breach post-mortem and explain each attacker step.

---

## Stage 3: Hands-on core (months 6–12)

Learn both sides before picking one. Attackers who understand detection are better attackers, and defenders who have attacked are better defenders.

### Offensive basics

- Methodology: reconnaissance, scanning, enumeration, exploitation, privilege escalation, lateral movement, reporting
- Tools: Nmap, Burp Suite, ffuf or Gobuster, Metasploit (understand what it does, don't depend on it), Hashcat and John, BloodHound, Impacket
- Web: SQL injection, XSS, CSRF, SSRF, IDOR and broken access control, authentication flaws, file upload, deserialization
- Privilege escalation on Linux and Windows; basic Active Directory attacks (Kerberoasting, pass-the-hash)
- **Practice:** PortSwigger Web Security Academy (free, the best web training there is), TryHackMe "Jr Penetration Tester", Hack The Box easy machines, picoCTF

### Defensive basics

- Log sources: Windows Event Logs, Sysmon, syslog, firewall, proxy, DNS, EDR telemetry
- SIEM: write searches and detections in Splunk (free tier) or Elastic/Wazuh
- Alert triage, incident response lifecycle (prepare, detect, contain, eradicate, recover, lessons learned)
- Network analysis with Wireshark and Zeek; detection rules with Sigma, YARA, Suricata
- Hardening: CIS Benchmarks, patching, MFA, segmentation, backups
- **Practice:** TryHackMe "SOC Level 1", CyberDefenders, Blue Team Labs Online, LetsDefend

### Cloud, containers and pipelines
Most systems you will attack or defend run here, so this is core, not a specialization.

- Cloud fundamentals in one provider (AWS or Azure): the shared responsibility model, identity and access management (users, roles, policies, least privilege), network controls, storage permissions, logging
- Containers: how Docker images and containers work, image scanning, running as non-root, basic Kubernetes concepts
- Pipelines: secrets handling, dependency and supply-chain risk, what CI/CD systems can reach, infrastructure as code
- **Practice:** a free-tier cloud account with billing alerts set first; deliberately vulnerable cloud labs such as CloudGoat or flaws.cloud; audit the permissions of one thing you have deployed

### Capstone lab (do this; it is the best interview material you will have)

1. Build an AD lab with a Wazuh or Elastic SIEM collecting logs.
2. Attack it yourself (phish a user, escalate, move laterally).
3. Find your own attack in the logs and write detections for it.
4. Publish the write-up.

**Checkpoint:** 30+ lab machines solved with your own notes, most of PortSwigger's apprentice and practitioner labs done, and the capstone published.

---

## Stage 4: Choose a specialization (year 1–2)

Pick one. You can change later; depth transfers.

| Track | What you do | Learn next | Certs worth having |
|---|---|---|---|
| **SOC / Blue team** | Monitor, detect, respond | Detection engineering, threat hunting, EDR, SOAR | CySA+, BTL1, later GIAC GCIH / GCIA |
| **Penetration testing / Red team** | Legally break in and report | AD exploitation in depth, evasion, C2, report writing | eJPT, PNPT or HTB CPTS, then OSCP |
| **Application security** | Secure software as it is built | Secure code review, threat modelling, SAST/DAST, API security, CI/CD security | Burp Suite Certified Practitioner, OSWE later |
| **Cloud security** | Secure AWS, Azure, GCP | IAM in depth, Kubernetes, infrastructure as code, CSPM | A cloud associate cert first, then the vendor's security cert, CCSP later |
| **DFIR / Malware analysis** | Investigate breaches, reverse malware | Memory and disk forensics, Volatility, Ghidra, assembly | GIAC GCFA / GREM (costly; employer-funded if possible) |
| **GRC** | Risk, policy, audit, compliance | ISO 27001, SOC 2, NIST, privacy law, risk quantification | CISA, CRISC, ISO 27001 Lead Implementer |
| **OT / IoT security** | Secure industrial, building and embedded systems | Modbus, BACnet, firmware analysis, hardware interfaces (UART, JTAG), IEC 62443 | GICSP, ISA/IEC 62443 certificates |
| **AI security** | Secure ML systems and LLM applications | Prompt injection, model and data supply chain, OWASP Top 10 for LLM Applications, MITRE ATLAS | Field is young; published work matters more than certs |

**How to choose:** which labs did you keep doing past midnight? Then check local job listings for that track and read 20 of them. Build toward what they actually ask for.

**Entry points by difficulty:** SOC analyst, IT/helpdesk-to-security, and GRC analyst are the most common first jobs. Pentest and red team junior roles are few and competitive. Cloud and AppSec favour people who already have engineering experience.

---

## Stage 5: Professional depth (years 2–5)

- Get paid to do it. Real environments teach what labs cannot: politics, legacy systems, incomplete logs, time pressure.
- Go deep on internals: Windows internals, Linux kernel basics, how Kerberos, OAuth/OIDC and SAML really work, how compilers and memory work.
- Learn to write. Reports, detections, runbooks and risk memos are the product. A finding nobody understands fixes nothing.
- Automate your own job with Python or Go.
- Advanced certs when they match your work: OSCP/OSEP/OSWE (offensive), GIAC specialist certs (defensive), CISSP once you have the required five years of experience and want senior or management roles.
- Bug bounty (HackerOne, Bugcrowd, Intigriti) is good for web skills, but expect months before a first valid finding. Treat it as training, not income.

## Stage 6: Expert (year 5+)

Experts differ from seniors in output, not knowledge:

- Original research: new techniques, CVEs with your name on them, tools others use
- Conference talks (BSides first, then DEF CON, Black Hat, regional conferences)
- Designing security programmes and architecture, not just operating them
- Mentoring, and translating risk into language executives act on
- Deep expertise in one area plus working knowledge of all the others

---

## Weekly routine that works

| Block | Hours | What |
|---|---|---|
| Hands-on labs | 6–8 | One platform at a time, with notes |
| Theory | 2–3 | Current stage's course or book |
| Build or script | 2 | A tool, a lab component, an automation |
| Write-up | 1 | Publish one thing you learned |
| News and incident reading | 1–2 | 15 minutes a day |

Consistency beats intensity. Ten hours every week for a year beats a 60-hour month followed by nothing.

## Proof of skill (what gets you hired)

1. A GitHub repo of scripts, detections and lab infrastructure
2. A blog of write-ups (retired machines and your own labs only; never live targets or active CTF challenges)
3. The capstone lab from Stage 3
4. Platform rankings and one or two respected certs
5. Community presence: local BSides, OWASP chapter meetings, CTF teams

## Career mechanics

- **Read real postings first.** Before committing to a track, read 20 current postings for it. Record required years of experience, location and remote policy, pay, and repeated skills. Repeat every six months.
- **Check eligibility early.** Many security roles in government, defence, banking and critical infrastructure require a security clearance or background screening, which can depend on citizenship, residency history or immigration status. Note it for each posting. Take status questions to a qualified immigration adviser.
- **Position from your strongest ground.** If you already have engineering experience, present yourself as an engineer adding a security specialty, not as a junior analyst starting over.
- **How first paid work usually arrives:** a security task inside your current job or client work, an internal transfer, a referral from a community you take part in, or a small authorized review for someone who already trusts you.
- **Before reviewing anyone else's system:** written authorization from someone entitled to give it, an agreed scope and time window, a confidentiality agreement, and a view on liability. Describe your experience honestly.
- **Get outside feedback.** Self-graded checkpoints are weak. Find one reviewer for your write-ups, join an OWASP chapter or BSides community, and play CTFs in a team.

## Core book list

- "Linux Basics for Hackers" by OccupyTheWeb
- "The Web Application Hacker's Handbook" by Stuttard and Pinto (dated, still foundational; pair with PortSwigger Academy)
- "Penetration Testing" by Georgia Weidman, or "The Hacker Playbook 3" by Peter Kim
- "Practical Malware Analysis" by Sikorski and Honig
- "Applied Network Security Monitoring" by Sanders and Smith
- "Security Engineering" by Ross Anderson (free online; the best big-picture book)
- "The Cuckoo's Egg" by Clifford Stoll and "Sandworm" by Andy Greenberg, for context and motivation

## Common mistakes

- **Tool collecting.** Knowing 50 tools shallowly instead of understanding what five do on the wire.
- **Cert collecting.** Certs open doors; skills keep you in the room. Two or three well-chosen ones are enough for the first job.
- **Skipping foundations.** If you cannot subnet or read a packet capture, advanced topics will not stick.
- **Tutorial loops.** Watching without typing. If you did not do it yourself, you did not learn it.
- **Only offence.** Most jobs are defensive. Learn both.
- **No notes, no write-ups.** You will forget, and you will have nothing to show.
- **Crossing the legal line** "to practise". One incident can end a career before it starts.

---

## If you already build web, AI and IoT systems

You are not starting from zero, and the fastest path uses what you have:

- **Skim Stage 1.** Fill the gaps (usually subnetting, Active Directory and Windows internals) and move on in weeks, not months.
- **Best-fit tracks:** application security (you already read and write web code), OT/IoT security (smart buildings run on BACnet, Modbus and poorly secured controllers, and few security people understand them), and AI security (a young field where builders have an edge).
- **A strong niche:** smart-building and IoT platform security. Skilled people are scarce there, and it compounds with existing domain knowledge rather than replacing it.
- **First 90 days:** follow [ai-security-90-days/README.md](ai-security-90-days/README.md). It covers web security basics, LLM and agent attacks, cloud identity, defences, and a published assessment of one of your own projects. Security+ and PortSwigger practitioner level come after day 90.

---

Market demand and what to focus on: [market/focus-2026.md](market/focus-2026.md).
