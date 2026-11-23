# Lesson 6: Computers, Linux and Windows

> **In one sentence:** The operating system is the manager inside every computer that decides who you are and what you are allowed to do, and security people spend much of their day talking to it.

**Time:** about 15 minutes · **You need:** a browser

## The big idea

Think of a computer as an office building. Someone has to hand out keys and decide who can enter which room. That someone is the **operating system** (OS): the core software that runs the computer and sits between you and the hardware.

The big three are **Windows** (most office laptops), **macOS** (Apple computers) and **Linux** (free and open source, running most web servers and, underneath, every Android phone). They look different, but share the same ideas.

Every OS has **users**: accounts with a name and a password. Each user has **permissions**: rules about which files they can read, change or run. You can open your documents, not someone else's.

One account is special. On Linux and macOS it is called **root**; on Windows the equivalent is an **administrator** account. It holds the master key: it can install software, read any file and change any setting. That is why attackers want it, and why careful people use it only when needed.

## How it works

When you open a file, the OS checks who you are and what the file's permissions allow. On Linux, each file has three sets of permissions: one for its **owner**, one for a **group** of users, and one for everyone else. Each set says whether you can **read** (r), **write** (w) or **execute** (x), which means run it as a program.

You can also talk to the OS by typing into the **command line** (also called the terminal or shell). The computer answers in text. These five commands only look; they change nothing:

```bash
whoami      # which user am I logged in as?
pwd         # which folder am I in?
ls -l       # list the files here, with their permissions
id          # my user number and the groups I belong to
date        # what time does this computer think it is?
```

A line from `ls -l` might start with `-rw-r--r--`. Skip the first character, then read in groups of three: the owner can read and write, the group can read, everyone else can read.

On Linux and macOS, typing `sudo` before a command borrows root's power for that one command. Windows asks "Do you want to allow this app to make changes?" instead.

Why do defenders and attackers both live in the terminal? **Speed**: one line can search thousands of files or logs. **Repeatability**: commands can be saved as scripts and rerun exactly. **Reach**: most servers have no screen at all, only a command line reached over the network. Attackers who break into a server land there too, so defenders who know what normal looks like can spot what is not.

## In real life

A common situation: someone does everyday work while logged in as an administrator and opens an email attachment that turns out to be malicious. Because the account holds the master key, the harmful program can install itself deeply and switch off security settings. In a standard account, the computer would have stopped and asked for an administrator password first, and the attack could have failed right there.

## Try it

1. Open a terminal on your own computer. Mac: the Terminal app. Windows: search for "PowerShell". Type `whoami` and press Enter. On a Mac, try the rest of the box too.
2. Check whether your everyday account is an administrator. Windows: Settings, then Accounts, then Your info. Mac: System Settings, then Users & Groups.
3. Play the first levels of [OverTheWire Bandit](https://overthewire.org/wargames/bandit/), a free game that teaches the Linux command line.

## Key words

- **Operating system (OS)**: the core software that runs a computer.
- **User account**: an identity on a computer, with its own files.
- **Permissions**: rules about who can read, change or run each file.
- **Root / administrator**: the all-powerful account that can change anything.
- **Command line**: a text window where you type commands instead of clicking.
- **sudo**: a Linux and macOS command that runs one command with root's power.

## Check yourself

**1. Which account has the most power on a Linux computer?**

- A. guest
- B. root
- C. user

<details><summary>Answer</summary>

**B.** Root can read any file and change any setting, which is why attackers want it.

</details>

**2. What does the `whoami` command do?**

- A. Shows which user you are logged in as
- B. Deletes your user account
- C. Connects you to another computer

<details><summary>Answer</summary>

**A.** It prints your username and changes nothing.

</details>

**3. Why is it safer to do daily work in a standard account rather than an administrator account?**

- A. Standard accounts make the computer faster
- B. Standard accounts cannot get malware
- C. If something harmful runs, it gets fewer powers to change the system

<details><summary>Answer</summary>

**C.** Malware can still run in a standard account, but with that account's limited permissions it can do much less damage.

</details>

## Go deeper

- [Linux Journey](https://linuxjourney.com): free, friendly lessons on Linux from the very start.
- [OverTheWire Bandit](https://overthewire.org/wargames/bandit/): learn the command line by playing a game.

---

**Next:** [Lesson 7: Cryptography without the math](07-cryptography.md)
