# Lesson 12: Cloud security

> **In one sentence:** In the cloud, the provider protects the buildings and machines, but you are responsible for who can get in and how you set things up.

**Time:** about 15 minutes · **You need:** a browser

## The big idea

Think about renting a flat. The landlord looks after the building: the roof, the wiring, the front door of the block. But you choose who gets a copy of your key, and if you leave your own door open, that is on you.

**The cloud** works the same way. It means using computers, storage and software in someone else's data centre, reached over the internet. The big **cloud providers** include Amazon Web Services (AWS), Microsoft Azure and Google Cloud. Instead of buying servers, a company rents what it needs.

The providers are very good at physical and hardware security. But the cloud creates a new kind of risk. An old-style office network had a wall around it, called the **perimeter**. In the cloud, almost everything can be reached from the internet if the settings allow it. So the key question is no longer "are you inside the wall?" It is "who are you, and what are you allowed to do?"

That is why people say **identity is the new perimeter**. Most cloud breaches are not clever attacks on the provider. They come from customers' setup mistakes, or from stolen passwords and keys.

## How it works

The split of duties is called the **shared responsibility model**. The exact line depends on the service, but broadly:

| The provider secures | You secure |
|---|---|
| Data centres, hardware, the core network | Who has access, and how much |
| The software that runs the cloud itself | Your settings and configuration |
| | Your data, your code, your secrets |

The most common mistakes are:

- **Too much access.** Cloud accounts use **IAM (identity and access management)** to decide who can do what. Good practice is **least privilege**: give each person or program only the permissions it needs. In practice, people often grant "admin" because it is quicker.
- **Misconfigured storage buckets.** A **bucket** is a folder of files in cloud storage, such as Amazon S3. If it is set to public by mistake, anyone who finds the address can download everything in it.
- **Secrets in code.** A **secret** is a password, access key or token that lets a program log in. Developers sometimes paste one into code and publish it on GitHub, where attackers scan for keys automatically.
- **Admins without MFA.** **MFA (multi-factor authentication)** means logging in with something beyond a password, such as an app prompt or security key. Admin accounts can change everything, so they need it most.

Providers offer tools that flag these problems. The work is turning them on and acting on what they find.

## In real life

In 2019, the US bank Capital One disclosed a breach affecting about 100 million people in the United States and about 6 million in Canada. An attacker, a former Amazon Web Services employee, exploited a misconfigured web application firewall in Capital One's cloud setup. That gave her cloud credentials with more access than they needed, which she used to copy data from storage. AWS itself was not broken into. The weakness was in how the customer had configured its own systems.

## Try it

1. Open [flaws.cloud](http://flaws.cloud) and read the introduction and first level's hints. It is a free, legal walkthrough of common AWS mistakes.
2. In your own cloud storage (Google Drive, iCloud or similar), turn on MFA and check what you have shared with "anyone with the link". Unshare anything that should be private.

## Key words

- **Cloud**: computing power and storage you rent from a provider and reach over the internet.
- **Shared responsibility model**: the split between what the provider secures and what you secure.
- **IAM (identity and access management)**: the system that controls who can do what in a cloud account.
- **Least privilege**: giving each person or program only the access it truly needs.
- **Secret**: a password, key or token that lets a program prove who it is.
- **MFA (multi-factor authentication)**: logging in with a second proof beyond your password.

## Check yourself

**1. In the shared responsibility model, who must set a storage bucket to private?**

- A. The cloud provider
- B. Nobody, buckets are always private
- C. The customer using the cloud

<details><summary>Answer</summary>

**C.** The provider gives you the settings, but choosing them correctly is your job.

</details>

**2. What does "identity is the new perimeter" mean?**

- A. Controlling who can log in and what they can do matters more than a network wall
- B. Every employee needs a photo ID card
- C. Cloud providers check your passport

<details><summary>Answer</summary>

**A.** Cloud services are reachable from anywhere, so access controls do the job the office wall used to do.

</details>

**3. A developer puts an access key directly in code and publishes it on GitHub. What is the main risk?**

- A. The code will run more slowly
- B. Anyone who finds the key can use it to get into the account
- C. GitHub will charge extra

<details><summary>Answer</summary>

**B.** Leaked keys get found fast. Revoke it at once and keep keys out of code.

</details>

## Go deeper

- [flaws.cloud](http://flaws.cloud): a free walkthrough of common AWS mistakes.
- [AWS Skill Builder](https://skillbuilder.aws): free official cloud training, including the basics.
- [Gitleaks](https://github.com/gitleaks/gitleaks): a tool that finds secrets accidentally saved in code.

---

**Next:** [Lesson 13: AI security](13-ai-security.md)
