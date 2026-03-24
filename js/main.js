/* ══════════════════════════════════════════════════════════════════
   main.js — Tienclimatek
   Includes: IntersectionObserver, hamburger menu, theme toggle,
             contact form validation (ES/EU), FAQ accordion
   ══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── LANGUAGE DETECTION ─────────────────────────────────────── */
  const lang = document.documentElement.lang || 'es';
  const isEU = lang === 'eu';

  const i18n = {
    es: {
      rgpd:    'Debes aceptar la política de privacidad RGPD para continuar.',
      bot:     'Por favor, confirma que no eres un robot.',
      sending: 'Enviando…',
    },
    eu: {
      rgpd:    'DBNP pribatutasun-politika onartu behar duzu jarraitzeko.',
      bot:     'Mesedez, berretsi ez zarela robota.',
      sending: 'Bidaltzen…',
    },
  };
  const t = isEU ? i18n.eu : i18n.es;

  /* ─── SCROLL REVEAL ──────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target); // fire once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ─── HAMBURGER MENU ─────────────────────────────────────────── */
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    document.querySelectorAll('.nav-link-item, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });

    // Close on backdrop click (outside nav)
    document.addEventListener('click', e => {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ─── THEME TOGGLE ───────────────────────────────────────────── */
  const html     = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('toggleIcon');

  if (themeBtn && themeIcon) {
    const saved = localStorage.getItem('tc-theme') || 'dark';
    if (saved === 'light') {
      html.setAttribute('data-theme', 'light');
      themeIcon.textContent = '🌙';
    }

    themeBtn.addEventListener('click', () => {
      const isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.removeAttribute('data-theme');
        themeIcon.textContent = '☀️';
        localStorage.setItem('tc-theme', 'dark');
      } else {
        html.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
        localStorage.setItem('tc-theme', 'light');
      }
    });
  }

  /* ─── STICKY NAV: shadow on scroll ──────────────────────────── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ─── FAQ ACCORDION ──────────────────────────────────────────── */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer   = document.getElementById(answerId);

      // Close all others
      document.querySelectorAll('.faq-btn').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherId = other.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherId);
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });

  /* ─── CONTACT FORM ───────────────────────────────────────────── */
  window.toggleCaptcha = function (cb) {
    // Visual-only captcha marker
  };

  window.submitForm = function (e) {
    e.preventDefault();

    const nombre = document.getElementById('cf-nombre');
    const cp     = document.getElementById('cf-cp');
    const tel    = document.getElementById('cf-tel');
    const mail   = document.getElementById('cf-mail');
    const coment = document.getElementById('cf-comentario');
    const rgpd   = document.getElementById('cf-rgpd');
    const bot    = document.getElementById('cf-bot');

    if (!nombre || !cp || !tel || !mail || !coment) return;

    // Reset
    [nombre, cp, tel, mail, coment].forEach(i => {
      i.style.borderColor = '';
      i.removeAttribute('aria-invalid');
    });

    let ok = true;
    const markInvalid = field => {
      field.style.borderColor = '#cc0033';
      field.setAttribute('aria-invalid', 'true');
      ok = false;
    };

    if (!nombre.value.trim())                       markInvalid(nombre);
    if (!cp.value.trim())                           markInvalid(cp);
    if (!tel.value.trim())                          markInvalid(tel);
    if (!mail.value.trim() || !mail.value.includes('@')) markInvalid(mail);
    if (!coment.value.trim())                       markInvalid(coment);
    if (rgpd && !rgpd.checked) {
      alert(t.rgpd);
      ok = false;
    }
    if (ok && bot && !bot.checked) {
      alert(t.bot);
      ok = false;
    }

    if (!ok) {
      // Focus first invalid field
      const first = document.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    // Simulate send
    const submitBtn = document.querySelector('.cf-submit');
    if (submitBtn) {
      submitBtn.textContent = t.sending;
      submitBtn.disabled    = true;
    }

    setTimeout(() => {
      const success = document.getElementById('cfSuccess');
      if (success) success.classList.add('show');
      if (submitBtn) submitBtn.style.display = 'none';

      const form = document.getElementById('contactForm');
      if (form) {
        form.querySelectorAll('.cf-input').forEach(i => { i.value = ''; });
        if (rgpd) rgpd.checked = false;
        if (bot)  bot.checked  = false;
      }
    }, 1200);
  };

  /* ─── SMOOTH SCROLL for anchor links ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
        // Update URL without jump
        history.pushState(null, '', id);
        // Focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

})();
