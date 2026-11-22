# Cheatsheet: Linux

Paste any command into https://explainshell.com to see what each part does.

## Finding your way

| Command | Does |
|---|---|
| `pwd`, `ls -la`, `cd` | Where am I, what is here (including hidden files), move |
| `find / -name "*.conf" 2>/dev/null` | Find files by name, hiding permission errors |
| `grep -rn "password" .` | Search file contents recursively, with line numbers |
| `less file`, `head -n 20`, `tail -f log` | Read, first lines, follow a log live |
| `file x`, `stat x` | What kind of file, and its metadata |
| `man cmd`, `cmd --help` | Documentation |

## Text processing

| Command | Does |
|---|---|
| `cut -d: -f1 /etc/passwd` | Take one field |
| `sort \| uniq -c \| sort -rn` | Count and rank occurrences |
| `awk '{print $1}'` | Print a column |
| `sed 's/old/new/g'` | Replace text |
| `wc -l` | Count lines |
| `cmd > out 2>&1` | Send output and errors to a file |

## Users and permissions

| Command | Does |
|---|---|
| `id`, `whoami`, `groups` | Who am I and what groups |
| `sudo -l` | What may I run as root |
| `chmod 640 f`, `chown user:group f` | Change permissions and ownership |
| `ls -l` | Read permissions: owner, group, others (r=4, w=2, x=1) |
| `find / -perm -4000 2>/dev/null` | List setuid binaries |

## Processes and services

| Command | Does |
|---|---|
| `ps aux`, `top` | Running processes |
| `kill PID`, `kill -9 PID` | Stop a process, force stop |
| `systemctl status name` | Service state |
| `journalctl -u name -f` | Service logs, live |
| `crontab -l`, `ls /etc/cron*` | Scheduled jobs |

## Network

| Command | Does |
|---|---|
| `ip a`, `ip r` | Addresses and routes |
| `ss -tulpn` | Listening ports and the process behind each |
| `curl -I https://site` | Fetch response headers |
| `dig name`, `dig -x ip` | DNS lookup and reverse lookup |
| `ssh user@host`, `scp f user@host:path` | Remote shell and copy |

## System information

| Command | Does |
|---|---|
| `uname -a`, `cat /etc/os-release` | Kernel and distribution |
| `df -h`, `du -sh *` | Disk space and folder sizes |
| `env`, `history` | Environment variables and command history |

## Where things live

- `/etc`: configuration. `/etc/passwd` users, `/etc/shadow` password hashes (root only)
- `/var/log`: logs. `auth.log` or `secure` for sign-ins
- `/home`, `/root`: user files
- `/tmp`: world-writable temporary space
- `~/.ssh`: SSH keys and `authorized_keys`
