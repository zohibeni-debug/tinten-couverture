/* ============================================================
   SCRIPT.JS – Tinten Couverture
   Mega-menu, FAQ, compteurs animés, scroll reveal, back-to-top
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- MENU MOBILE ---- */
  var menuToggle = document.getElementById('menuToggle');
  var navLinks   = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      var spans = menuToggle.querySelectorAll('span');
      if (isOpen) {
        if (spans[0]) spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        if (spans[1]) spans[1].style.opacity = '0';
        if (spans[2]) spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        if (spans[0]) spans[0].style.transform = '';
        if (spans[1]) spans[1].style.opacity = '';
        if (spans[2]) spans[2].style.transform = '';
      }
    });
    document.addEventListener('click', function (e) {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('open');
        document.body.style.overflow = '';
        var spans = menuToggle.querySelectorAll('span');
        if (spans[0]) spans[0].style.transform = '';
        if (spans[1]) spans[1].style.opacity = '';
        if (spans[2]) spans[2].style.transform = '';
      }
    });
  }

  /* ---- MEGA MENU ---- */
  var dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(function (dd) {
    var btn  = dd.querySelector('.dropdown-btn');
    var menu = dd.querySelector('.mega-menu');
    if (!btn || !menu) return;
    dd.addEventListener('mouseenter', function () {
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      dd.classList.add('open');
    });
    dd.addEventListener('mouseleave', function () {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      dd.classList.remove('open');
    });
    btn.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        var isOpen = dd.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', isOpen);
      }
    });
  });

  /* ---- HEADER STICKY ---- */
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      var navbar = header.querySelector('.navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
      }
    }, { passive: true });
  }

  /* ---- FAQ ACCORDÉON ---- */
  window.toggleFaq = function (btn) {
    var item   = btn.closest('.faq-item');
    var answer = item ? item.querySelector('.faq-answer') : null;
    var isOpen = btn.classList.contains('open');

    document.querySelectorAll('.faq-question.open').forEach(function (q) {
      q.classList.remove('open');
      q.setAttribute('aria-expanded', 'false');
      var a = q.closest('.faq-item');
      if (a) {
        var ans = a.querySelector('.faq-answer');
        if (ans) ans.classList.remove('open');
      }
    });

    if (!isOpen) {
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      if (answer) answer.classList.add('open');
    }
  };

  /* ---- COMPTEURS ANIMÉS ---- */
  function animateCounters() {
    var counters = document.querySelectorAll('.stat-num[data-target]');
    counters.forEach(function (counter) {
      var target   = parseInt(counter.getAttribute('data-target'), 10);
      var duration = 1800;
      var steps    = Math.ceil(duration / 16);
      var step     = Math.ceil(target / steps);
      var current  = 0;
      var timer = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current;
      }, 16);
    });
  }

  var statsBar = document.querySelector('.stats-bar');
  if (statsBar && 'IntersectionObserver' in window) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsBar);
  }

  /* ---- SCROLL REVEAL ---- */
  if ('IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.service-card, .avantage-item, .process-step, .temoignage-card, .gallery-item, .stat-item'
    );
    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
    });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- BACK TO TOP ---- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- FORMULAIRE DEVIS ---- */
  window.handleForm = function (e) {
    e.preventDefault();
    var form    = e.target;
    var name    = form.querySelector('#name-hero');
    var phone   = form.querySelector('#phone-hero');
    var subject = form.querySelector('#subject-hero');
    var consent = form.querySelector('#consent-hero');
    var btn     = form.querySelector('.btn-submit');
    var valid   = true;

    [name, phone, subject].forEach(function (field) {
      if (!field || !field.value.trim()) {
        if (field) field.style.borderColor = '#e74c3c';
        valid = false;
      } else {
        if (field) field.style.borderColor = '#96bc32';
      }
    });
    if (consent && !consent.checked) {
      consent.style.outline = '2px solid #e74c3c';
      valid = false;
    } else if (consent) {
      consent.style.outline = '';
    }
    if (!valid) return false;

    if (btn) {
      btn.textContent = '✓ Demande envoyée !';
      btn.style.background = '#27ae60';
      btn.disabled = true;
    }

    var mailBody = encodeURIComponent(
      'Nom : ' + (name ? name.value : '') + '\n' +
      'Téléphone : ' + (phone ? phone.value : '') + '\n' +
      'Projet : ' + (subject ? subject.value : '')
    );
    window.location.href = 'mailto:contact@tinten-couverture.fr?subject=Demande%20de%20devis&body=' + mailBody;
    return false;
  };

  /* ---- GALERIE LIGHTBOX ---- */
  var galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function (item) {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      if (!img) return;
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:20px;';
      var imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt;
      imgEl.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 8px 40px rgba(0,0,0,.5);';
      var closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.setAttribute('aria-label', 'Fermer');
      closeBtn.style.cssText = 'position:absolute;top:20px;right:24px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;line-height:1;';
      overlay.appendChild(imgEl);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
      function closeOverlay() {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.body.style.overflow = '';
      }
      overlay.addEventListener('click', closeOverlay);
      closeBtn.addEventListener('click', function (ev) { ev.stopPropagation(); closeOverlay(); });
      document.addEventListener('keydown', function escHandler(ev) {
        if (ev.key === 'Escape') { closeOverlay(); document.removeEventListener('keydown', escHandler); }
      });
    });
  });

  /* ---- SMOOTH SCROLL ANCHORS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ---- FILTRE GALERIE ---- */
  window.filterGallery = function (cat, btn) {
    document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  };

  /* ---- FORMULAIRE CONTACT ---- */
  window.handleContactForm = function (e) {
    e.preventDefault();
    var btn = e.target.querySelector('button[type="submit"]');
    if (btn) { btn.textContent = '✓ Message envoyé !'; btn.style.background = '#27ae60'; btn.disabled = true; }
    return false;
  };

});
