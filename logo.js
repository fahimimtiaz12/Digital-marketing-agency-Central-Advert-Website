window.addEventListener("DOMContentLoaded", function () {
  const logoCanvas = document.getElementById('logoCanvas');
  if (!logoCanvas) return;

  // Set up pixel-perfect sizing and scaling for sharpness
  function resizeLogoCanvas() {
    // Device pixel ratio for sharpness
    const dpr = window.devicePixelRatio || 1;
    logoCanvas.width = logoCanvas.offsetWidth * dpr;
    logoCanvas.height = logoCanvas.offsetHeight * dpr;
    logoCanvas.style.width = logoCanvas.offsetWidth + "px";
    logoCanvas.style.height = logoCanvas.offsetHeight + "px";
  }
  resizeLogoCanvas();

  const ctx = logoCanvas.getContext('2d');
  ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

  // Prepare animated particles
  let particles = [];
  function initParticles() {
    particles = [];
    for (let i = 0; i < 24; i++) {
      particles.push({
        x: Math.random() * logoCanvas.offsetWidth,
        y: Math.random() * logoCanvas.offsetHeight,
        r: Math.random() * 2.5 + 1,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
        alpha: Math.random()*0.8+0.2
      });
    }
  }
  initParticles();

  function drawLogoBg() {
    ctx.clearRect(0, 0, logoCanvas.width, logoCanvas.height);

    // Soft radial gradient glow behind logo
    const grad = ctx.createRadialGradient(
      logoCanvas.offsetWidth / 2.2, logoCanvas.offsetHeight / 2, logoCanvas.offsetWidth / 8,
      logoCanvas.offsetWidth / 2.25, logoCanvas.offsetHeight / 2, logoCanvas.offsetWidth / 2.1
    );
    grad.addColorStop(0, 'rgba(14,238,255,0.16)');
    grad.addColorStop(0.7, 'rgba(14,238,255,0.09)');
    grad.addColorStop(1, 'rgba(14,238,255,0)');

    ctx.save();
    ctx.beginPath();
    ctx.arc(logoCanvas.offsetWidth / 2.25, logoCanvas.offsetHeight / 2, logoCanvas.offsetWidth / 2.6, 0, 2 * Math.PI);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Glowing ellipse for design accent
    ctx.save();
    ctx.shadowBlur = 22;
    ctx.shadowColor = "#0ef";
    ctx.beginPath();
    ctx.ellipse(
      logoCanvas.offsetWidth / 2.35,
      logoCanvas.offsetHeight / 2,
      logoCanvas.offsetWidth / 3.1,
      logoCanvas.offsetHeight / 3.55,
      0, 0, 2 * Math.PI
    );
    ctx.globalAlpha = 0.21;
    ctx.fillStyle = "#0ef";
    ctx.fill();
    ctx.restore();

    // Animate beautiful, glowing particles
    particles.forEach((p) => {
      p.x += p.dx; p.y += p.dy;
      // Bounce but keep inside header area
      if (p.x < 2 || p.x > logoCanvas.offsetWidth - 2) p.dx *= -1;
      if (p.y < 2 || p.y > logoCanvas.offsetHeight - 2) p.dy *= -1;

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

      // Slight color shift for variety
      ctx.fillStyle = `rgba(14,238,255,${p.alpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#0ef";
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.restore();
    });

    // Optional: Add extra accent dots around logo text
    for (let i = 0; i < 8; i++) {
      ctx.save();
      ctx.beginPath();
      const angle = (Math.PI * 2 * i) / 8;
      const cx = logoCanvas.offsetWidth / 2.25 + Math.cos(angle) * (logoCanvas.offsetWidth / 3.0);
      const cy = logoCanvas.offsetHeight / 2 + Math.sin(angle) * (logoCanvas.offsetHeight / 3.2);
      ctx.arc(cx, cy, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(14,238,255,0.32)";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#0ef";
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(drawLogoBg);
  }
  drawLogoBg();

  // Recalculate canvas size and particles on resize
  window.addEventListener('resize', function () {
    resizeLogoCanvas();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    initParticles();
  });
});
