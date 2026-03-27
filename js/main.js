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
      rgpd:     'Debes aceptar la política de privacidad RGPD para continuar.',
      reCAPTCHA: 'Por favor, completa la verificación reCAPTCHA.',
      sending:  'Enviando…',
      error:    'Error al enviar. Por favor, intenta de nuevo.',
      success:  'Mensaje enviado correctamente.',
      nameReq:  'El nombre es obligatorio',
      cpReq:    'El código postal es obligatorio',
      telReq:   'El teléfono es obligatorio',
      mailReq:  'Correo electrónico inválido',
      commentReq: 'El comentario es obligatorio',
    },
    eu: {
      rgpd:     'DBNP pribatutasun-politika onartu behar duzu jarraitzeko.',
      reCAPTCHA: 'Mesedez, reCAPTCHA egiaztapena bete.',
      sending:  'Bidaltzen…',
      error:    'Errore bat egon da bidaltzean. Birprobatu, mesedez.',
      success:  'Mezua zuzen bidali da.',
      nameReq:  'Izena derrigorrezkoa da',
      cpReq:    'Posta kodea derrigorrezkoa da',
      telReq:   'Telefonoa derrigorrezkoa da',
      mailReq:  'Eposta baliogabea',
      commentReq: 'Iruzkina derrigorrezkoa da',
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

  /* ─── CONTACT FORM with reCAPTCHA v3 & Formspree ─────────────── */
  
  // Helper: Show validation error message
  const showErrorMsg = (field, message) => {
    const existing = field.nextElementSibling;
    if (existing && existing.classList.contains('cf-error-msg')) {
      existing.remove();
    }
    const errorDiv = document.createElement('div');
    errorDiv.className = 'cf-error-msg';
    errorDiv.textContent = message;
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
    field.setAttribute('aria-invalid', 'true');
  };

  // Helper: Clear validation error message
  const clearErrorMsg = (field) => {
    const existing = field.nextElementSibling;
    if (existing && existing.classList.contains('cf-error-msg')) {
      existing.remove();
    }
    field.removeAttribute('aria-invalid');
  };

  window.submitForm = async function (e) {
    e.preventDefault();

    const form = document.getElementById('contactForm');
    const nombre = document.getElementById('cf-nombre');
    const cp     = document.getElementById('cf-cp');
    const tel    = document.getElementById('cf-tel');
    const mail   = document.getElementById('cf-mail');
    const coment = document.getElementById('cf-comentario');
    const rgpd   = document.getElementById('cf-rgpd');
    const recaptchaToken = document.getElementById('recaptchaToken');
    const submitBtn = document.querySelector('.cf-submit');

    if (!nombre || !cp || !tel || !mail || !coment) return;

    // Clear all error messages first
    [nombre, cp, tel, mail, coment].forEach(i => clearErrorMsg(i));

    let ok = true;

    if (!nombre.value.trim()) {
      showErrorMsg(nombre, t.nameReq);
      ok = false;
    }
    if (!cp.value.trim()) {
      showErrorMsg(cp, t.cpReq);
      ok = false;
    }
    if (!tel.value.trim()) {
      showErrorMsg(tel, t.telReq);
      ok = false;
    }
    if (!mail.value.trim() || !mail.value.includes('@')) {
      showErrorMsg(mail, t.mailReq);
      ok = false;
    }
    if (!coment.value.trim()) {
      showErrorMsg(coment, t.commentReq);
      ok = false;
    }
    if (rgpd && !rgpd.checked) {
      showErrorMsg(rgpd, t.rgpd);
      ok = false;
    }

    if (!ok) {
      const first = document.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    try {
      submitBtn.textContent = t.sending;
      submitBtn.disabled = true;

      // Submit form to Formspree
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const success = document.getElementById('cfSuccess');
        if (success) {
          success.classList.remove('error');
          success.classList.add('show');
        }
        
        // Reset form
        form.reset();
        submitBtn.textContent = isEU ? 'Bidali' : 'Enviar';
        submitBtn.style.display = 'none';

        // Restore button after delay
        setTimeout(() => {
          submitBtn.style.display = '';
          submitBtn.disabled = false;
        }, 5000);
      } else {
        const success = document.getElementById('cfSuccess');
        if (success) {
          success.textContent = t.error;
          success.classList.add('show', 'error');
        }
        submitBtn.textContent = isEU ? 'Bidali' : 'Enviar';
        submitBtn.disabled = false;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const success = document.getElementById('cfSuccess');
      if (success) {
        success.textContent = t.error;
        success.classList.add('show', 'error');
      }
      submitBtn.textContent = isEU ? 'Bidali' : 'Enviar';
      submitBtn.disabled = false;
    }
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
        // Update URL without jump (using replaceState to avoid history pollution)
        history.replaceState(null, '', id);
        // Focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        // Clean up tabindex after focus is set
        target.addEventListener('blur', () => {
          target.removeAttribute('tabindex');
        }, { once: true });
      }
    });
  });

})();
