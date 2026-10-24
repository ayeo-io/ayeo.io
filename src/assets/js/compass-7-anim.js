// The animated figure in the Compass 7.0.0 news post. Every tween is an absolute setter, so the
// scrubber can render any moment; it plays once when scrolled into view and rests at its end
// state for reduced motion. Styles are set through CSSOM, which the site's CSP allows; font sizes
// go there too so they win over the site-wide `svg text { font-size }` rule.
// Two layouts share one timeline: "wide" for the article column and "narrow" for phones. The
// figure is rebuilt when its width crosses NARROW_BELOW and resumes at the same moment.
// Stages and document names follow Compass 7.0.0 (compass-contract.md, commands/*.md).
(() => {
  const root = document.getElementById('compass-7-anim');
  if (!root) return;
  const svg = root.querySelector('.ca-stage svg');
  const NS = 'http://www.w3.org/2000/svg';
  const NARROW_BELOW = 520;
  const END = 32.5;

  const STAGES = ['assess', 'define', 'refine', 'plan', 'breakdown', 'implement', 'verify', 'ship'];
  const DOCS = [
    { name: 'intent.md', stage: 'assess' },
    { name: 'acceptance-criteria.md', stage: 'define', human: true },
    { name: 'requirements-review.md', stage: 'refine' },
    { name: 'technical-design.md', stage: 'plan' }
  ];

  const LAYOUTS = {
    wide: {
      w: 640, h: 384, trackY: 44, stageX: i => 44 + i * 79, labelY: () => 26, labelSize: 12,
      cardW: 276, cardH: 50, card: i => [18 + (i % 2) * 284, 92 + Math.floor(i / 2) * 58],
      gateX: 598, gateY: [84, 206], gateOpen: 22, decY: 222, decW: 404, decTwoLine: false,
      termY: 272, termH: 96, termLines: [28, 52, 78], refusal: ['× Ship refused: acceptance-criteria.md is awaiting approval'],
      rel: { x: 32, y: 112, size: 20 }, endSize: 26, capSize: 15
    },
    narrow: {
      w: 360, h: 452, trackY: 50, stageX: i => 26 + i * 44, labelY: i => (i % 2 ? 76 : 30), labelSize: 11,
      cardW: 318, cardH: 40, card: i => [12, 96 + i * 46],
      gateX: 342, gateY: [94, 280], gateOpen: 12, decY: 292, decW: 318, decTwoLine: true,
      termY: 350, termH: 94, termLines: [24, 44, 62, 84], refusal: ['× Ship refused: acceptance-criteria.md', '  is awaiting approval'],
      rel: { x: 20, y: 124, size: 17 }, endSize: 20, capSize: 15
    }
  };

  const rr = (x, y, w, h, r) => `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
  const smooth = t => t * t * t * (t * (t * 6 - 15) + 10);
  const lin = t => t;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const C = n => `var(--ca-${n})`;

  let inits, tweens;

  function build(L) {
    while (svg.lastChild && svg.lastChild.nodeName !== 'desc') svg.removeChild(svg.lastChild);
    svg.setAttribute('viewBox', `0 0 ${L.w} ${L.h}`);
    inits = []; tweens = [];

    const E = (tag, a = {}, p = svg) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
    const init = fn => inits.push(fn);
    const at = (start, dur, fn, ease = smooth) => tweens.push({ start, dur, fn, ease });
    const op = (e, v) => { e.style.opacity = v; };
    const drawable = e => { e.setAttribute('pathLength', 1); e.style.strokeDasharray = '1 1'; init(() => { e.style.strokeDashoffset = 1; e.style.visibility = 'hidden'; }); return e; };
    const draw = (e, p) => { e.style.strokeDashoffset = 1 - p; e.style.visibility = p > .002 ? 'visible' : 'hidden'; };
    const hidden = e => { init(() => op(e, 0)); return e; };
    const fadeIn = (e, s, d = .4) => at(s, d, p => op(e, p));
    const fadeOut = (e, s, d = .4) => at(s, d, p => op(e, 1 - p));
    const swap = (a, b, s, d = .4) => at(s, d, p => { op(a, 1 - p); op(b, p); });
    const stroke = (e, c, w = 1.8) => { e.style.stroke = C(c); e.style.strokeWidth = w; e.style.fill = 'none'; e.style.strokeLinecap = 'round'; e.style.strokeLinejoin = 'round'; return e; };
    const text = (x, y, s, size, color, p = svg, extra = {}) => { const t = E('text', { x, y, ...extra }, p); t.textContent = s; t.style.fill = C(color); t.style.fontSize = size + 'px'; return t; };
    const typer = (t, full, s, d) => { init(() => { t.textContent = ''; }); at(s, d, p => { t.textContent = full.slice(0, Math.round(p * full.length)); }, lin); };

    const X = L.stageX;
    const CHECK_X = (X(3) + X(4)) / 2;

    // ---------- stage track ----------
    const track = stroke(drawable(E('path', { d: `M${X(0)} ${L.trackY}H${X(7)}` })), 'border-strong');
    at(0, 1.2, p => draw(track, p));
    STAGES.forEach((s, i) => {
      const node = E('circle', { cx: X(i), cy: L.trackY, r: 3 });
      stroke(node, 'border-strong'); node.style.fill = C('bg');
      const lab = text(X(i), L.labelY(i), s, L.labelSize, 'fg-muted', svg, { 'text-anchor': 'middle' });
      hidden(node); hidden(lab);
      fadeIn(node, .3 + i * .1, .3); fadeIn(lab, .45 + i * .1, .4);
    });

    // checkpoint after /compass:plan
    const dia = `M${CHECK_X} ${L.trackY - 7}L${CHECK_X + 7} ${L.trackY}L${CHECK_X} ${L.trackY + 7}L${CHECK_X - 7} ${L.trackY}Z`;
    const ckRing = E('circle', { cx: CHECK_X, cy: L.trackY, r: 7 }); stroke(ckRing, 'primary', 1.5); hidden(ckRing);
    const ck = E('path', { d: dia }); stroke(ck, 'fg-muted', 1.5); ck.style.fill = C('bg'); hidden(ck);
    const ckOk = E('path', { d: dia }); ckOk.style.fill = C('accent'); hidden(ckOk);
    fadeIn(ck, 11.4);
    if (L === LAYOUTS.wide) {
      const ckLab = text(CHECK_X, L.trackY + 26, 'checkpoint', 11, 'fg-subtle', svg, { 'text-anchor': 'middle' }); hidden(ckLab);
      fadeIn(ckLab, 11.6);
    }

    // ---------- gate: /compass:ship ----------
    const gMid = (L.gateY[0] + L.gateY[1]) / 2;
    const gateTop = stroke(drawable(E('path', { d: `M${L.gateX} ${L.gateY[0]}V${gMid}` })), 'fg', 2.2);
    const gateBot = stroke(drawable(E('path', { d: `M${L.gateX} ${gMid}V${L.gateY[1]}` })), 'fg', 2.2);
    init(() => { [gateTop, gateBot].forEach(g => { g.style.stroke = C('fg'); g.style.strokeWidth = 2.2; g.removeAttribute('transform'); }); });
    at(19.0, .6, p => { draw(gateTop, p); draw(gateBot, p); });

    // ---------- documents ----------
    const clip = E('clipPath', { id: 'ca-clip' }, E('defs'));
    E('rect', { x: 0, y: 0, width: L.gateX, height: L.h }, clip);
    const outer = E('g', { 'clip-path': 'url(#ca-clip)' });
    const queue = E('g', {}, outer);
    const setDx = dx => queue.setAttribute('transform', `translate(${dx} 0)`);
    init(() => setDx(0));

    const W = L.cardW, H = L.cardH;
    const CHIP_W = 76, chipX = W - 12 - CHIP_W, chipY = (H - 18) / 2;
    const cards = DOCS.map((d, i) => {
      const [cx, cy] = L.card(i);
      const g = E('g', { transform: `translate(${cx} ${cy})` }, queue);
      const body = stroke(drawable(E('path', { d: rr(0, 0, W, H, 6) }, g)), 'border-strong', 1.2);
      init(() => { body.style.fill = C('bg-subtle'); body.style.fillOpacity = 0; });
      const emph = stroke(E('path', { d: rr(0, 0, W, H, 6) }, g), 'fg', 2); hidden(emph);
      const inner = E('g', {}, g); hidden(inner);
      const nameY = H > 44 ? 21 : 17, subY = H > 44 ? 38 : 31;
      text(12, nameY, d.name, 12, 'fg', inner);
      const sub = text(12, subY, d.stage, 10.5, 'fg-subtle', inner);
      let humanSub = null;
      if (d.human) {
        sub.textContent = d.stage + ' ·';
        humanSub = text(12 + (d.stage.length + 3) * 6.3, subY, 'human check', 10.5, 'primary', inner); hidden(humanSub);
      }
      const chip = (label, kind) => {
        const c = E('g', {}, g); hidden(c);
        const r = E('path', { d: rr(chipX, chipY, CHIP_W, 18, 4) }, c);
        if (kind === 'draft') stroke(r, 'border-strong', 1.2);
        if (kind === 'ok') { stroke(r, 'accent', 1.2); r.style.fill = C('ok-fill'); }
        if (kind === 'wait') { stroke(r, 'primary', 1.2); r.style.strokeDasharray = '3 3'; }
        text(chipX + CHIP_W / 2, chipY + 13, label, 11, kind === 'draft' ? 'fg-subtle' : kind === 'ok' ? 'ok-fg' : 'primary', c, { 'text-anchor': 'middle' });
        return c;
      };
      const c = { g, x: cx, y: cy, body, emph, inner, humanSub, draft: chip('draft', 'draft'), ok: chip('approved', 'ok'), wait: chip('awaiting', 'wait') };
      at(1.2 + i * .25, .9, p => draw(body, p));
      at(1.7 + i * .25, .6, p => { body.style.fillOpacity = p; op(inner, p); });
      fadeIn(c.draft, 2.6 + i * .12, .4);
      return c;
    });

    // a box ticked by hand on technical-design.md, which no longer counts
    const td = cards[3].g;
    const bx = chipX - 22, by = chipY + 3;
    const box = stroke(E('path', { d: rr(bx, by, 12, 12, 2) }, td), 'fg-muted', 1.2); hidden(box);
    const tick = stroke(drawable(E('path', { d: `M${bx + 3} ${by + 6.5}L${bx + 5.4} ${by + 9}L${bx + 9.5} ${by + 3}` }, td)), 'fg', 1.6);
    fadeIn(box, 4.2, .3);
    at(4.5, .6, p => draw(tick, p));
    at(6.7, .7, p => draw(tick, 1 - p));
    fadeOut(box, 7.1, .4);

    // ---------- playhead ----------
    const ph = E('g', {}); hidden(ph);
    const halo = E('circle', { r: 10 }, ph); halo.style.fill = C('accent'); halo.style.opacity = .18;
    E('circle', { r: 5.5 }, ph).style.fill = C('accent');
    const phX = x => ph.setAttribute('transform', `translate(${x} ${L.trackY})`);
    init(() => phX(X(0)));
    fadeIn(ph, 8.0, .3);
    const move = (s, a, b, d = .8) => at(s, d, p => phX(lerp(a, b, p)));
    move(8.3, X(0), X(1)); move(9.5, X(1), X(2)); move(10.7, X(2), X(3)); move(11.9, X(3), CHECK_X);
    move(17.1, CHECK_X, X(4), .5); move(17.6, X(4), X(5), .55); move(18.15, X(5), X(6), .55); move(19.8, X(6), X(7), 1.0);

    // each stage sets the status of the document it wrote as it ends
    swap(cards[0].draft, cards[0].ok, 9.1);
    fadeIn(cards[1].humanSub, 9.9);
    swap(cards[1].draft, cards[1].wait, 10.3);
    swap(cards[2].draft, cards[2].ok, 11.5);
    swap(cards[3].draft, cards[3].ok, 12.7);

    // ---------- agent decision ----------
    const c3 = cards[3];
    const wx = c3.x + W / 2, wy = c3.y + H;
    const wire = stroke(drawable(E('path', { d: `M${wx} ${wy}C${wx} ${L.decY - 6} ${wx - 40} ${L.decY + 4} ${Math.min(wx - 60, L.decW - 20)} ${L.decY}` })), 'border-strong', 1.2);
    init(() => op(wire, 1));
    at(13.0, .8, p => draw(wire, p));
    fadeOut(wire, 26.2, .6);
    const decH = L.decTwoLine ? 46 : 34;
    const dec = E('g', { transform: `translate(${L === LAYOUTS.wide ? 18 : 12} ${L.decY})` });
    const decBox = stroke(drawable(E('path', { d: rr(0, 0, L.decW, decH, 6) }, dec)), 'border', 1.2);
    init(() => { decBox.style.fill = C('bg-subtle'); decBox.style.fillOpacity = 0; });
    at(13.6, .6, p => { draw(decBox, p); decBox.style.fillOpacity = p; });
    const decIn = E('g', {}, dec); hidden(decIn);
    const dn = E('circle', { cx: 15, cy: 17, r: 3 }, decIn); dn.style.fill = C('primary');
    const dnOk = E('circle', { cx: 15, cy: 17, r: 3 }, decIn); dnOk.style.fill = C('accent'); hidden(dnOk);
    text(27, 21, 'decision · due dates in local time', 12, 'fg', decIn);
    const sx = L.decTwoLine ? 27 : L.decW - 12, sy = L.decTwoLine ? 37 : 21, sa = L.decTwoLine ? 'start' : 'end';
    const un = text(sx, sy, 'unconfirmed', 11, 'fg-subtle', decIn, { 'text-anchor': sa });
    const cf = text(sx, sy, 'confirmed', 11, 'ok-fg', decIn, { 'text-anchor': sa }); hidden(cf);
    fadeIn(decIn, 14.0);
    at(13.9, 2.7, (p, el) => {
      const k = (el % 1.1) / 1.1;
      ckRing.setAttribute('r', 7 + 11 * k);
      op(ckRing, el >= 2.7 ? 0 : .8 * (1 - k));
    }, lin);
    swap(un, cf, 16.6); fadeIn(dnOk, 16.6); fadeIn(ckOk, 16.6);

    // ---------- shipping ----------
    const left = Math.min(...cards.map(c => c.x)), right = Math.max(...cards.map(c => c.x + W));
    const push = L.gateX - 8 - right, back = push - 18, through = L.gateX - left + 12;
    at(19.8, 1.0, p => setDx(lerp(0, push, p)));
    const top = Math.min(...cards.map(c => c.y)) - 4, bot = Math.max(...cards.map(c => c.y + H)) + 4;
    const scan = stroke(E('path', { d: `M0 ${top}V${bot}` }), 'accent', 1.5); hidden(scan);
    at(20.9, .7, p => { scan.setAttribute('transform', `translate(${lerp(L.gateX - 10, left, p)} 0)`); op(scan, Math.sin(p * Math.PI) * .9); }, lin);
    fadeIn(cards[1].emph, 21.15, .2);
    at(21.6, .45, p => setDx(lerp(push, back, p)));
    at(21.6, .5, p => { const w = 2.2 + 1.6 * Math.sin(p * Math.PI); gateTop.style.strokeWidth = w; gateBot.style.strokeWidth = w; }, lin);

    // the Claude Code session
    const tw = L.w - 2 * (L === LAYOUTS.wide ? 18 : 12);
    const term = E('g', { transform: `translate(${L === LAYOUTS.wide ? 18 : 12} ${L.termY})` });
    const tBox = drawable(E('path', { d: rr(0, 0, tw, L.termH, 6) }, term));
    stroke(tBox, 'border', 1.2);
    init(() => { tBox.style.fill = C('bg-muted'); tBox.style.fillOpacity = 0; });
    at(18.8, .5, p => { draw(tBox, p); tBox.style.fillOpacity = p; });
    const tLab = text(tw - 12, 16, 'CLAUDE CODE', 9.5, 'fg-subtle', term, { 'text-anchor': 'end', 'letter-spacing': '0.08em' }); hidden(tLab);
    fadeIn(tLab, 19.0);
    const [ya, ...rest] = L.termLines;
    const yc = rest.pop();
    const pr0 = text(14, ya, '›', 14, 'primary', term); hidden(pr0);
    fadeIn(pr0, 19.1, .3);
    const l0 = text(30, ya, '', 12.5, 'fg', term);
    typer(l0, '/compass:ship', 19.3, .7);
    const refusal = L.refusal.map((line, k) => {
      const t = text(30, rest[k], '', 12, 'fg-muted', term); t.style.whiteSpace = 'pre';
      typer(t, line, 22.1 + k * .6, .6);
      return t;
    });
    init(() => refusal.forEach(t => op(t, 1)));
    at(25.2, .4, p => refusal.forEach(t => op(t, lerp(1, .5, p))));
    const pr = text(14, yc, '›', 14, 'primary', term); hidden(pr);
    fadeIn(pr, 23.2, .3);
    const l2 = text(30, yc, '', 12.5, 'fg', term);
    typer(l2, '/compass:approve', 23.7, .9);
    const cur = E('rect', { y: yc - 11, width: 7, height: 14 }, term); cur.style.fill = C('fg'); hidden(cur);
    at(23.71, 1.69, (p, el) => {
      el += .51;
      const n = Math.round(clamp((el - .5) / .9) * 16);
      cur.setAttribute('x', 31 + (n ? l2.getComputedTextLength() : 0));
      op(cur, el >= 2.19 ? 0 : (Math.floor(el * 2.4) % 2 ? .25 : .9));
    }, lin);

    // approved: the gate opens and the change ships
    swap(cards[1].wait, cards[1].ok, 25.0);
    fadeOut(cards[1].emph, 25.0);
    at(25.5, .6, p => {
      const o = L.gateOpen * p;
      gateTop.setAttribute('transform', `translate(0 ${-o})`);
      gateBot.setAttribute('transform', `translate(0 ${o})`);
      if (p > .3) { gateTop.style.stroke = C('accent'); gateBot.style.stroke = C('accent'); }
    });
    at(26.0, 1.6, p => setDx(lerp(back, through, p)));

    // the release line it leaves behind
    const rel = E('g', {}); hidden(rel);
    const R = L.rel;
    text(R.x, R.y, 'EXAMPLE PROJECT', 9.5, 'fg-subtle', rel, { 'letter-spacing': '0.08em' });
    text(R.x, R.y + 22, 'Release line, written for a user', 12, 'fg-muted', rel);
    text(R.x, R.y + 26 + R.size * 1.3, 'Invoices now show due dates', R.size, 'fg', rel, { class: 'sans', 'font-weight': 600 });
    text(R.x, R.y + 26 + R.size * 2.6, 'in the customer’s local time.', R.size, 'fg', rel, { class: 'sans', 'font-weight': 600 });
    at(27.7, .7, p => { op(rel, p); rel.setAttribute('transform', `translate(0 ${8 * (1 - p)})`); });

    // end card
    const veil = E('rect', { x: 0, y: 0, width: L.w, height: L.h }); veil.style.fill = C('bg'); hidden(veil);
    at(30.0, .8, p => op(veil, p));
    const end = E('g', {}); hidden(end);
    const cy0 = L.h / 2 - L.endSize * .4;
    text(L.w / 2, cy0, 'See what your agent decided', L.endSize, 'fg', end, { class: 'sans', 'font-weight': 600, 'text-anchor': 'middle' });
    text(L.w / 2, cy0 + L.endSize * 1.3, 'before anything ships.', L.endSize, 'fg', end, { class: 'sans', 'font-weight': 600, 'text-anchor': 'middle' });
    const ver = text(L.w / 2, cy0 + L.endSize * 1.3 + 34, 'Compass 7.0.0', 13, 'primary', end, { 'text-anchor': 'middle' }); hidden(ver);
    at(30.4, .8, p => { op(end, p); end.setAttribute('transform', `translate(0 ${6 * (1 - p)})`); });
    fadeIn(ver, 31.0, .5);

    tweens.sort((a, b) => a.start - b.start);
  }

  // ---------- captions ----------
  const CAPS = [
    [0, 'Compass writes a set of documents for every change.'],
    [4.0, 'Before 7.0.0 nothing checked them. A box ticked by hand counted as evidence.'],
    [7.8, 'Now each stage sets the status of the documents it writes. One with a human check waits for a person.'],
    [12.9, 'When your agent makes a decision for you, Compass records it and waits at a checkpoint until you confirm it.'],
    [18.8, '<code>/compass:ship</code> refuses a document that is still a draft or awaiting approval.'],
    [23.2, 'You approve with <code>/compass:approve</code>, in the Claude Code session you are already in.'],
    [27.3, 'Every shipped change leaves one release line, written for a user.'],
    [30.0, 'Compass 7.0.0 is out now.']
  ];
  const capEl = root.querySelector('.ca-caption');
  const srList = root.querySelector('.ca-sr');
  srList.textContent = '';
  CAPS.forEach(([, h]) => { const li = document.createElement('li'); li.innerHTML = h; srList.appendChild(li); });
  let capIdx = -1;
  const setCaption = t => {
    let i = 0; for (let k = 0; k < CAPS.length; k++) if (t >= CAPS[k][0]) i = k;
    if (i !== capIdx) { capIdx = i; capEl.innerHTML = CAPS[i][1]; }
  };

  // ---------- render + playback ----------
  const playBtn = root.querySelector('.ca-play');
  const range = root.querySelector('input[type=range]');
  let time = 0, playing = false, last = 0, layout = null;
  const render = t => {
    inits.forEach(f => f());
    for (const tw of tweens) {
      if (t < tw.start) break;
      const el = t - tw.start;
      tw.fn(tw.ease(tw.dur ? clamp(el / tw.dur) : 1), el);
    }
    setCaption(t);
    range.value = Math.round(t / END * 1000);
  };
  const fit = () => {
    const want = root.clientWidth < NARROW_BELOW ? 'narrow' : 'wide';
    if (want !== layout) { layout = want; root.dataset.layout = want; build(LAYOUTS[want]); render(time); }
  };

  const ICON_PLAY = '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l12-7.5z"/></svg>';
  const ICON_PAUSE = '<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>';
  const setBtn = () => { playBtn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY; playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play'); };
  const frame = now => {
    if (!playing) return;
    time = Math.min(END, time + (now - last) / 1000); last = now;
    render(time);
    if (time >= END) { playing = false; setBtn(); return; }
    requestAnimationFrame(frame);
  };
  const play = () => { if (time >= END) time = 0; playing = true; last = performance.now(); setBtn(); requestAnimationFrame(frame); };
  const pause = () => { playing = false; setBtn(); };
  playBtn.addEventListener('click', () => playing ? pause() : play());
  root.querySelector('.ca-replay').addEventListener('click', () => { time = 0; play(); });
  range.addEventListener('input', () => { pause(); time = range.value / 1000 * END; render(time); });
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(root); else addEventListener('resize', fit);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  time = reduce ? END : 0;
  fit(); setBtn();
  if (reduce) return;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); play(); } }, { threshold: .5 });
    io.observe(root);
  } else play();
})();
