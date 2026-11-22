# Cheatsheet: web vulnerabilities

What each one is, how to spot it, and how to fix it. Practise every one in the PortSwigger Web Security Academy labs before looking for it anywhere else, and only test applications you own or are authorized to test.

| Vulnerability | What it is | Signs | Fix |
|---|---|---|---|
| **Broken access control / IDOR** | The server does not check that this user may reach this object | Changing an ID in a URL or request body returns someone else's data | Authorize every request on the server, per object. Default deny |
| **SQL injection** | User input becomes part of a database query | A quote character causes an error or changes results | Parameterized queries. Never build queries by string concatenation |
| **Cross-site scripting (XSS)** | User input is rendered as script in another user's browser | Input reflected or stored without encoding | Encode output for its context. Content Security Policy. Avoid raw HTML insertion |
| **Cross-site request forgery (CSRF)** | Another site makes the user's browser send a state-changing request | State changes work without a per-request token and with cookies alone | CSRF tokens, `SameSite` cookies, re-authentication for sensitive actions |
| **Server-side request forgery (SSRF)** | The server fetches a URL the attacker chooses | Features that take a URL: previews, webhooks, importers | Allowlist destinations. Block internal ranges and cloud metadata addresses |
| **Authentication flaws** | Weak sign-in, reset or session handling | No rate limiting, guessable reset tokens, sessions that never expire | Rate limits, MFA, strong token generation, session expiry |
| **Command injection** | User input reaches a system shell | Features that wrap command-line tools | Avoid the shell. Pass arguments as a list. Validate against an allowlist |
| **Path traversal** | User input chooses a file path | Parameters containing file names | Resolve the path and confirm it stays inside the allowed directory |
| **Insecure file upload** | Uploaded files are executed or served dangerously | Upload accepts any type, files served from the application's origin | Check type and size, rename, store outside the web root, serve from a separate domain |
| **XML external entities (XXE)** | An XML parser loads external entities | XML input accepted, including inside document formats | Disable external entity processing in the parser |
| **Insecure deserialization** | Untrusted data is turned back into objects | Serialized blobs in cookies or parameters | Do not deserialize untrusted data. Use plain data formats with schema validation |
| **Server-side template injection** | User input is evaluated by a template engine | Template syntax in input is evaluated instead of displayed | Never build templates from user input. Use sandboxed rendering |
| **Security misconfiguration** | Defaults, debug modes, verbose errors, open storage | Stack traces, default credentials, directory listings | Hardened configuration, reviewed per environment |
| **Vulnerable components** | Known-vulnerable libraries in use | Old versions in lock files | Pin, scan and update dependencies |
| **Business logic flaws** | The workflow can be used in an unintended order or quantity | Negative quantities, skipped steps, repeated coupons | Enforce every rule on the server; test abuse cases |

## API-specific

- **Broken object-level authorization:** the API equivalent of IDOR and the most common API flaw.
- **Mass assignment:** the client sets fields it should not (`role`, `isAdmin`). Bind only allowed fields.
- **Excessive data exposure:** the API returns whole objects and relies on the client to hide fields. Return only what is needed.
- **Missing rate limits:** enables brute force and scraping.

## A testing routine for your own application

1. Map every endpoint, parameter and role.
2. For each endpoint, repeat requests as a different user and as no user.
3. Send unexpected input to each parameter: quotes, angle brackets, template syntax, very long values, wrong types.
4. Check every feature that takes a URL or a file.
5. Walk each workflow out of order.
6. Record findings with the [findings report template](../templates/findings-report.md).
