/* =========================================================================
   AI Fluency Academy — render engine, progress, games.
   No build step, no dependencies. Content lives in data.js.
   ========================================================================= */

(function () {
  "use strict";

  const KEY = "ai-fluency-academy-v1";
  const XP = { brief: 40, quizQ: 20, simPt: 10, signal: 5, jargon: 5, exam: 200, sortCap: 150 };
  const EXAM_LEN = 15, EXAM_PASS = 12, SORT_SECONDS = 45;

  // Team leaderboard (Supabase). The key below is a publishable key, safe to ship in a browser:
  // the table is private and only reachable through two database functions.
  const BOARD = {
    url: "https://mqksikjcudxmoejpmijc.supabase.co/rest/v1/rpc/",
    key: "sb_publishable_xV1U1tDghZyEeIZwJ_2uLw_6Hhst6as"
  };

  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const byId = id => MODULES.find(m => m.id === id);
  const today = () => new Date().toISOString().slice(0, 10);

  /* ---------- state ---------- */

  function blank() {
    return { name: "", xp: 0, briefed: {}, quiz: {}, sim: {}, signal: 0, sort: 0, jargon: {}, exam: { best: 0, passed: "" }, badges: {}, last: "", streak: 0, key: "" };
  }
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return Object.assign(blank(), JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
    return blank();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } queueSync(); }

  /* ---------- leaderboard sync ---------- */

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3) | 8).toString(16); });
  }
  function rpc(fn, body) {
    return fetch(BOARD.url + fn, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: BOARD.key, Authorization: "Bearer " + BOARD.key },
      body: JSON.stringify(body)
    }).then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.status === 204 ? null : r.json(); });
  }
  let syncTimer = null, lastSent = "", board = { rows: null, error: false, loading: false };
  function queueSync() {
    if (!S.name) return;                       // nothing is sent until the person gives a name
    clearTimeout(syncTimer);
    syncTimer = setTimeout(syncNow, 1200);
  }
  function syncNow() {
    if (!S.name) return Promise.resolve();
    if (!S.key) { S.key = uuid(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }
    const body = {
      p_key: S.key, p_name: S.name, p_xp: S.xp,
      p_modules: MODULES.filter(m => S.quiz[m.id] >= 3).length,
      p_badges: Object.keys(S.badges).length,
      p_exam: S.exam.best, p_certified: S.exam.passed || null
    };
    const sig = JSON.stringify(body);
    if (sig === lastSent) return Promise.resolve();
    return rpc("ai_academy_submit", body).then(() => { lastSent = sig; }, () => { /* offline or blocked: retry on next save */ });
  }

  let S = load();
  let G = null;          // transient state for the current activity
  let timer = null;

  (function touchStreak() {
    const t = today();
    if (S.last === t) return;
    const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    S.streak = S.last === y ? S.streak + 1 : 1;
    S.last = t; save();
  })();

  /* ---------- progress helpers ---------- */

  const stars = n => (n >= 5 ? 3 : n === 4 ? 2 : n === 3 ? 1 : 0);
  const rankIndex = xp => { let i = 0; RANKS.forEach((r, k) => { if (xp >= r[0]) i = k; }); return i; };
  const simGrade = p => (p >= 5 ? "A" : p >= 4 ? "B" : p >= 2 ? "C" : "D");
  const starHtml = n => `<span class="stars" aria-label="${n} of 3 stars">${[0, 1, 2].map(i => `<i class="${i < n ? "on" : ""}">★</i>`).join("")}</span>`;

  function addXp(n, label) {
    if (n <= 0) return;
    const before = rankIndex(S.xp);
    S.xp += n;
    toast(`+${n} XP${label ? " · " + label : ""}`);
    const after = rankIndex(S.xp);
    if (after > before) { toast(`Promoted to ${RANKS[after][1]}`, "rank"); confetti(); }
  }

  function checkBadges() {
    const got = id => { if (!S.badges[id]) { S.badges[id] = today(); const b = BADGES.find(x => x.id === id); toast(`Badge earned: ${b.name}`, "badge"); } };
    const nBrief = Object.keys(S.briefed).length;
    if (nBrief >= 1) got("first");
    if (nBrief >= MODULES.length) got("scholar");
    if (MODULES.some(m => S.quiz[m.id] >= 5)) got("ace");
    if (MODULES.every(m => S.quiz[m.id] >= 5)) got("master");
    if (SCENARIOS.filter(s => S.sim[s.id] >= 5).length >= 3) got("closer");
    if (S.signal >= 14) got("radar");
    if (S.sort >= 150) got("speed");
    if (JARGON.every(j => S.jargon[j[0]])) got("decoder");
    if (S.streak >= 3) got("streak");
    if (S.exam.passed) got("certified");
    save();
  }

  /* ---------- toasts and confetti ---------- */

  function toast(msg, kind) {
    const box = $("#toasts");
    const el = document.createElement("div");
    el.className = "toast " + (kind || "");
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(() => el.classList.add("out"), 2600);
    setTimeout(() => el.remove(), 3100);
  }

  function confetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = $("#confetti"), ctx = c.getContext("2d");
    c.width = window.innerWidth; c.height = window.innerHeight; c.hidden = false;
    const hues = MODULES.map(m => m.hue);
    const bits = Array.from({ length: 90 }, () => ({
      x: c.width / 2, y: c.height * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 12 - 3,
      s: 5 + Math.random() * 6, r: Math.random() * 6, h: hues[Math.floor(Math.random() * hues.length)]
    }));
    let f = 0;
    (function tick() {
      ctx.clearRect(0, 0, c.width, c.height);
      bits.forEach(b => {
        b.vy += 0.35; b.x += b.vx; b.y += b.vy; b.r += 0.2;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r);
        ctx.fillStyle = `hsl(${b.h} 85% 58%)`; ctx.fillRect(-b.s / 2, -b.s / 2, b.s, b.s * 0.6); ctx.restore();
      });
      if (++f < 110) requestAnimationFrame(tick); else { ctx.clearRect(0, 0, c.width, c.height); c.hidden = true; }
    })();
  }

  /* ---------- routing ---------- */

  const route = () => (location.hash.replace(/^#/, "") || "learn");
  function go(r) { if (route() === r) render(); else location.hash = r; }
  window.addEventListener("hashchange", render);

  function render() {
    clearInterval(timer); timer = null;
    const r = route();
    const [head, ...rest] = r.split("-");
    const arg = rest.join("-");
    const views = { learn: vLearn, play: vPlay, kit: vKit, me: vMe, m: vBrief, q: vQuiz, sim: vSim, signal: vSignal, sort: vSort, jargon: vJargon, exam: vExam, board: vBoard };
    const fn = views[head] || vLearn;
    renderHeader(head);
    const view = $("#view");
    view.innerHTML = fn(arg);
    window.scrollTo(0, 0);
    const focus = $("[data-autofocus]", view);
    if (focus) focus.focus({ preventScroll: true });
  }

  function renderHeader(head) {
    const ri = rankIndex(S.xp), cur = RANKS[ri], next = RANKS[ri + 1];
    const pct = next ? Math.round(((S.xp - cur[0]) / (next[0] - cur[0])) * 100) : 100;
    const tab = { learn: "learn", m: "learn", q: "learn", play: "play", sim: "play", signal: "play", sort: "play", jargon: "play", exam: "play", kit: "kit", me: "me", board: "board" }[head] || "learn";
    const nav = [["learn", "Learn"], ["play", "Play"], ["kit", "Field Kit"], ["board", "Leaderboard"], ["me", "Profile"]];
    $("#top").innerHTML = `
      <div class="top-in">
        <a class="brand" href="#learn"><span class="brand-el">Ai</span><span class="brand-name">AI Fluency Academy</span></a>
        <nav class="nav" aria-label="Sections">${nav.map(n => `<a href="#${n[0]}" class="${tab === n[0] ? "on" : ""}"${tab === n[0] ? ' aria-current="page"' : ""}>${n[1]}</a>`).join("")}</nav>
        <a class="meter" href="#me" title="Your progress">
          <span class="meter-rank">${cur[1]}</span>
          <span class="meter-bar"><span style="width:${pct}%"></span></span>
          <span class="meter-xp">${S.xp} XP</span>
          <span class="meter-streak">Streak ${S.streak}</span>
        </a>
      </div>`;
  }

  /* ---------- Learn (home) ---------- */

  function nextUp() {
    for (const m of MODULES) {
      if (!S.briefed[m.id]) return { href: "m-" + m.id, label: `Start briefing: ${m.name}` };
      if (!(S.quiz[m.id] >= 3)) return { href: "q-" + m.id, label: `Take the quiz: ${m.name}` };
    }
    if (!S.exam.passed) return { href: "exam", label: "Sit the certification exam" };
    return { href: "play", label: "Keep sharp in the arcade" };
  }

  function vLearn() {
    const n = nextUp();
    const done = MODULES.filter(m => S.quiz[m.id] >= 3).length;
    const hello = S.name ? `Welcome back, ${esc(S.name)}.` : "Talk AI with any client or candidate.";
    return `
      <section class="hero">
        <div class="hero-text">
          <p class="eyebrow">Marketing and creative staffing · content reviewed ${CONTENT_DATE}</p>
          <h1>${hello}</h1>
          <p class="lede">Ten short briefings on how AI changed design, marketing, content, code and learning. Each ends in a quiz. Then practice real conversations in the arcade and earn your certification.</p>
          <div class="row">
            <a class="btn primary" href="#${n.href}">${n.label}</a>
            <span class="muted">${done} of ${MODULES.length} modules passed</span>
          </div>
          ${S.name ? "" : `<form class="namer" data-form="name"><label for="name-in">Your name, for the certificate and the team leaderboard</label><div class="row"><input id="name-in" maxlength="40" autocomplete="name" placeholder="First and last name"><button class="btn small">Save</button></div></form>`}
        </div>
      </section>

      <h2 class="sec">The table of AI skills</h2>
      <p class="sec-sub">Work left to right, or jump to the discipline on your next call.</p>
      <div class="table">
        ${MODULES.map((m, i) => {
          const b = S.briefed[m.id], q = S.quiz[m.id] || 0;
          return `<a class="el" style="--h:${m.hue}" href="#m-${m.id}">
            <span class="el-num">${i + 1}</span>
            <span class="el-state">${q ? starHtml(stars(q)) : b ? "Briefed" : "New"}</span>
            <span class="el-sym">${m.sym}</span>
            <span class="el-name">${m.name}</span>
            <span class="el-tag">${m.tag}</span>
          </a>`;
        }).join("")}
      </div>

      <h2 class="sec">Practice in the arcade</h2>
      <div class="arcade">${gameCards()}</div>`;
  }

  function gameCards() {
    const simA = SCENARIOS.filter(s => S.sim[s.id] >= 5).length;
    const known = JARGON.filter(j => S.jargon[j[0]]).length;
    const games = [
      ["sim", "Call Simulator", "Six role-plays with clients and candidates. Pick what you would say.", `${simA} of ${SCENARIOS.length} at grade A`],
      ["signal", "Signal Check", "Résumé lines and things people say. Strong signal, or dig deeper?", `Best ${S.signal} of ${SIGNALS.length}`],
      ["sort", "Tool Sort", `${SORT_SECONDS} seconds. Match each tool to its discipline. Combos score more.`, `Best ${S.sort}`],
      ["jargon", "Jargon Decoder", "Flip cards for the terms you will hear on calls.", `${known} of ${JARGON.length} known`],
      ["exam", "Certification Exam", `${EXAM_LEN} questions drawn from every module. ${EXAM_PASS} to pass.`, S.exam.passed ? "Passed" : S.exam.best ? `Best ${S.exam.best} of ${EXAM_LEN}` : "Not attempted"]
    ];
    return games.map(g => `<a class="game" href="#${g[0]}"><span class="game-name">${g[1]}</span><span class="game-desc">${g[2]}</span><span class="game-best">${g[3]}</span></a>`).join("");
  }

  function vPlay() {
    return `<h1 class="page-h">Arcade</h1><p class="sec-sub">Practice rounds. You earn XP only when you beat your own best, so replay freely.</p><div class="arcade">${gameCards()}</div>`;
  }

  /* ---------- Briefing ---------- */

  function buildCards(m) {
    const list = a => `<ul class="bul">${a.map(x => `<li>${x}</li>`).join("")}</ul>`;
    const cards = m.cards.map(c => ({
      t: c.t,
      html: (c.p || []).map(p => `<p>${p}</p>`).join("") + (c.l ? list(c.l) : "") + (c.note ? `<p class="note">${c.note}</p>` : "")
    }));
    if (m.tools.length) cards.push({ t: "Tools to know by name", html: `<div class="tools">${m.tools.map(t => `<div class="tool"><b>${t[0]}</b><span class="tool-by">${t[1]}</span><span>${t[2]}</span></div>`).join("")}</div>` });
    if (m.roles.length) cards.push({ t: "Titles and skills in demand", html: `<h4>Titles you will see</h4><div class="chips">${m.roles.map(r => `<span>${r}</span>`).join("")}</div><h4>Skills to screen for</h4><div class="chips alt">${m.skills.map(r => `<span>${r}</span>`).join("")}</div>` });
    const flags = `<div class="flags"><div><h4 class="good">Strong signals</h4>${list(m.green)}</div><div><h4 class="bad">Dig deeper</h4>${list(m.red)}</div></div>`;
    if (m.client.length) cards.push({ t: "Ask the client", html: `<ol class="qs">${m.client.map(x => `<li>${x}</li>`).join("")}</ol>${m.cand.length ? "" : flags}` });
    if (m.cand.length) cards.push({ t: "Ask the candidate", html: `<ol class="qs">${m.cand.map(x => `<li>${x}</li>`).join("")}</ol>${flags}` });
    return cards;
  }

  function vBrief(id) {
    const m = byId(id); if (!m) return vLearn();
    if (!G || G.type !== "brief" || G.id !== id) G = { type: "brief", id, i: 0, cards: buildCards(m) };
    const c = G.cards[G.i], last = G.i === G.cards.length - 1, num = MODULES.indexOf(m) + 1;
    return `
      <div class="stage" style="--h:${m.hue}">
        <div class="stage-head">
          <a class="back" href="#learn">All modules</a>
          <div class="stage-title"><span class="el-sym small">${m.sym}</span><div><p class="eyebrow">Module ${num} · Briefing</p><h1>${m.name}</h1></div></div>
          <div class="dots" role="progressbar" aria-valuemin="1" aria-valuemax="${G.cards.length}" aria-valuenow="${G.i + 1}">${G.cards.map((_, k) => `<i class="${k <= G.i ? "on" : ""}"></i>`).join("")}</div>
        </div>
        <article class="card" tabindex="-1" data-autofocus>
          <p class="card-count">${G.i + 1} / ${G.cards.length}</p>
          <h2>${c.t}</h2>
          <div class="card-body">${c.html}</div>
        </article>
        <div class="stage-foot">
          <button class="btn" data-act="briefPrev" ${G.i === 0 ? "disabled" : ""}>Back</button>
          ${last
            ? `<button class="btn primary" data-act="briefDone">${S.briefed[id] ? "Go to the quiz" : `Finish briefing  +${XP.brief} XP`}</button>`
            : `<button class="btn primary" data-act="briefNext">Next</button>`}
        </div>
        <p class="hint">Tip: use the left and right arrow keys.</p>
      </div>`;
  }

  /* ---------- Quiz engine (module quizzes and exam) ---------- */

  function prepQ(q, m) {
    const opts = shuffle(q.o.map((t, i) => ({ t, ok: i === 0 })));
    return { q: q.q, opts, why: q.why, mod: m };
  }

  function quizHtml(title, eyebrow, hue, backHref) {
    const total = G.qs.length;
    if (G.i >= total) return quizDone(title, hue, backHref);
    const q = G.qs[G.i], picked = G.picked;
    return `
      <div class="stage" style="--h:${hue}">
        <div class="stage-head">
          <a class="back" href="#${backHref}">Leave</a>
          <div class="stage-title"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1></div></div>
          <div class="dots">${G.qs.map((_, k) => `<i class="${k < G.i ? (G.log[k] ? "ok" : "no") : k === G.i ? "on" : ""}"></i>`).join("")}</div>
        </div>
        <article class="card">
          <p class="card-count">Question ${G.i + 1} of ${total}${G.type === "exam" ? ` · ${q.mod.name}` : ""}</p>
          <h2 class="q">${q.q}</h2>
          <div class="opts">
            ${q.opts.map((o, k) => {
              const cls = picked === null ? "" : o.ok ? "ok" : k === picked ? "no" : "dim";
              return `<button class="opt ${cls}" data-act="answer" data-k="${k}" ${picked !== null ? "disabled" : ""}><span class="opt-key">${"ABCD"[k]}</span><span>${o.t}</span></button>`;
            }).join("")}
          </div>
          ${picked === null ? "" : `<div class="why ${q.opts[picked].ok ? "ok" : "no"}" role="status"><b>${q.opts[picked].ok ? "Correct." : "Not quite."}</b> ${q.why}</div>`}
        </article>
        <div class="stage-foot"><span></span>
          ${picked === null ? "" : `<button class="btn primary" data-act="quizNext" data-autofocus>${G.i === total - 1 ? "See results" : "Next question"}</button>`}
        </div>
      </div>`;
  }

  function quizDone(title, hue, backHref) {
    const r = G.result;
    return `
      <div class="stage" style="--h:${hue}">
        <article class="card result">
          <p class="eyebrow">${title}</p>
          <p class="big-score">${G.correct}<span> / ${G.qs.length}</span></p>
          ${r.stars !== undefined ? starHtml(r.stars) : ""}
          <h2>${r.headline}</h2>
          <p>${r.detail}</p>
          <div class="row center">
            <button class="btn" data-act="retry">Try again</button>
            <a class="btn primary" href="#${r.nextHref || backHref}">${r.nextLabel || "Done"}</a>
          </div>
        </article>
      </div>`;
  }

  function vQuiz(id) {
    const m = byId(id); if (!m) return vLearn();
    if (!G || G.type !== "quiz" || G.id !== id) G = { type: "quiz", id, i: 0, correct: 0, picked: null, log: [], qs: shuffle(m.quiz).map(q => prepQ(q, m)) };
    return quizHtml(m.name, `Module ${MODULES.indexOf(m) + 1} · Quiz`, m.hue, "m-" + id);
  }

  function vExam() {
    if (!G || G.type !== "exam") {
      return `
        <div class="stage" style="--h:45">
          <article class="card result">
            <p class="eyebrow">Certification</p>
            <h1>The certification exam</h1>
            <p>${EXAM_LEN} questions drawn at random from all ten modules. Score ${EXAM_PASS} or more to earn your certificate and ${XP.exam} XP. ${S.exam.passed ? "You have already passed. Retake it any time to stay sharp." : "You can retake it as often as you like."}</p>
            <div class="row center"><a class="btn" href="#play">Not yet</a><button class="btn primary" data-act="examStart">Start the exam</button></div>
          </article>
        </div>`;
    }
    return quizHtml("Certification Exam", "All modules", 45, "play");
  }

  function finishQuiz() {
    if (G.type === "quiz") {
      const prev = S.quiz[G.id] || 0, n = G.correct, st = stars(n);
      if (n > prev) { S.quiz[G.id] = n; addXp((n - prev) * XP.quizQ, "quiz"); }
      if (n === 5) confetti();
      const idx = MODULES.findIndex(m => m.id === G.id), nx = MODULES[idx + 1];
      G.result = {
        stars: st,
        headline: n === 5 ? "Clean sheet." : n >= 3 ? "Passed." : "Not there yet.",
        detail: n === 5 ? "You could hold this conversation with any hiring manager." : n >= 3 ? "Solid. Replay for three stars, or move on." : "Reread the briefing and try again. You only need three to pass.",
        nextHref: n >= 3 ? (nx ? "m-" + nx.id : "play") : "m-" + G.id,
        nextLabel: n >= 3 ? (nx ? `Next: ${nx.name}` : "On to the arcade") : "Back to the briefing"
      };
    } else {
      const n = G.correct, pass = n >= EXAM_PASS;
      if (n > S.exam.best) S.exam.best = n;
      if (pass && !S.exam.passed) { S.exam.passed = today(); addXp(XP.exam, "certified"); confetti(); }
      G.result = {
        headline: pass ? "You are certified." : "Not this time.",
        detail: pass ? "Your certificate is on your profile." : `You need ${EXAM_PASS} to pass. Review the modules you missed and go again.`,
        nextHref: pass ? "me" : "learn", nextLabel: pass ? "View certificate" : "Review modules"
      };
    }
    checkBadges();
  }

  /* ---------- Call Simulator ---------- */

  function vSim(id) {
    const sc = SCENARIOS.find(s => s.id === id);
    if (!sc) {
      return `<h1 class="page-h">Call Simulator</h1><p class="sec-sub">Each call has three moments. Choose what you would say. The best answer earns 2 points, an acceptable one earns 1.</p>
        <div class="sims">${SCENARIOS.map(s => {
          const b = S.sim[s.id];
          return `<a class="sim-pick" href="#sim-${s.id}"><span class="tagline ${s.who.toLowerCase()}">${s.who}</span><b>${s.title}</b><span>${s.name} · ${s.org}</span><span class="game-best">${b === undefined ? "Not played" : `Best grade ${simGrade(b)}`}</span></a>`;
        }).join("")}</div>`;
    }
    if (!G || G.type !== "sim" || G.id !== id) G = { type: "sim", id, t: 0, pts: 0, picked: null, hist: [], order: sc.turns.map(() => shuffle([0, 1, 2])) };
    const done = G.t >= sc.turns.length;
    const bubbles = G.hist.map(h => `<div class="bub them"><span class="who">${sc.name.split(",")[0]}</span>${h.say}</div><div class="bub me"><span class="who">You</span>${h.said}</div>`).join("");
    if (done) {
      const g = simGrade(G.pts);
      return `<div class="stage" style="--h:${sc.who === "Client" ? 0 : 185}">
        <div class="chat">${bubbles}</div>
        <article class="card result">
          <p class="eyebrow">${sc.title}</p>
          <p class="big-score">${g}<span> · ${G.pts} / 6</span></p>
          <h2>${g === "A" ? "That call went well." : g === "B" ? "Good call, a few missed openings." : "Worth another run."}</h2>
          <p>${g === "A" ? "You asked before you pitched and stayed accurate." : "Look for the reply that asks a question or reframes the need before offering talent."}</p>
          <div class="row center"><button class="btn" data-act="retry">Replay</button><a class="btn primary" href="#sim">More calls</a></div>
        </article></div>`;
    }
    const turn = sc.turns[G.t], order = G.order[G.t];
    return `<div class="stage" style="--h:${sc.who === "Client" ? 0 : 185}">
      <div class="stage-head">
        <a class="back" href="#sim">All calls</a>
        <div class="stage-title"><div><p class="eyebrow">${sc.who} call · ${sc.org}</p><h1>${sc.name}</h1></div></div>
        <div class="dots">${sc.turns.map((_, k) => `<i class="${k <= G.t ? "on" : ""}"></i>`).join("")}</div>
      </div>
      <div class="chat">${bubbles}<div class="bub them"><span class="who">${sc.name.split(",")[0]}</span>${turn.say}</div></div>
      <p class="card-count">What do you say?</p>
      <div class="opts">
        ${order.map((oi, k) => {
          const pts = 2 - oi, cls = G.picked === null ? "" : k === G.picked ? (pts === 2 ? "ok" : pts === 1 ? "mid" : "no") : pts === 2 ? "ok" : "dim";
          return `<button class="opt ${cls}" data-act="simPick" data-k="${k}" ${G.picked !== null ? "disabled" : ""}><span class="opt-key">${"ABC"[k]}</span><span>${turn.opts[oi][0]}</span></button>`;
        }).join("")}
      </div>
      ${G.picked === null ? "" : (() => { const oi = order[G.picked], pts = 2 - oi; return `<div class="why ${pts === 2 ? "ok" : pts === 1 ? "mid" : "no"}" role="status"><b>${pts === 2 ? "Best reply. +2" : pts === 1 ? "Acceptable. +1" : "Missed. +0"}</b> ${turn.opts[oi][1]}${pts < 2 ? ` <i>Stronger: ${turn.opts[0][1]}</i>` : ""}</div>
      <div class="stage-foot"><span></span><button class="btn primary" data-act="simNext" data-autofocus>${G.t === sc.turns.length - 1 ? "End call" : "Continue"}</button></div>`; })()}
    </div>`;
  }

  /* ---------- Signal Check ---------- */

  function vSignal() {
    if (!G || G.type !== "signal") G = { type: "signal", i: 0, correct: 0, picked: null, items: shuffle(SIGNALS) };
    if (G.i >= G.items.length) {
      return `<div class="stage" style="--h:130"><article class="card result">
        <p class="eyebrow">Signal Check</p><p class="big-score">${G.correct}<span> / ${G.items.length}</span></p>
        <h2>${G.correct >= 14 ? "Sharp ear." : "Keep listening for specifics."}</h2>
        <p>Strong signals name a tool, a task, a check and a result. Everything else deserves a follow-up question.</p>
        <div class="row center"><button class="btn" data-act="retry">Play again</button><a class="btn primary" href="#play">Arcade</a></div></article></div>`;
    }
    const it = G.items[G.i], p = G.picked;
    return `<div class="stage" style="--h:130">
      <div class="stage-head"><a class="back" href="#play">Arcade</a>
        <div class="stage-title"><div><p class="eyebrow">Signal Check · ${G.i + 1} of ${G.items.length}</p><h1>Strong signal, or dig deeper?</h1></div></div>
        <span class="score-chip">${G.correct} correct</span></div>
      <article class="card quote"><p>${it.s}</p></article>
      <div class="duo">
        <button class="btn sig good ${p === null ? "" : it.good ? "is-ans" : "dim"}" data-act="sig" data-v="1" ${p !== null ? "disabled" : ""}>Strong signal</button>
        <button class="btn sig bad ${p === null ? "" : !it.good ? "is-ans" : "dim"}" data-act="sig" data-v="0" ${p !== null ? "disabled" : ""}>Dig deeper</button>
      </div>
      ${p === null ? "" : `<div class="why ${p === it.good ? "ok" : "no"}" role="status"><b>${p === it.good ? "Right." : "Not quite."}</b> ${it.why}</div>
      <div class="stage-foot"><span></span><button class="btn primary" data-act="sigNext" data-autofocus>Next</button></div>`}
    </div>`;
  }

  /* ---------- Tool Sort ---------- */

  const SORT_MODS = MODULES.filter(m => m.tools.length);
  const SORT_POOL = SORT_MODS.flatMap(m => m.tools.map(t => ({ name: t[0], mod: m })));
  // Tools that reasonably belong to a second discipline: never offer that one as a wrong answer.
  const SORT_ALSO = {
    "ChatGPT": ["copy", "aeo"], "Claude": ["copy", "frontend"], "Gemini": ["copy", "aeo"], "Microsoft Copilot": ["copy", "frontend"],
    "Perplexity": ["aeo"], "MCP": ["frontend", "ux"], "Figma MCP server": ["frontend"], "v0": ["frontend"], "Lovable": ["frontend"],
    "Bolt": ["ux"], "GitHub Copilot": ["basics"], "Custom GPTs": ["basics"], "Claude Projects": ["basics"], "Grammarly": ["basics"],
    "Jasper": ["automation"], "NotebookLM": ["basics", "copy"], "ElevenLabs": ["creative"], "Synthesia": ["creative"], "HeyGen": ["creative"],
    "Runway": ["learning"], "Canva Magic Studio": ["copy"], "Performance Max": ["aeo"], "Dovetail": ["learning"]
  };
  const sortName = m => (m.id === "basics" ? "General AI assistants" : m.name);

  function sortQuestion() {
    const pick = G.deck.pop() || (G.deck = shuffle(SORT_POOL)).pop();
    const also = SORT_ALSO[pick.name] || [];
    const others = shuffle(SORT_MODS.filter(m => m !== pick.mod && !also.includes(m.id))).slice(0, 3);
    G.cur = { pick, opts: shuffle([pick.mod, ...others]) };
  }

  function vSort() {
    if (!G || G.type !== "sort") G = { type: "sort", phase: "ready" };
    if (G.phase === "ready") {
      return `<div class="stage" style="--h:215"><article class="card result">
        <p class="eyebrow">Tool Sort</p><h1>Which discipline owns this tool?</h1>
        <p>You have ${SORT_SECONDS} seconds. Each correct answer scores 10, and a streak of right answers multiplies it up to three times. A miss resets the streak.</p>
        <p class="muted">Your best: ${S.sort}</p>
        <div class="row center"><a class="btn" href="#play">Arcade</a><button class="btn primary" data-act="sortStart" data-autofocus>Start</button></div></article></div>`;
    }
    if (G.phase === "over") {
      return `<div class="stage" style="--h:215"><article class="card result">
        <p class="eyebrow">Tool Sort</p><p class="big-score">${G.score}</p>
        <h2>${G.score >= 150 ? "Quick draw." : "Time."}</h2>
        <p>${G.right} right, ${G.wrong} missed.${G.missed.length ? " Review: " + G.missed.map(x => `<b>${x.name}</b> belongs to ${sortName(x.mod)}`).join("; ") + "." : ""}</p>
        <div class="row center"><button class="btn" data-act="sortStart">Play again</button><a class="btn primary" href="#play">Arcade</a></div></article></div>`;
    }
    const c = G.cur;
    return `<div class="stage" style="--h:215">
      <div class="stage-head"><a class="back" href="#play">Quit</a>
        <div class="sort-hud"><span class="score-chip" id="sort-time">${G.left}s</span><span class="score-chip">Score ${G.score}</span><span class="score-chip">x${Math.min(3, G.combo + 1)}</span></div></div>
      <div class="timebar"><span id="sort-bar" style="width:${(G.left / SORT_SECONDS) * 100}%"></span></div>
      <article class="card sort-card ${G.flash || ""}"><p class="card-count">Which discipline?</p><p class="sort-name">${c.pick.name}</p></article>
      <div class="opts grid2">${c.opts.map((m, k) => `<button class="opt el-opt" style="--h:${m.hue}" data-act="sortPick" data-k="${k}"><span class="opt-key">${m.sym}</span><span>${sortName(m)}</span></button>`).join("")}</div>
    </div>`;
  }

  function sortTick() {
    G.left--;
    const t = $("#sort-time"), b = $("#sort-bar");
    if (t) t.textContent = G.left + "s";
    if (b) b.style.width = (G.left / SORT_SECONDS) * 100 + "%";
    if (G.left <= 0) {
      clearInterval(timer); timer = null; G.phase = "over";
      const capped = Math.min(XP.sortCap, G.score), prev = Math.min(XP.sortCap, S.sort);
      if (G.score > S.sort) S.sort = G.score;
      addXp(capped - prev, "tool sort"); checkBadges(); render();
    }
  }

  /* ---------- Jargon Decoder ---------- */

  function vJargon() {
    if (!G || G.type !== "jargon") G = { type: "jargon", open: {} };
    const known = JARGON.filter(j => S.jargon[j[0]]).length;
    return `<h1 class="page-h">Jargon Decoder</h1>
      <p class="sec-sub">Say what the term means, then flip the card to check. Mark the ones you know for ${XP.jargon} XP each. ${known} of ${JARGON.length} known.</p>
      <div class="jargon">${JARGON.map((j, k) => {
        const open = G.open[k], kn = S.jargon[j[0]];
        return `<div class="flip ${open ? "open" : ""} ${kn ? "known" : ""}">
          <button class="flip-face" data-act="flip" data-k="${k}" aria-expanded="${open ? "true" : "false"}"><span class="flip-term">${j[0]}</span>${open ? `<span class="flip-def">${j[1]}</span>` : `<span class="flip-hint">${kn ? "Known · tap to review" : "Tap to reveal"}</span>`}</button>
          ${open && !kn ? `<button class="btn small" data-act="know" data-k="${k}">I know this  +${XP.jargon}</button>` : ""}
        </div>`;
      }).join("")}</div>`;
  }

  /* ---------- Field Kit ---------- */

  function vKit(id) {
    const m = byId(id) || MODULES[0];
    const block = (title, items, cls) => items.length ? `<section class="kit-block"><div class="kit-h"><h3 class="${cls || ""}">${title}</h3><button class="btn small" data-act="copy" data-text="${esc(items.map(x => "• " + x.replace(/<[^>]+>/g, "")).join("\n"))}">Copy</button></div><ul class="bul">${items.map(x => `<li>${x}</li>`).join("")}</ul></section>` : "";
    return `<h1 class="page-h">Field Kit</h1>
      <p class="sec-sub">Open this before a call. Pick the discipline, copy the questions into your notes.</p>
      <div class="kit-tabs" role="tablist">${MODULES.map(x => `<a role="tab" aria-selected="${x === m}" class="${x === m ? "on" : ""}" style="--h:${x.hue}" href="#kit-${x.id}"><span>${x.sym}</span>${x.name}</a>`).join("")}</div>
      <div class="kit" style="--h:${m.hue}">
        <p class="kit-tag">${m.tag}</p>
        <div class="kit-grid">
          ${block("Ask the client", m.client)}
          ${block("Ask the candidate", m.cand)}
          ${block("Strong signals", m.green, "good")}
          ${block("Dig deeper when you hear", m.red, "bad")}
        </div>
        ${m.tools.length ? `<section class="kit-block"><h3>Tools to know</h3><div class="tools">${m.tools.map(t => `<div class="tool"><b>${t[0]}</b><span class="tool-by">${t[1]}</span><span>${t[2]}</span></div>`).join("")}</div></section>` : ""}
        ${m.roles.length ? `<section class="kit-block"><h3>Titles in demand</h3><div class="chips">${m.roles.map(r => `<span>${r}</span>`).join("")}</div></section>` : ""}
      </div>
      <h2 class="sec">When a client pushes back</h2>
      <div class="objs">${OBJECTIONS.map(o => `<details class="obj"><summary>${o[0]}</summary><p>${o[1]}</p></details>`).join("")}</div>
      <p class="hint">Content reviewed ${CONTENT_DATE}. AI products change monthly, so say "as of the last I saw" and confirm what the client actually has.</p>`;
  }

  /* ---------- Leaderboard ---------- */

  function loadBoard() {
    board.loading = true; board.error = false;
    (S.name ? syncNow() : Promise.resolve())
      .then(() => rpc("ai_academy_leaderboard", { p_key: S.key || null }))
      .then(rows => { board.rows = rows || []; }, () => { board.error = true; })
      .then(() => { board.loading = false; if (route() === "board") { const el = $("#board-body"); if (el) el.innerHTML = boardBody(); } });
  }

  const nameHue = n => { let h = 0; for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360; return h; };
  const initials = n => n.trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase() || "?";
  const avatar = n => `<span class="lb-av" style="--h:${nameHue(n)}" aria-hidden="true">${esc(initials(n))}</span>`;
  const certMark = r => (r.certified_on ? `<span class="lb-cert" title="Certified ${esc(r.certified_on)}">Certified</span>` : "");

  function boardBody() {
    if (board.loading && !board.rows) return `<p class="muted">Loading the leaderboard…</p>`;
    if (board.error && !board.rows) return `<p class="note">The leaderboard could not be reached. Check your connection and try again. Your progress is still saved on this device.</p>`;
    const rows = board.rows || [];
    if (!rows.length) return `<p class="muted">Nobody is on the board yet. Add your name and finish a briefing to be first.</p>`;
    const certified = rows.filter(r => r.certified_on).length;
    const top = Math.max(1, rows[0].xp);
    const podium = rows.length >= 3 ? rows.slice(0, 3) : [];
    const rest = rows.slice(podium.length);
    const me = rows.findIndex(r => r.is_me);
    return `
      <p class="lb-sum"><b>${rows.length}</b> ${rows.length === 1 ? "person" : "people"} training<span>·</span><b>${certified}</b> certified${me >= 0 ? `<span>·</span>You are <b>#${me + 1}</b>` : ""}</p>
      ${podium.length ? `<ol class="lb-podium">${podium.map((r, i) => `
        <li class="lb-top p${i + 1} ${r.is_me ? "me" : ""}">
          <span class="lb-medal">${i + 1}</span>
          ${avatar(r.name)}
          <b class="lb-name">${esc(r.name)}${r.is_me ? ` <span class="you">You</span>` : ""}</b>
          <span class="lb-rank">${RANKS[rankIndex(r.xp)][1]}</span>
          <span class="lb-big">${r.xp.toLocaleString()}<small> XP</small></span>
          <span class="lb-meta">${r.modules_passed}/${MODULES.length} modules · ${r.badges} ${r.badges === 1 ? "badge" : "badges"}</span>
          ${certMark(r)}
        </li>`).join("")}</ol>` : ""}
      ${rest.length ? `<ol class="lb-list" start="${podium.length + 1}">${rest.map((r, i) => `
        <li class="lb-row ${r.is_me ? "me" : ""}">
          <span class="lb-pos">${i + 1 + podium.length}</span>
          ${avatar(r.name)}
          <span class="lb-who"><b class="lb-name">${esc(r.name)}${r.is_me ? ` <span class="you">You</span>` : ""}</b><span class="lb-rank">${RANKS[rankIndex(r.xp)][1]} · ${r.modules_passed}/${MODULES.length} modules · ${r.badges} ${r.badges === 1 ? "badge" : "badges"}</span></span>
          ${certMark(r)}
          <span class="lb-bar" aria-hidden="true"><i style="width:${Math.max(2, Math.round((r.xp / top) * 100))}%"></i></span>
          <span class="lb-xp">${r.xp.toLocaleString()} XP</span>
        </li>`).join("")}</ol>` : ""}`;
  }

  function vBoard() {
    loadBoard();
    return `<h1 class="page-h">Leaderboard</h1>
      <p class="sec-sub">Everyone on the team who has entered a name, ranked by XP. Scores update as people train.</p>
      ${S.name ? "" : `<form class="namer board-namer" data-form="name"><label for="name-in">Add your name to join the board</label><div class="row"><input id="name-in" maxlength="40" autocomplete="name" placeholder="First and last name"><button class="btn small">Join</button></div></form>`}
      <div id="board-body">${boardBody()}</div>
      <div class="row reset"><button class="btn small" data-act="boardRefresh">Refresh</button></div>`;
  }

  /* ---------- Profile ---------- */

  function vMe() {
    const ri = rankIndex(S.xp), next = RANKS[ri + 1];
    const passed = MODULES.filter(m => S.quiz[m.id] >= 3).length;
    const cert = S.exam.passed ? `<section class="cert"><p class="eyebrow">Certificate of completion</p><p class="cert-name">${esc(S.name || "Your name here")}</p><p>has passed the AI Fluency Academy certification for marketing and creative staffing.</p><p class="cert-meta">${S.exam.passed} · score ${S.exam.best} of ${EXAM_LEN} · content edition ${CONTENT_DATE}</p></section>` : "";
    return `<h1 class="page-h">${S.name ? esc(S.name) : "Your profile"}</h1>
      <div class="stats">
        <div><b>${RANKS[ri][1]}</b><span>Rank${next ? ` · ${next[0] - S.xp} XP to ${next[1]}` : ""}</span></div>
        <div><b>${S.xp}</b><span>XP</span></div>
        <div><b>${passed} / ${MODULES.length}</b><span>Modules passed</span></div>
        <div><b>${S.streak}</b><span>Day streak</span></div>
      </div>
      ${cert}
      <h2 class="sec">Rank ladder</h2>
      <ol class="ladder">${RANKS.map((r, k) => `<li class="${k <= ri ? "on" : ""}"><b>${r[1]}</b><span>${r[0]} XP</span></li>`).join("")}</ol>
      <h2 class="sec">Badges</h2>
      <div class="badges">${BADGES.map(b => `<div class="badge ${S.badges[b.id] ? "on" : ""}"><b>${b.name}</b><span>${b.desc}</span>${S.badges[b.id] ? `<span class="badge-date">Earned ${S.badges[b.id]}</span>` : ""}</div>`).join("")}</div>
      <h2 class="sec">Settings</h2>
      <form class="namer" data-form="name"><label for="name-in">Name on your certificate and the team leaderboard</label><div class="row"><input id="name-in" maxlength="40" autocomplete="name" value="${esc(S.name)}" placeholder="First and last name"><button class="btn small">Save</button></div></form>
      <div class="row reset">${G && G.type === "reset"
        ? `<span>Erase all progress on this device?</span><button class="btn small danger" data-act="resetYes">Yes, erase</button><button class="btn small" data-act="resetNo">Keep it</button>`
        : `<button class="btn small" data-act="resetAsk">Reset my progress</button>`}</div>
      <p class="hint">Progress is saved in this browser. Once you enter a name, your name and scores are also shared on the team leaderboard.</p>`;
  }

  /* ---------- actions ---------- */

  const A = {
    briefNext() { G.i++; render(); },
    briefPrev() { if (G.i > 0) { G.i--; render(); } },
    briefDone() {
      const id = G.id;
      if (!S.briefed[id]) { S.briefed[id] = 1; addXp(XP.brief, "briefing"); checkBadges(); }
      G = null; go("q-" + id);
    },
    answer(el) {
      if (G.picked !== null) return;
      G.picked = +el.dataset.k;
      const ok = G.qs[G.i].opts[G.picked].ok;
      G.log[G.i] = ok; if (ok) G.correct++;
      render();
    },
    quizNext() { G.i++; G.picked = null; if (G.i >= G.qs.length) finishQuiz(); render(); },
    examStart() {
      const all = MODULES.flatMap(m => m.quiz.map(q => ({ q, m })));
      G = { type: "exam", i: 0, correct: 0, picked: null, log: [], qs: shuffle(all).slice(0, EXAM_LEN).map(x => prepQ(x.q, x.m)) };
      render();
    },
    retry() { const t = G.type; G = null; if (t === "exam") A.examStart(); else render(); },
    simPick(el) {
      if (G.picked !== null) return;
      G.picked = +el.dataset.k; G.pts += 2 - G.order[G.t][G.picked]; render();
    },
    simNext() {
      const sc = SCENARIOS.find(s => s.id === G.id), turn = sc.turns[G.t];
      G.hist.push({ say: turn.say, said: turn.opts[G.order[G.t][G.picked]][0] });
      G.t++; G.picked = null;
      if (G.t >= sc.turns.length) {
        const prev = S.sim[G.id] || 0;
        if (S.sim[G.id] === undefined || G.pts > prev) { S.sim[G.id] = G.pts; addXp((G.pts - prev) * XP.simPt, "call"); }
        if (G.pts >= 5) confetti();
        checkBadges();
      }
      render();
    },
    sig(el) {
      if (G.picked !== null) return;
      G.picked = el.dataset.v === "1";
      if (G.picked === G.items[G.i].good) G.correct++;
      render();
    },
    sigNext() {
      G.i++; G.picked = null;
      if (G.i >= G.items.length) { if (G.correct > S.signal) { addXp((G.correct - S.signal) * XP.signal, "signal check"); S.signal = G.correct; } checkBadges(); }
      render();
    },
    sortStart() {
      G = { type: "sort", phase: "play", left: SORT_SECONDS, score: 0, combo: 0, right: 0, wrong: 0, missed: [], deck: shuffle(SORT_POOL) };
      sortQuestion(); render();
      timer = setInterval(sortTick, 1000);
    },
    sortPick(el) {
      const ok = G.cur.opts[+el.dataset.k] === G.cur.pick.mod;
      if (ok) { G.score += 10 * Math.min(3, G.combo + 1); G.combo++; G.right++; G.flash = "flash-ok"; }
      else { G.combo = 0; G.wrong++; G.flash = "flash-no"; if (G.missed.length < 4 && !G.missed.includes(G.cur.pick)) G.missed.push(G.cur.pick); }
      sortQuestion();
      const keep = timer; timer = null; render(); timer = keep;   // re-render without stopping the clock
    },
    flip(el) { const k = el.dataset.k; G.open[k] = !G.open[k]; rerenderKeepScroll(); },
    know(el) {
      const term = JARGON[+el.dataset.k][0];
      if (!S.jargon[term]) { S.jargon[term] = 1; addXp(XP.jargon, term); checkBadges(); }
      G.open[el.dataset.k] = false; rerenderKeepScroll();
    },
    copy(el) {
      const text = el.dataset.text, done = () => { el.textContent = "Copied"; setTimeout(() => { el.textContent = "Copy"; }, 1500); };
      try { navigator.clipboard.writeText(text).then(done, () => toast("Copy is blocked here. Select the text instead.")); }
      catch (e) { toast("Copy is blocked here. Select the text instead."); }
    },
    boardRefresh() { loadBoard(); toast("Refreshing"); },
    resetAsk() { G = { type: "reset" }; rerenderKeepScroll(); },
    resetNo() { G = null; rerenderKeepScroll(); },
    resetYes() { const name = S.name, key = S.key; S = blank(); S.name = name; S.key = key; S.last = today(); S.streak = 1; G = null; save(); toast("Progress erased"); go("learn"); }
  };

  function rerenderKeepScroll() { const y = window.scrollY; render(); window.scrollTo(0, y); }

  document.addEventListener("click", e => {
    const el = e.target.closest("[data-act]");
    if (!el || el.disabled) return;
    const fn = A[el.dataset.act];
    if (fn) { fn(el); save(); }
  });

  document.addEventListener("submit", e => {
    const f = e.target.closest("[data-form=name]");
    if (!f) return;
    e.preventDefault();
    S.name = $("input", f).value.trim().slice(0, 40);
    save(); toast(S.name ? "Name saved" : "Name cleared"); rerenderKeepScroll();
  });

  document.addEventListener("keydown", e => {
    if (!G || G.type !== "brief" || route().indexOf("m-") !== 0 || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === "ArrowRight" && G.i < G.cards.length - 1) A.briefNext();
    if (e.key === "ArrowLeft") A.briefPrev();
  });

  /* ---------- boot ---------- */

  $("#app").innerHTML = `<header id="top"></header><main id="view"></main><div id="toasts" aria-live="polite"></div><canvas id="confetti" hidden></canvas>`;
  checkBadges();
  render();
})();
