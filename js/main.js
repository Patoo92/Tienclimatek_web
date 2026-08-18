/* ══════════════════════════════════════════════════════════════════
   main.js — Tienclimatek
   Includes: Hero carousel, floating form, IntersectionObserver,
             hamburger menu, theme toggle, contact form validation,
             FAQ accordion, smooth scroll
   ══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── LANGUAGE DETECTION ─────────────────────────────────────── */
  const lang = document.documentElement.lang || 'es';
  const isEU = lang === 'eu';

  const i18n = {
    es: {
      rgpd:       'Debes aceptar la política de privacidad RGPD para continuar.',
      sending:    'Enviando…',
      error:      'Error al enviar. Por favor, intenta de nuevo.',
      success:    'Mensaje enviado correctamente.',
      nameReq:    'El nombre es obligatorio',
      cpReq:      'El código postal es obligatorio',
      telReq:     'El teléfono es obligatorio',
      mailReq:    'Correo electrónico inválido',
      commentReq: 'El comentario es obligatorio',
      enviar:     'Enviar',
      enviarSolicitud: 'Enviar solicitud',
    },
    eu: {
      rgpd:       'DBNP pribatutasun-politika onartu behar duzu jarraitzeko.',
      sending:    'Bidaltzen…',
      error:      'Errore bat egon da bidaltzean. Birprobatu, mesedez.',
      success:    'Mezua zuzen bidali da.',
      nameReq:    'Izena derrigorrezkoa da',
      cpReq:      'Posta kodea derrigorrezkoa da',
      telReq:     'Telefonoa derrigorrezkoa da',
      mailReq:    'Eposta baliogabea',
      commentReq: 'Iruzkina derrigorrezkoa da',
      enviar:     'Bidali',
      enviarSolicitud: 'Eskabidea bidali',
    },
  };
  const t = isEU ? i18n.eu : i18n.es;

  /* ─── RECAPTCHA v3 HELPER ──────────────────────────────────────── */
  const RECAPTCHA_SITE_KEY = '6Ld-G4wtAAAAAIsY_eFCt7S6mz2q8L70gVXt87Tq'; // Reemplazar con tu site key

  function getRecaptchaToken(action) {
    return new Promise((resolve, reject) => {
      if (typeof grecaptcha === 'undefined' || !grecaptcha.execute) {
        resolve(''); // Si reCAPTCHA no está disponible, envía sin token
        return;
      }
      grecaptcha.ready(() => {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
          .then(token => resolve(token))
          .catch(() => resolve(''));
      });
    });
  }

  /* ─── HERO CAROUSEL ──────────────────────────────────────────── */
  (function () {
    const TOTAL = 5, INTERVAL = 4000;
    let current = 0, paused = false, progTimer = null;
    const track    = document.getElementById('heroTrack');
    const progress = document.getElementById('heroProgress');
    const dotsWrap = document.getElementById('heroDots');
    const prevBtn  = document.getElementById('heroPrev');
    const nextBtn  = document.getElementById('heroNext');
    const carousel = document.getElementById('hero-carousel');
    if (!track || !dotsWrap) return;

    const dots = [];
    for (let i = 0; i < TOTAL; i++) {
      const d = document.createElement('div');
      d.className = 'hero-carousel-dot' + (i === 0 ? ' active' : '');
      d.dataset.idx = i;
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
      dots.push(d);
    }

    function goTo(idx) {
      current = ((idx % TOTAL) + TOTAL) % TOTAL;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
      restartProgress();
    }

    function restartProgress() {
      clearTimeout(progTimer);
      if (!progress) return;
      progress.style.transition = 'none';
      progress.style.width = '0%';
      void progress.offsetWidth;
      if (!paused) {
        progress.style.transition = 'width ' + INTERVAL + 'ms linear';
        progress.style.width = '100%';
        progTimer = setTimeout(() => { if (!paused) goTo(current + 1); }, INTERVAL);
      }
    }

    function pause() {
      if (paused) return;
      paused = true;
      clearTimeout(progTimer);
      if (progress) {
        const r  = progress.getBoundingClientRect();
        const pw = progress.parentElement.getBoundingClientRect();
        progress.style.transition = 'none';
        progress.style.width = (pw.width > 0 ? (r.width / pw.width * 100).toFixed(1) : 0) + '%';
      }
    }

    function resume() {
      if (!paused) return;
      paused = false;
      restartProgress();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    if (carousel) {
      carousel.addEventListener('mouseenter', pause);
      carousel.addEventListener('mouseleave', resume);
      let tx0 = 0;
      carousel.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; pause(); }, { passive: true });
      carousel.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - tx0;
        if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
        resume();
      }, { passive: true });
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      track.style.transition = 'none';
    }
    goTo(0);
  })();

  /* WhatsApp widget removed per request */

  /* ─── FLOATING FORM ──────────────────────────────────────────── */
  (function () {
    const form     = document.getElementById('floatingForm');
    const tab      = document.getElementById('floatingFormTab');
    const closeBtn = document.getElementById('floatingFormClose');
    if (!form) return;

    let shown = false, closed = false;

    function show() { form.classList.add('visible'); shown = true; }
    function hide() { form.classList.remove('visible'); shown = false; }

    window.addEventListener('scroll', () => {
      if (closed) return;
      const hero = document.getElementById('hero-carousel');
      if (!hero) return;
      if (hero.getBoundingClientRect().bottom < 0 && !shown) show();
      if (hero.getBoundingClientRect().bottom >= 0 && shown) hide();
    }, { passive: true });

    if (tab) {
      tab.addEventListener('click', () => shown ? hide() : show());
      tab.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); shown ? hide() : show(); }
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', () => { hide(); closed = true; });

    // Floating form validation & submit
    const ffForm = document.getElementById('floatingContactForm');
    if (ffForm) {
      const ffFields = {
        nombre: ffForm.querySelector('#ff-nombre'),
        cp:     ffForm.querySelector('#ff-cp'),
        tel:    ffForm.querySelector('#ff-tel'),
        rgpd:   ffForm.querySelector('[name="rgpd"]'),
      };

      function showFfError(field, message) {
        clearFfError(field);
        const err = document.createElement('div');
        err.className = 'ff-error-msg';
        err.textContent = message;
        field.parentNode.insertBefore(err, field.nextSibling);
        field.setAttribute('aria-invalid', 'true');
      }

      function clearFfError(field) {
        const next = field.nextElementSibling;
        if (next && next.classList.contains('ff-error-msg')) next.remove();
        field.removeAttribute('aria-invalid');
      }

      ffForm.addEventListener('submit', async e => {
        e.preventDefault();
        [ffFields.nombre, ffFields.cp, ffFields.tel, ffFields.rgpd].forEach(f => { if (f) clearFfError(f); });

        let ok = true;
        if (ffFields.nombre && !ffFields.nombre.value.trim()) { showFfError(ffFields.nombre, t.nameReq); ok = false; }
        if (ffFields.cp && !ffFields.cp.value.trim())         { showFfError(ffFields.cp, t.cpReq); ok = false; }
        if (ffFields.tel && !ffFields.tel.value.trim())        { showFfError(ffFields.tel, t.telReq); ok = false; }
        if (ffFields.rgpd && !ffFields.rgpd.checked)           { showFfError(ffFields.rgpd, t.rgpd); ok = false; }

        if (!ok) {
          const first = ffForm.querySelector('[aria-invalid="true"]');
          if (first) first.focus();
          return;
        }

        const btn = ffForm.querySelector('.ff-submit');
        btn.disabled = true;
        btn.textContent = t.sending;
        try {
          const token = await getRecaptchaToken('floating_form');
          const formData = new FormData(ffForm);
          if (token) formData.append('g-recaptcha-response', token);
          const r = await fetch(ffForm.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
          if (r.ok) {
            ffForm.reset();
            const suc = document.getElementById('ffSuccess');
            if (suc) suc.classList.add('show');
            btn.style.display = 'none';
          } else {
            btn.disabled = false;
            btn.textContent = t.enviarSolicitud;
          }
        } catch {
          btn.disabled = false;
          btn.textContent = t.enviarSolicitud;
        }
      });
    }
  })();

  /* ─── SCROLL REVEAL ──────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  } else {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  /* ─── HAMBURGER MENU ─────────────────────────────────────────── */
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link-item, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });

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
  const html      = document.documentElement;
  const themeBtn  = document.getElementById('themeToggle');
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

  /* ─── STICKY NAV & TOPBAR EMERGENCIA ─────────────────────────── */
  const nav    = document.querySelector('nav');
  const topbar = document.querySelector('.topbar-emergency');
  if (nav || topbar) {
    window.addEventListener('scroll', () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
      if (topbar) topbar.classList.toggle('topbar-visible', window.scrollY > 200);
    }, { passive: true });
  }

  /* ─── FAQ ACCORDION ──────────────────────────────────────────── */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answer   = document.getElementById(answerId);

      document.querySelectorAll('.faq-btn').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          const otherAnswer = document.getElementById(other.getAttribute('aria-controls'));
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      btn.setAttribute('aria-expanded', String(!expanded));
      if (answer) answer.hidden = expanded;
    });
  });

  /* ─── CONTACT FORM ───────────────────────────────────────────── */
  function showCfError(field, message) {
    clearCfError(field);
    const err = document.createElement('div');
    err.className = 'cf-error-msg';
    err.textContent = message;
    field.parentNode.insertBefore(err, field.nextSibling);
    field.setAttribute('aria-invalid', 'true');
  }

  function clearCfError(field) {
    const next = field.nextElementSibling;
    if (next && next.classList.contains('cf-error-msg')) next.remove();
    field.removeAttribute('aria-invalid');
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();

      const nombre = document.getElementById('cf-nombre');
      const cp     = document.getElementById('cf-cp');
      const tel    = document.getElementById('cf-tel');
      const mail   = document.getElementById('cf-mail');
      const coment = document.getElementById('cf-comentario');
      const rgpd   = document.getElementById('cf-rgpd');
      const btn    = contactForm.querySelector('.cf-submit');

      if (!nombre || !cp || !tel || !mail || !coment) return;

      [nombre, cp, tel, mail, coment].forEach(clearCfError);

      let ok = true;
      if (!nombre.value.trim())                     { showCfError(nombre, t.nameReq); ok = false; }
      if (!cp.value.trim())                         { showCfError(cp, t.cpReq);       ok = false; }
      if (!tel.value.trim())                        { showCfError(tel, t.telReq);     ok = false; }
      if (!mail.value.trim() || !mail.value.includes('@')) { showCfError(mail, t.mailReq); ok = false; }
      if (!coment.value.trim())                     { showCfError(coment, t.commentReq); ok = false; }
      if (rgpd && !rgpd.checked)                    { showCfError(rgpd, t.rgpd);      ok = false; }

      if (!ok) {
        const first = contactForm.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }

      btn.textContent = t.sending;
      btn.disabled = true;

      try {
        const token = await getRecaptchaToken('contact_form');
        const formData = new FormData(contactForm);
        if (token) formData.append('g-recaptcha-response', token);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' },
        });

        const successEl = document.getElementById('cfSuccess');
        if (response.ok) {
          if (successEl) { successEl.classList.remove('error'); successEl.classList.add('show'); }
          contactForm.reset();
          btn.style.display = 'none';
          setTimeout(() => { btn.style.display = ''; btn.disabled = false; btn.textContent = t.enviar; }, 5000);
        } else {
          if (successEl) { successEl.textContent = t.error; successEl.classList.add('show', 'error'); }
          btn.textContent = t.enviar;
          btn.disabled = false;
        }
      } catch {
        const successEl = document.getElementById('cfSuccess');
        if (successEl) { successEl.textContent = t.error; successEl.classList.add('show', 'error'); }
        btn.textContent = t.enviar;
        btn.disabled = false;
      }
    });
  }

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
        history.replaceState(null, '', id);
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    });
  });

})();
