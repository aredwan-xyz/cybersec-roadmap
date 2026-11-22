# Cheatsheet: networking

## The layers

| Layer | Name | Examples | Unit |
|---|---|---|---|
| 7 | Application | HTTP, DNS, SSH, SMTP | Data |
| 4 | Transport | TCP, UDP | Segment |
| 3 | Network | IP, ICMP | Packet |
| 2 | Data link | Ethernet, Wi-Fi, ARP | Frame |
| 1 | Physical | Cable, radio | Bits |

## Common ports

| Port | Service | Port | Service |
|---|---|---|---|
| 20, 21 | FTP | 389, 636 | LDAP, LDAPS |
| 22 | SSH | 443 | HTTPS |
| 23 | Telnet | 445 | SMB |
| 25, 587 | SMTP | 1433 | Microsoft SQL Server |
| 53 | DNS | 3306 | MySQL |
| 67, 68 | DHCP | 3389 | RDP |
| 80 | HTTP | 5432 | PostgreSQL |
| 88 | Kerberos | 6379 | Redis |
| 110, 143 | POP3, IMAP | 8080 | HTTP alternate |
| 123 | NTP | 47808 | BACnet/IP |
| 161 | SNMP | 502 | Modbus TCP |

## Subnetting

| CIDR | Mask | Addresses | Usable hosts |
|---|---|---|---|
| /8 | 255.0.0.0 | 16,777,216 | 16,777,214 |
| /16 | 255.255.0.0 | 65,536 | 65,534 |
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /30 | 255.255.255.252 | 4 | 2 |

Private ranges: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`. Loopback: `127.0.0.0/8`. Link-local: `169.254.0.0/16`.

## TCP in one minute

- Handshake: SYN, SYN-ACK, ACK. Close: FIN, ACK (or RST to abort).
- TCP is reliable and ordered; UDP is neither, and faster.
- A port answering SYN with SYN-ACK is open; with RST it is closed; with silence it is probably filtered.

## What happens when you open a URL

1. DNS resolves the name to an IP address (browser cache, OS cache, resolver, root, TLD, authoritative).
2. ARP finds the gateway's MAC address on the local network.
3. TCP handshake to port 443.
4. TLS handshake: the server proves its identity with a certificate, and both sides agree keys.
5. HTTP request and response, encrypted.
6. The browser fetches further resources and renders.

## DNS record types

`A` IPv4 address, `AAAA` IPv6 address, `CNAME` alias, `MX` mail server, `TXT` text (SPF, verification), `NS` name server, `PTR` reverse lookup, `SOA` zone authority.

## HTTP status codes

`200` OK, `301`/`302` redirect, `400` bad request, `401` not authenticated, `403` not authorized, `404` not found, `429` rate limited, `500` server error, `502`/`503` upstream or availability problem.

## Wireshark display filters

| Filter | Shows |
|---|---|
| `ip.addr == 10.0.0.5` | Traffic to or from a host |
| `tcp.port == 443` | A port |
| `http.request` | HTTP requests |
| `dns` | DNS |
| `tcp.flags.syn == 1 && tcp.flags.ack == 0` | Connection attempts |
| `tls.handshake.type == 1` | TLS Client Hello (shows the server name) |

## Nmap, on your own lab only

| Command | Does |
|---|---|
| `nmap -sn 10.0.0.0/24` | Find live hosts |
| `nmap -sV -sC host` | Service versions and default scripts |
| `nmap -p- host` | All TCP ports |
| `nmap -sU --top-ports 20 host` | Common UDP ports |
| `nmap -oA name host` | Save results in all formats |
