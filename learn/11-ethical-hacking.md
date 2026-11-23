# Lesson 11: Ethical hacking

> **In one sentence:** Ethical hackers break into systems on purpose, with written permission, so the weak spots get fixed before criminals find them.

**Time:** about 15 minutes · **You need:** a browser

## The big idea

Imagine a bank hires a locksmith to try to get into its vault overnight. If the locksmith succeeds, the bank learns which lock to replace. If a stranger did the same thing without being asked, it would be a burglary. The skills are identical. The difference is permission.

That is ethical hacking. A **hacker** is someone who makes a system do something its builders did not intend. An **ethical hacker** does this only with clear, written permission from the owner, and then reports what they found so it can be fixed.

Companies pay for this because a fresh pair of eyes, thinking like an attacker, finds mistakes that insiders miss, such as a forgotten test server or a web form that leaks other people's data.

There is one rule, with no exceptions. **Only attack systems you own, purpose-built practice labs, or bug bounty targets within their published scope.** Everything else is off limits, even if you are curious or mean well. In most countries, accessing a computer system without authorization is a crime, and good intentions are not a defence.

## How it works

Ethical hacking comes in a few common forms:

- **Penetration test (pentest):** a company hires testers for a fixed period to attack specific systems. The report lists each weakness, how serious it is, and how to fix it.
- **Red team:** a longer, more realistic exercise. The red team plays a real attacker chasing a goal, such as reading the CEO's email, while the defenders (the **blue team**) try to notice and stop them. It tests people and processes, not just technology.
- **Bug bounty:** a company invites anyone to look for flaws in certain systems and pays rewards for valid reports. Platforms like HackerOne and Bugcrowd host many of these.
- **CTF (capture the flag):** a game where you solve security puzzles to find a hidden piece of text, the "flag". Everything is built to be attacked, so it is legal.

Two documents keep professional work legal:

- **Written permission**, signed by someone who actually has the right to approve testing of those systems.
- **Scope**, which says exactly what is in bounds: which websites and addresses, which dates, and which techniques are banned. If something is not listed as in scope, treat it as out of scope.

Testers also agree what to do if they find real customer data. Usually: stop, do not copy it, and report it.

## In real life

In 2019, two security testers from the firm Coalfire were arrested at a county courthouse in Iowa. The state court administration had hired them to test physical security, with a signed contract. But the county, which ran the building, disputed that the state could authorize testing there. The charges were eventually dropped, but the case became a famous lesson for the industry: permission must come from someone who truly controls the system, and scope must be written so clearly that nobody can argue about it later.

## Try it

1. Create a free account at [picoCTF](https://picoctf.org) and open the practice area (picoGym). Solve two of the easiest challenges in the "General Skills" category.
2. Open any public bug bounty program on [HackerOne](https://hackerone.com/directory/programs) and read its scope: what is in, what is out, and what testing is banned. Do not test anything; just read.

## Key words

- **Ethical hacker**: someone who attacks systems only with the owner's permission, to help fix weaknesses.
- **Penetration test (pentest)**: a paid, time-limited attack on agreed systems, ending in a written report.
- **Red team**: a group that plays a realistic attacker to test an organization's defences.
- **Bug bounty**: a program that pays people for reporting security flaws within a published scope.
- **Scope**: the written list of what you are allowed to test, when and how.

## Check yourself

**1. What makes hacking "ethical"?**

- A. Using only free tools
- B. Having clear, written permission from the system's owner
- C. Not causing any damage

<details><summary>Answer</summary>

**B.** Permission is the dividing line. Without it, even harmless testing can be a crime.

</details>

**2. You notice a bug on a website that has a bug bounty program, but that part of the site is not listed in scope. What should you do?**

- A. Treat it as out of scope and do not test it
- B. Test it quickly, since the company clearly welcomes hackers
- C. Test it and only report it if it is serious

<details><summary>Answer</summary>

**A.** Anything not listed as in scope is out of bounds, whatever you think the company would want.

</details>

**3. Which activity is always safe and legal for a beginner?**

- A. Scanning your school's network to see what is running
- B. Trying default passwords on a neighbour's Wi-Fi router
- C. Solving challenges on a CTF practice site like picoCTF

<details><summary>Answer</summary>

**C.** CTF platforms are built to be attacked. The other two target systems you have no permission to test.

</details>

## Go deeper

- [picoCTF](https://picoctf.org): beginner-friendly CTF with a permanent practice area.
- [TryHackMe](https://tryhackme.com): guided beginner paths in the browser, with a free tier.
- [PortSwigger Web Security Academy](https://portswigger.net/web-security): free web security training with legal labs.
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/): a deliberately vulnerable web app you run yourself.

---

**Next:** [Lesson 12: Cloud security](12-cloud-security.md)
