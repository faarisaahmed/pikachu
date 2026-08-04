/* Git Foundations — small progressive enhancements.
   Nothing here is required for the page to be readable. */
(function () {
  'use strict';

  /* ---------- Theme toggle (remembers your choice) ---------- */
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  var toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme') || (systemDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- Copy buttons on code blocks ---------- */
  document.querySelectorAll('.code .copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var block = btn.closest('.code');
      var code = block && block.querySelector('code');
      if (!code) return;

      var done = function () {
        var original = 'Copy';
        btn.textContent = 'Copied';
        btn.classList.add('is-done');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('is-done');
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code.textContent).then(done, fallback);
      } else {
        fallback();
      }

      function fallback() {
        // file:// and older browsers have no async clipboard API
        var ta = document.createElement('textarea');
        ta.value = code.textContent;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- Scroll progress bar ---------- */
  var bar = document.querySelector('[data-progress]');
  var ticking = false;

  function updateProgress() {
    if (!bar) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }

  /* ---------- Highlight the nav link for the section in view ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function updateNav() {
    var mark = window.scrollY + window.innerHeight * 0.3;
    var activeIndex = -1;
    sections.forEach(function (section, i) {
      if (section.offsetTop <= mark) activeIndex = i;
    });
    navLinks.forEach(function (a, i) {
      a.classList.toggle('is-active', i === activeIndex);
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateProgress();
      updateNav();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
})();
