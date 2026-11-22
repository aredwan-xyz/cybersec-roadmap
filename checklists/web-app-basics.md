# Checklist: web application security basics

A first pass for applications you build. For depth, use the OWASP ASVS and the OWASP Cheat Sheet Series (linked in [resources.md](../resources.md)).

## Authentication

- [ ] Passwords hashed with a slow, salted algorithm (Argon2, bcrypt or scrypt)
- [ ] Multi-factor authentication available, required for administrators
- [ ] Rate limiting and lockout on sign-in, sign-up and password reset
- [ ] Password reset tokens are single-use, short-lived and not guessable

## Sessions and tokens

- [ ] Cookies set with `Secure`, `HttpOnly` and `SameSite`
- [ ] Sessions expire and are invalidated on sign-out and password change
- [ ] Tokens are validated on the server for signature, expiry and audience

## Access control

- [ ] Every request is authorized on the server, per object, not only per page
- [ ] Changing an ID in a request cannot reach another user's data
- [ ] Administrative functions are checked server-side
- [ ] Default is deny

## Input and output

- [ ] Database access uses parameterized queries
- [ ] Output is encoded for its context (HTML, attribute, JavaScript, URL)
- [ ] A Content Security Policy is set
- [ ] File uploads are checked for type and size, stored outside the web root, and renamed
- [ ] Server-side requests to user-supplied URLs are restricted (SSRF)

## State-changing requests

- [ ] CSRF protection on state-changing requests
- [ ] CORS allows only the origins that need it

## Transport and headers

- [ ] HTTPS everywhere, with HSTS
- [ ] Security headers set (`X-Content-Type-Options`, frame restrictions, referrer policy)

## Secrets and configuration

- [ ] No secrets in code, client bundles or git history
- [ ] Debug modes and default credentials are off in production
- [ ] Error messages do not reveal stack traces or internal details

## Dependencies and deployment

- [ ] Dependencies are pinned and scanned
- [ ] The service runs with least privilege
- [ ] Backups exist and a restore has been tested

## Logging

- [ ] Authentication events, access-control failures and administrative actions are logged
- [ ] Logs contain no passwords, tokens or unnecessary personal data
- [ ] Someone is alerted when something unusual happens
