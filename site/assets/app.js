/* AI Security in 90 Days — site behaviour. Progress is stored in this browser only. */
(function () {
  'use strict';
  var SITE = window.SITE || { base: '', weeks: [], checklists: [] };
  var KEY = 'ais90:v1';
  var doc = document;
  doc.documentElement.classList.add('js');

  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };

  // ---------------------------------------------------------- storage
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  var S = load();
  function norm() {
    S.weeks = S.weeks || {};
    S.checks = S.checks || {};
    S.artifacts = S.artifacts || {};
  }
  norm();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode: still works for this page */ }
    render();
  }
  var wk = function (n) { return S.weeks[n] || (S.weeks[n] = {}); };
  var weeksDone = function () { return SITE.weeks.filter(function (w) { return S.weeks[w.n] && S.weeks[w.n].done; }).length; };
  var hoursTotal = function (to) {
    return SITE.weeks.reduce(function (sum, w) {
      if (to && w.n > to) return sum;
      return sum + (parseFloat(S.weeks[w.n] && S.weeks[w.n].hours) || 0);
    }, 0);
  };
  var artifactsDone = function () { return [1, 2, 3].filter(function (n) { return S.artifacts[n]; }).length; };
  var scopeCount = function (scope) {
    var p = scope + ':';
    return Object.keys(S.checks).filter(function (k) { return k.indexOf(p) === 0 && S.checks[k]; }).length;
  };
  var fmt = function (h) { return (Math.round(h * 10) / 10).toString(); };

  function toast(msg) {
    var t = $('.toast') || doc.body.appendChild(Object.assign(doc.createElement('div'), { className: 'toast', role: 'status' }));
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  // ---------------------------------------------------------- render state into the page
  function render() {
    var done = weeksDone();
    var total = SITE.weeks.length || 13;
    var hours = hoursTotal();

    $$('[data-week-status]').forEach(function (el) {
      var n = el.getAttribute('data-week-status');
      el.classList.toggle('is-done', !!(S.weeks[n] && S.weeks[n].done));
    });
    $$('[data-week-done]').forEach(function (b) {
      var on = !!(S.weeks[b.getAttribute('data-week-done')] || {}).done;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    $$('[data-week-hours]').forEach(function (i) {
      if (doc.activeElement === i) return;
      var h = (S.weeks[i.getAttribute('data-week-hours')] || {}).hours;
      i.value = h ? h : '';
    });
    $$('[data-week-hours-label]').forEach(function (el) {
      var h = parseFloat((S.weeks[el.getAttribute('data-week-hours-label')] || {}).hours) || 0;
      el.textContent = h ? fmt(h) + ' h' : '';
    });
    $$('[data-artifact]').forEach(function (i) {
      if (doc.activeElement !== i) i.value = S.artifacts[i.getAttribute('data-artifact')] || '';
      var card = i.closest('.artifact');
      if (card) card.classList.toggle('is-live', !!S.artifacts[i.getAttribute('data-artifact')]);
    });

    // task checkboxes, scoped by container
    $$('[data-tasks]').forEach(function (box) {
      var scope = box.getAttribute('data-tasks');
      var boxes = $$('input.task', box);
      boxes.forEach(function (cb) { cb.checked = !!S.checks[scope + ':' + cb.getAttribute('data-i')]; });
      var n = boxes.filter(function (c) { return c.checked; }).length;
      $$('[data-meter-for="' + scope + '"]').forEach(function (m) {
        var bar = $('[data-meter-bar]', m);
        var txt = $('[data-meter-text]', m);
        if (bar) bar.style.width = (boxes.length ? (100 * n) / boxes.length : 0) + '%';
        if (txt) txt.textContent = n + ' of ' + boxes.length + (scope === 'pre' ? ' done' : ' checked');
      });
    });

    // plan progress
    var bar = $('[data-plan-bar]');
    if (bar) bar.style.width = (100 * done) / total + '%';
    var pt = $('[data-plan-text]');
    if (pt) pt.textContent = done + ' of ' + total + ' weeks done';
    var ph = $('[data-plan-hours]');
    if (ph) ph.textContent = fmt(hours) + ' hours logged';

    // continue buttons
    var next = SITE.weeks.filter(function (w) { return !(S.weeks[w.n] && S.weeks[w.n].done); })[0];
    var started = done > 0 || hours > 0;
    $$('[data-continue]').forEach(function (a) {
      var arrow = a.querySelector('svg') ? a.querySelector('svg').outerHTML : '';
      if (!started) return;
      if (next) {
        a.href = next.url;
        a.innerHTML = 'Continue: week ' + next.n + ' ' + arrow;
      } else {
        a.href = SITE.base + '/progress/';
        a.innerHTML = 'All 13 weeks done ' + arrow;
      }
    });

    // header pill
    var ring = $('[data-pill-ring]');
    if (ring) ring.style.strokeDashoffset = 94.25 * (1 - done / total);
    var pill = $('[data-pill-text]');
    if (pill) pill.textContent = started ? done + '/' + total : 'Progress';
    var sm = $('[data-side-meter]');
    if (sm) sm.textContent = started ? done + '/' + total : '';

    // progress page
    var ringBig = $('[data-ring]');
    if (ringBig) ringBig.style.strokeDashoffset = 326.7 * (1 - done / total);
    var set = function (k, v) { var el = $('[data-stat="' + k + '"]'); if (el) el.textContent = v; };
    set('weeks', done);
    set('hours', fmt(hours));
    set('artifacts', artifactsDone());
    set('checks', SITE.checklists.reduce(function (s, c) { return s + scopeCount(c.scope); }, 0));

    var cl = $('[data-checklist-progress]');
    if (cl) {
      cl.innerHTML = SITE.checklists.map(function (c) {
        var n = scopeCount(c.scope);
        return '<a class="cl-item" href="' + c.url + '"><span>' + c.title + '</span><span class="meter"><span class="meter-bar"><i style="width:' + (c.total ? (100 * n) / c.total : 0) + '%"></i></span>' + n + '/' + c.total + '</span></a>';
      }).join('');
    }

    var exitH = $('[data-exit="hours4"]');
    if (exitH) {
      var h4 = hoursTotal(4);
      var w4done = !!(S.weeks[4] && S.weeks[4].done);
      exitH.className = h4 >= 20 ? 'ok' : w4done ? 'bad' : h4 > 0 ? 'wait' : '';
      $('[data-exit-text]', exitH).textContent = fmt(h4) + ' of 20 hours so far.';
    }
    var exitA = $('[data-exit="art6"]');
    if (exitA) {
      var any = artifactsDone() > 0;
      var w6 = !!(S.weeks[6] && S.weeks[6].done);
      exitA.className = any ? 'ok' : w6 ? 'bad' : done > 0 ? 'wait' : '';
      $('[data-exit-text]', exitA).textContent = any ? 'Done.' : 'Nothing published yet.';
    }
  }

  // ---------------------------------------------------------- events
  doc.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches('input.task')) {
      var box = t.closest('[data-tasks]');
      if (!box) return;
      var k = box.getAttribute('data-tasks') + ':' + t.getAttribute('data-i');
      if (t.checked) S.checks[k] = 1; else delete S.checks[k];
      save();
    } else if (t.matches('[data-import]')) {
      var f = t.files && t.files[0];
      if (!f) return;
      f.text().then(function (txt) {
        var data = JSON.parse(txt);
        if (!data || typeof data !== 'object') throw new Error('bad');
        S = data; norm(); save(); toast('Progress imported');
      }).catch(function () { toast('That file is not a progress export'); });
      t.value = '';
    }
  });

  doc.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches('[data-week-hours]')) {
      var v = parseFloat(t.value);
      wk(t.getAttribute('data-week-hours')).hours = isFinite(v) && v > 0 ? Math.min(v, 80) : 0;
      save();
    } else if (t.matches('[data-artifact]')) {
      var val = t.value.trim();
      if (val) S.artifacts[t.getAttribute('data-artifact')] = val; else delete S.artifacts[t.getAttribute('data-artifact')];
      save();
    } else if (t.matches('[data-res-filter]')) {
      filterResources(t.value);
    }
  });

  doc.addEventListener('click', function (e) {
    var t = e.target.closest('button, a, li, [data-search-close], [data-menu-close]');
    if (!t) return;

    // clicking a checklist row toggles its box
    if (t.tagName === 'LI' && !e.target.closest('a, input, label')) {
      var cb = t.querySelector(':scope > input.task, :scope > p > input.task');
      if (cb) { cb.checked = !cb.checked; cb.dispatchEvent(new Event('change', { bubbles: true })); }
      return;
    }
    if (t.matches('[data-week-done]')) {
      var w = wk(t.getAttribute('data-week-done'));
      w.done = !w.done;
      save();
      if (w.done) toast('Week ' + t.getAttribute('data-week-done') + ' complete. Nice work.');
    } else if (t.matches('[data-theme-toggle]')) {
      var next = doc.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      doc.documentElement.dataset.theme = next;
      try { localStorage.setItem('ais90-theme', next); } catch (err) { /* ignore */ }
    } else if (t.matches('[data-menu]')) {
      doc.body.classList.add('nav-open');
      t.setAttribute('aria-expanded', 'true');
    } else if (t.matches('[data-menu-close]')) {
      closeMenu();
    } else if (t.matches('[data-search-open]')) {
      openSearch();
    } else if (t.matches('[data-search-close]')) {
      closeSearch();
    } else if (t.matches('[data-copy]')) {
      copy(t.parentNode.querySelector('pre').innerText, t);
    } else if (t.matches('[data-copy-raw]')) {
      copy($('#raw-md').textContent, null, 'Markdown copied');
    } else if (t.matches('[data-download-raw]')) {
      var blob = new Blob([$('#raw-md').textContent], { type: 'text/markdown' });
      var a = doc.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = t.getAttribute('data-download-raw');
      doc.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    } else if (t.matches('[data-reset-scope]')) {
      var scope = t.getAttribute('data-reset-scope') + ':';
      if (!confirm('Clear every tick on this checklist?')) return;
      Object.keys(S.checks).forEach(function (k) { if (k.indexOf(scope) === 0) delete S.checks[k]; });
      save();
    } else if (t.matches('[data-export]')) {
      var out = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
      var l = doc.createElement('a');
      l.href = URL.createObjectURL(out);
      l.download = 'ai-security-90-days-progress.json';
      doc.body.appendChild(l); l.click(); l.remove();
    } else if (t.matches('[data-reset-all]')) {
      if (!confirm('Erase all progress saved in this browser? Export a backup first if you want to keep it.')) return;
      S = {}; norm(); save(); toast('Progress cleared');
    } else if (t.matches('[data-cond]')) {
      t.setAttribute('aria-pressed', t.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
      trifecta();
    }
  });

  function copy(text, btn, msg) {
    var done = function () {
      if (btn) { var o = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = o; }, 1400); }
      else toast(msg || 'Copied');
    };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { toast('Copy failed'); });
  }

  function closeMenu() {
    doc.body.classList.remove('nav-open');
    var b = $('[data-menu]');
    if (b) b.setAttribute('aria-expanded', 'false');
  }

  // ---------------------------------------------------------- trifecta widget
  var TRI = {
    data: 'access to private data',
    untrusted: 'exposure to untrusted content',
    exfil: 'a way to send data out',
  };
  function trifecta() {
    var vis = $('[data-trifecta]');
    var status = $('[data-tri-status]');
    if (!vis || !status) return;
    var on = {};
    $$('[data-cond]').forEach(function (b) { on[b.getAttribute('data-cond')] = b.getAttribute('aria-pressed') === 'true'; });
    $$('[data-circle]', vis).forEach(function (c) { c.classList.toggle('off', !on[c.getAttribute('data-circle')]); });
    var missing = Object.keys(TRI).filter(function (k) { return !on[k]; });
    vis.classList.toggle('leaking', missing.length === 0);
    status.className = 'tri-status ' + (missing.length ? 'safe' : 'leak');
    var msg;
    if (!missing.length) msg = '<b>Leak possible.</b>An injected page, file or email can make the model collect your private data and send it out.';
    else if (missing.length === 1 && missing[0] === 'data') msg = '<b>Nothing to steal.</b>Injection can still mislead the output, but there is no private data in reach to leak.';
    else if (missing.length === 1 && missing[0] === 'untrusted') msg = '<b>Nothing to inject through.</b>Only trusted content reaches the model, so an attacker has no way to plant instructions.';
    else if (missing.length === 1 && missing[0] === 'exfil') msg = '<b>No way out.</b>The model may be tricked into reading the secret, but cannot send it anywhere. Watch for Markdown images and links: they are a way out.';
    else msg = '<b>Contained.</b>Without ' + missing.map(function (k) { return TRI[k]; }).join(' or ') + ', an injection cannot turn into data theft.';
    status.innerHTML = msg;
  }

  // ---------------------------------------------------------- resource filter
  function filterResources(q) {
    q = q.trim().toLowerCase();
    var terms = q.split(/\s+/).filter(Boolean);
    var shown = 0;
    var cards = $$('.res');
    cards.forEach(function (c) {
      var hay = c.getAttribute('data-q') || '';
      var ok = terms.every(function (t) { return hay.indexOf(t) !== -1; });
      c.hidden = !ok;
      if (ok) shown++;
    });
    $$('[data-res-section]').forEach(function (s) {
      var vis = $$('.res', s).some(function (c) { return !c.hidden; });
      s.hidden = terms.length > 0 && !vis;
      $$('.prose', s).forEach(function (p) { p.hidden = terms.length > 0; });
      $$('.res-grid', s).forEach(function (g) {
        g.hidden = terms.length > 0 && !$$('.res', g).some(function (c) { return !c.hidden; });
      });
      $$('.res-sub', s).forEach(function (h) {
        var g = h.nextElementSibling;
        h.hidden = terms.length > 0 && !(g && g.classList.contains('res-grid') && !g.hidden);
      });
    });
    var cnt = $('[data-res-count]');
    var uniq = {};
    cards.forEach(function (c) { if (!c.hidden) uniq[c.getAttribute('href')] = 1; });
    var nu = Object.keys(uniq).length;
    if (cnt) cnt.textContent = terms.length ? nu + ' match' + (nu === 1 ? '' : 'es') : nu + ' links';
    var empty = $('[data-res-empty]');
    if (empty) empty.hidden = !(terms.length && !shown);
  }
  if ($('[data-res-filter]')) {
    var q0 = new URLSearchParams(location.search).get('q');
    if (q0) $('[data-res-filter]').value = q0;
    filterResources($('[data-res-filter]').value);
  }

  // ---------------------------------------------------------- search
  var modal = $('[data-search-modal]');
  var input = $('[data-search-input]');
  var list = $('[data-search-results]');
  var INDEX = null;
  var sel = 0;
  var lastFocus = null;

  function openSearch() {
    if (!modal) return;
    lastFocus = doc.activeElement;
    closeMenu();
    modal.hidden = false;
    doc.body.style.overflow = 'hidden';
    input.value = '';
    renderResults('');
    setTimeout(function () { input.focus(); }, 10);
    if (!INDEX) {
      fetch(SITE.base + '/search.json').then(function (r) { return r.json(); }).then(function (d) {
        INDEX = d.map(function (e) { e.h = (e.t + ' ' + e.x).toLowerCase(); e.tl = e.t.toLowerCase(); return e; });
        renderResults(input.value);
      }).catch(function () { list.innerHTML = '<li class="search-empty">Search could not load. Check your connection.</li>'; });
    }
  }
  function closeSearch() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    doc.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  var escHtml = function (s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  function hl(text, terms) {
    var out = escHtml(text);
    terms.forEach(function (t) {
      if (t.length < 2) return;
      out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
    });
    return out;
  }
  function snippet(x, terms) {
    var lx = x.toLowerCase();
    var i = terms.length ? lx.indexOf(terms[0]) : 0;
    if (i < 0) i = 0;
    var start = Math.max(0, i - 50);
    return (start ? '…' : '') + x.slice(start, start + 170) + (x.length > start + 170 ? '…' : '');
  }
  var SUGGEST = ['Week 1', 'prompt injection', 'lethal trifecta', 'threat model', 'RAG', 'MCP', 'Burp Suite', 'Security+'];
  function renderResults(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      list.innerHTML = '<li class="search-empty">Try: ' + SUGGEST.map(function (s) { return '<a href="#" data-suggest="' + s + '" style="display:inline;padding:0;color:var(--accent)">' + s + '</a>'; }).join(' · ') + '</li>';
      return;
    }
    if (!INDEX) { list.innerHTML = '<li class="search-empty">Loading…</li>'; return; }
    var res = [];
    INDEX.forEach(function (e) {
      if (!terms.every(function (t) { return e.h.indexOf(t) !== -1; })) return;
      var score = 0;
      terms.forEach(function (t) {
        if (e.tl.indexOf(t) === 0) score += 12;
        else if (e.tl.indexOf(t) !== -1) score += 8;
        score += Math.min(3, e.h.split(t).length - 1);
      });
      if (e.k === 'Week') score += 3;
      if (e.k === 'Resource') score -= 1;
      res.push([score, e]);
    });
    res.sort(function (a, b) { return b[0] - a[0]; });
    res = res.slice(0, 30);
    sel = 0;
    if (!res.length) { list.innerHTML = '<li class="search-empty">No results for “' + escHtml(q) + '”.</li>'; return; }
    list.innerHTML = res.map(function (r, i) {
      var e = r[1];
      return '<li role="option"' + (i === 0 ? ' class="sel" aria-selected="true"' : '') + '><a href="' + e.u + '"' + (e.ext ? ' target="_blank" rel="noopener"' : '') + '><span class="sr-top"><span class="sr-k ' + e.k + '">' + e.k + '</span><span class="sr-t">' + hl(e.t, terms) + (e.ext ? ' ↗' : '') + '</span></span><span class="sr-x">' + hl(snippet(e.x, terms), terms) + '</span></a></li>';
    }).join('');
  }
  function move(d) {
    var items = $$('li[role=option]', list);
    if (!items.length) return;
    items[sel].classList.remove('sel');
    items[sel].removeAttribute('aria-selected');
    sel = (sel + d + items.length) % items.length;
    items[sel].classList.add('sel');
    items[sel].setAttribute('aria-selected', 'true');
    items[sel].scrollIntoView({ block: 'nearest' });
  }
  if (input) {
    input.addEventListener('input', function () { renderResults(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') {
        var a = $('li.sel a', list);
        if (a) { e.preventDefault(); a.click(); closeSearch(); }
      }
    });
    list.addEventListener('click', function (e) {
      var s = e.target.closest('[data-suggest]');
      if (s) { e.preventDefault(); input.value = s.getAttribute('data-suggest'); renderResults(input.value); input.focus(); return; }
      if (e.target.closest('a')) closeSearch();
    });
  }
  doc.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(doc.activeElement && doc.activeElement.tagName);
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      if (modal && modal.hidden) openSearch(); else closeSearch();
    } else if (e.key === 'Escape') {
      closeSearch();
      closeMenu();
    }
  });

  // ---------------------------------------------------------- table of contents highlight
  var tocLinks = $$('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var heads = Object.keys(map).map(function (id) { return doc.getElementById(id); }).filter(Boolean);
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove('active'); });
          map[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-15% 0px -75% 0px' });
    heads.forEach(function (h) { obs.observe(h); });
  }

  // ---------------------------------------------------------- reveal on scroll
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { ro.observe(r); });
  } else reveals.forEach(function (r) { r.classList.add('in'); });

  // close the drawer when a link in it is followed
  $$('.sidebar a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // other tabs
  window.addEventListener('storage', function (e) { if (e.key === KEY) { S = load(); norm(); render(); } });

  trifecta();
  render();
})();
