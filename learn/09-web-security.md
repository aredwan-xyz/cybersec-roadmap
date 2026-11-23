# Lesson 9: How websites get hacked

> **In one sentence:** Most website hacks happen because the site trusts what visitors send it, or forgets to check who is allowed to do what.

**Time:** about 15 minutes · **You need:** a browser

## The big idea

Picture a restaurant. A waiter takes your order to the kitchen, the kitchen fetches ingredients from the storeroom, and the food comes back. A website works the same way:

- Your **browser** is your table: it shows you the page.
- A **request** is your order: when you click or submit a form, your browser sends a message to the **server**, the computer that runs the site.
- The **back end** is the kitchen: code on the server that decides what to do.
- The **database** is the storeroom: where accounts and orders are kept.

Now imagine a waiter who passes on any order unread, even "and hand over the storeroom keys". Or a kitchen that serves table 12 the food ordered by table 7 because someone asked. Most web hacking is one of those two mistakes: trusting input, and not checking permission.

## How it works

**OWASP** (the Open Worldwide Application Security Project) is a nonprofit community that publishes the **OWASP Top 10**, a regularly updated list of the most serious web application risks. Three big ones:

**Broken access control** has been ranked number one in recent editions. The site fails to check whether you are allowed to see or do something. Suppose your bill lives at `example.com/invoice?id=1001`. If changing it to `1002` shows a stranger's bill, the site checked that you were logged in, but not that the bill was yours.

**Injection** happens when text a visitor types is treated as instructions instead of data. Many sites use **SQL**, a language for asking databases questions. A login form might build the question "find the user whose name is ___ and password is ___". If the site pastes your typing straight into the blanks, an attacker can type text that rewrites the question, for example cutting off the password check. The fix is **parameterized queries**: the question and the data travel separately, so typed text never becomes a command.

**Cross-site scripting (XSS)** is injection aimed at other visitors. If a comment box accepts a hidden script and the site shows it to everyone, the script runs in each visitor's browser as if the site sent it, and could steal their login session. The fix is **output encoding**: making the browser show visitor text as text, never as code.

Two habits prevent much of this:

- **Input validation**: check every input against what you expect (a number, a date, an email) and reject the rest. Do it on the server, because visitors control their own browser.
- **Least privilege**: give each part only the access it needs. If the site's database account can only read the product list, an attack can do far less.

## In real life

A common testing find: a tester logs in with test account A and notes that the profile address ends in a number. They log in as test account B and request account A's number. Account A's details appear. This is called an **IDOR** (insecure direct object reference), a type of broken access control, and common in bug bounty reports. The fix is a server check, on every request, that the record belongs to this user. Never try this on sites you do not own.

## Try it

1. Create a free account at the [PortSwigger Web Security Academy](https://portswigger.net/web-security). Read the SQL injection topic and try its first Apprentice lab. The labs are built for you to attack.
2. On any website, open your browser's developer tools (F12), click the Network tab and reload the page. Each line is a request your own browser sent.

## Key words

- **OWASP Top 10**: a widely used list of the most serious web application risks.
- **Broken access control**: a site failing to check what each user is allowed to see or do.
- **Injection**: visitor input treated as commands instead of data.
- **SQL**: a language websites use to ask databases questions.
- **XSS (cross-site scripting)**: visitor-supplied code running in other visitors' browsers.

## Check yourself

**1. You change `id=1001` to `id=1002` in an address and see someone else's invoice. What kind of flaw is this?**

- A. Cross-site scripting
- B. Weak encryption
- C. Broken access control

<details><summary>Answer</summary>

**C.** The site never checked that invoice 1002 belonged to you.

</details>

**2. What is the main fix for SQL injection?**

- A. Parameterized queries, which keep the command and the visitor's data separate
- B. Hiding the login page
- C. Requiring longer passwords

<details><summary>Answer</summary>

**A.** When data travels separately, typed text can never change what the database is asked.

</details>

**3. Why must input be checked on the server, not only in the browser?**

- A. Servers are faster than browsers
- B. Visitors control their own browser and can change or skip any checks there
- C. Browsers cannot read forms

<details><summary>Answer</summary>

**B.** Only the server's checks are out of the visitor's reach.

</details>

## Go deeper

- [OWASP Top 10](https://owasp.org/www-project-top-ten/): the official list, with a page explaining each risk.
- [PortSwigger Web Security Academy](https://portswigger.net/web-security): free lessons and hands-on labs for every major web flaw.

---

**Next:** [Lesson 10: How defenders catch attackers](10-defense-and-detection.md)
