(function () {
  var nav = document.getElementById('nav');
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('menu');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Navigatie: lijntje onder de balk na het scrollen
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
    heroZoom();
  }

  // Mobiel menu
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Menu openen');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { menuBtn.click(); menuBtn.focus(); }
    });
  }

  // Hero-foto groeit zacht mee tijdens het scrollen
  var heroPhoto = document.getElementById('heroPhoto');
  var ticking = false;
  function heroZoom() {
    if (!heroPhoto || reduce || ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var r = heroPhoto.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.min(Math.max((vh - r.top) / (vh * 0.9), 0), 1);
      heroPhoto.style.setProperty('--zoom', (0.94 + 0.06 * p).toFixed(4));
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', heroZoom);
  onScroll();

  // Rustige scroll-animaties
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (el.parentElement && el.parentElement.children.length > 1 ? (Array.prototype.indexOf.call(el.parentElement.children, el) % 3) * 90 : 0) + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Galerij: toont alleen foto's die echt bestaan, en verschijnt pas als er minstens één is
  var gallerySection = document.getElementById('galerij');
  var gallery = document.getElementById('gallery');
  if (gallery && gallerySection) {
    var imgs = gallery.querySelectorAll('img');
    var pending = imgs.length;
    var found = 0;
    function done() {
      pending--;
      if (pending === 0 && found > 0) {
        gallerySection.hidden = false;
        gallerySection.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
      }
    }
    imgs.forEach(function (img) {
      img.loading = 'eager';
      var test = new Image();
      test.onload = function () { found++; done(); };
      test.onerror = function () { img.closest('figure').remove(); done(); };
      test.src = img.getAttribute('src');
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
