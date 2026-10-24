// The six animated explainers on the home page. Each figure is a timeline that the scrubber and
// the replay button share; it rests at its end state and plays once when scrolled into view.
(() => {
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const SVG = "http://www.w3.org/2000/svg";
const el = (tag, attrs = {}, parent) => { const n = document.createElementNS(SVG, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
const txt = (parent, x, y, s, attrs = {}) => { const t = el("text", { x, y, ...attrs }, parent); t.textContent = s; return t; };
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const fmt = n => Math.round(n * 100) / 100;

// A timeline is a list of steps; seek(ms) renders every step at its own progress, so the
// scrubber and the player share one path through the animation.
class Timeline {
  constructor() { this.steps = []; this.total = 0; this.raf = null; }
  add(dur, fn, at) { at = at ?? this.total; this.steps.push({ at, dur, fn }); this.total = Math.max(this.total, at + dur); return this; }
  gap(ms) { this.total += ms; return this; }
  seek(time) { this.time = time; for (const s of this.steps) { const raw = clamp((time - s.at) / s.dur, 0, 1); s.fn(ease(raw), raw); } }
  stop() { if (this.raf) cancelAnimationFrame(this.raf); this.raf = null; }
  play(onFrame) { this.stop(); if (reduced) { this.seek(this.total); onFrame && onFrame(this.total); return; }
    const start = performance.now(); const tick = now => { const t = Math.min(this.total, now - start); this.seek(t); onFrame && onFrame(t); if (t < this.total) this.raf = requestAnimationFrame(tick); else this.raf = null; }; this.raf = requestAnimationFrame(tick); }
}
// Helpers that animate the usual 3Blue1Brown moves: a stroke drawing in, text writing on, a point gliding.
const drawIn = (path) => { const L = path.getTotalLength ? path.getTotalLength() : 600; path.setAttribute("stroke-dasharray", L); return t => path.setAttribute("stroke-dashoffset", L * (1 - t)); };
const writeOn = (node, full) => t => { node.textContent = full.slice(0, Math.round(full.length * t)); };
const fade = node => t => node.setAttribute("opacity", fmt(t));
const moveTo = (node, from, to) => t => { node.setAttribute("cx", fmt(lerp(from[0], to[0], t))); node.setAttribute("cy", fmt(lerp(from[1], to[1], t))); };
const shift = (node, from, to) => t => node.setAttribute("transform", `translate(${fmt(lerp(from[0], to[0], t))} ${fmt(lerp(from[1], to[1], t))})`);
const pop = node => t => { const s = t < 0.7 ? lerp(0, 1.15, t / 0.7) : lerp(1.15, 1, (t - 0.7) / 0.3); node.setAttribute("opacity", fmt(Math.min(1, t * 3))); node.style.transformOrigin = node.dataset.origin || "center"; node.style.transformBox = "fill-box"; node.style.transform = `scale(${fmt(s)})`; };

const DIMS = [
  { key: "risk", label: "Risk", words: ["trivial", "contained", "cross-cutting", "critical"], ordered: true, pick: 1 },
  { key: "familiarity", label: "Familiarity", words: ["new code", "existing, with scenarios", "existing, no scenarios"], ordered: false, pick: 1 },
  { key: "size", label: "Size", words: ["atomic", "small", "medium", "large", "product"], ordered: true, pick: 2 },
  { key: "goal", label: "Goal", words: ["delivery", "exploration"], ordered: false, pick: 0 },
];
const figs = {};

/* Figure: assess. The hero reading. */
figs.assess = svg => {
  const tl = new Timeline();
  const prompt = txt(svg, 24, 40, "", { class: "mono n", "font-size": "14" });
  const full = '> /compass:assess "Add rate limiting to the public API"';
  tl.add(1400, writeOn(prompt, full));
  const x0 = 150, x1 = 520;
  DIMS.forEach((d, i) => {
    const y = 98 + i * 50;
    const g = el("g", { opacity: 0 }, svg);
    txt(g, 24, y + 5, d.label, { class: "m", "font-size": "13" });
    const line = el("line", { x1: x0, y1: y, x2: x1, y2: y, class: "rs", "stroke-width": 2 }, g);
    const n = d.words.length;
    d.words.forEach((w, j) => { const x = lerp(x0, x1, j / (n - 1)); el("line", { x1: x, y1: y - 5, x2: x, y2: y + 5, class: "rs", "stroke-width": 2 }, g); });
    const dot = el("circle", { cx: x0, cy: y, r: 7, class: "n" }, g);
    const val = txt(g, 0, y + 5, "", { class: "t mono", "font-size": "13", "text-anchor": "start" });
    const at = tl.total;
    tl.add(350, fade(g), at);
    tl.add(400, drawIn(line), at + 100);
    const xt = lerp(x0, x1, d.pick / (n - 1));
    tl.add(700, moveTo(dot, [x0, y], [xt, y]), at + 350);
    tl.add(300, t => { val.textContent = d.words[d.pick]; val.setAttribute("x", xt + 14); val.setAttribute("opacity", fmt(t)); }, at + 850);
    tl.total = at + 900;
  });
  // The arrow and the reading
  const g2 = el("g", { opacity: 0 }, svg);
  const arrow = el("path", { d: "M 335 300 L 335 330", class: "ss", "stroke-width": 2 }, g2);
  el("path", { d: "M 329 324 L 335 332 L 341 324", class: "ss", "stroke-width": 2 }, g2);
  tl.add(300, fade(g2)); tl.add(300, drawIn(arrow), tl.total - 200);
  const name = txt(svg, 335, 372, "", { class: "n serif", "font-size": "28", "text-anchor": "middle" });
  tl.add(500, writeOn(name, "regular"));
  const why = txt(svg, 335, 394, "RP-SHAPE-005  ·  The default working shape.", { class: "m mono", "font-size": "12", "text-anchor": "middle", opacity: 0 });
  tl.add(400, fade(why));
  return tl;
};

/* Figure: dims. Risk, size and goal are scales of words. Familiarity is drawn as a graph of
   what the code does: with no scenarios, many curves fit; scenarios are points that pin the
   curve to one; new code has no curve until it is written. */
figs.dims = svg => {
  const tl = new Timeline();
  const x0 = 150, x1 = 640;
  const scale = (d, y) => {
    const g = el("g", { opacity: 0 }, svg);
    txt(g, 24, y + 6, d.label, { class: "h", "font-size": "15", "font-weight": "650" });
    const line = el("line", { x1: x0, y1: y, x2: x1, y2: y, class: "rs", "stroke-width": 2 }, g);
    const n = d.words.length;
    const ticks = d.words.map((w, j) => {
      const x = lerp(x0, x1, j / (n - 1));
      const tg = el("g", { opacity: 0 }, g);
      // On an ordered scale the dots grow in the tighter direction.
      el("circle", { cx: x, cy: y, r: d.ordered ? 4 + 3 * j / (n - 1) : 5, class: d.ordered ? "s" : "t" }, tg);
      txt(tg, x, y + 24, w, { class: "t mono", "font-size": "12", "text-anchor": j === 0 ? "start" : j === n - 1 ? "end" : "middle" });
      return tg;
    });
    const at = tl.total;
    tl.add(300, fade(g), at);
    tl.add(600, drawIn(line), at + 100);
    ticks.forEach((tg, j) => tl.add(250, pop(tg), at + 250 + j * 110));
    tl.total = at + 250 + n * 110 + 150;
    if (d.ordered) {
      const ag = el("g", { opacity: 0 }, g);
      el("path", { d: `M ${x0 + 60} ${y - 26} L ${x1 - 60} ${y - 26}`, class: "ns", "stroke-width": 1.5, "stroke-dasharray": "3 4" }, ag);
      el("path", { d: `M ${x1 - 66} ${y - 31} L ${x1 - 59} ${y - 26} L ${x1 - 66} ${y - 21}`, class: "ns", "stroke-width": 1.5 }, ag);
      txt(ag, (x0 + x1) / 2, y - 32, "tighter", { class: "n mono", "font-size": "11", "text-anchor": "middle" });
      tl.add(400, fade(ag), tl.total - 150);
      tl.total += 250;
    }
  };
  const [RISK, FAM, SIZE, GOAL] = DIMS;
  scale(RISK, 56);

  // Familiarity: three small graphs of input against what the code does.
  const top = 140, pw = 150, ph = 96, N = 28;
  const fg = el("g", { opacity: 0 }, svg);
  txt(fg, 24, top + 54, FAM.label, { class: "h", "font-size": "15", "font-weight": "650" });
  tl.add(300, fade(fg));
  const base = u => 0.5 + 0.3 * Math.sin(2 * Math.PI * 0.8 * u + 0.5);
  const GHOSTS = [[0.16, 1.4, 0.3], [0.12, 2.1, 1.9], [0.19, 1.1, 4.0], [0.14, 1.8, 2.7], [0.1, 2.6, 0.9]];
  const dev = ([a, f, ph0], u, phase) => a * Math.sin(2 * Math.PI * f * u + ph0 + phase);
  const DOTS = [0.12, 0.4, 0.68, 0.92];
  const pathD = (ox, f) => { let d = ""; for (let i = 0; i <= N; i++) { const u = i / N; d += (i ? " L " : "M ") + fmt(ox + 8 + u * (pw - 16)) + " " + fmt(top + 12 + (1 - f(u)) * (ph - 24)); } return d; };
  const panel = (ox, kind, k) => {
    const at = tl.total;
    const axes = el("path", { d: `M ${ox} ${top} L ${ox} ${top + ph} L ${ox + pw} ${top + ph}`, class: "rs", "stroke-width": 1.5 }, svg);
    tl.add(400, drawIn(axes), at);
    let end = at + 400;
    const ghosts = kind === "new" ? [] : GHOSTS.map(gh => el("path", { d: pathD(ox, u => base(u) + dev(gh, u, 0)), fill: "none", stroke: "var(--panel-muted)", "stroke-width": 1.2, opacity: 0 }, svg));
    const setGhosts = (shrink, phase, op) => ghosts.forEach((g, i) => { g.setAttribute("d", pathD(ox, u => base(u) + shrink * dev(GHOSTS[i], u, phase))); g.setAttribute("opacity", fmt(op)); });
    if (kind === "unmapped") {
      // Many curves fit, and they keep moving: nothing pins them.
      tl.add(1200, t => setGhosts(1, 1.5 * t, 0.45 * Math.min(1, t * 3)), end); end += 1300;
    } else {
      const curve = el("path", { d: pathD(ox, base), fill: "none", stroke: kind === "new" ? "var(--needle)" : "var(--panel-text)", "stroke-width": 2 }, svg);
      if (kind === "new") { tl.add(900, drawIn(curve), end); end += 1000; }
      else {
        tl.add(500, t => setGhosts(1, 0, 0.45 * t), end); end += 500;
        // Scenarios are points on the curve; as they land, the family collapses to the one curve they pin.
        const dots = DOTS.map(u => { const g = el("g", { opacity: 0 }, svg); el("circle", { cx: fmt(ox + 8 + u * (pw - 16)), cy: fmt(top + 12 + (1 - base(u)) * (ph - 24)), r: 4, class: "n" }, g); return g; });
        dots.forEach((g, i) => tl.add(300, pop(g), end + i * 150)); end += 150 * DOTS.length + 150;
        curve.setAttribute("opacity", 0);
        tl.add(800, t => { setGhosts(1 - t, 0, 0.45 * (1 - t)); curve.setAttribute("opacity", fmt(t)); }, end); end += 900;
      }
    }
    const lab = el("g", { opacity: 0 }, svg);
    txt(lab, ox + pw / 2, top + ph + 20, FAM.words[k], { class: "t", "font-size": "12", "text-anchor": "middle" });
    tl.add(300, fade(lab), end - 300);
    tl.total = end;
  };
  panel(150, "new", 0);
  panel(320, "unmapped", 2);
  panel(490, "mapped", 1);

  // The floor: on a medium or larger change, Compass writes the scenarios before the code changes.
  const arc = el("path", { d: `M 395 ${top - 6} Q 480 ${top - 46} 565 ${top - 6}`, class: "ns", "stroke-width": 1.8 }, svg);
  const head = el("path", { d: `M 558 ${top - 14} L 565 ${top - 5} L 569 ${top - 15}`, class: "ns", "stroke-width": 1.8, opacity: 0 }, svg);
  const arcLab = txt(svg, 480, top - 36, "behavior-mapping", { class: "n mono", "font-size": "11", "text-anchor": "middle", opacity: 0 });
  const cap = txt(svg, x0, top + ph + 46, "On a medium or larger change, Compass writes the missing scenarios first.", { class: "m", "font-size": "11.5", opacity: 0 });
  tl.add(700, drawIn(arc)); tl.add(200, fade(head), tl.total - 150); tl.add(300, fade(arcLab), tl.total - 400); tl.add(400, fade(cap));
  tl.total += 200;

  scale(SIZE, 352);
  scale(GOAL, 436);
  txt(svg, 24, 494, "Two optional extras: urgency (live-defect) and labels such as auth, payments, personal-data, migrations.", { class: "m", "font-size": "12.5" });
  return tl;
};

/* Shared plane: a size-by-risk grid with the shipped shapes. */
const SIZES = ["atomic", "small", "medium", "large", "product"], RISKS = ["trivial", "contained", "cross-cutting", "critical"];
const shapeOf = (s, r) => r === 3 || s >= 3 ? "full" : (s <= 1 && r <= 1) ? "quick" : "regular";
function plane(svg, ox, oy, w, h, tl, at, opts = {}) {
  const cw = w / 5, ch = h / 4;
  const g = el("g", {}, svg);
  const cells = [];
  for (let r = 0; r < 4; r++) for (let s = 0; s < 5; s++) {
    const c = el("rect", { x: ox + s * cw + 1, y: oy + (3 - r) * ch + 1, width: cw - 2, height: ch - 2, rx: 4, class: "fill-" + shapeOf(s, r), opacity: 0 }, g);
    cells.push({ c, s, r });
  }
  const axes = el("path", { d: `M ${ox} ${oy} L ${ox} ${oy + h} L ${ox + w} ${oy + h}`, class: "rs", "stroke-width": 2 }, g);
  const labels = el("g", { opacity: 0 }, g);
  SIZES.forEach((s, i) => txt(labels, ox + (i + 0.5) * cw, oy + h + (opts.small && i % 2 ? 32 : 18), s, { class: "m mono", "font-size": opts.small ? "10.5" : "11.5", "text-anchor": "middle" }));
  RISKS.forEach((r, i) => txt(labels, ox - 8, oy + (3.5 - i) * ch + 4, r, { class: "m mono", "font-size": opts.small ? "10" : "11.5", "text-anchor": "end" }));
  txt(labels, ox + w, oy + h + (opts.small ? 48 : 36), "size →", { class: "t", "font-size": "12", "text-anchor": "end" });
  txt(labels, ox - 8, oy - 10, "risk ↑", { class: "t", "font-size": "12", "text-anchor": "end" });
  tl.add(500, drawIn(axes), at);
  tl.add(300, fade(labels), at + 300);
  const op = { quick: 0.22, regular: 0.28, full: 0.22 };
  cells.forEach(({ c, s, r }) => tl.add(300, t => c.setAttribute("opacity", fmt(t * op[shapeOf(s, r)])), at + 500 + (s + r) * 70));
  const keys = el("g", { opacity: 0 }, g);
  if (!opts.noKey) {
    [["quick", "quick fix", 0], ["regular", "regular", 1], ["full", "full", 2]].forEach(([k, name, i]) => {
      const kx = ox + i * 110;
      el("rect", { x: kx, y: oy + h + 46, width: 14, height: 14, rx: 3, class: "fill-" + k, opacity: 0.35 }, keys);
      txt(keys, kx + 20, oy + h + 58, name, { class: "t", "font-size": "12.5" });
    });
    tl.add(300, fade(keys), at + 1200);
  }
  const center = (s, r) => [ox + (s + 0.5) * cw, oy + (3.5 - r) * ch];
  return { g, center, end: at + 1300, cw, ch };
}
function point(svg, [x, y], label, tl, at, opts = {}) {
  const g = el("g", { opacity: 0 }, svg);
  el("circle", { cx: x, cy: y, r: 7, class: opts.cls || "n" }, g);
  const t = txt(g, x, y - 13, label, { class: "h", "font-size": "12.5", "text-anchor": "middle", "font-weight": "600" });
  if (opts.tag) { const w = opts.tag.length * 7 + 12; el("rect", { x: x - w / 2, y: y + 12, width: w, height: 17, rx: 8.5, class: "r2" }, g); el("rect", { x: x - w / 2, y: y + 12, width: w, height: 17, rx: 8.5, class: "ns", "stroke-width": 1 }, g); txt(g, x, y + 24.5, opts.tag, { class: "n mono", "font-size": "11", "text-anchor": "middle" }); }
  tl.add(350, pop(g), at);
  return g;
}

/* Figure: plane. Examples land, then a floor lifts one. */
figs.plane = svg => {
  const tl = new Timeline();
  const P = plane(svg, 135, 30, 565, 280, tl, 0);
  let at = P.end;
  point(svg, P.center(0, 0), "Fix a typo", tl, at); at += 350;
  point(svg, P.center(2, 1), "Rate limiting", tl, at); at += 350;
  point(svg, P.center(4, 3), "Payments provider", tl, at, {}); at += 600;
  // The floor: a one-line auth change
  const from = P.center(0, 1), to = P.center(3, 1);
  const ag = el("g", { opacity: 0 }, svg);
  const dot = el("circle", { cx: from[0], cy: from[1], r: 7, class: "cu" }, ag);
  const lab = el("g", {}, ag); txt(lab, 0, -13, "Password hashing", { class: "h", "font-size": "12.5", "text-anchor": "middle", "font-weight": "600" });
  el("rect", { x: -22, y: 12, width: 44, height: 17, rx: 8.5, class: "r2" }, lab); el("rect", { x: -22, y: 12, width: 44, height: 17, rx: 8.5, class: "cus", "stroke-width": 1 }, lab); txt(lab, 0, 24.5, "auth", { class: "t mono", "font-size": "11", "text-anchor": "middle" });
  lab.setAttribute("transform", `translate(${from[0]} ${from[1]})`);
  tl.add(350, pop(ag), at); at += 900;
  const path = el("path", { d: `M ${from[0]} ${from[1]} Q ${(from[0] + to[0]) / 2} ${from[1] - 90} ${to[0]} ${to[1]}`, class: "cus", "stroke-width": 1.5, "stroke-dasharray": "4 5", opacity: 0 }, svg);
  tl.add(300, fade(path), at);
  tl.add(900, t => { const q = [(from[0] + to[0]) / 2, from[1] - 90]; const x = (1 - t) ** 2 * from[0] + 2 * (1 - t) * t * q[0] + t * t * to[0]; const y = (1 - t) ** 2 * from[1] + 2 * (1 - t) * t * q[1] + t * t * to[1]; dot.setAttribute("cx", fmt(x)); dot.setAttribute("cy", fmt(y)); lab.setAttribute("transform", `translate(${fmt(x)} ${fmt(y)})`); }, at + 100);
  at += 1100;
  const why = el("g", { opacity: 0 }, svg);
  txt(why, 135, 408, "RP-FLOOR-003", { class: "n mono", "font-size": "12", "font-weight": "500" });
  txt(why, 240, 408, "Domain risk overrides size. A one-line auth change is not small.", { class: "t", "font-size": "13" });
  tl.add(400, fade(why), at);
  return tl;
};

/* Figure: stages. Depth bars that morph between approaches. */
const STAGES = ["assess", "define", "refine", "plan", "breakdown", "implement", "verify", "ship"];
// Depths from `compass approach evaluate --verbose` in Compass 7.0.0. Breakdown is not a depth:
// it is multiagent or skipped, so it draws as a full or empty bar with its own word.
const BREAKDOWN = STAGES.indexOf("breakdown");
const DEPTH = { quick: [1, 0.45, 0.15, 0.15, 0, 1, 0.45, 0.45], regular: [1, 1, 0.45, 1, 1, 1, 1, 1], full: [1, 1, 1, 1, 1, 1, 1, 1] };
figs.stages = (svg, fig) => {
  const tl = new Timeline();
  const ox = 100, oy = 62, w = 590, h = 200, bw = w / STAGES.length;
  const base = el("line", { x1: ox, y1: oy + h, x2: ox + w, y2: oy + h, class: "rs", "stroke-width": 2 }, svg);
  const grid = el("g", { opacity: 0 }, svg);
  [[1, "thorough"], [0.45, "lightweight"], [0.15, "collapsed"]].forEach(([v, name]) => { const y = oy + h - v * h; el("line", { x1: ox, y1: y, x2: ox + w, y2: y, class: "rs", "stroke-width": 1, "stroke-dasharray": "2 5" }, grid); txt(grid, ox - 8, y + 4, name, { class: "m mono", "font-size": "11", "text-anchor": "end" }); });
  const bars = STAGES.map((s, i) => {
    const g = el("g", {}, svg);
    const rect = el("rect", { x: ox + i * bw + 12, y: oy + h, width: bw - 24, height: 0, rx: 6, class: "fill-regular", opacity: i === BREAKDOWN ? 0.4 : 0.85 }, g);
    const val = txt(g, ox + (i + 0.5) * bw, oy + h - 8, "", { class: "m mono", "font-size": "10.5", "text-anchor": "middle" });
    // Eight labels do not fit on one line, so every second one sits lower.
    txt(g, ox + (i + 0.5) * bw, oy + h + 22 + (i % 2) * 16, s, { class: "t mono", "font-size": "11.5", "font-weight": "500", "text-anchor": "middle" });
    return { rect, val };
  });
  const title = txt(svg, ox + w, 30, "", { class: "n serif", "font-size": "22", "text-anchor": "end" });
  const sub = txt(svg, ox, 30, "", { class: "m", "font-size": "13" });
  const SUB = { quick: "One criterion, a focused change, evidence it works.", regular: "A behaviour spec, a proportionate design, review.", full: "Intent, architecture and a plan before code. Parallel where safe." };
  let cur = DEPTH.quick.slice();
  const render = (vals, name) => { vals.forEach((v, i) => { const hh = v * h; bars[i].rect.setAttribute("y", fmt(oy + h - hh)); bars[i].rect.setAttribute("height", fmt(hh)); bars[i].val.setAttribute("y", fmt(oy + h - hh - 8)); bars[i].val.textContent = i === BREAKDOWN ? (v > 0.5 ? "multiagent" : "skipped") : ""; }); if (name) { title.textContent = name === "quick" ? "quick fix" : name; sub.textContent = SUB[name]; } };
  tl.add(400, drawIn(base)); tl.add(300, fade(grid), 200);
  const morph = (to, name, dur = 900) => { const from = cur.slice(); const target = DEPTH[to]; tl.add(dur, t => render(from.map((v, i) => lerp(v, target[i], t)), name)); cur = target.slice(); };
  cur = STAGES.map(() => 0);
  morph("quick", "quick"); tl.gap(900); morph("regular", "regular"); tl.gap(900); morph("full", "full"); tl.gap(900); morph("regular", "regular");
  // Chips take over after the timeline: a short morph of their own
  const chips = fig.querySelectorAll(".chips button");
  let pressed = "regular";
  chips.forEach(b => b.addEventListener("click", () => {
    tl.stop(); chips.forEach(c => c.setAttribute("aria-pressed", c === b)); const to = b.dataset.approach; const from = cur.slice(); const target = DEPTH[to]; cur = target.slice(); pressed = to;
    const t0 = performance.now(); const step = now => { const t = reduced ? 1 : Math.min(1, (now - t0) / 500); render(from.map((v, i) => lerp(v, target[i], ease(t))), to); if (t < 1) requestAnimationFrame(step); }; requestAnimationFrame(step);
  }));
  tl.onEnd = () => chips.forEach(c => c.setAttribute("aria-pressed", c.dataset.approach === "regular"));
  return tl;
};

/* Figure: guard. A change travels through strategies and guardrails. */
figs.guard = svg => {
  const tl = new Timeline();
  const y = 190, x0 = 50, x1 = 690;
  const track = el("line", { x1: x0, y1: y, x2: x1, y2: y, class: "rs", "stroke-width": 2 }, svg);
  tl.add(500, drawIn(track));
  txt(svg, x0, y + 50, "the change", { class: "m", "font-size": "12.5" });
  const shipped = txt(svg, x1, y + 50, "shipped", { class: "m", "font-size": "12.5", "text-anchor": "end" });
  // Strategies (dotted) and guardrails (solid), in travel order
  const items = [
    { x: 150, kind: "s", name: "BDD" },
    { x: 250, kind: "g", name: "G2  acceptance first", ev: "acceptance-criteria.md", row: 0 },
    { x: 330, kind: "s", name: "TDD" },
    { x: 420, kind: "g", name: "G1  tested first", ev: "test ran: red → green", row: 1 },
    { x: 500, kind: "g", name: "G3 G4  traceable, evidenced", ev: "changed file → scenario", row: 0 },
    { x: 560, kind: "s", name: "ADR" },
    { x: 630, kind: "g", name: "G5  human sign-off", ev: "approved", human: true, row: 1 },
  ];
  let at = 300;
  items.forEach((it, i) => {
    const g = el("g", { opacity: 0 }, svg);
    const up = i % 2 === 0;
    const wall = el("line", { x1: it.x, y1: y - 70, x2: it.x, y2: y + 70, class: it.kind === "g" ? "ns" : "ss", "stroke-width": it.kind === "g" ? 3 : 1.5, "stroke-dasharray": it.kind === "g" ? "" : "3 5" }, g);
    it.wall = wall; it.g = g;
    const ly = up ? y - 84 : y + 92;
    const parts = it.name.split("  "); if (it.kind === "s") parts[1] = ["BDD", "TDD", "ADR"].includes(parts[0]) ? { BDD: "scenarios first", TDD: "red, then green", ADR: "decision record" }[parts[0]] : "";
    const lab = el("g", {}, g);
    const tx = txt(lab, it.x, ly, parts[0], { class: it.kind === "g" ? "n mono" : "m mono", "font-size": "11.5", "font-weight": "500", "text-anchor": "middle" });
    if (parts[1]) txt(lab, it.x, ly + (up ? -14 : 14), parts[1], { class: "t", "font-size": "11.5", "text-anchor": "middle" });
    tl.add(250, fade(g), at); tl.add(350, drawIn(wall), at); at += 180;
  });
  
  const legend = el("g", {}, svg);
  el("line", { x1: 50, y1: 330, x2: 80, y2: 330, class: "ns", "stroke-width": 3 }, legend); txt(legend, 88, 334, "guardrail: blocks until evidence", { class: "t", "font-size": "12" });
  el("line", { x1: 330, y1: 330, x2: 360, y2: 330, class: "ss", "stroke-width": 1.5, "stroke-dasharray": "3 5" }, legend); txt(legend, 368, 334, "strategy: guides, assessed at verify", { class: "t", "font-size": "12" });
  const dot = el("circle", { cx: x0, cy: y, r: 8, class: "n" }, svg);
  at += 300;
  let x = x0;
  items.forEach(it => {
    const stopX = it.x - 14;
    tl.add(Math.max(250, (stopX - x) * 4), moveTo(dot, [x, y], [stopX, y]), at); at += Math.max(250, (stopX - x) * 4);
    if (it.kind === "g") {
      // Evidence appears, the wall opens
      const ev = el("g", { opacity: 0 }, svg);
      const ew = it.ev.length * 6.6 + 24;
      const cy = y + 16 + (it.row || 0) * 26; el("rect", { x: it.x - ew / 2, y: cy, width: ew, height: 20, rx: 10, class: "r2" }, ev);
      txt(ev, it.x - ew / 2 + 10, cy + 14, "✓", { class: it.human ? "approve" : "n", "font-size": "12", "font-weight": "700" });
      txt(ev, it.x - ew / 2 + 24, cy + 14, it.ev, { class: "t mono", "font-size": "10.5" });
      tl.add(400, pop(ev), at); at += 500;
      tl.add(350, t => { it.wall.setAttribute("y1", fmt(y - 70 + 56 * t)); it.wall.setAttribute("y2", fmt(y + 70 - 56 * t)); it.wall.setAttribute("opacity", fmt(1 - 0.5 * t)); }, at); at += 350;
      tl.add(200, moveTo(dot, [stopX, y], [it.x + 14, y]), at); at += 200; x = it.x + 14;
    } else {
      tl.add(250, moveTo(dot, [stopX, y], [it.x + 14, y]), at);
      tl.add(250, t => it.wall.setAttribute("opacity", fmt(1 - 0.6 * Math.sin(t * Math.PI))), at); at += 250; x = it.x + 14;
    }
  });
  tl.add(500, moveTo(dot, [x, y], [x1 - 6, y]), at); at += 500;
  tl.add(300, t => { shipped.setAttribute("class", "n"); shipped.setAttribute("font-weight", "700"); }, at);
  return tl;
};

/* Figure: policy. One floor rule, and determinism. */
figs.policy = svg => {
  const tl = new Timeline();
  // compass.yml on the left
  const box = el("rect", { x: 24, y: 24, width: 340, height: 190, rx: 10, class: "r2" }, svg);
  txt(svg, 40, 50, "compass.yml", { class: "m mono", "font-size": "11.5" });
  const lines = ["routing:", "  floors:", "    - when: { labels_any: [billing] }", "      force_minimum_route: full"];
  let at = 300;
  lines.forEach((l, i) => { const t = txt(svg, 40, 82 + i * 24, "", { class: i >= 2 ? "n mono" : "t mono", "font-size": "12.5", "xml:space": "preserve" }); t.style.whiteSpace = "pre"; tl.add(500, writeOn(t, l), at); at += 420; });
  const tag = el("g", { opacity: 0 }, svg);
  el("rect", { x: 272, y: 36, width: 76, height: 20, rx: 10, class: "ns", "stroke-width": 1 }, tag);
  txt(tag, 310, 50, "stricter ↑", { class: "n mono", "font-size": "11", "text-anchor": "middle" });
  tl.add(400, pop(tag), at + 200); at += 700;
  // The plane on the right, small
  const P = plane(svg, 450, 40, 240, 150, tl, 0, { small: true, noKey: true });
  const from = P.center(1, 0), to = P.center(3, 0);
  const g = el("g", { opacity: 0 }, svg);
  const dot = el("circle", { cx: from[0], cy: from[1], r: 6, class: "cu" }, g);
  const lab = el("g", { transform: `translate(${from[0]} ${from[1]})` }, g);
  txt(lab, 0, -12, "Round invoice totals", { class: "h", "font-size": "11.5", "text-anchor": "middle", "font-weight": "600" });
  el("rect", { x: -24, y: 10, width: 48, height: 16, rx: 8, class: "cus", "stroke-width": 1 }, lab); txt(lab, 0, 22, "billing", { class: "t mono", "font-size": "10.5", "text-anchor": "middle" });
  tl.add(350, pop(g), P.end);
  tl.add(800, t => { const q = [(from[0] + to[0]) / 2, from[1] - 60]; const x = (1 - t) ** 2 * from[0] + 2 * (1 - t) * t * q[0] + t * t * to[0]; const y = (1 - t) ** 2 * from[1] + 2 * (1 - t) * t * q[1] + t * t * to[1]; dot.setAttribute("cx", fmt(x)); dot.setAttribute("cy", fmt(y)); lab.setAttribute("transform", `translate(${fmt(x)} ${fmt(y)})`); }, at - 300);
  at = Math.max(at + 500, P.end + 400);
  // Determinism: three runs, one answer
  const sep = el("line", { x1: 24, y1: 250, x2: 696, y2: 250, class: "rs", "stroke-width": 1, "stroke-dasharray": "2 5" }, svg);
  tl.add(300, drawIn(sep), at); at += 300;
  txt(svg, 24, 280, "Same assessment, same policy:", { class: "t", "font-size": "13" });
  const asmt = "risk contained, code with scenarios, size medium";
  for (let i = 0; i < 3; i++) {
    const y = 312 + i * 30;
    const row = el("g", { opacity: 0 }, svg);
    txt(row, 24, y, `run ${i + 1}`, { class: "m mono", "font-size": "12" });
    txt(row, 80, y, asmt, { class: "m mono", "font-size": "11" });
    const arrow = txt(row, 578, y, "→", { class: "s", "font-size": "13" });
    const ans = txt(row, 600, y, "", { class: "n mono", "font-size": "12.5", "font-weight": "500" });
    tl.add(250, fade(row), at); tl.add(350, writeOn(ans, "regular"), at + 250); at += 650;
  }
  const same = txt(svg, 696, 404, "every time", { class: "n serif", "font-size": "14", "text-anchor": "end", opacity: 0 });
  tl.add(300, fade(same), at);
  return tl;
};

/* Figure: record. Stage markers light up while the files appear. */
figs.record = svg => {
  const tl = new Timeline();
  const ox = 40, w = 640, sw = w / STAGES.length, y = 40;
  const rail = el("line", { x1: ox, y1: y, x2: ox + w, y2: y, class: "rs", "stroke-width": 2 }, svg);
  tl.add(500, drawIn(rail));
  const marks = STAGES.map((s, i) => { const x = ox + (i + 0.5) * sw; const g = el("g", {}, svg); const c = el("circle", { cx: x, cy: y, r: 6, class: "rs", "stroke-width": 2, fill: "var(--panel)" }, g); txt(g, x, y + 24 + (i % 2) * 14, s, { class: "m mono", "font-size": "11", "text-anchor": "middle" }); return { c, g, x }; });
  const FILES = [
    ["docs/compass/2026-04-21-rate-limit-search-endpoint/", 0, "dir"],
    ["  README.md", 0, "the decision, and what needs approval"],
    ["  delivery-approach.md", 0, "what was done, what was left out, and why"],
    ["  acceptance-criteria.md", 1, "behaviour as Given/When/Then scenarios"],
    ["  requirements-review.md", 2, "the spec checked for gaps before design"],
    ["  technical-design.md", 3, "kept short: proportionate to the risk"],
    ["  verification-report.md", 6, "what ran, and what it proved"],
    [".compass/work/rate-limit-search-endpoint/", 0, "dir"],
    ["  manifest.yml", 0, "the assessment the approach came from"],
    ["  evidence/", 5, "typed records: test runs, traces, approvals"],
    ["  devlog.md", 5, "enough state for another session to resume"],
  ];
  const rows = FILES.map((f, i) => {
    const yy = 114 + i * 28;
    const g = el("g", { opacity: 0 }, svg);
    txt(g, ox, yy, f[0], { class: f[2] === "dir" ? "h mono" : "t mono", "font-size": "12.5", "font-weight": f[2] === "dir" ? "500" : "400", "xml:space": "preserve" }).style.whiteSpace = "pre";
    if (f[2] !== "dir") txt(g, 372, yy, f[2], { class: "m", "font-size": "11.5" });
    return { g, stage: f[1] };
  });
  let at = 500;
  STAGES.forEach((s, i) => {
    const m = marks[i];
    tl.add(300, t => { m.c.setAttribute("r", fmt(6 + 3 * Math.sin(t * Math.PI))); m.c.setAttribute("fill", t > 0.3 ? "var(--needle)" : "var(--panel)"); m.c.setAttribute("stroke", t > 0.3 ? "var(--needle)" : "var(--panel-rule)"); m.g.querySelector("text").setAttribute("class", t > 0.3 ? "t mono" : "m mono"); }, at);
    rows.filter(r => r.stage === i).forEach((r, j) => tl.add(300, fade(r.g), at + 150 + j * 150));
    at += 650;
  });
  const done = txt(svg, ox + w, 428, "compass board render: every issue, one page, a lane per stage", { class: "m", "font-size": "12", "text-anchor": "end", opacity: 0 });
  tl.add(400, fade(done), at);
  return tl;
};

// Wire every figure: build it, rest at the end state, play when it scrolls in, scrub and replay.
const live = [];
document.querySelectorAll("figure[data-fig]").forEach(fig => {
  const svg = fig.querySelector("svg");
  const tl = figs[fig.dataset.fig](svg, fig);
  const range = fig.querySelector("input[type=range]");
  const sync = t => { range.value = Math.round(1000 * t / tl.total); };
  tl.seek(tl.total); sync(tl.total);
  range.addEventListener("input", () => { tl.stop(); tl.seek(tl.total * range.value / 1000); });
  fig.querySelector(".replay").addEventListener("click", () => { tl.seek(0); tl.play(sync); });
  live.push({ fig, tl, sync, played: false });
});
if ("IntersectionObserver" in window && !reduced) {
  const io = new IntersectionObserver(entries => entries.forEach(e => { const L = live.find(l => l.fig === e.target); if (e.isIntersecting && L && !L.played) { L.played = true; L.tl.seek(0); L.tl.play(L.sync); } }), { threshold: 0.45 });
  live.forEach(l => io.observe(l.fig));
}
document.querySelectorAll(".copy").forEach(b => b.addEventListener("click", async () => {
  const s = b.dataset.copy; try { await navigator.clipboard.writeText(s); b.textContent = "Copied"; } catch { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent = "Selected"; }
  setTimeout(() => { b.textContent = "Copy"; }, 1500);
}));
})();
