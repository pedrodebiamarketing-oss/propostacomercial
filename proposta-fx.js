/* ================================================================
   EFEITOS DE PROPOSTA (genérico e reutilizável): data, reveal, nav
   e as linhas de fundo da capa. Use em qualquer proposta de projeto.
   ================================================================ */
// data de emissão
(function () {
  const e = document.getElementById("p-data");
  if (!e) return;
  const d = new Date();
  e.textContent = d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
})();

// reveal ao rolar
(function () {
  const els = document.querySelectorAll(".reveal:not(.is-in)");
  if (!("IntersectionObserver" in window)) {
    els.forEach((x) => x.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  els.forEach((x) => io.observe(x));
})();

// nav vidro ao rolar
(function () {
  const n = document.getElementById("pnav");
  if (!n) return;
  const on = () => n.classList.toggle("is-scrolled", window.scrollY > 12);
  on();
  window.addEventListener("scroll", on, { passive: true });
})();

// linhas fluindo no fundo da capa (igual às outras propostas)
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.querySelector(".hero__lines");
  if (!canvas || reduced) return;
  const hero = canvas.closest(".phead");
  if (!hero) return;
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, dpr = 1, cols = 0, lines = [];
  const LINE_GAP = 24, STEP = 16;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

  function build() {
    lines = [];
    const n = Math.ceil(H / LINE_GAP) + 2;
    for (let i = 0; i < n; i++) {
      const baseY = i * LINE_GAP;
      const vpos = H ? baseY / H : 0;
      const fade = Math.min(1, Math.max(0, (vpos - 0.5) / 0.36));
      if (fade <= 0.001) continue;
      lines.push({ baseY, phase: i * 0.5, amp: 6 + vpos * 30, alpha: fade * 0.34 });
    }
  }
  function resize() {
    const r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(W / STEP) + 1; build();
  }
  let t = 0; const sigma = 190, sig2 = 2 * sigma * sigma, lift = 92; let raf = null;
  function frame() {
    t += 0.006;
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = 1.15;
    for (let li = 0; li < lines.length; li++) {
      const L = lines[li];
      ctx.beginPath();
      let prevX = 0, prevY = 0;
      for (let c = 0; c <= cols; c++) {
        const x = c * STEP;
        let y = L.baseY + L.amp * Math.sin(x * 0.006 + t * 1.2 + L.phase) + (L.amp * 0.5) * Math.sin(x * 0.013 - t * 0.8 + L.phase * 1.7);
        if (mouse.active) { const dx = x - mouse.x, dy = L.baseY - mouse.y; y -= lift * Math.exp(-(dx * dx + dy * dy) / sig2); }
        if (c === 0) ctx.moveTo(x, y);
        else ctx.quadraticCurveTo(prevX, prevY, (prevX + x) / 2, (prevY + y) / 2);
        prevX = x; prevY = y;
      }
      let a = L.alpha;
      if (mouse.active) { const dyc = L.baseY - mouse.y; a += 0.22 * Math.exp(-(dyc * dyc) / sig2); }
      ctx.strokeStyle = "rgba(178, 132, 255, " + a.toFixed(3) + ")";
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
    raf = requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) { if (!raf) raf = requestAnimationFrame(frame); }
      else if (raf) { cancelAnimationFrame(raf); raf = null; }
    });
  }, { threshold: 0 });
  io.observe(hero);
  window.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top;
    mouse.active = e.clientY >= r.top && e.clientY <= r.bottom;
  }, { passive: true });
  window.addEventListener("resize", resize);
  resize();
})();
