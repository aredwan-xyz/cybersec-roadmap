#!/usr/bin/env node
// Crawls a running copy of the site and reports broken internal links and anchors.
//   node site/check.mjs http://localhost:8790 [base]
const origin = process.argv[2] || 'http://localhost:8790';
const base = process.argv[3] || '';
const seen = new Set();
const queue = [`${base}/`];
const bad = [];
const anchors = [];
const pages = {};

while (queue.length) {
  const p = queue.shift();
  if (seen.has(p)) continue;
  seen.add(p);
  const r = await fetch(origin + p);
  if (!r.ok) { bad.push(`${r.status} ${p}`); continue; }
  if (!(r.headers.get('content-type') || '').includes('html')) continue;
  const html = await r.text();
  pages[p] = html;
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const h = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|\/\/|data:)/.test(h)) continue;
    if (h.startsWith('#')) { if (h.length > 1) anchors.push([p, h]); continue; }
    const url = new URL(h, origin + p);
    if (url.origin !== origin) continue;
    if (url.hash) anchors.push([url.pathname, url.hash]);
    queue.push(url.pathname);
  }
}

const missing = [...new Set(
  anchors
    .filter(([p, h]) => pages[p] && !pages[p].includes(`id="${decodeURIComponent(h.slice(1))}"`))
    .map(([p, h]) => p + h)
)];
console.log(`crawled ${seen.size} urls, ${bad.length} failed, ${missing.length} missing anchors`);
bad.forEach((b) => console.log('  failed', b));
missing.forEach((m) => console.log('  anchor', m));
process.exit(bad.length || missing.length ? 1 : 0);
