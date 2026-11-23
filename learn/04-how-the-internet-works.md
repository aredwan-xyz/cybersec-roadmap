# Lesson 4: How the internet works

> **In one sentence:** The internet is a huge postal system that cuts your data into small labelled envelopes and passes them between computers until they reach the right address.

**Time:** about 15 minutes · **You need:** a browser

## The big idea

Picture posting a long letter where each envelope can hold only one page. You number the pages, address every envelope, and post them. They may travel different routes, and the receiver puts the pages back in order.

That is close to how the internet moves data. Every device on it has an **IP address**, a number that works like a postal address, such as `93.184.215.14`. **IP** stands for Internet Protocol: a **protocol** is simply an agreed set of rules for how computers talk.

Your data is cut into small pieces called **packets**. Each carries the sender's address, the destination address and a slice of the content. **Routers**, the internet's sorting offices, read each address and pass the packet one step closer.

At the other end is usually a **server**. A server is just a computer whose job is to answer requests: send a web page, store your photos, deliver your email. It often sits in a large building full of others, called a data centre.

## How it works

Here is what happens when you type `example.com` into your browser:

1. **DNS lookup.** The **Domain Name System (DNS)** is the internet's address book. Your device asks a DNS server, "What is the IP address for example.com?" and gets a number back.
2. **Connection.** Your browser contacts that IP address on a **port**. If the IP address is the building, the port is the flat number: which service inside should answer. Web traffic normally uses port 443 for HTTPS and port 80 for plain HTTP.
3. **Request and reply.** Your browser asks for the page using **HTTP**, the rules for requesting and sending web pages. The server sends it back in packets, and your browser reassembles it.

**HTTP versus HTTPS** is the part that matters most for your safety:

| | HTTP | HTTPS |
|---|---|---|
| Like sending | A postcard | A sealed, tamper-proof envelope |
| Who can read it on the way | Anyone handling it, such as others on the same Wi-Fi | Only you and the website |
| Proves the site is who it says | No | Yes, using a digital certificate |

The S stands for secure. HTTPS uses **encryption**, which scrambles data so only the intended receiver can read it.

One warning: the padlock means your connection is private. It does **not** mean the site is honest. Scam sites use HTTPS too, so keep checking the address.

## In real life

You open your bank's website on a café's free Wi-Fi. Others on the same network may be able to see some of your traffic, like postcards in a shared mailroom.

Because the bank uses HTTPS, they can see roughly which website you are visiting, but not your password, balance or the pages you view. Over plain HTTP, all of that would be readable. Most major sites now use HTTPS, and browsers warn you when a page does not.

## Try it

1. Click the icon to the left of a web address in your browser. View the certificate, and see who issued it and to which site.
2. Read the free comic [How DNS works](https://howdns.works) to see a DNS lookup step by step.
3. Search "what is my IP address" in your browser. The number shown is the public address your home or phone network uses on the internet.

## Key words

- **IP address**: a number that identifies a device on a network, like a postal address.
- **Packet**: a small piece of data with addresses attached, sent across a network.
- **DNS**: the system that turns names like example.com into IP addresses.
- **Port**: a number that says which service on a computer should receive the data.
- **Server**: a computer that answers requests from other computers.
- **HTTPS**: the encrypted, verified version of HTTP, the rules for web pages.

## Check yourself

**1. What does DNS do?**

- A. Encrypts your web traffic
- B. Turns website names into IP addresses
- C. Blocks dangerous websites

<details><summary>Answer</summary>

**B.** DNS looks up the number a computer needs from the name a person types.

</details>

**2. A website shows a padlock and uses HTTPS. What does that tell you?**

- A. Your connection to that site is encrypted
- B. The site is run by an honest company
- C. The site cannot contain scams

<details><summary>Answer</summary>

**A.** HTTPS protects the connection, not the content. Criminals can and do set up scam sites with HTTPS.

</details>

**3. If an IP address is like the address of a building, what is a port like?**

- A. The postcode
- B. The road leading to it
- C. The flat number inside the building

<details><summary>Answer</summary>

**C.** One computer can run many services. The port says which one should receive the data.

</details>

## Go deeper

- [Cloudflare Learning Center: What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/): a clear illustrated explanation.
- [Cloudflare Learning Center: What is HTTPS?](https://www.cloudflare.com/learning/ssl/what-is-https/): how HTTPS and encryption protect web traffic.
- [How DNS works (comic)](https://howdns.works): a short, friendly visual explainer.

---

**Next:** [Lesson 5: Networks and how they are defended](05-networks-and-firewalls.md)
