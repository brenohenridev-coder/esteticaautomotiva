/* ================================================
   OPUS DETAIL — Scroll Controlled Video
   ================================================ */

/* ---- NAVBAR: transparente sobre vídeo, sólida nas demais seções ---- */
(function () {
  const navbar = document.getElementById('navbar');
  const videoSections = ['s1', 's3'];

  function updateNavbar() {
    const scrollY = window.scrollY;
    const winH = window.innerHeight;
    let overVideo = false;

    videoSections.forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (scrollY + winH * 0.1 >= top && scrollY < bottom) {
        overVideo = true;
      }
    });

    if (overVideo) {
      navbar.classList.remove('solid');
    } else {
      navbar.classList.add('solid');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
})();
(function () {
  const section = document.getElementById('s3');
  const video = document.getElementById('scroll-video');
  if (!section || !video) return;

  let duration = 0;
  let currentTime = 0;
  let rafId = null;

  video.pause();

  function update() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = section.offsetHeight - vh;
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    const progress = total > 0 ? scrolled / total : 0;

    const targetTime = progress * duration;
    // Interpolação suave para evitar travadas no seek
    currentTime += (targetTime - currentTime) * 0.35;

    if (duration > 0) {
      try {
        video.currentTime = currentTime;
      } catch (e) {}
    }
  }

  function loop() {
    update();
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    duration = video.duration;
    if (!rafId) loop();
  }

  if (video.readyState >= 1 && video.duration) {
    start();
  } else {
    video.addEventListener('loadedmetadata', start);
  }
})();
