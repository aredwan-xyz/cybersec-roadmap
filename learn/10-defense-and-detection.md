# Lesson 10: How defenders catch attackers

> **In one sentence:** Defenders catch attackers by recording what happens on their systems, watching those records for signs of trouble, and following a practiced plan when they find it.

**Time:** about 15 minutes · **You need:** a browser

## The big idea

Think of how a shop protects itself. There are locks, but also cameras, a guard watching the screens, and a plan for a break-in. Sooner or later someone gets past the locks, so good defense focuses on noticing quickly.

On computers, the cameras are **logs**: records that systems write automatically about what happened. A log line might say "user maria signed in from this address at 09:14". Laptops, servers, firewalls and cloud accounts all write logs.

The problem is volume: a medium-sized company can produce millions of log lines a day. So defenders gather them in one place and use software to raise the alarm when something looks wrong. The people who respond often work in a **SOC** (security operations center): a team, sometimes on duty around the clock, that spots and stops attacks.

Defense never relies on one thing. **Defense in depth** means layering protections, like a castle with a moat, walls, gates and guards, so that when one layer fails, the next can stop or reveal the attacker.

## How it works

A **SIEM** (security information and event management) collects and stores logs from everywhere, lets analysts search them, and runs **detection rules**. A rule describes something suspicious, such as "ten failed sign-ins followed by a success on the same account" or "sign-ins from two countries an hour apart". When a rule matches, the SIEM raises an **alert**.

Many alerts are harmless: a forgotten password, a colleague on a VPN. Sorting real threats from noise is called **triage**. The analyst asks: What happened? Is it normal for this person or machine? What else happened around then? Then they close it or **escalate** it as a possible incident.

When it is real, the team follows an **incident response** plan. A widely used model, based on guidance from NIST (the US standards agency), runs like this:

| Stage | What happens |
|---|---|
| Preparation | Plans, tools and practice, before trouble starts |
| Detection and analysis | Confirm the attack and how far it reaches |
| Containment | Stop it spreading: isolate machines, disable accounts |
| Eradication and recovery | Remove the attacker, restore clean systems |
| Lessons learned | Fix what let it happen |

**MITRE ATT&CK** is a free, public knowledge base, run by the nonprofit MITRE, that catalogs how real attackers behave. It is organized into **tactics**, the attacker's goals (such as getting in, staying in or stealing data), and **techniques**, the specific ways they reach each goal (such as phishing or using stolen passwords). Defenders use it as a map: for each technique, they ask "would we notice this?" and find the gaps.

## In real life

A typical alert: an employee's account signs in from another country at 3 a.m., minutes after it signed in from the office. The SOC analyst checks. Is this person travelling? Does the company use a VPN there? If nothing explains it, they treat it as a stolen password: lock the account, end its active sessions, check what it accessed, and contact the employee through a separate, trusted channel. Done well, this takes minutes.

## Try it

1. Look at your own sign-in history. Google: Manage your Google Account, then Security, then "Recent security activity" and "Your devices". Microsoft: account.microsoft.com, then Security, then sign-in activity. Is every entry you?
2. Open [MITRE ATT&CK](https://attack.mitre.org) and search for technique T1566, Phishing. Read its description and its mitigations: ways defenders reduce the risk.

## Key words

- **Log**: an automatic record of what happened on a system.
- **SIEM**: software that collects logs from many systems, searches them and raises alerts.
- **SOC**: a security operations center, the team that watches for attacks.
- **Alert**: a warning raised when activity matches a detection rule.
- **Triage**: quickly sorting alerts into harmless and needs-action.
- **Incident response**: planned steps for handling a real attack.
- **Defense in depth**: layering several protections so one failure is not fatal.
- **MITRE ATT&CK**: a public catalog of real attacker goals and techniques.

## Check yourself

**1. What does a SIEM do?**

- A. Blocks every attack automatically
- B. Encrypts all of a company's files
- C. Collects logs from many systems, searches them and raises alerts

<details><summary>Answer</summary>

**C.** A SIEM gathers and watches logs. People still investigate what it flags.

</details>

**2. An analyst looks at an alert and finds the user simply forgot their password. What is this sorting step called?**

- A. Eradication
- B. Triage
- C. Encryption

<details><summary>Answer</summary>

**B.** Triage means quickly deciding which alerts need action.

</details>

**3. What does defense in depth mean?**

- A. Layering several protections so that if one fails, another can stop or reveal the attacker
- B. Buying one very strong firewall
- C. Keeping all security staff in one building

<details><summary>Answer</summary>

**A.** No single protection is perfect, so defenders stack several.

</details>

## Go deeper

- [MITRE ATT&CK](https://attack.mitre.org): the full catalog of attacker tactics and techniques.
- [LetsDefend](https://letsdefend.io): practice SOC analyst work on simulated alerts, with a free tier.

---

**Next:** [Lesson 11: Ethical hacking](11-ethical-hacking.md)
