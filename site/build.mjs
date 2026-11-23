#!/usr/bin/env node
// Builds the learning site from the repository's Markdown files.
// The Markdown stays the single source of truth; this script only presents it.
//
//   node site/build.mjs                 -> _site/ for https://aredwan-xyz.github.io/cybersec-roadmap/
//   BASE= node site/build.mjs           -> _site/ served from the domain root (local preview)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const OUT = path.resolve(process.env.OUT || path.join(ROOT, '_site'));
const BASE = (process.env.BASE ?? '/cybersec-roadmap').replace(/\/+$/, '');
const REPO = 'https://github.com/aredwan-xyz/cybersec-roadmap';
const SITE_URL = 'https://aredwan-xyz.github.io/cybersec-roadmap';
const SITE_NAME = 'Cyber Roadmap';
const TAGLINE = 'Learn cybersecurity from zero, in plain English. Free, open source, and honest about what it takes.';
const VERSION = Date.now().toString(36);

// ---------------------------------------------------------------- helpers

const read = (p) =>
  fs.readFileSync(path.join(ROOT, p), 'utf8').replace(/\r/g, '').replace(/^---\n(?:[\s\S]*?\n)?---\n/, '');
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const u = (p) => BASE + p;
const stripTags = (s) => s.replace(/<[^>]+>/g, '');
const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const slugify = (html) =>
  decode(stripTags(html))
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .trim()
    .replace(/\s/g, '-');
const plain = (md) =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>|]/g, ' ')
    .replace(/-{3,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
const write = (rel, content) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const host = (href) => {
  try { return new URL(href).hostname.replace(/^www\./, ''); } catch { return ''; }
};
const cap = (s) => s.replace(/^[a-z]/, (c) => c.toUpperCase());
const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

// ---------------------------------------------------------------- page registry

const PLAN_SRC = 'ai-security-90-days/README.md';

// [source, url, nav title, nav group, kind]
const DOCS = [
  ['ROADMAP.md', '/roadmap/', 'Beginner-to-expert roadmap', 'Learn', 'roadmap'],
  ['market/focus-2026.md', '/market/', 'What employers want', 'Learn', 'doc'],
  ['labs/README.md', '/labs/', 'All labs', 'Labs', 'index'],
  ['labs/01-summarizer-injection/README.md', '/labs/01-summarizer-injection/', '01 · Summarizer injection', 'Labs', 'lab'],
  ['labs/02-rag-access-control/README.md', '/labs/02-rag-access-control/', '02 · RAG access control', 'Labs', 'lab'],
  ['labs/03-agent-exfiltration/README.md', '/labs/03-agent-exfiltration/', '03 · Agent exfiltration', 'Labs', 'lab'],
  ['checklists/README.md', '/checklists/', 'All checklists', 'Checklists', 'index'],
  ['checklists/personal-security.md', '/checklists/personal-security/', 'Personal security checkup', 'Checklists', 'checklist'],
  ['checklists/llm-app-security-review.md', '/checklists/llm-app-security-review/', 'LLM app review', 'Checklists', 'checklist'],
  ['checklists/agent-and-tool-security.md', '/checklists/agent-and-tool-security/', 'Agent and tool security', 'Checklists', 'checklist'],
  ['checklists/ai-supply-chain.md', '/checklists/ai-supply-chain/', 'AI supply chain', 'Checklists', 'checklist'],
  ['checklists/web-app-basics.md', '/checklists/web-app-basics/', 'Web app basics', 'Checklists', 'checklist'],
  ['checklists/home-lab-setup.md', '/checklists/home-lab-setup/', 'Home lab setup', 'Checklists', 'checklist'],
  ['templates/README.md', '/templates/', 'All templates', 'Templates', 'index'],
  ['templates/threat-model.md', '/templates/threat-model/', 'Threat model', 'Templates', 'template'],
  ['templates/findings-report.md', '/templates/findings-report/', 'Findings report', 'Templates', 'template'],
  ['templates/ai-security-assessment.md', '/templates/ai-security-assessment/', 'AI security assessment', 'Templates', 'template'],
  ['templates/lab-writeup.md', '/templates/lab-writeup/', 'Lab write-up', 'Templates', 'template'],
  ['templates/scope-and-authorization.md', '/templates/scope-and-authorization/', 'Scope and authorization', 'Templates', 'template'],
  ['templates/job-posting-review.md', '/templates/job-posting-review/', 'Job posting review', 'Templates', 'template'],
  ['templates/weekly-review.md', '/templates/weekly-review/', 'Weekly review', 'Templates', 'template'],
  ['cheatsheets/README.md', '/cheatsheets/', 'All cheatsheets', 'Cheatsheets', 'index'],
  ['cheatsheets/llm-attack-patterns.md', '/cheatsheets/llm-attack-patterns/', 'LLM attack patterns', 'Cheatsheets', 'doc'],
  ['cheatsheets/web-vulnerabilities.md', '/cheatsheets/web-vulnerabilities/', 'Web vulnerabilities', 'Cheatsheets', 'doc'],
  ['cheatsheets/networking.md', '/cheatsheets/networking/', 'Networking', 'Cheatsheets', 'doc'],
  ['cheatsheets/linux.md', '/cheatsheets/linux/', 'Linux', 'Cheatsheets', 'doc'],
  ['docs/limitations.md', '/limits/', 'Limits of this roadmap', 'About', 'doc'],
  ['SECURITY.md', '/security/', 'Security and scope', 'About', 'doc'],
  ['CONTRIBUTING.md', '/contributing/', 'Contributing', 'About', 'doc'],
  ['CODE_OF_CONDUCT.md', '/code-of-conduct/', 'Code of conduct', 'About', 'doc'],
  ['LICENSE.md', '/license/', 'License', 'About', 'doc'],
].map(([src, url, nav, group, kind]) => ({ src, url, nav, group, kind }));

// The beginner course: learn/NN-slug.md, in number order. Whatever files exist are built.
const LESSONS = fs
  .readdirSync(path.join(ROOT, 'learn'))
  .filter((f) => /^\d\d-.+\.md$/.test(f))
  .sort()
  .map((f) => {
    const src = `learn/${f}`;
    const slug = f.replace(/^\d\d-/, '').replace(/\.md$/, '');
    const h1 = (/^#\s+(.+)$/m.exec(read(src)) || [])[1] || slug;
    const hm = /^Lesson (\d+):\s*(.+)$/.exec(h1.trim());
    return { src, slug, n: hm ? +hm[1] : +f.slice(0, 2), title: hm ? hm[2] : h1, url: `/learn/${slug}/` };
  });
const PARTS = [
  { name: 'Stay safe', blurb: 'Protect your own accounts and devices. Useful for everyone, today.', from: 1, to: 3 },
  { name: 'How it all works', blurb: 'The internet, networks, computers and the math of secrets, in plain words.', from: 4, to: 7 },
  { name: 'Attack and defense', blurb: 'How attackers get in, and how defenders find and stop them.', from: 8, to: 11 },
  { name: 'Where it is going', blurb: 'Cloud, AI, and how to turn this into a job.', from: 12, to: 14 },
];
const partOf = (n) => PARTS.findIndex((p) => n >= p.from && n <= p.to);

const SRC_TO_URL = new Map([
  ['README.md', '/'],
  [PLAN_SRC, '/plan/'],
  ['resources.md', '/resources/'],
  ['PROGRESS.md', '/progress/'],
  ['learn/README.md', '/learn/'],
  ['learn/glossary.md', '/glossary/'],
  ...LESSONS.map((l) => [l.src, l.url]),
  ...DOCS.map((d) => [d.src, d.url]),
]);

const PAGE_TITLES = {
  'README.md': 'the home page',
  'learn/README.md': 'the beginner course',
  'learn/glossary.md': 'the glossary',
  [PLAN_SRC]: 'the 90-day plan',
  'resources.md': 'the resource library',
  'PROGRESS.md': 'the progress tracker',
  'ROADMAP.md': 'the roadmap',
  'docs/limitations.md': 'the limits page',
  'SECURITY.md': 'security and scope',
  'CONTRIBUTING.md': 'contributing',
  'LICENSE.md': 'the license',
};

function resolveHref(href, fromSrc) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) return { href, external: /^https?:|^\/\//.test(href) };
  if (href.startsWith('#')) return { href };
  const [p, hash] = href.split('#');
  const target = path.posix.normalize(path.posix.join(path.posix.dirname(fromSrc), p)).replace(/\/$/, '');
  for (const c of [target, `${target}/README.md`]) {
    if (SRC_TO_URL.has(c)) return { href: u(SRC_TO_URL.get(c)) + (hash ? `#${hash}` : '') };
  }
  const full = path.join(ROOT, target);
  const isDir = fs.existsSync(full) && fs.statSync(full).isDirectory();
  return { href: `${REPO}/${isDir ? 'tree' : 'blob'}/main/${target}${hash ? `#${hash}` : ''}`, external: true };
}

// ---------------------------------------------------------------- markdown

const ALLOWED_HTML = /^<\/?(br|p|a|img|details|summary|sub|sup|kbd|b|i|em|strong|code|span|div)\b/i;

function makeMarked(src, ctx = {}) {
  ctx.toc ??= [];
  ctx.tasks ??= 0;
  const used = new Map();
  const m = new Marked({ gfm: true });
  m.use({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        let id = slugify(inner);
        const n = used.get(id) || 0;
        used.set(id, n + 1);
        if (n) id += `-${n}`;
        if (depth === 2 || depth === 3) ctx.toc.push({ depth, id, text: decode(stripTags(inner)) });
        return `<h${depth} id="${id}">${inner}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        let inner = this.parser.parseInline(tokens);
        const r = resolveHref(href, src);
        if (/^[\w./-]+\.md$/.test(decode(stripTags(inner))) && !r.external) {
          const target = [...SRC_TO_URL.entries()].find(([, url]) => r.href.split('#')[0] === u(url));
          if (target) inner = esc(PAGE_TITLES[target[0]] || inner);
        }
        const t = title ? ` title="${esc(title)}"` : '';
        const ext = r.external ? ' target="_blank" rel="noopener" class="ext"' : '';
        return `<a href="${esc(r.href)}"${t}${ext}>${inner}</a>`;
      },
      checkbox({ checked }) {
        const i = ctx.tasks++;
        return `<input type="checkbox" class="task" data-i="${i}"${checked ? ' checked' : ''} aria-label="Mark done"> `;
      },
      code({ text, lang }) {
        return `<div class="code"><button class="copy" type="button" data-copy>Copy</button><pre><code${lang ? ` data-lang="${esc(lang)}"` : ''}>${esc(text)}</code></pre></div>\n`;
      },
      html({ text }) {
        return ALLOWED_HTML.test(text.trim()) ? text : esc(text);
      },
    },
  });
  return m;
}

const wrapTables = (html) =>
  html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');

function takeH1(md) {
  const m = /^#\s+(.+)\n/m.exec(md);
  if (!m) return { h1: '', rest: md };
  return { h1: m[1].trim(), rest: md.slice(0, m.index) + md.slice(m.index + m[0].length) };
}

// ---------------------------------------------------------------- icons

const I = {
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true" class="i-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg viewBox="0 0 24 24" aria-hidden="true" class="i-moon"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
  github: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 19.5 5v6.2c0 4.6-3.1 8.6-7.5 10.3-4.4-1.7-7.5-5.7-7.5-10.3V5z"/><path d="m8.8 12 2.2 2.2 4.4-4.4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  send: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>',
  flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 22V3M5 4h12l-2 4 2 4H5"/></svg>',
  link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>',
  lab: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3"/><path d="M7 15h10"/></svg>',
  list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 6 1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M11 6h9M11 12h9M11 18h9"/></svg>',
  doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  zap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h5"/></svg>',
  map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
};

// ---------------------------------------------------------------- content parsing

const resourcesMd = read('resources.md');

function parseResources() {
  const items = [];
  let section = '';
  let sub = '';
  for (const line of resourcesMd.split('\n')) {
    const h2 = /^## (.+)$/.exec(line);
    const h3 = /^### (.+)$/.exec(line);
    if (h2) { section = h2[1]; sub = ''; continue; }
    if (h3) { sub = h3[1]; continue; }
    const it = /^- \[([^\]]+)\]\(([^)\s]+)\)\s*:?\s*(.*)$/.exec(line);
    if (it && /^https?:/.test(it[2])) items.push({ title: it[1], url: it[2], desc: (it[3] || '').replace(/^,\s*/, ''), section, sub });
  }
  return items;
}
const RESOURCES = parseResources();
const RESOURCE_COUNT = new Set([...resourcesMd.matchAll(/\]\((https?:[^)\s]+)\)/g)].map((x) => x[1])).size;

// ----- glossary: "- **Term (long form)**: definition." under letter headings
const GLOSSARY_SRC = 'learn/glossary.md';
const glossaryMd = fs.existsSync(path.join(ROOT, GLOSSARY_SRC)) ? read(GLOSSARY_SRC) : '# Glossary\n';
const GLOSSARY = [...glossaryMd.matchAll(/^- \*\*(.+?)\*\*:?\s*:?\s*(.+)$/gm)].map(([, term, def]) => {
  const t = term.replace(/:$/, '').trim();
  const pm = /^(.+?)\s*\((.+)\)$/.exec(t);
  const names = pm ? [pm[1], pm[2]] : [t];
  return { term: t, def: def.trim(), id: slugify(names[0]), names: names.map((x) => x.trim()).filter((x) => x.length >= 2) };
});

// Wraps the first use of each glossary term in a page with a plain-English definition.
const SKIP_TAGS = /^<(\/?)(a|h[1-6]|code|pre|button|dfn|summary|label|script)\b/i;
// Everyday words whose ordinary meaning is more common than the security one ("log in", "a secret").
const NO_AUTO = new Set(['Log', 'Secret', 'Bucket', 'Scope', 'Prompt', 'Token', 'Cookie', 'Port', 'Network', 'Backup']);
function addTerms(html, max = 18, state = { used: new Set(), count: 0 }) {
  const { used } = state;
  const matchers = GLOSSARY.filter((g) => !NO_AUTO.has(g.term)).flatMap((g) =>
    g.names.map((name) => ({
      g,
      re: new RegExp(`(?<![\\w-])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:e?s)?(?![\\w-])`, /^[A-Z0-9&-]{2,}s?$/.test(name) ? '' : 'i'),
      len: name.length,
    }))
  ).sort((a, b) => b.len - a.len);
  let depth = 0;
  let count = 0;
  const out = html
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (part.startsWith('<')) {
        const t = SKIP_TAGS.exec(part);
        if (t && !part.endsWith('/>')) depth += t[1] ? -1 : 1;
        return part;
      }
      if (depth > 0 || count >= max || !part.trim()) return part;
      let out = '';
      let rest = part;
      for (;;) {
        let best = null;
        for (const mt of matchers) {
          if (used.has(mt.g.id)) continue;
          const m = mt.re.exec(rest);
          if (m && (!best || m.index < best.m.index)) best = { m, mt };
        }
        if (!best || count >= max) break;
        used.add(best.mt.g.id);
        count++;
        const { m } = best;
        out += rest.slice(0, m.index) + `<dfn class="gl" tabindex="0" data-def="${esc(cap(plain(best.mt.g.def)))}">${m[0]}</dfn>`;
        rest = rest.slice(m.index + m[0].length);
      }
      return out + rest;
    })
    .join('');
  state.count += count;
  return out;
}

// Which resource names appear in the resources.md week table, by week.
function parseWeekTable() {
  const map = {};
  const start = resourcesMd.indexOf('### Which AI resources go with which week');
  const block = resourcesMd.slice(start).split('\n## ')[0];
  for (const line of block.split('\n')) {
    const row = /^\|\s*(\d+)(?:[–-](\d+))?\s*\|\s*(.+?)\s*\|$/.exec(line);
    if (!row) continue;
    const a = +row[1];
    const b = row[2] ? +row[2] : a;
    for (let w = a; w <= b; w++) map[w] = (map[w] || '') + ' ' + row[3];
  }
  return map;
}
const WEEK_TABLE = parseWeekTable();

// Short names the plan uses for resources whose full titles are longer.
const ALIASES = {
  'PortSwigger Web Security Academy': ['PortSwigger Academy', 'PortSwigger Web Security Academy'],
  'OWASP Top 10 for LLM Applications': ['OWASP LLM Top 10', 'OWASP Top 10 for LLM'],
  'PortSwigger: Web LLM attacks': ['Web LLM attacks'],
  'Gandalf by Lakera': ['Gandalf'],
  'Simon Willison: prompt injection': ['Simon Willison'],
  'Simon Willison: the lethal trifecta': ['lethal trifecta'],
  'Embrace The Red': ['Embrace The Red'],
  'OWASP GenAI Security Project': ['OWASP GenAI agentic', "OWASP's agentic"],
  'Model Context Protocol documentation': ['MCP documentation', 'MCP specification'],
  'Damn Vulnerable LLM Agent': ['Damn Vulnerable LLM Agent'],
  'CaMeL: Defeating Prompt Injections by Design (paper)': ['CaMeL'],
  'Microsoft AI Red Team': ['Microsoft AI Red Team guidance'],
  'Microsoft AI Red Teaming Playground Labs': ['Microsoft playground labs'],
  'promptfoo red teaming': ['promptfoo'],
  'Google Secure AI Framework (SAIF)': ['SAIF'],
  'NIST AI Risk Management Framework': ['NIST AI RMF', 'NIST AI Risk Management Framework'],
  'NIST AI 600-1: Generative AI Profile (PDF)': ['NIST AI 600-1'],
};

function resourcesForWeek(n, weekText) {
  const hay = `${WEEK_TABLE[n] || ''} ${weekText}`.toLowerCase();
  const seen = new Set();
  const out = [];
  for (const r of RESOURCES) {
    if (seen.has(r.url)) continue;
    const names = [r.title, ...(ALIASES[r.title] || [])].filter((x) => x.length >= 4);
    if (names.some((x) => hay.includes(x.toLowerCase()))) {
      seen.add(r.url);
      out.push(r);
    }
  }
  return out;
}

function parsePlan() {
  const md = read(PLAN_SRC);
  const sections = [];
  let cur = { title: null, lines: [] };
  for (const l of md.split('\n')) {
    const h = /^## (.+)$/.exec(l);
    if (h) { sections.push(cur); cur = { title: h[1], lines: [] }; } else cur.lines.push(l);
  }
  sections.push(cur);
  const intro = sections.shift();
  const phases = [];
  const other = [];
  for (const s of sections) {
    const pm = /^Phase (\d+): (.+?) \(weeks (\d+)[–-](\d+)\)$/.exec(s.title);
    if (!pm) { other.push({ title: s.title, body: s.lines.join('\n').replace(/^---$/gm, '').trim() }); continue; }
    const phase = { n: +pm[1], name: pm[2], from: +pm[3], to: +pm[4], title: s.title, weeks: [], checkpoint: '' };
    let wk = null;
    for (const l of s.lines) {
      const w = /^### Week (\d+): (.+)$/.exec(l);
      if (w) { wk = { n: +w[1], title: w[2], blocks: [], raw: [] }; phase.weeks.push(wk); continue; }
      const cp = /^\*\*Phase \d+ checkpoint:\*\*\s*(.*)$/.exec(l);
      if (cp) { phase.checkpoint = cp[1]; continue; }
      if (!wk) continue;
      wk.raw.push(l);
      const b = /^- \*\*(.+?):\*\*\s*(.*)$/.exec(l);
      if (b) {
        const label = b[1];
        const kind = /^learn/i.test(label) ? 'learn' : /^do/i.test(label) ? 'do' : /^output/i.test(label) ? 'output' : 'learn';
        const art = /artifact (\d+)/i.exec(label);
        wk.blocks.push({ label, kind, text: b[2], artifact: art ? +art[1] : 0 });
      }
    }
    for (const w of phase.weeks) w.phase = phase;
    phases.push(phase);
  }
  const weeks = phases.flatMap((p) => p.weeks);
  return { intro, phases, weeks, other, md };
}
const PLAN = parsePlan();
const weekUrl = (n) => `/plan/week-${n}/`;

// Labs, keyed by the week they belong to ("Lab 01: ... (week 4)").
const LABS = DOCS.filter((d) => d.kind === 'lab').map((d) => {
  const h1 = takeH1(read(d.src)).h1;
  const wm = /\(week (\d+)\)/i.exec(h1);
  const goal = (/## Goal\n+([^\n]+)/.exec(read(d.src)) || [])[1] || '';
  return { ...d, h1, week: wm ? +wm[1] : 0, goal };
});

// Which templates help which weeks.
const WEEK_TEMPLATES = {
  4: ['templates/lab-writeup.md'],
  5: ['templates/lab-writeup.md'],
  6: ['templates/lab-writeup.md'],
  8: ['templates/findings-report.md', 'templates/lab-writeup.md'],
  10: ['templates/threat-model.md'],
  12: ['templates/scope-and-authorization.md'],
  13: ['templates/ai-security-assessment.md'],
};

// ---------------------------------------------------------------- chrome

const NAV_GROUPS = ['Learn', 'Labs', 'Checklists', 'Templates', 'Cheatsheets', 'About'];

function sidebar(active) {
  const a = (url, label, extra = '') =>
    `<a href="${u(url)}"${url === active ? ' aria-current="page"' : ''}${extra}>${label}</a>`;
  const inPlan = active.startsWith('/plan/');
  const weekLinks = PLAN.phases
    .map(
      (p) =>
        `<div class="side-phase">Phase ${p.n} · ${esc(p.name)}</div>` +
        p.weeks
          .map(
            (w) =>
              `<a href="${u(weekUrl(w.n))}"${weekUrl(w.n) === active ? ' aria-current="page"' : ''} data-week-status="${w.n}"><span class="wk-dot"></span><span class="wk-n">${w.n}</span>${esc(shortTitle(w.title))}</a>`
          )
          .join('')
    )
    .join('');
  const groups = NAV_GROUPS.map((g) => {
    const items = DOCS.filter((d) => d.group === g);
    const extra = g === 'Learn' ? a('/glossary/', 'Glossary') + a('/resources/', 'Resource library') : '';
    const open = items.some((d) => d.url === active) || (g === 'Learn' && ['/resources/', '/glossary/'].includes(active));
    return `<details class="side-group"${open || g === 'Learn' ? ' open' : ''}><summary>${g === 'Learn' ? 'Go further' : g}</summary>${items
      .map((d) => a(d.url, esc(d.nav)))
      .join('')}${extra}</details>`;
  }).join('');
  const inLearn = active.startsWith('/learn/');
  const lessonLinks = LESSONS.map(
    (l) => `<a href="${u(l.url)}"${l.url === active ? ' aria-current="page"' : ''} data-lesson-status="${l.slug}"><span class="wk-dot"></span><span class="wk-n">${l.n}</span>${esc(l.title)}</a>`
  ).join('');
  return `<aside class="sidebar" id="sidebar" aria-label="Site">
  <div class="side-head"><span>Navigate</span><button class="icon-btn" data-menu-close aria-label="Close navigation">${I.close}</button></div>
  <nav>
    ${a('/', 'Home')}
    ${a('/progress/', 'My progress <span class="side-meter" data-side-meter></span>')}
    <details class="side-group side-plan"${inLearn || !inPlan ? ' open' : ''}><summary>Start here: the course</summary>${a('/learn/', 'Course overview')}${lessonLinks}</details>
    ${groups}
    <details class="side-group side-plan"${inPlan ? ' open' : ''}><summary>AI security in 90 days</summary>${a('/plan/', 'Plan overview')}${weekLinks}</details>
  </nav>
</aside>`;
}

function shortTitle(t) {
  return t.replace(/\s*\(.*\)$/, '');
}

function topbar(active) {
  const links = [
    ['/learn/', 'Learn'],
    ['/glossary/', 'Glossary'],
    ['/roadmap/', 'Roadmap'],
    ['/plan/', 'AI security'],
    ['/resources/', 'Resources'],
  ];
  const isActive = (p) =>
    active === p ||
    (p === '/plan/' && active.startsWith('/plan/')) ||
    (p === '/learn/' && active.startsWith('/learn/'));
  return `<header class="topbar"><div class="topbar-in">
  <button class="icon-btn menu-btn" data-menu aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${I.menu}</button>
  <a class="brand" href="${u('/')}" aria-label="${SITE_NAME}, home"><span class="brand-mark">${I.shield}</span><span class="brand-name">Cyber <span>Roadmap</span></span></a>
  <nav class="topnav" aria-label="Main">${links
    .map(([p, l]) => `<a href="${u(p)}"${isActive(p) ? ' aria-current="page"' : ''}>${l}</a>`)
    .join('')}</nav>
  <div class="top-actions">
    <button class="search-btn" type="button" data-search-open aria-label="Search">${I.search}<span>Search</span><kbd>/</kbd></button>
    <a class="progress-pill" href="${u('/progress/')}"${active === '/progress/' ? ' aria-current="page"' : ''}><svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" class="track"/><circle cx="18" cy="18" r="15" class="bar" data-pill-ring/></svg><span data-pill-text>Progress</span></a>
    <button class="icon-btn theme-btn" type="button" data-theme-toggle aria-label="Switch colour theme">${I.sun}</button>
    <a class="icon-btn gh" href="${REPO}" target="_blank" rel="noopener" aria-label="View on GitHub">${I.github}</a>
  </div>
</div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="wrap foot-grid">
  <div class="foot-brand">
    <a class="brand" href="${u('/')}"><span class="brand-mark">${I.shield}</span><span class="brand-name">Cyber <span>Roadmap</span></span></a>
    <p>${esc(TAGLINE)}</p>
    <p class="rule">${I.flag}<span>The one rule: only test systems you own, practice sites built for it, or bug bounty targets within their published rules.</span></p>
  </div>
  <div><h3>Learn</h3><a href="${u('/learn/')}">The beginner course</a><a href="${u('/glossary/')}">Glossary</a><a href="${u('/roadmap/')}">Beginner to expert</a><a href="${u('/plan/')}">AI security in 90 days</a><a href="${u('/progress/')}">My progress</a></div>
  <div><h3>Toolkit</h3><a href="${u('/checklists/personal-security/')}">Personal security checkup</a><a href="${u('/labs/')}">Labs</a><a href="${u('/checklists/')}">Checklists</a><a href="${u('/templates/')}">Templates</a><a href="${u('/cheatsheets/')}">Cheatsheets</a><a href="${u('/resources/')}">Resources</a></div>
  <div><h3>Project</h3><a href="${REPO}" target="_blank" rel="noopener">GitHub</a><a href="${u('/contributing/')}">Contribute</a><a href="${u('/limits/')}">Limits</a><a href="${u('/security/')}">Security and scope</a><a href="${u('/license/')}">License</a></div>
</div>
<div class="wrap foot-base"><span>Written content CC BY 4.0 · Lab code MIT</span><span>Progress is saved in this browser only. Nothing is sent anywhere.</span></div>
</footer>`;
}

const searchModal = `<div class="search-modal" data-search-modal hidden>
  <div class="search-backdrop" data-search-close></div>
  <div class="search-panel" role="dialog" aria-modal="true" aria-label="Search">
    <div class="search-input">${I.search}<input type="search" placeholder="Search lessons, terms, ${RESOURCE_COUNT} resources…" data-search-input autocomplete="off" spellcheck="false" aria-label="Search the site"><button class="esc" data-search-close type="button">Esc</button></div>
    <ul class="search-results" data-search-results role="listbox"></ul>
    <div class="search-foot"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>/</kbd> search anywhere</span></div>
  </div>
</div>`;

const SITE_DATA = {
  base: BASE,
  weeks: PLAN.weeks.map((w) => ({ n: w.n, title: shortTitle(w.title), url: u(weekUrl(w.n)), phase: w.phase.n })),
  lessons: LESSONS.map((l) => ({ slug: l.slug, n: l.n, title: l.title, url: u(l.url) })),
  checklists: [],
};

function shell({ title, description = TAGLINE, page, main, layout = 'doc', toc = [] }) {
  const fullTitle = page === '/' ? `${SITE_NAME}: learn cybersecurity from zero, free` : `${title} · ${SITE_NAME}`;
  const tocHtml =
    layout === 'doc' && toc.length > 2
      ? `<aside class="toc" aria-label="On this page"><div class="toc-in"><div class="toc-title">On this page</div>${toc
          .map((t) => `<a href="#${t.id}" class="d${t.depth}">${esc(t.text)}</a>`)
          .join('')}</div></aside>`
      : '';
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE_URL}${page}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE_URL}${page}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#0b0d12">
<link rel="icon" href="${u('/assets/favicon.svg')}" type="image/svg+xml">
<script>try{var t=localStorage.getItem('ais90-theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${u('/assets/site.css')}?v=${VERSION}">
</head>
<body class="layout-${layout}">
<a class="skip" href="#main">Skip to content</a>
${topbar(page)}
<div class="nav-backdrop" data-menu-close></div>
${
  layout === 'doc'
    ? `<div class="doc-grid${tocHtml ? '' : ' no-toc'}">${sidebar(page)}<main id="main" class="doc-main">${main}</main>${tocHtml}</div>`
    : `${sidebar(page)}<main id="main">${main}</main>`
}
${footer()}
${searchModal}
<script>window.SITE=${jsonForScript(SITE_DATA)}</script>
<script src="${u('/assets/app.js')}?v=${VERSION}" defer></script>
</body>
</html>
`;
}

const pageHead = ({ kicker, title, lede = '', crumbs = [], extra = '' }) => `<header class="page-head">
  ${crumbs.length ? `<nav class="crumbs" aria-label="Breadcrumb">${crumbs.map(([h, l]) => (h ? `<a href="${u(h)}">${l}</a>` : `<span>${l}</span>`)).join('<span class="sep">/</span>')}</nav>` : ''}
  ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
  <h1>${title}</h1>
  ${lede ? `<p class="lede">${lede}</p>` : ''}
  ${extra}
</header>`;

// ---------------------------------------------------------------- search index

const SEARCH = [];
function indexMarkdown(md, pageUrl, pageTitle, kind) {
  const parts = md.split(/\n(?=## )/);
  for (const part of parts) {
    const h = /^## (.+)$/m.exec(part);
    const heading = h ? h[1] : '';
    const text = plain(part.replace(/^#+ .+$/gm, ' ')).slice(0, 700);
    const id = heading ? slugify(makeMarked('x').parseInline(heading)) : '';
    SEARCH.push({ t: heading ? `${pageTitle} › ${decode(stripTags(heading))}` : pageTitle, k: kind, u: u(pageUrl) + (id ? `#${id}` : ''), x: text });
  }
}

// ---------------------------------------------------------------- pages

const pages = [];
const emit = (page, html) => pages.push([page, html]);

// ----- generic documents
function buildDoc(d) {
  const md = read(d.src);
  const ctx = {};
  const m = makeMarked(d.src, ctx);
  const { h1, rest } = takeH1(md);
  let body = wrapTables(m.parse(rest));
  const titleHtml = m.parseInline(h1.replace(/</g, '&lt;'));
  const titlePlain = decode(stripTags(titleHtml));
  const groupIndex = DOCS.find((x) => x.group === d.group && x.kind === 'index');
  const crumbs = [['/', 'Home']];
  if (groupIndex && groupIndex !== d) crumbs.push([groupIndex.url, d.group]);
  crumbs.push([null, esc(d.nav.replace(/^\d+ · /, ''))]);

  let kicker = d.group === 'About' || d.group === 'Learn' ? d.group : d.group.replace(/s$/, '');
  let extra = '';
  let lede = '';

  if (d.kind === 'checklist') {
    kicker = 'Checklist';
    SITE_DATA.checklists.push({ scope: d.url, title: d.nav, url: u(d.url), total: ctx.tasks });
    extra = `<div class="toolbar" data-meter-for="${d.url}"><div class="meter"><span class="meter-bar"><i data-meter-bar></i></span><span data-meter-text>0 of ${ctx.tasks} checked</span></div><button class="btn small ghost" type="button" data-reset-scope="${d.url}">Reset</button></div>`;
    body = `<div data-tasks="${d.url}">${body}</div>`;
  } else if (d.kind === 'template') {
    kicker = 'Template';
    lede = 'Copy it, fill it in, and keep the result with your own work.';
    extra = `<div class="toolbar"><button class="btn small" type="button" data-copy-raw>${I.copy}Copy Markdown</button><button class="btn small ghost" type="button" data-download-raw="${path.basename(d.src)}">${I.download}Download .md</button></div><script type="text/plain" id="raw-md">${esc(md)}</script>`;
  } else if (d.kind === 'lab') {
    const lab = LABS.find((l) => l.src === d.src);
    kicker = `Lab · <a href="${u(weekUrl(lab.week))}">Week ${lab.week}</a>`;
    extra = `<div class="chips"><span class="chip warn">Specification · you write the code</span><span class="chip">localhost only</span><span class="chip">synthetic data</span></div>`;
  } else if (d.kind === 'roadmap') {
    kicker = 'The whole road';
    extra = roadmapTrack(ctx.toc);
  } else if (ctx.tasks) {
    body = `<div data-tasks="${d.url}">${body}</div>`;
  }
  if (d.kind === 'index') body = indexCards(d, body);

  indexMarkdown(md, d.url, titlePlain.replace(/^(Checklist|Cheatsheet): /, ''), kicker.replace(/<[^>]+>/g, ''));
  const prevNext = docPrevNext(d);
  const main = `${pageHead({ kicker, title: titleHtml, lede, crumbs, extra })}<article class="prose">${body}</article>${prevNext}<p class="edit"><a href="${REPO}/blob/main/${d.src}" target="_blank" rel="noopener" class="ext">Edit this page on GitHub</a></p>`;
  emit(d.url, shell({ title: titlePlain, page: d.url, main, toc: ctx.toc }));
}

function docPrevNext(d) {
  const siblings = DOCS.filter((x) => x.group === d.group);
  const i = siblings.indexOf(d);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];
  if (!prev && !next) return '';
  return `<nav class="pager">${prev ? `<a class="prev" href="${u(prev.url)}"><small>Previous</small>${esc(prev.nav)}</a>` : '<span></span>'}${next ? `<a class="next" href="${u(next.url)}"><small>Next</small>${esc(next.nav)}</a>` : ''}</nav>`;
}

function indexCards(d, body) {
  const kids = DOCS.filter((x) => x.group === d.group && x !== d);
  const icon = { Labs: I.lab, Checklists: I.list, Templates: I.doc, Cheatsheets: I.zap }[d.group] || I.doc;
  const cards = kids
    .map((k) => {
      const kmd = read(k.src);
      const lab = LABS.find((l) => l.src === k.src);
      const blurb = lab ? lab.goal : plain(takeH1(kmd).rest.split('\n\n').find((p) => p.trim() && !p.startsWith('#') && !p.startsWith('|') && !p.startsWith('-')) || '').slice(0, 150);
      const count = k.kind === 'checklist' ? `<span class="card-meta" data-scope-count="${k.url}">${(kmd.match(/- \[ \]/g) || []).length} checks</span>` : lab ? `<span class="card-meta">Week ${lab.week}</span>` : '';
      return `<a class="card link-card" href="${u(k.url)}"><span class="card-icon">${icon}</span><span class="card-title">${esc(k.nav.replace(/^\d+ · /, ''))}</span><span class="card-text">${esc(blurb)}</span>${count}</a>`;
    })
    .join('');
  return `<div class="card-grid">${cards}</div>${body}`;
}

function roadmapTrack(toc) {
  const md = read('ROADMAP.md');
  const rows = [...md.matchAll(/^\|\s*(\d)\.\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/gm)];
  const stageIds = toc.filter((t) => /^Stage \d/.test(t.text));
  return `<ol class="stage-track">${rows
    .map(([, n, name, time, outcome]) => {
      const id = (stageIds.find((t) => t.text.startsWith(`Stage ${n}:`)) || {}).id || '';
      return `<li><a href="#${id}"><span class="st-n">${n}</span><span class="st-name">${esc(name)}</span><span class="st-time">${esc(time)}</span><span class="st-out">${esc(outcome)}</span></a></li>`;
    })
    .join('')}</ol>`;
}

DOCS.forEach(buildDoc);

// ----- the beginner course
function parseLesson(l) {
  const md = read(l.src);
  const { rest } = takeH1(md);
  const [head, ...secs] = rest.split(/\n(?=## )/);
  const one = ((/^>\s*\*\*In one sentence:\*\*\s*(.+)$/m.exec(head) || [])[1] || '').trim();
  const meta = [...head.matchAll(/\*\*(Time|You need):\*\*\s*([^·\n]+)/g)].map((x) => [x[1], x[2].trim()]);
  const sections = secs.map((s) => ({
    title: /^## (.+)$/m.exec(s)[1].trim(),
    body: s.replace(/^## .+$/m, '').replace(/^---\s*$/gm, '').replace(/^\*\*Next:\*\*.*$/m, '').trim(),
  }));
  return { md, one, meta, sections };
}
for (const l of LESSONS) Object.assign(l, parseLesson(l));

function parseQuiz(body) {
  const qs = [];
  const re = /\*\*(\d+)\.\s*([\s\S]+?)\*\*\s*\n+((?:[ \t]*[-*]\s+[A-D][.)]\s+.+\n?)+)\s*<details>\s*<summary>[^<]*<\/summary>\s*([\s\S]*?)<\/details>/g;
  for (const x of body.matchAll(re)) {
    const opts = [...x[3].matchAll(/[-*]\s+([A-D])[.)]\s+(.+)/g)].map((o) => ({ k: o[1], text: o[2].trim() }));
    const ans = /^\*\*([A-D])[.)]?\*\*[.:]?\s*([\s\S]*)$/.exec(x[4].trim());
    if (ans && opts.length > 1) qs.push({ q: x[2].trim(), opts, answer: ans[1], why: ans[2].trim() });
  }
  return qs;
}

function quizHtml(scope, qs, m) {
  return `<div class="quiz" data-quiz="${scope}" data-total="${qs.length}">${qs
    .map(
      (q, i) => `<div class="q" data-q="${i}" data-answer="${q.answer}">
  <p class="q-text"><span class="q-n">${i + 1}</span><span>${m.parseInline(q.q)}</span></p>
  <div class="opts">${q.opts.map((o) => `<button type="button" class="opt" data-opt="${o.k}"><span class="opt-k">${o.k}</span><span class="opt-t">${m.parseInline(o.text)}</span></button>`).join('')}</div>
  <div class="q-why" hidden><b data-why-label></b> ${m.parseInline(q.why)}</div>
</div>`
    )
    .join('')}<div class="quiz-foot"><span data-quiz-score>Pick an answer to check yourself.</span><button type="button" class="btn small ghost" data-quiz-reset="${scope}" hidden>Try again</button></div></div>`;
}

function keyWordsHtml(body, m) {
  const items = [...body.matchAll(/^- \*\*(.+?)\*\*:?\s*:?\s*(.+)$/gm)];
  if (!items.length) return `<div class="prose">${m.parse(body)}</div>`;
  return `<dl class="kw">${items.map(([, t, d]) => `<div><dt>${m.parseInline(t.replace(/:$/, ''))}</dt><dd>${m.parseInline(cap(d))}</dd></div>`).join('')}</dl>`;
}

function linksHtml(body, m) {
  const items = [...body.matchAll(/^- \[([^\]]+)\]\(([^)\s]+)\)\s*:?\s*(.*)$/gm)];
  const ext = items.filter((x) => /^https?:/.test(x[2]));
  const int = items.filter((x) => !/^https?:/.test(x[2]));
  return (
    (int.length ? `<div class="next-links">${int.map(([, t, h, d]) => `<a class="card link-card" href="${esc(resolveHref(h, 'learn/x.md').href)}"><span class="card-icon">${I.map}</span><span class="card-title">${m.parseInline(cap(t))}</span>${d ? `<span class="card-text">${m.parseInline(cap(d))}</span>` : ''}</a>`).join('')}</div>` : '') +
    (ext.length ? `<div class="res-grid">${ext.map(([, t, h, d]) => resCard({ title: t, url: h, desc: d, section: 'Lesson', sub: '' })).join('')}</div>` : '')
  );
}

const lessonStrip = (cur) =>
  `<div class="week-strip lesson-strip" aria-hidden="true">${LESSONS.map((x) => `<a href="${u(x.url)}" class="${x.slug === cur ? 'cur' : ''}" data-lesson-status="${x.slug}" tabindex="-1" title="Lesson ${x.n}: ${esc(x.title)}">${x.n}</a>`).join('')}</div>`;

function buildLesson(l, i) {
  const ctx = {};
  const m = makeMarked(l.src, ctx);
  const part = PARTS[partOf(l.n)];
  const toc = [];
  const sec = (title) => l.sections.find((s) => s.title.toLowerCase().startsWith(title));
  const idOf = (t) => slugify(esc(t));
  const seen = { used: new Set(), count: 0 };
  const parts = l.sections.map((s) => {
    const id = idOf(s.title);
    toc.push({ depth: 2, id, text: s.title });
    const t = s.title.toLowerCase();
    const h = `<h2 id="${id}">${esc(s.title)}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h2>`;
    if (t.startsWith('check yourself')) {
      const qs = parseQuiz(s.body);
      return `<section class="l-sec l-quiz">${h}${qs.length ? quizHtml(l.slug, qs, m) : `<div class="prose">${m.parse(s.body)}</div>`}</section>`;
    }
    if (t.startsWith('key words')) return `<section class="l-sec">${h}${keyWordsHtml(s.body, m)}</section>`;
    if (t.startsWith('go deeper')) return `<section class="l-sec">${h}${linksHtml(s.body, m)}</section>`;
    if (t.startsWith('try it')) return `<section class="l-sec"><div class="block do"><header><span class="block-icon">${I.bolt}</span><span class="block-tag">Hands-on</span><h2 id="${id}">${esc(s.title)}</h2></header><div class="prose">${addTerms(wrapTables(m.parse(s.body)), 4, seen)}</div></div></section>`;
    if (t.startsWith('in real life')) return `<section class="l-sec"><div class="callout real"><strong id="${id}">${I.flag}${esc(s.title)}</strong><div class="prose">${addTerms(m.parse(s.body), 4, seen)}</div></div></section>`;
    let body = `<section class="l-sec">${h}<div class="prose">${addTerms(wrapTables(m.parse(s.body)), 18, seen)}</div></section>`;
    if (l.slug === 'ai-security' && t.startsWith('how it works')) body += trifectaWidget();
    return body;
  });
  const prev = LESSONS[i - 1];
  const next = LESSONS[i + 1];
  const nextHref = next ? u(next.url) : u('/roadmap/');
  const nextLabel = next ? `Lesson ${next.n}: ${esc(next.title)}` : 'The beginner-to-expert roadmap';
  const done = `<section class="lesson-done" data-lesson-card="${l.slug}">
  <div><h2>Finished lesson ${l.n}?</h2><p>Mark it done to track your progress. It is saved in this browser only.</p></div>
  <div class="ld-actions"><button class="btn done-btn" type="button" data-lesson-done="${l.slug}" aria-pressed="false"><span class="when-off">${I.check}Mark lesson done</span><span class="when-on">${I.check}Lesson done</span></button><a class="btn primary" href="${nextHref}">${next ? 'Next lesson' : 'See the roadmap'} ${I.arrow}</a></div>
</section>`;
  const meta = l.meta.map(([k, v]) => `<span class="chip">${k === 'Time' ? I.calendar : I.check}${esc(k === 'Time' ? cap(v) : `You need: ${v}`)}</span>`).join('');
  const main = `${pageHead({
    kicker: `Lesson ${l.n} of ${LESSONS.length} · <a href="${u('/learn/')}#part-${partOf(l.n) + 1}">${esc(part ? part.name : 'Course')}</a>`,
    title: esc(l.title),
    lede: l.one ? m.parseInline(l.one) : '',
    crumbs: [['/', 'Home'], ['/learn/', 'Course'], [null, `Lesson ${l.n}`]],
    extra: `<div class="chips lesson-meta">${meta}<span class="chip">${I.list}${(sec('check yourself') && parseQuiz(sec('check yourself').body).length) || 0}-question quiz</span></div>${lessonStrip(l.slug)}`,
  })}
<p class="term-hint">${I.book}<span>Underlined words have a plain-English definition. Hover or tap them.</span></p>
<article class="lesson">${parts.join('')}</article>
${done}
<nav class="pager">${prev ? `<a class="prev" href="${u(prev.url)}"><small>${I.back} Lesson ${prev.n}</small>${esc(prev.title)}</a>` : `<a class="prev" href="${u('/learn/')}"><small>${I.back} Course</small>Course overview</a>`}<a class="next" href="${nextHref}"><small>${next ? `Lesson ${next.n}` : 'Next step'} ${I.arrow}</small>${next ? esc(next.title) : nextLabel}</a></nav>
<p class="edit"><a href="${REPO}/blob/main/${l.src}" target="_blank" rel="noopener" class="ext">Improve this lesson on GitHub</a></p>`;
  SEARCH.push({ t: `Lesson ${l.n}: ${l.title}`, k: 'Lesson', u: u(l.url), x: plain(l.one + ' ' + l.sections.map((s) => s.body).join(' ')).slice(0, 900) });
  for (const s of l.sections) if (/^(the big idea|how it works|in real life)/i.test(s.title)) SEARCH.push({ t: `Lesson ${l.n}: ${l.title} › ${s.title}`, k: 'Lesson', u: u(l.url) + `#${idOf(s.title)}`, x: plain(s.body).slice(0, 600) });
  emit(l.url, shell({ title: `Lesson ${l.n}: ${l.title}`, page: l.url, main, toc, description: plain(l.one || TAGLINE).slice(0, 160) }));
}
LESSONS.forEach(buildLesson);

function lessonCard(l) {
  const qn = parseQuiz((l.sections.find((s) => /^check yourself/i.test(s.title)) || { body: '' }).body).length;
  return `<a class="lesson-card" href="${u(l.url)}" data-lesson-status="${l.slug}"><span class="lc-n">${String(l.n).padStart(2, '0')}</span><span class="lc-body"><span class="lc-title">${esc(l.title)}</span><span class="lc-text">${esc(plain(l.one))}</span><span class="lc-meta">${esc((l.meta.find((x) => x[0] === 'Time') || [, '15 minutes'])[1].replace(/^about /, '~'))}${qn ? ` · ${qn}-question quiz` : ''}</span></span><span class="lc-state" aria-hidden="true">${I.check}</span></a>`;
}

function buildCourse() {
  const src = 'learn/README.md';
  const md = read(src);
  const ctx = {};
  const m = makeMarked(src, ctx);
  const { h1, rest } = takeH1(md);
  const [intro, ...secs] = rest.split(/\n(?=## )/);
  const other = secs.filter((s) => !/^## The lessons/m.test(s));
  const partsHtml = PARTS.map((p, i) => {
    const ls = LESSONS.filter((l) => l.n >= p.from && l.n <= p.to);
    if (!ls.length) return '';
    return `<section class="course-part reveal" id="part-${i + 1}"><header class="part-head"><span class="part-n">Part ${i + 1}</span><div><h2>${esc(p.name)}</h2><p>${esc(p.blurb)}</p></div></header><div class="lesson-list">${ls.map(lessonCard).join('')}</div></section>`;
  }).join('');
  const main = `${pageHead({
    kicker: 'The beginner course',
    title: esc(h1 || 'Start here'),
    lede: `${LESSONS.length} short lessons, about 15 minutes each. No experience needed. Every lesson ends with a quick quiz and something safe to try.`,
    crumbs: [['/', 'Home'], [null, 'Course']],
    extra: `<div class="plan-progress"><div class="meter big"><span class="meter-bar"><i data-course-bar></i></span></div><div class="plan-progress-row"><span data-course-text>0 of ${LESSONS.length} lessons done</span><span data-quiz-total></span><a class="btn small" href="${u(LESSONS[0].url)}" data-continue-lesson>Start lesson 1 ${I.arrow}</a></div></div>`,
  })}
<div class="notes prose">${m.parse(intro)}</div>
${partsHtml}
${other.map((s) => `<section class="prose plan-extra">${wrapTables(m.parse(s))}</section>`).join('')}`;
  indexMarkdown(md, '/learn/', 'Beginner course', 'Course');
  emit('/learn/', shell({ title: 'The beginner course', page: '/learn/', main, toc: [], description: `Learn cybersecurity from zero: ${LESSONS.length} free plain-English lessons with quizzes and hands-on practice.` }));
}
buildCourse();

function buildGlossary() {
  const m = makeMarked(GLOSSARY_SRC);
  const { h1, rest } = takeH1(glossaryMd);
  const intro = rest.split(/\n(?=## )/)[0];
  const letters = [...new Set(GLOSSARY.map((g) => g.term[0].toUpperCase()))].sort();
  const groups = letters
    .map((L) => {
      const items = GLOSSARY.filter((g) => g.term[0].toUpperCase() === L).sort((a, b) => a.term.localeCompare(b.term));
      return `<section class="g-letter" id="letter-${L.toLowerCase()}" data-g-letter><h2>${L}</h2><dl class="kw g-list">${items
        .map((g) => `<div id="${g.id}" data-g="${esc((g.term + ' ' + plain(g.def)).toLowerCase())}"><dt>${m.parseInline(g.term)}</dt><dd>${m.parseInline(cap(g.def))}</dd></div>`)
        .join('')}</dl></section>`;
    })
    .join('');
  for (const g of GLOSSARY) SEARCH.push({ t: g.term, k: 'Term', u: u(`/glossary/#${g.id}`), x: plain(g.def) });
  const main = `${pageHead({
    kicker: 'Glossary',
    title: esc(h1 || 'Glossary'),
    lede: `${GLOSSARY.length} cybersecurity words, each explained in one plain sentence.`,
    crumbs: [['/', 'Home'], [null, 'Glossary']],
  })}
<div class="res-tools"><div class="filter">${I.search}<input type="search" placeholder="Find a word: phishing, VPN, zero-day…" data-g-filter aria-label="Filter the glossary"><span class="filter-count" data-g-count></span></div><div class="chips scroll">${letters.map((L) => `<a class="chip" href="#letter-${L.toLowerCase()}">${L}</a>`).join('')}</div></div>
<div class="notes prose">${m.parse(intro)}</div>
<p class="res-empty" data-g-empty hidden>No word matches that. Try the search (press /) instead.</p>
${groups}`;
  emit('/glossary/', shell({ title: 'Glossary', page: '/glossary/', main, description: `${GLOSSARY.length} cybersecurity terms explained in plain English.` }));
}
buildGlossary();

function trifectaWidget() {
  return `<section class="l-sec trifecta-sec" id="trifecta"><div class="split">
    <div>
      <p class="kicker">Try it here</p>
      <h2>The lethal trifecta</h2>
      <p>An AI tool turns from "tricked" into "leaking your data" only when three things are true at once. Switch them on and off.</p>
      <div class="tri-toggles" role="group" aria-label="Conditions">
        <button type="button" class="tri-btn c1" data-cond="data" aria-pressed="true"><span class="sw"></span>Access to private data</button>
        <button type="button" class="tri-btn c2" data-cond="untrusted" aria-pressed="true"><span class="sw"></span>Reads untrusted content</button>
        <button type="button" class="tri-btn c3" data-cond="exfil" aria-pressed="true"><span class="sw"></span>A way to send data out</button>
      </div>
      <div class="tri-status" data-tri-status aria-live="polite"></div>
    </div>
    <div class="tri-visual" data-trifecta>
      <svg viewBox="0 0 400 380" role="img" aria-label="Three overlapping circles: private data, untrusted content, a way out">
        <circle cx="200" cy="135" r="105" class="tc c1" data-circle="data"/>
        <circle cx="140" cy="240" r="105" class="tc c2" data-circle="untrusted"/>
        <circle cx="260" cy="240" r="105" class="tc c3" data-circle="exfil"/>
        <text x="200" y="78" class="tl">Private data</text>
        <text x="92" y="300" class="tl">Untrusted</text>
        <text x="92" y="318" class="tl">content</text>
        <text x="308" y="300" class="tl">A way out</text>
        <circle cx="200" cy="205" r="20" class="core"/>
        <text x="200" y="210" class="core-t">LEAK</text>
      </svg>
    </div>
  </div></section>`;
}

// ----- the plan overview
function buildPlan() {
  const ctx = {};
  const m = makeMarked(PLAN_SRC, ctx);
  const intro = PLAN.intro.lines.join('\n');
  const notes = intro.replace(/^# .+$/m, '').trim();
  const sec = (t) => PLAN.other.find((o) => o.title.startsWith(t));
  const ground = sec('Ground rules');
  const before = sec('Before week 1');
  const exit = sec('Exit criteria');
  const glance = sec('The 90 days at a glance');
  const rest = PLAN.other.filter((o) => ![ground, before, exit, glance].includes(o));

  const beforeItems = [...before.body.matchAll(/^\d+\.\s+(.+)$/gm)].map((x) => x[1]);
  const beforeHtml = `<ol class="steps" data-tasks="pre">${beforeItems
    .map((t, i) => `<li><label><input type="checkbox" class="task" data-i="${i}"><span>${m.parseInline(t)}</span></label></li>`)
    .join('')}</ol>`;

  const phaseHtml = PLAN.phases
    .map((p) => {
      const out = p.weeks.flatMap((w) => w.blocks).find((b) => b.artifact);
      const glanceRow = new RegExp(`^\\|\\s*${p.n}\\. [^|]+\\|[^|]+\\|[^|]+\\|\\s*(.+?)\\s*\\|$`, 'm').exec(glance.body);
      return `<section class="phase reveal" id="phase-${p.n}">
  <header class="phase-head"><span class="phase-n">Phase ${p.n}</span><h2>${esc(p.name)}</h2><span class="phase-weeks">Weeks ${p.from}–${p.to}</span></header>
  <div class="week-grid">${p.weeks
    .map((w) => {
      const learn = plain(w.blocks.find((b) => b.kind === 'learn')?.text || '');
      return `<a class="week-card" href="${u(weekUrl(w.n))}" data-week-status="${w.n}"><span class="wc-top"><span class="wc-n">Week ${w.n}</span><span class="wc-state" aria-hidden="true">${I.check}</span></span><span class="wc-title">${esc(shortTitle(w.title))}</span><span class="wc-text">${esc(learn.length > 120 ? learn.slice(0, 117).replace(/\s\S*$/, '') + '…' : learn)}</span>${w.blocks.some((b) => b.artifact) ? `<span class="wc-badge">${I.send}Publish artifact ${w.blocks.find((b) => b.artifact).artifact}</span>` : ''}</a>`;
    })
    .join('')}</div>
  <div class="phase-foot">
    <div class="callout fix"><strong>${I.send}Published at the end</strong><p>${m.parseInline(glanceRow ? glanceRow[1] : out?.text || '')}</p></div>
    <div class="callout"><strong>${I.flag}Checkpoint</strong><p>${m.parseInline(cap(p.checkpoint))}</p></div>
  </div>
</section>`;
    })
    .join('');

  const restHtml = rest
    .map((o) => `<section class="prose plan-extra"><h2 id="${slugify(o.title)}">${esc(o.title)}</h2>${wrapTables(m.parse(o.body))}</section>`)
    .join('');

  const toc = [
    { depth: 2, id: 'ground-rules', text: 'Ground rules' },
    { depth: 2, id: 'before-week-1', text: 'Before week 1' },
    { depth: 2, id: 'exit-criteria', text: 'Exit criteria' },
    ...PLAN.phases.map((p) => ({ depth: 2, id: `phase-${p.n}`, text: `Phase ${p.n}: ${p.name}` })),
    ...rest.map((o) => ({ depth: 2, id: slugify(o.title), text: o.title })),
  ];

  const main = `${pageHead({
    kicker: 'Advanced track · for people who build with AI',
    title: 'AI security in 90 days',
    lede: `Thirteen weeks at about ten hours a week. Each phase ends with something a stranger can read at a public URL. New to security? Take <a href="${u('/learn/')}">the beginner course</a> first.`,
    crumbs: [['/', 'Home'], [null, '90-day plan']],
    extra: `<div class="plan-progress" data-plan-progress><div class="meter big"><span class="meter-bar"><i data-plan-bar></i></span></div><div class="plan-progress-row"><span data-plan-text>0 of 13 weeks done</span><span data-plan-hours>0 hours logged</span><a class="btn small" href="${u(weekUrl(1))}" data-continue>Start week 1 ${I.arrow}</a></div></div>`,
  })}
<div class="notes prose">${m.parse(notes)}</div>
<section class="prose" id="ground-rules"><h2>Ground rules</h2>${m.parse(ground.body)}</section>
<section id="before-week-1" class="before"><div class="before-head"><h2>Before week 1</h2><p>About five hours. Do not skip it. <span class="muted" data-meter-for="pre"><span data-meter-text></span></span></p></div>${beforeHtml}</section>
<section id="exit-criteria" class="callout warn big"><strong>${I.flag}Exit criteria</strong>${m.parse(exit.body)}</section>
${phaseHtml}
${restHtml}`;
  indexMarkdown(PLAN.md.replace(/^### Week[\s\S]*?(?=^## |\Z)/gm, ''), '/plan/', '90-day plan', 'Plan');
  emit('/plan/', shell({ title: '90-day plan', page: '/plan/', main, toc }));
}
buildPlan();

// ----- one page per week
function buildWeek(w, i, all) {
  const ctx = {};
  const m = makeMarked(PLAN_SRC, ctx);
  const p = w.phase;
  const icon = { learn: I.book, do: I.bolt, output: I.send };
  const tag = { learn: 'Learn', do: 'Build and break', output: 'Ship' };
  const blocks = w.blocks
    .map(
      (b) => `<section class="block ${b.kind}${b.artifact ? ' artifact' : ''} reveal"><header><span class="block-icon">${icon[b.kind]}</span><span class="block-tag">${tag[b.kind]}</span>${/^(learn|do|output)$/i.test(b.label) ? '' : `<h2>${esc(b.label)}</h2>`}</header><p>${m.parseInline(b.text.replace(/^[a-z]/, (c) => c.toUpperCase()))}</p>${
        b.artifact
          ? `<div class="artifact-row"><span>${I.link}</span><input type="url" placeholder="Paste the public URL of artifact ${b.artifact} when it is live" data-artifact="${b.artifact}" aria-label="URL of artifact ${b.artifact}"></div>`
          : ''
      }</section>`
    )
    .join('');
  const isLast = w.n === p.to;
  const checkpoint = isLast && p.checkpoint ? `<section class="callout big reveal"><strong>${I.flag}Phase ${p.n} checkpoint</strong><p>${m.parseInline(cap(p.checkpoint))}</p></section>` : '';
  const res = resourcesForWeek(w.n, w.raw.join(' '));
  const resHtml = res.length
    ? `<section class="week-res reveal"><h2>Resources for this week</h2><div class="res-grid">${res.map(resCard).join('')}</div><p class="muted small">From the <a href="${u('/resources/')}">resource library</a>. Default to free tiers and check prices before paying.</p></section>`
    : '';
  const lab = LABS.find((l) => l.week === w.n);
  const labHtml = lab
    ? `<a class="card link-card lab-card reveal" href="${u(lab.url)}"><span class="card-icon">${I.lab}</span><span class="card-title">This week's lab: ${esc(lab.nav.replace(/^\d+ · /, ''))}</span><span class="card-text">${esc(lab.goal)}</span><span class="card-meta">Open the spec ${I.arrow}</span></a>`
    : '';
  const tpls = [...(WEEK_TEMPLATES[w.n] || []), 'templates/weekly-review.md']
    .map((s) => DOCS.find((d) => d.src === s))
    .map((d) => `<a href="${u(d.url)}">${I.doc}${esc(d.nav)}</a>`)
    .join('');
  const prev = all[i - 1];
  const next = all[i + 1];

  const tracker = `<aside class="tracker" aria-label="Track this week">
  <div class="tracker-in">
    <div class="tracker-title">Your week ${w.n}</div>
    <button class="btn done-btn" type="button" data-week-done="${w.n}" aria-pressed="false"><span class="when-off">${I.check}Mark week complete</span><span class="when-on">${I.check}Week complete</span></button>
    <label class="hours">Hours logged<input type="number" min="0" max="80" step="0.5" inputmode="decimal" data-week-hours="${w.n}" placeholder="0"></label>
    <p class="tiny">Target about 10: 6 hands-on, 2 reading, 2 writing up. If a week slips, cut the reading, never the hands-on work or the write-up.</p>
    <div class="tracker-links"><div class="tiny-title">Templates</div>${tpls}</div>
  </div>
</aside>`;

  const main = `${pageHead({
    kicker: `Week ${w.n} of 13 · <a href="${u('/plan/')}#phase-${p.n}">Phase ${p.n}: ${esc(p.name)}</a>`,
    title: esc(w.title),
    crumbs: [['/', 'Home'], ['/plan/', '90-day plan'], [null, `Week ${w.n}`]],
    extra: `<div class="week-strip" aria-hidden="true">${all.map((x) => `<a href="${u(weekUrl(x.n))}" class="${x.n === w.n ? 'cur' : ''}" data-week-status="${x.n}" tabindex="-1" title="Week ${x.n}">${x.n}</a>`).join('')}</div>`,
  })}
<div class="week-layout">
  <div class="week-main">${blocks}${checkpoint}${labHtml}${resHtml}</div>
  ${tracker}
</div>
<nav class="pager">${prev ? `<a class="prev" href="${u(weekUrl(prev.n))}"><small>${I.back} Week ${prev.n}</small>${esc(shortTitle(prev.title))}</a>` : `<a class="prev" href="${u('/plan/')}#before-week-1"><small>${I.back} Before you start</small>Before week 1</a>`}${next ? `<a class="next" href="${u(weekUrl(next.n))}"><small>Week ${next.n} ${I.arrow}</small>${esc(shortTitle(next.title))}</a>` : `<a class="next" href="${u('/progress/')}"><small>Finish ${I.arrow}</small>Review your progress</a>`}</nav>`;

  SEARCH.push({ t: `Week ${w.n}: ${shortTitle(w.title)}`, k: 'Week', u: u(weekUrl(w.n)), x: plain(w.raw.join(' ')).slice(0, 700) });
  emit(weekUrl(w.n), shell({ title: `Week ${w.n}: ${shortTitle(w.title)}`, page: weekUrl(w.n), main, layout: 'doc', description: plain(w.blocks[0]?.text || TAGLINE).slice(0, 160) }));
}
PLAN.weeks.forEach(buildWeek);

function resCard(r) {
  const desc = r.desc ? cap(stripTags(makeMarked('resources.md').parseInline(r.desc))) : '';
  const q = `${r.title} ${r.desc} ${r.section} ${r.sub} ${host(r.url)}`.toLowerCase();
  return `<a class="res" href="${esc(r.url)}" target="_blank" rel="noopener" data-q="${esc(q)}"><span class="res-title">${esc(r.title)}</span>${desc ? `<span class="res-desc">${desc}</span>` : ''}<span class="res-host">${esc(host(r.url))}</span></a>`;
}

// ----- resource library
function buildResources() {
  const ctx = {};
  const m = makeMarked('resources.md', ctx);
  const { rest } = takeH1(resourcesMd);
  const [introMd, ...secs] = rest.split(/\n(?=## )/);
  const chips = [];
  const sectionsHtml = secs
    .map((s) => {
      const title = /^## (.+)$/m.exec(s)[1];
      const id = slugify(title);
      chips.push(`<a href="#${id}" class="chip">${esc(title.replace(/^\d+\.\s*/, ''))}</a>`);
      const tokens = m.lexer(s.replace(/^## .+$/m, '').replace(/^---$/gm, ''));
      let html = '';
      for (const tok of tokens) {
        if (tok.type === 'heading' && tok.depth === 3) {
          html += `<h3 class="res-sub">${m.parseInline(tok.text)}</h3>`;
        } else if (tok.type === 'list' && tok.items.every((it) => /^\[[^\]]+\]\(https?:[^)]+\)/.test(it.text) && !/\]\(/.test(it.text.replace(/^\[[^\]]+\]\([^)]+\)/, '')))) {
          html += `<div class="res-grid">${tok.items
            .map((it) => {
              const mm = /^\[([^\]]+)\]\(([^)\s]+)\)\s*:?\s*([\s\S]*)$/.exec(it.text.trim());
              return resCard({ title: mm[1], url: mm[2], desc: (mm[3] || '').trim().replace(/^,\s*/, ''), section: title, sub: '' });
            })
            .join('')}</div>`;
        } else {
          const arr = [tok];
          arr.links = tokens.links;
          html += `<div class="prose">${wrapTables(m.parser(arr))}</div>`;
        }
      }
      return `<section class="res-section${id.startsWith('1-') ? ' featured' : ''}" id="${id}" data-res-section><h2>${esc(title)}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h2>${html}</section>`;
    })
    .join('');

  for (const r of RESOURCES) SEARCH.push({ t: r.title, k: 'Resource', u: r.url, x: `${r.desc} ${r.section}`, ext: 1 });

  const main = `${pageHead({
    kicker: 'Resource library',
    title: `${RESOURCE_COUNT} free resources, every link checked`,
    lede: 'The best courses, practice sites, books and tools, sorted by stage. Type a topic to filter, for example “linux”, “free” or “phishing”.',
    crumbs: [['/', 'Home'], [null, 'Resources']],
  })}
<div class="res-tools">
  <div class="filter">${I.search}<input type="search" placeholder="Filter: burp, cloud, prompt injection, free…" data-res-filter aria-label="Filter resources"><span class="filter-count" data-res-count></span></div>
  <div class="chips scroll">${chips.join('')}</div>
</div>
<div class="notes prose">${m.parse(introMd.replace(/^---$/gm, ''))}</div>
<p class="res-empty" data-res-empty hidden>No resources match that filter.</p>
${sectionsHtml}`;
  emit('/resources/', shell({ title: 'Resource library', page: '/resources/', main, layout: 'doc', description: `${RESOURCE_COUNT} checked links for learning cybersecurity and AI security, organised by stage and by week.` }));
}
buildResources();

// ----- progress dashboard
function buildProgress() {
  const md = read('PROGRESS.md');
  const m = makeMarked('PROGRESS.md');
  const stages = [...md.matchAll(/^- \[ \] (Stage \d: .+)$/gm)].map((x) => x[1]);
  const after = [...md.split('## After day 90')[1].matchAll(/^- \[ \] (.+)$/gm)].map((x) => x[1]);
  const beforeItems = [...PLAN.other.find((o) => o.title.startsWith('Before week 1')).body.matchAll(/^\d+\.\s+\*\*(.+?)\*\*/gm)].map((x) => x[1].replace(/\s*\(.*\)\.?$/, '').replace(/\.$/, ''));
  const list = (scope, items) => `<ul class="checks" data-tasks="${scope}">${items.map((t, i) => `<li><label><input type="checkbox" class="task" data-i="${i}"><span>${m.parseInline(t)}</span></label></li>`).join('')}</ul>`;

  const main = `${pageHead({
    kicker: 'My progress',
    title: 'Where you are',
    lede: 'Everything here is saved in this browser only. Export a backup if you switch devices.',
    crumbs: [['/', 'Home'], [null, 'Progress']],
  })}
<section class="stats">
  <div class="stat ring-stat"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="track"/><circle cx="60" cy="60" r="52" class="bar" data-ring/></svg><div><b data-stat="lessons">0</b><span>of ${LESSONS.length} lessons</span></div></div>
  <div class="stat"><b data-stat="quiz">0</b><span>quiz answers right <em data-stat="quiz-of"></em></span></div>
  <div class="stat"><b data-stat="weeks">0</b><span>of 13 AI security weeks</span></div>
  <div class="stat"><b data-stat="checks">0</b><span>checklist items ticked</span></div>
</section>
<section class="panel"><div class="panel-head"><h2>The beginner course</h2><a class="btn small" href="${u(LESSONS[0].url)}" data-continue-lesson>Start lesson 1 ${I.arrow}</a></div>
  <div class="week-tiles">${LESSONS.map((l) => `<a href="${u(l.url)}" class="tile p${(partOf(l.n) % 3) + 1}" data-lesson-status="${l.slug}"><span class="t-n">${l.n}</span><span class="t-title">${esc(l.title)}</span><span class="t-h" data-quiz-label="${l.slug}"></span></a>`).join('')}</div>
</section>
<h2 class="track-head">AI security in 90 days <span class="muted">· the advanced track</span></h2>
<div class="stats small-stats">
  <div class="stat"><b data-stat="hours">0</b><span>hours logged <em>of ~130</em></span></div>
  <div class="stat"><b data-stat="artifacts">0</b><span>of 3 artifacts published</span></div>
</div>
<section class="panel"><div class="panel-head"><h2>Weeks</h2><a class="btn small" href="${u(weekUrl(1))}" data-continue>Start week 1 ${I.arrow}</a></div>
  <div class="week-tiles">${PLAN.weeks.map((w) => `<a href="${u(weekUrl(w.n))}" class="tile p${w.phase.n}" data-week-status="${w.n}"><span class="t-n">${w.n}</span><span class="t-title">${esc(shortTitle(w.title))}</span><span class="t-h" data-week-hours-label="${w.n}"></span></a>`).join('')}</div>
</section>
<div class="panel-grid">
  <section class="panel"><h2>Before week 1</h2>${list('pre', beforeItems)}<p class="tiny">Details on the <a href="${u('/plan/')}#before-week-1">plan page</a>.</p></section>
  <section class="panel"><h2>Exit criteria</h2><p class="tiny">Stop and reconsider the direction if any of these fail.</p>
    <ul class="exit">
      <li data-exit="hours4"><span class="ex-dot"></span><span><b>At least 20 hours in weeks 1–4.</b> <span data-exit-text></span></span></li>
      <li data-exit="art6"><span class="ex-dot"></span><span><b>Something published by the end of week 6.</b> <span data-exit-text></span></span></li>
      <li data-exit="postings"><span class="ex-dot"></span><span><b>The posting review shows reachable roles.</b> <span data-exit-text>Your call, from the 20 postings.</span></span></li>
    </ul>
  </section>
</div>
<section class="panel"><h2>Published artifacts</h2>
  <div class="artifacts">${[1, 2, 3]
    .map((n) => {
      const b = PLAN.weeks.flatMap((w) => w.blocks.map((x) => ({ ...x, w: w.n }))).find((x) => x.artifact === n);
      return `<div class="artifact"><div class="a-head"><span class="a-n">${n}</span><span>Week ${b.w}</span></div><p>${m.parseInline(b.text.replace(/^write-up/i, 'Write-up'))}</p><div class="artifact-row"><span>${I.link}</span><input type="url" placeholder="Public URL" data-artifact="${n}" aria-label="URL of artifact ${n}"></div></div>`;
    })
    .join('')}</div>
</section>
<section class="panel"><h2>Checklists</h2><div class="cl-list" data-checklist-progress></div></section>
<div class="panel-grid">
  <section class="panel"><h2>Roadmap stages</h2>${list('stages', stages)}</section>
  <section class="panel"><h2>After day 90</h2>${list('after90', after)}</section>
</div>
<section class="panel backup"><div><h2>Backup</h2><p class="tiny">Your progress lives in this browser's storage. Clearing site data erases it.</p></div><div class="backup-actions"><button class="btn small" type="button" data-export>${I.download}Export</button><label class="btn small ghost">Import<input type="file" accept="application/json" data-import hidden></label><button class="btn small danger" type="button" data-reset-all>Reset everything</button></div></section>`;
  emit('/progress/', shell({ title: 'My progress', page: '/progress/', main, layout: 'doc' }));
}
buildProgress();

// ----- home
function buildHome() {
  const checklists = DOCS.filter((d) => d.kind === 'checklist').length;
  const counts = [
    [LESSONS.length, 'short lessons, about 15 minutes each'],
    [`${Math.floor(GLOSSARY.length / 10) * 10}+`, 'words explained in plain English'],
    [RESOURCE_COUNT, 'free, checked resources'],
    ['$0', 'no sign-up, no paywall, no ads'],
  ];
  const paths = [
    {
      cls: 'p-safe', icon: I.shield, kicker: 'For everyone · about 45 minutes',
      title: 'Keep myself safe online',
      text: 'Passwords, scams and the few habits that stop most attacks on ordinary people.',
      links: [[LESSONS[1] && LESSONS[1].url, 'Protect yourself first'], [LESSONS[2] && LESSONS[2].url, 'Spot scams and phishing'], ['/checklists/personal-security/', 'Personal security checkup']],
      cta: [LESSONS[0] && LESSONS[0].url, 'Start with lesson 1'],
    },
    {
      cls: 'p-career', icon: I.map, kicker: 'For future pros · months to years',
      title: 'Start a career in cybersecurity',
      text: `Take the ${LESSONS.length}-lesson course, then follow the honest beginner-to-expert roadmap.`,
      links: [['/learn/', 'The beginner course'], ['/roadmap/', 'Beginner-to-expert roadmap'], ['/market/', 'What employers want']],
      cta: ['/learn/', 'See the course'],
    },
    {
      cls: 'p-ai', icon: I.bolt, kicker: 'For builders · 13 weeks',
      title: 'Specialize in AI security',
      text: 'For people who build with AI: learn how those systems break, prove it in a lab, and fix it.',
      links: [[LESSONS[12] && LESSONS[12].url, 'Lesson 13: AI security'], ['/plan/', 'The 90-day plan'], ['/labs/', 'Hands-on labs']],
      cta: ['/plan/', 'See the 90-day plan'],
    },
  ];
  const sampleTerms = ['Phishing', 'MFA', 'Ransomware', 'Firewall', 'Zero-day', 'VPN', 'Encryption', 'Prompt injection']
    .map((t) => GLOSSARY.find((g) => g.names.some((n) => n.toLowerCase() === t.toLowerCase())))
    .filter(Boolean)
    .slice(0, 6);
  const toolkit = [
    ['/checklists/personal-security/', I.shield, 'Personal security checkup', 'A tick-box list for your own accounts and devices. About an hour.'],
    ['/roadmap/', I.map, 'Beginner to expert', 'Seven stages from your first lab to expert, with honest timelines.'],
    ['/resources/', I.book, `${RESOURCE_COUNT} resources`, 'The best free courses, labs and books, sorted by stage. Every link checked.'],
    ['/cheatsheets/', I.zap, 'Cheatsheets', 'Networking, Linux, web flaws and AI attack patterns on one page each.'],
    ['/labs/', I.lab, `${LABS.length} labs`, 'Build a small AI app, break it, then fix it. You write the code.'],
    ['/checklists/', I.list, `${checklists} checklists`, 'Review a web app, an AI app or your home lab. Tick as you go.'],
    ['/templates/', I.doc, 'Templates', 'Threat model, findings report, lab write-up and more, ready to copy.'],
    ['/market/', I.chart, 'What employers want', 'What job postings ask for, and where the evidence is thin.'],
  ];

  const main = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow"><span class="pulse"></span>Free · No sign-up · Plain English</p>
      <h1>Learn cybersecurity<br><span class="hl">from zero.</span></h1>
      <p class="lede">Short lessons that explain how hacking and defending really work, with no jargon left unexplained. Then a clear path from your first lesson to your first job.</p>
      <div class="cta-row">
        <a class="btn primary lg" href="${u(LESSONS[0].url)}" data-continue-lesson>Start lesson 1 ${I.arrow}</a>
        <a class="btn ghost lg" href="${u('/learn/')}">See all ${LESSONS.length} lessons</a>
      </div>
      <ul class="hero-stats">${counts.map(([n, l]) => `<li><b>${n}</b><span>${l}</span></li>`).join('')}</ul>
    </div>
    <div class="hero-visual">
      <div class="try-card">
        <div class="try-head"><span class="try-tag">${I.list}Try a question</span><span class="muted small">From lesson 3</span></div>
        <div class="quiz hero-quiz" data-quiz="hero" data-total="1" data-nostore>
          <div class="q" data-q="0" data-answer="B">
            <p class="q-text"><span>A text says your bank account is locked and gives a link to “verify now”. What do you do?</span></p>
            <div class="opts">
              <button type="button" class="opt" data-opt="A"><span class="opt-k">A</span><span class="opt-t">Tap the link quickly so the account is not closed</span></button>
              <button type="button" class="opt" data-opt="B"><span class="opt-k">B</span><span class="opt-t">Ignore the link and open your bank's app or website yourself</span></button>
              <button type="button" class="opt" data-opt="C"><span class="opt-k">C</span><span class="opt-t">Reply to ask if the message is real</span></button>
            </div>
            <div class="q-why" hidden><b data-why-label></b> Scammers create urgency so you act before you think. Go to the bank the way you normally would, never through the link you were sent.</div>
          </div>
          <div class="quiz-foot"><span data-quiz-score>Pick an answer.</span><a class="btn small ghost" href="${u(LESSONS[2] ? LESSONS[2].url : '/learn/')}">Learn to spot scams ${I.arrow}</a></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="wrap section reveal" id="paths">
  <div class="sec-head"><div><p class="kicker">Pick your path</p><h2>Where do you want to start?</h2></div></div>
  <div class="paths">${paths
    .map(
      (p) => `<article class="path ${p.cls}"><span class="card-icon">${p.icon}</span><p class="path-kicker">${p.kicker}</p><h3>${p.title}</h3><p>${p.text}</p><ul>${p.links
        .filter(([h]) => h)
        .map(([h, t]) => `<li><a href="${u(h)}">${I.arrow}${t}</a></li>`)
        .join('')}</ul><a class="btn ${p.cls === 'p-safe' ? 'primary' : ''}" href="${u(p.cta[0])}">${p.cta[1]} ${I.arrow}</a></article>`
    )
    .join('')}</div>
</section>

<section class="wrap section reveal">
  <div class="sec-head"><div><p class="kicker">The beginner course</p><h2>Everything a beginner needs, in ${LESSONS.length} lessons.</h2></div><a class="btn ghost" href="${u('/learn/')}">Course overview ${I.arrow}</a></div>
  <div class="course-grid">${PARTS.map((p, i) => {
    const ls = LESSONS.filter((l) => l.n >= p.from && l.n <= p.to);
    return `<article class="pcard p${(i % 3) + 1}"><div class="pc-top"><span>Part ${i + 1}</span><span>${ls.length} lessons</span></div><h3>${esc(p.name)}</h3><p class="pc-blurb">${esc(p.blurb)}</p><ul>${ls.map((l) => `<li><a href="${u(l.url)}" data-lesson-status="${l.slug}"><span class="wk-dot"></span><span class="wk-n">${l.n}</span>${esc(l.title)}</a></li>`).join('')}</ul></article>`;
  }).join('')}</div>
</section>

<section class="wrap section reveal">
  <p class="kicker">How it works</p>
  <h2 class="h-wide">Read it. Check it. Try it. Prove it.</h2>
  <ol class="method">
    <li><span class="m-n">01</span><b>Read</b><p>A short lesson that starts from something you already know. Every technical word is explained.</p></li>
    <li class="brk"><span class="m-n">02</span><b>Check</b><p>Three quick questions. You see why each answer is right or wrong.</p></li>
    <li class="fx"><span class="m-n">03</span><b>Try</b><p>Something safe and hands-on, on your own device or a practice site built for it.</p></li>
    <li><span class="m-n">04</span><b>Prove</b><p>When you are ready, the roadmap shows how to build work that gets you hired.</p></li>
  </ol>
</section>

<section class="wrap section reveal">
  <div class="honest jargon">
    <div><p class="kicker">Jargon, translated</p><h2>${GLOSSARY.length} words, one plain sentence each.</h2><p>Cybersecurity is full of acronyms. In every lesson, underlined words show a short definition when you hover or tap. The glossary has them all.</p><a class="btn ghost" href="${u('/glossary/')}">Open the glossary ${I.arrow}</a></div>
    <dl class="kw sample">${sampleTerms.map((g) => `<div><dt>${esc(g.term)}</dt><dd>${esc(cap(plain(g.def)))}</dd></div>`).join('')}</dl>
  </div>
</section>

<section class="wrap section reveal">
  <div class="sec-head"><div><p class="kicker">When you want more</p><h2>Tools for the next step, all free.</h2></div></div>
  <div class="card-grid four">${toolkit.map(([href, icon, t, d]) => `<a class="card link-card" href="${u(href)}"><span class="card-icon">${icon}</span><span class="card-title">${t}</span><span class="card-text">${d}</span></a>`).join('')}</div>
</section>

<section class="wrap section reveal">
  <div class="honest">
    <div><p class="kicker">Why trust it</p><h2>It tells you the truth, including the hard parts.</h2><p>No “become a hacker in 30 days”. Real timelines, real job evidence, and a public list of what this site does not cover.</p><a class="btn ghost" href="${u('/limits/')}">Read the limits ${I.arrow}</a></div>
    <ul class="honest-list">
      <li><b>Free and open, for good.</b> Everything is on GitHub under an open licence. No account, no tracking.</li>
      <li><b>Honest timelines.</b> Most people need one to two years to land a first security job, often through IT or development first.</li>
      <li><b>Safe and legal.</b> Every hands-on task uses your own devices or practice sites built for it.</li>
      <li><b>The links work.</b> A scheduled check requests every one of them.</li>
    </ul>
  </div>
</section>

<section class="wrap section final reveal">
  <div class="final-card">
    <h2>Lesson 1 takes 15 minutes.</h2>
    <p>No experience and no setup. Just a browser and some curiosity.</p>
    <div class="cta-row center"><a class="btn primary lg" href="${u(LESSONS[0].url)}" data-continue-lesson>Start lesson 1 ${I.arrow}</a><a class="btn ghost lg" href="${REPO}" target="_blank" rel="noopener">${I.github}Star on GitHub</a></div>
    <p class="rule">${I.flag}<span>The one rule: only test systems you own, practice sites built for it, or bug bounty targets within their published rules.</span></p>
  </div>
</section>`;
  indexMarkdown(read('README.md').replace(/```[\s\S]*?```/g, ''), '/', 'Home', 'Home');
  emit('/', shell({ title: 'Home', page: '/', main, layout: 'home', description: `Learn cybersecurity from zero, free. ${LESSONS.length} plain-English lessons with quizzes, a glossary of ${GLOSSARY.length} terms, a beginner-to-expert roadmap and ${RESOURCE_COUNT} free resources.` }));
}
buildHome();

// ----- 404
emit(
  '/404',
  shell({
    title: 'Page not found',
    page: '/404.html',
    layout: 'home',
    main: `<section class="wrap notfound"><p class="kicker">404</p><h1>That page is not here.</h1><p class="lede">It may have moved when the site was rebuilt. Search for it, or start from the course.</p><div class="cta-row center"><button class="btn primary" type="button" data-search-open>${I.search}Search</button><a class="btn ghost" href="${u('/learn/')}">Go to the course</a></div></section>`,
  })
);

// ---------------------------------------------------------------- write

fs.rmSync(OUT, { recursive: true, force: true });
for (const [page, html] of pages) write(page === '/404' ? '404.html' : `${page.replace(/^\//, '')}index.html`, html);
for (const f of ['site.css', 'app.js', 'favicon.svg']) write(`assets/${f}`, fs.readFileSync(path.join(HERE, 'assets', f)));
write('assets/banner.svg', fs.readFileSync(path.join(ROOT, 'assets/banner.svg')));
write('search.json', JSON.stringify(SEARCH));
write('.nojekyll', '');
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .filter(([p]) => p !== '/404')
    .map(([p]) => `  <url><loc>${SITE_URL}${p}</loc></url>`)
    .join('\n')}\n</urlset>\n`
);

console.log(`Built ${pages.length} pages, ${SEARCH.length} search entries, ${RESOURCE_COUNT} resources -> ${path.relative(ROOT, OUT) || OUT} (base "${BASE || '/'}")`);
if (process.env.DEBUG) for (const w of PLAN.weeks) console.log(`week ${w.n}:`, resourcesForWeek(w.n, w.raw.join(' ')).map((r) => r.title).join(' | '));
