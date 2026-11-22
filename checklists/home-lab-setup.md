# Checklist: home lab setup

## Before you start

- [ ] Check your processor. Apple Silicon and other ARM machines need ARM images; x86-only images (most Windows Server evaluation ISOs) need emulation or a hosted lab
- [ ] At least 16 GB of memory to run several VMs; 50 GB or more of free disk
- [ ] A budget set for any paid platforms or cloud time

## Host

- [ ] Operating system fully updated
- [ ] Disk encryption on
- [ ] A hypervisor installed (VirtualBox, VMware, or UTM on Apple Silicon)

## Virtual machines

- [ ] Kali Linux VM (attacker)
- [ ] Ubuntu VM (target and general Linux practice)
- [ ] A snapshot of each taken when clean
- [ ] Default passwords changed

## Network isolation

- [ ] Vulnerable machines sit on a host-only or internal network, never bridged to your home network
- [ ] The attacker VM can reach the targets; the targets cannot reach the internet unless a lab needs it
- [ ] Nothing in the lab is reachable from the internet

## Accounts

- [ ] TryHackMe, Hack The Box Academy, PortSwigger Web Security Academy
- [ ] Separate email alias and unique passwords for lab accounts
- [ ] A cloud free-tier account, with a billing alert set before anything else

## Tools

- [ ] Burp Suite Community, Wireshark, Nmap
- [ ] Python environment with a virtual environment per project
- [ ] git, with a secrets scanner as a pre-commit check

## For AI security labs

- [ ] A separate API key for lab work, with a low spend cap
- [ ] Synthetic data set prepared (fake users, fake secrets, fake documents)
- [ ] Lab apps bind to `localhost` only

## Later, for Active Directory

- [ ] One domain controller and one workstation, on x86 hardware or a hosted lab
- [ ] A SIEM (Wazuh or Elastic) collecting logs from both

## Habits

- [ ] Notes repo created
- [ ] Snapshot before each risky change; revert after each lab
- [ ] Lab machines shut down when not in use
