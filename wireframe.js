/* Dealer Show Window wireframe — simplified pick → review → config */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const VERSIONS = {
    A: 'Design A — Bold editorial',
    B: 'Design B — Clean luxe',
    C: 'Design C — Classic brokerage',
  };
  let version = 'A';

  /* ---------- stage navigation ---------- */
  function goStage(stage) {
    $$('.stage').forEach(s => s.classList.toggle('on', s.id === stage));
    $$('.crumbs .c').forEach(c => c.classList.toggle('on', c.dataset.crumb === stage));
    window.scrollTo(0, 0);
    try { localStorage.setItem('dsw_stage', stage); } catch (e) {}
  }

  /* ---------- version (home look) ---------- */
  function setVersion(v) {
    version = v;
    $$('.ver-seg button').forEach(b => b.classList.toggle('on', b.dataset.ver === v));
    $$('.home-variant').forEach(h => h.classList.toggle('on', h.dataset.v === v));
    $('#nowName').textContent = VERSIONS[v];
    const short = 'Design ' + v;
    $('#ctaName').textContent = short;
    $('#cfgName').textContent = short;
    $('#useTop').innerHTML = '♥ Use ' + short;
    try { localStorage.setItem('dsw_ver', v); } catch (e) {}
  }

  /* ---------- page (home / catalog / listing) ---------- */
  function setPage(p) {
    $$('.site-page').forEach(s => s.classList.toggle('on', s.dataset.page === p));
    $$('.site-topnav nav button').forEach(b => b.classList.toggle('on', b.dataset.page === p));
    const suffix = { home: '', catalog: ' / catalog', listing: ' / listing / riva-110' };
    $('#urlText').textContent = 'your-name.yachtway.site' + (suffix[p] || '');
    const sb = $('#siteBody'); if (sb) sb.scrollTop = 0;
  }

  /* ---------- wire it up ---------- */
  $$('[data-pick]').forEach(card => card.addEventListener('click', () => {
    setVersion(card.dataset.pick);
    setPage('home');
    goStage('review');
  }));

  $$('.ver-seg button').forEach(b => b.addEventListener('click', () => { setVersion(b.dataset.ver); }));
  $$('.site-topnav nav button').forEach(b => b.addEventListener('click', () => setPage(b.dataset.page)));

  $('#backBtn').addEventListener('click', () => goStage('pick'));
  $('#useTop').addEventListener('click', () => goStage('config'));
  $('#useBottom').addEventListener('click', () => goStage('config'));
  $('#backReview').addEventListener('click', () => goStage('pick'));

  /* ---------- tweak: line style ---------- */
  $$('[data-line]').forEach(b => b.addEventListener('click', () => {
    const v = b.dataset.line;
    document.body.classList.toggle('clean', v === 'clean');
    document.body.classList.toggle('sketch', v === 'sketch');
    $$('[data-line]').forEach(x => x.classList.toggle('on', x.dataset.line === v));
    try { localStorage.setItem('dsw_line', v); } catch (e) {}
  }));

  /* ---------- tweak: accent ---------- */
  const accents = {
    blue:   { a: '#2f6df0', s: '#dbe7ff' },
    purple: { a: '#7F56D9', s: '#ece4fb' },
    green:  { a: '#1b9e5a', s: '#d7f3e3' },
    ink:    { a: '#2b2b2b', s: '#e4e3dd' },
  };
  $$('[data-accent]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.accent, c = accents[k];
    document.documentElement.style.setProperty('--accent', c.a);
    document.documentElement.style.setProperty('--accent-soft', c.s);
    $$('[data-accent]').forEach(x => x.classList.toggle('on', x === b));
    try { localStorage.setItem('dsw_accent', k); } catch (e) {}
  }));

  /* ---------- restore ---------- */
  (function restore() {
    try {
      const line = localStorage.getItem('dsw_line');
      if (line) { const b = $(`[data-line="${line}"]`); if (b) b.click(); }
      const acc = localStorage.getItem('dsw_accent');
      if (acc && accents[acc]) { const b = $(`[data-accent="${acc}"]`); if (b) b.click(); }
    } catch (e) {}
    setVersion(version);
    setPage('home');
  })();
})();
