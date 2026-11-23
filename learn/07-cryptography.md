# Lesson 7: Cryptography without the math

> **In one sentence:** Cryptography is the set of tools that keeps information secret, shows whether it was changed, and proves who sent it.

**Time:** about 15 minutes · **You need:** a browser

## The big idea

Imagine passing a note across a classroom. Anyone in between can read it, change it, or fake one in your name. The internet is that classroom, with billions of hands. **Cryptography** is the science of protecting information so only the right people can read it and tampering shows.

Its main tool is **encryption**: scrambling a readable message into gibberish using a **key**, a secret value. Only someone with the right key can turn it back (**decryption**).

The methods are public, and experts worldwide try to break them; the secret lives only in the key. A method that has survived years of public attack is far more trustworthy than a secret homemade one.

Cryptography gives you three things. **Confidentiality**: outsiders cannot read it. **Integrity**: you can tell if it was changed. **Authenticity**: you can tell who really sent it.

## How it works

**Symmetric encryption** uses one key to lock and unlock. Picture a padlocked box where you and a friend each hold a copy of the same key. It is fast, so it protects most data. The problem: how do you get the key to your friend safely?

**Public-key encryption** (also called asymmetric) solves that with a pair of keys. Picture a mailbox with a slot. Your **public key** is the slot: anyone can drop a letter in. Your **private key** opens the box, and only you have it. Websites use public-key methods to agree on a fresh symmetric key, then switch to fast symmetric encryption.

**Hashing** is one-way. A **hash function** turns any input into a short, fixed-length fingerprint. The same input always gives the same fingerprint, a tiny change gives a completely different one, and you cannot run it backwards. Good websites store a hash of your password, not the password. If the database is stolen, attackers get fingerprints, not passwords. Sites should use deliberately slow password hashes with a random **salt** added, to make guessing expensive.

A **digital signature** runs the mailbox in reverse: you sign with your private key, and anyone can check it with your public key. It proves who signed and that nothing changed.

A **certificate** is a signed ID card for a website. A trusted **certificate authority** checks that the requester controls the web address, then signs a statement: "this public key belongs to example.com".

**The HTTPS padlock** means your connection is encrypted and the site holds a valid certificate for that address. It does not mean the site is honest. Scam sites can have padlocks too.

## In real life

In April 2014, researchers disclosed **Heartbleed**, a bug in OpenSSL, free software that many websites used for HTTPS. A coding mistake let anyone ask a server for a little data and receive extra chunks of its memory, which could contain passwords and even the server's private key. The encryption itself was never broken; the code around it was. Site owners had to update, replace certificates and often reset passwords. Strong cryptography still depends on careful software and fast patching.

## Try it

1. Open [CyberChef](https://gchq.github.io/CyberChef/), a free tool from the UK's GCHQ. Drag the "SHA2" operation into the Recipe. Type `hello` in the Input box and look at the output. Now change it to `Hello`. One capital letter, and the whole fingerprint changes.
2. On a website you use, click the padlock or site-settings icon to the left of the address bar and find the certificate details. Who issued it?

## Key words

- **Encryption**: scrambling information so only someone with the key can read it.
- **Symmetric encryption**: one shared key both locks and unlocks.
- **Public-key encryption**: a public key locks and a matching private key unlocks.
- **Hash**: a one-way fingerprint of data that cannot be turned back into the original.
- **Digital signature**: proof of who signed something and that it was not changed.
- **Certificate**: a signed document linking a website's address to its public key.

## Check yourself

**1. In the mailbox analogy, which key can you safely share with everyone?**

- A. The private key
- B. The public key
- C. Both keys

<details><summary>Answer</summary>

**B.** The public key is the slot. Only your private key opens the box.

</details>

**2. Why do well-run websites store password hashes instead of the passwords themselves?**

- A. Hashes take up less space
- B. Hashes can be decrypted quickly when needed
- C. If the database is stolen, attackers get fingerprints, not the actual passwords

<details><summary>Answer</summary>

**C.** Hashing is one-way, so the site can check your password without keeping a copy.

</details>

**3. What does the HTTPS padlock tell you?**

- A. The connection is encrypted and the site holds a valid certificate for that address
- B. The site is safe and honest
- C. A government has approved the site

<details><summary>Answer</summary>

**A.** The padlock is about the connection, not the people behind the site.

</details>

## Go deeper

- [Cloudflare: What is encryption?](https://www.cloudflare.com/learning/ssl/what-is-encryption/): a clear, illustrated overview.
- [Cloudflare: What is HTTPS?](https://www.cloudflare.com/learning/ssl/what-is-https/): what happens behind the padlock.
- [CryptoHack](https://cryptohack.org): free, game-like challenges when you are ready for some of the math.

---

**Next:** [Lesson 8: Malware and ransomware](08-malware-and-ransomware.md)
