# Lesson 5: Networks and how they are defended

> **In one sentence:** Defending a network means locking its front door to the internet, checking what comes through, and keeping its rooms separate.

**Time:** about 15 minutes · **You need:** a browser

## The big idea

A **network** is a group of devices that can talk to each other. Your home network is probably your phone, laptop, TV and maybe a smart speaker or doorbell, all connected through one box: your **router**.

Think of your home network as a block of flats. The router is the front door and reception desk. Everything going out to the internet, and coming back in, passes through it. It also gives each device a local address, like a flat number, and tracks which reply belongs to which flat.

Because every connection passes through it, the router is the most important device in your home to secure. Whoever controls it may be able to watch or redirect your traffic.

Company networks are bigger, but the ideas are the same: control the doors, check who passes through, and do not let one break-in open every room. The tools below do exactly that.

## How it works

- **Secure the router.** Change its admin password if it is a well-known default. Turn on automatic updates for its **firmware**, the software built into a device. Replace routers the maker no longer updates.
- **Wi-Fi security.** Use **WPA3**, or WPA2 if your devices lack WPA3. Both encrypt the radio signal between your devices and the router. Use a long Wi-Fi password, and never the outdated WEP setting.
- **Firewalls.** A **firewall** allows or blocks traffic based on rules. Your router blocks most unrequested connections from the internet, and your computer has its own firewall. Keep both on.
- **Segmentation.** This means splitting a network into separate zones so a problem in one cannot easily spread. At home, a **guest network** does this: put visitors and smart gadgets on it so they cannot reach your laptop. Companies separate payment systems, staff laptops and servers in the same way.

**VPNs.** A **Virtual Private Network** creates an encrypted tunnel between your device and a VPN server, and your traffic goes out to the internet from there. Companies use VPNs so staff can reach internal systems safely. For individuals, it is often oversold. A VPN does **not**:

- make you anonymous; the VPN company can see where your traffic goes, so you are shifting trust to them
- stop phishing, scam sites or malware
- protect weak or reused passwords
- add much to sites already using HTTPS, beyond hiding which sites you visit from the local network

## In real life

In 2016 malware called Mirai infected hundreds of thousands of devices, such as home routers and security cameras. It used no clever trick. It simply tried a short list of common factory usernames and passwords.

In October 2016, devices infected with Mirai flooded the DNS company Dyn with traffic. Because Dyn answered DNS lookups for many big websites, Twitter, Netflix, Reddit and others were hard to reach for hours. Default passwords on small gadgets helped knock large services offline.

## Try it

1. Find your router's model on its label, then check the maker's support page to see if it still gets updates.
2. In your router's app or admin page, check that Wi-Fi uses WPA2 or WPA3. Only change settings on a router you own or manage.
3. Check your computer's built-in firewall is on: Windows Security on Windows, or System Settings, Network on a Mac.

## Key words

- **Router**: the box connecting your home network to the internet.
- **Firmware**: the software built into a device like a router or camera.
- **WPA3**: the current standard for encrypting Wi-Fi; WPA2 is the older one.
- **Firewall**: a gatekeeper that allows or blocks network traffic based on rules.
- **VPN**: an encrypted tunnel carrying your traffic to another server first.
- **Segmentation**: splitting a network into separate zones to limit how far a problem can spread.

## Check yourself

**1. Which of these does a VPN actually do?**

- A. Makes you anonymous online
- B. Stops phishing emails
- C. Encrypts traffic between your device and the VPN server

<details><summary>Answer</summary>

**C.** A VPN protects the path to its server. It does not stop scams, and the provider can see where your traffic goes.

</details>

**2. Why put smart gadgets like cameras on a guest network?**

- A. It makes them faster
- B. If one is hacked, it cannot easily reach your laptop or phone
- C. Guest networks do not need a password

<details><summary>Answer</summary>

**B.** This is segmentation: it limits the damage if one device is broken into.

</details>

**3. What made the Mirai malware able to spread so widely?**

- A. Many devices still used factory default passwords
- B. It broke WPA3 encryption
- C. People installed it from an app store

<details><summary>Answer</summary>

**A.** Mirai tried common default logins. Changing them would have stopped it.

</details>

## Go deeper

- [Cloudflare Learning Center: What is a firewall?](https://www.cloudflare.com/learning/security/what-is-a-firewall/): how firewalls decide what to let through.
- [Cloudflare Learning Center: What is a VPN?](https://www.cloudflare.com/learning/access-management/what-is-a-vpn/): how VPNs work and what they are for.
- [CISA: Home Network Security](https://www.cisa.gov/news-events/news/home-network-security): official advice on securing routers and home devices.

---

**Next:** [Lesson 6: Computers, Linux and Windows](06-computers-linux-windows.md)
