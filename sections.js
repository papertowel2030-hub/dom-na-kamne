/* ==========================================================================
   Дом на камне — Sections 5–8 interactions
   Carousel · Process accordion · Scroll fade-up · Counter animation
   ========================================================================== */

/* ---- Carousel ----------------------------------------------------------- */
document.querySelectorAll('.carousel').forEach(carousel => {
  const track  = carousel.querySelector('.carousel__track');
  const slides = track.querySelectorAll('img');
  const dots   = carousel.querySelectorAll('.carousel__dot');
  let current  = 0;

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
  }

  carousel.querySelector('.carousel__btn--prev')
    .addEventListener('click', () => goTo(current - 1));
  carousel.querySelector('.carousel__btn--next')
    .addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
});

/* ---- Process accordion -------------------------------------------------- */
document.querySelectorAll('.stage-row').forEach(row => {
  const btn  = row.querySelector('.stage-row__btn');
  const body = row.querySelector('.stage-row__body');

  btn.addEventListener('click', () => {
    const isOpen = row.classList.contains('is-open');

    /* Close all rows */
    document.querySelectorAll('.stage-row').forEach(r => {
      r.classList.remove('is-open');
      r.querySelector('.stage-row__btn').setAttribute('aria-expanded', 'false');
      r.querySelector('.stage-row__body').setAttribute('aria-hidden', 'true');
    });

    /* Open clicked row if it was closed */
    if (!isOpen) {
      row.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      body.setAttribute('aria-hidden', 'false');
    }
  });
});

/* ---- Scroll fade-up ------------------------------------------------------ */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ---- Counter animation --------------------------------------------------- */
function animateCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 1300;
  const start    = performance.now();

  (function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  })(start);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ---- Phone fields -------------------------------------------------------- */
(function () {
  const PHONE_PLACEHOLDER = '+7 (___) ___-__-__';

  function formatPhone(raw) {
    let d = raw.replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (d.length && d[0] !== '7') d = '7' + d;
    d = d.slice(0, 11);

    if (!d.length) return '';
    let out = '+7';
    if (d.length > 1) {
      out += ' (' + d.slice(1, Math.min(4, d.length));
      if (d.length >= 4) out += ')';
    }
    if (d.length > 4) out += ' ' + d.slice(4, Math.min(7, d.length));
    if (d.length > 7) out += '-' + d.slice(7, Math.min(9, d.length));
    if (d.length > 9) out += '-' + d.slice(9, 11);
    return out;
  }

  function digitCaretIndex(value, caret) {
    let count = value.slice(0, caret).replace(/\D/g, '').length;
    const digits = value.replace(/\D/g, '');
    if (digits.length && digits[0] !== '7') count += 1;
    return count;
  }

  function caretFromDigitIndex(value, digitIndex) {
    if (digitIndex <= 0) return 0;
    let count = 0;
    for (let i = 0; i < value.length; i += 1) {
      if (/\d/.test(value[i])) count += 1;
      if (count >= digitIndex) return i + 1;
    }
    return value.length;
  }

  function setPhoneCaret(input, digitIndex) {
    const caret = caretFromDigitIndex(input.value, digitIndex);
    try { input.setSelectionRange(caret, caret); } catch (_) {}
  }

  function removeDigitAt(value, digitIndex) {
    const digits = value.replace(/\D/g, '').split('');
    if (digitIndex <= 0) return '';
    if (digitIndex >= digits.length) return formatPhone(value);
    digits.splice(digitIndex, 1);
    return formatPhone(digits.join(''));
  }

  function applyPhoneMask(input) {
    input.placeholder = PHONE_PLACEHOLDER;

    input.addEventListener('focus', function () {
      if (!this.value) this.value = '+7';
    });
    input.addEventListener('blur', function () {
      if (this.value === '+7') this.value = '';
    });
    input.addEventListener('input', function () {
      const prev = this.value;
      const pos = this.selectionStart || 0;
      const next = formatPhone(prev);
      this.value = next;
      setPhoneCaret(this, digitCaretIndex(prev, pos));
    });
    input.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey) return;
      if ((e.key === 'Backspace' || e.key === 'Delete') && this.selectionStart !== null) {
        const start = this.selectionStart;
        const end = this.selectionEnd;
        const value = this.value;

        e.preventDefault();
        if (start !== end) {
          const digitIndex = digitCaretIndex(value, start);
          this.value = formatPhone(value.slice(0, start) + value.slice(end));
          setPhoneCaret(this, digitIndex);
          return;
        }

        if (e.key === 'Backspace') {
          if (start <= 2) {
            this.value = '';
            return;
          }
          const digitIndex = digitCaretIndex(value, start) - 1;
          this.value = removeDigitAt(value, digitIndex);
          setPhoneCaret(this, digitIndex);
          return;
        }

        const digitIndex = digitCaretIndex(value, start);
        this.value = removeDigitAt(value, digitIndex);
        setPhoneCaret(this, digitIndex);
        return;
      }
      const pass = ['Backspace', 'Delete', 'Tab', 'Enter',
                    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
                    'Home', 'End'];
      if (pass.includes(e.key)) return;
      if (e.key >= '0' && e.key <= '9') return;
      e.preventDefault();
    });
  }

document.querySelectorAll('input[type="tel"]').forEach(applyPhoneMask);
})();

/* ---- Lead forms: honest e-mail handoff --------------------------------- */
(function () {
  const DESTINATION = 'dom-na-kamne@mail.ru';

  function setStatus(form, message, isError) {
    const status = form.querySelector('.lead-form__status');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('is-error', Boolean(isError));
  }

  function isValidPhone(value) {
    return value.replace(/\D/g, '').length === 11;
  }

  function createMailto(topic, phone) {
    const subject = `Заявка с сайта — ${topic}`;
    const body = [
      `Тема: ${topic}`,
      `Телефон для связи: ${phone}`,
      '',
      'Я даю согласие на обработку персональных данных для ответа на это обращение.'
    ].join('\n');
    return `mailto:${DESTINATION}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  document.querySelectorAll('[data-lead-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();

      const phone = form.querySelector('input[type="tel"]');
      const consent = form.querySelector('input[type="checkbox"]');
      const topic = form.dataset.leadTopic || 'Заявка с сайта';

      phone?.removeAttribute('aria-invalid');
      consent?.removeAttribute('aria-invalid');
      form.querySelector('.lead-form__consent')?.classList.remove('is-error');

      if (!phone || !isValidPhone(phone.value)) {
        phone?.setAttribute('aria-invalid', 'true');
        setStatus(form, 'Введите номер телефона полностью.', true);
        phone?.focus();
        return;
      }

      if (!consent?.checked) {
        consent?.setAttribute('aria-invalid', 'true');
        form.querySelector('.lead-form__consent')?.classList.add('is-error');
        setStatus(form, 'Подтвердите согласие на обработку персональных данных.', true);
        consent?.focus();
        return;
      }

      setStatus(form, 'Открываем почтовое приложение с готовой заявкой. Проверьте её и нажмите «Отправить».', false);
      window.location.href = createMailto(topic, phone.value);
    });
  });
})();

/* ---- FAQ accordion ------------------------------------------------------- */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn  = item.querySelector('.faq-item__btn');
  const body = item.querySelector('.faq-item__body');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    /* Close all items */
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('is-open');
      i.querySelector('.faq-item__btn').setAttribute('aria-expanded', 'false');
      i.querySelector('.faq-item__body').setAttribute('aria-hidden', 'true');
    });

    /* Open clicked if it was closed */
    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      body.setAttribute('aria-hidden', 'false');
    }
  });
});

/* ---- Scroll-to-top button ------------------------------------------------ */
(function () {
  const btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ---- Mobile main navigation -------------------------------------------- */
(function () {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeButton = nav?.querySelector('.nav__close');
  const backdrop = document.querySelector('.mobile-menu-backdrop');
  if (!header || !toggle || !nav || !backdrop) return;

  function closeMenu(restoreFocus = false) {
    header.classList.remove('is-menu-open');
    document.body.classList.remove('is-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('is-menu-open');
    document.body.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    if (open) closeButton?.focus();
  });

  backdrop.addEventListener('click', () => closeMenu(true));
  closeButton?.addEventListener('click', () => closeMenu(true));
  nav.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute('href');
    if (!hash || hash === '#') {
      closeMenu();
      return;
    }

    const target = document.querySelector(hash);
    if (!target) {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu();
    history.pushState(null, '', hash);
    requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu(true);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
})();

/* ---- Review expand / collapse ------------------------------------------- */
document.querySelectorAll('.review-card__expand').forEach(btn => {
  const card = btn.closest('.review-card');
  btn.addEventListener('click', () => {
    const expanded = card.classList.toggle('is-expanded');
    btn.setAttribute('aria-expanded', expanded);
    btn.textContent = expanded ? 'Свернуть' : 'Развернуть';
  });
});

/* ---- Reviews carousel (centered track with dots, swipe and keyboard) ----- */
(function () {
  const grid  = document.querySelector('.reviews__grid');
  if (!grid) return;
  const carousel = grid.closest('.reviews__carousel');
  const cards = Array.from(grid.querySelectorAll('.review-card'));
  let featured = cards.findIndex(c => c.classList.contains('review-card--featured'));
  const dots = Array.from(document.querySelectorAll('.reviews__dot'));

  function setFeatured(idx) {
    cards.forEach((c, i) => c.classList.toggle('review-card--featured', i === idx));
    dots.forEach((dot, i) => {
      const isActive = i === idx;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
    grid.dataset.reviewIndex = String(idx);
    featured = idx;
  }

  document.querySelector('.reviews__arrow--prev')
    ?.addEventListener('click', () => setFeatured((featured - 1 + cards.length) % cards.length));
  document.querySelector('.reviews__arrow--next')
    ?.addEventListener('click', () => setFeatured((featured + 1) % cards.length));
  dots.forEach((dot, index) => dot.addEventListener('click', () => setFeatured(index)));

  let pointerStartX = null;
  carousel?.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStartX = event.clientX;
  });
  carousel?.addEventListener('pointerup', event => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(distance) < 42) return;
    setFeatured((featured + (distance < 0 ? 1 : -1) + cards.length) % cards.length);
  });
  carousel?.addEventListener('pointercancel', () => { pointerStartX = null; });
  carousel?.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    setFeatured((featured + (event.key === 'ArrowRight' ? 1 : -1) + cards.length) % cards.length);
  });

  setFeatured(featured < 0 ? 0 : featured);
})();
