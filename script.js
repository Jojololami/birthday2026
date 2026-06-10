  // ── Gallery Lightbox ──
  const galleryItems = document.querySelectorAll('.gallery-item');
  let lightboxIndex = -1;
 
  function openLightbox(index) {
    const item = galleryItems[index];
    if (!item) return;
    const img = item.querySelector('img');
    if (!img) return;
    lightboxIndex = index;
    document.getElementById('lightboxImg').src = img.src;
    document.getElementById('lightboxCaption').textContent = img.dataset.caption || '';
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
 
  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
 
  function lightboxNav(dir) {
    let next = lightboxIndex + dir;
    if (next < 0) next = galleryItems.length - 1;
    if (next >= galleryItems.length) next = 0;
    openLightbox(next);
  }
 
  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
  });
 
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  });
  
// ── Confetti ──
  (function() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, pieces = [], running = true;
 
    const COLORS = ['#c9707a','#e8a0a8','#f7d6da','#c4923a','#f5d79e','#fff','#f2b5bc','#e8d5a3','#b56070'];
    const SHAPES = ['rect','circle','ribbon'];
    const COUNT = 160;
 
    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
 
    function rand(a, b) { return a + Math.random() * (b - a); }
 
    function spawn() {
      return {
        x: rand(0, W),
        y: rand(-80, -10),
        w: rand(6, 14),
        h: rand(4, 10),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        vx: rand(-1.5, 1.5),
        vy: rand(2.5, 5),
        angle: rand(0, Math.PI * 2),
        spin: rand(-0.08, 0.08),
        sway: rand(0.01, 0.04),
        swayDir: Math.random() > 0.5 ? 1 : -1,
        swayT: rand(0, Math.PI * 2),
        opacity: rand(0.75, 1),
        life: 1
      };
    }
 
    for (let i = 0; i < COUNT; i++) {
      const p = spawn();
      p.y = rand(-H, 0); // scatter initial positions
      pieces.push(p);
    }
 
    function draw() {
      ctx.clearRect(0, 0, W, H);
      pieces.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.opacity * p.life;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(-p.w / 2, 0);
          ctx.quadraticCurveTo(0, -p.h, p.w / 2, 0);
          ctx.quadraticCurveTo(0, p.h, -p.w / 2, 0);
          ctx.fill();
        }
        ctx.restore();
      });
    }
 
    let startTime = null;
    const DURATION = 6000; // confetti runs for 6 seconds
 
    function update(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
 
      pieces.forEach(p => {
        p.swayT += p.sway;
        p.x += p.vx + Math.sin(p.swayT) * 0.8 * p.swayDir;
        p.y += p.vy;
        p.angle += p.spin;
        if (elapsed > DURATION * 0.6) {
          p.life = Math.max(0, p.life - 0.005);
        }
        // recycle if off-screen and still within burst window
        if (p.y > H + 20 && elapsed < DURATION) {
          Object.assign(p, spawn());
        }
      });
 
      draw();
 
      if (elapsed < DURATION + 2000 && running) {
        requestAnimationFrame(update);
      } else {
        ctx.clearRect(0, 0, W, H);
        canvas.style.display = 'none';
      }
    }
 
    requestAnimationFrame(update);
  })();
 
 
  // ── Petals ──
  const container = document.getElementById('petals');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*-20}px;animation-duration:${6+Math.random()*8}s;animation-delay:${Math.random()*6}s;opacity:${0.1+Math.random()*0.3};transform:scale(${0.7+Math.random()*1.2})`;
    container.appendChild(p);
  }
 
 // Countdown to June 16, next year
function tick() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 5, 16); // June 16
  if (now >= target) target = new Date(now.getFullYear() + 1, 5, 16);
  const diff = target - now;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-hrs').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-min').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-sec').textContent = String(s).padStart(2,'0');
}
tick();
setInterval(tick, 1000);
 
  // Copy account number
  function copyAcct(btn) {
    navigator.clipboard.writeText('3072608194').then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy Account No.', 2000);
    });
  }