/**
 * Application Modal — Дом на камне
 * States: open → form → loading → success | error
 * No framework dependencies.
 */
(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────────────── */
  const PHONE_METHODS    = ['phone', 'telegram', 'max', 'whatsapp'];
  const USERNAME_METHODS = ['telegram', 'max'];  // show optional @username field
  const PHONE_PLACEHOLDER = '+7(_ _ _) _ _ _ - _ _ - _ _';

  /* ── DOM refs ───────────────────────────────────────────────── */
  const modal        = document.getElementById('appModal');
  if (!modal) return;

  const backdrop     = document.getElementById('appModalBackdrop');
  const closeBtn     = document.getElementById('appModalClose');
  const form         = document.getElementById('appModalForm');
  const fieldsEl     = document.getElementById('appModalFields');
  const submitBtn    = document.getElementById('appModalSubmit');
  const consentLabel = document.getElementById('appModalConsent');
  const consentCheck = document.getElementById('appModalConsentCheck');
  const formWrap     = document.getElementById('appModalFormWrap');
  const successPanel = document.getElementById('appModalSuccess');
  const successBtn   = document.getElementById('appModalSuccessBtn');

  /* ── State ──────────────────────────────────────────────────── */
  let currentMethod = 'phone';
  let isLoading     = false;
  let returnFocusTo = null;

  /* ── Phone mask ─────────────────────────────────────────────── */
  function formatPhone(raw) {
    let d = raw.replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (d.length && d[0] !== '7') d = '7' + d;
    d = d.slice(0, 11);

    if (!d.length) return '';
    let out = '+7';
    if (d.length > 1) out += '(' + d.slice(1, Math.min(4, d.length));
    if (d.length > 4) out += ')' + d.slice(4, Math.min(7, d.length));
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
    input.addEventListener('focus', function () {
      if (!this.value) this.value = '+7';
    });
    input.addEventListener('blur', function () {
      if (this.value === '+7') this.value = '';
    });
    input.addEventListener('input', function () {
      const prev = this.value;
      const pos  = this.selectionStart || 0;
      const next = formatPhone(prev);
      this.value  = next;
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
      const pass = ['Backspace','Delete','Tab','Enter',
                    'ArrowLeft','ArrowRight','ArrowUp','ArrowDown',
                    'Home','End'];
      if (pass.includes(e.key)) return;
      if (e.key >= '0' && e.key <= '9') return;
      e.preventDefault();
    });
  }

  /* ── Validation ─────────────────────────────────────────────── */
  function isValidPhone(val) {
    const d = val.replace(/\D/g, '');
    return d.length === 11 && d[0] === '7';
  }
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  /* ── DOM helper ─────────────────────────────────────────────── */
  function make(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls)  n.className   = cls;
    if (text) n.textContent = text;
    return n;
  }

  /* ── Render dynamic fields ──────────────────────────────────── */
  function renderFields() {
    fieldsEl.innerHTML = '';

    const needsPhone    = PHONE_METHODS.includes(currentMethod);
    const needsUsername = USERNAME_METHODS.includes(currentMethod);
    const needsEmail    = currentMethod === 'email';

    if (needsPhone) {
      fieldsEl.appendChild(make('p', 'app-modal__field-label', 'Ваш номер телефона'));

      const row = make('div', 'app-modal__field-row');
      const inp = document.createElement('input');
      inp.type         = 'tel';
      inp.id           = 'appModalPhone';
      inp.className    = 'app-modal__input';
      inp.placeholder  = PHONE_PLACEHOLDER;
      inp.autocomplete = 'tel';
      applyPhoneMask(inp);

      const err = make('span', 'app-modal__field-error', 'Некорректный номер телефона');
      err.id     = 'appModalPhoneErr';
      err.hidden = true;

      row.appendChild(inp);
      row.appendChild(err);
      fieldsEl.appendChild(row);
    }

    if (needsUsername) {
      fieldsEl.appendChild(make('p', 'app-modal__field-label', 'Имя пользователя (необязательно)'));
      const inp = document.createElement('input');
      inp.type        = 'text';
      inp.id          = 'appModalUsername';
      inp.className   = 'app-modal__input app-modal__input--solo';
      inp.placeholder = '@username';
      fieldsEl.appendChild(inp);
    }

    if (needsEmail) {
      fieldsEl.appendChild(make('p', 'app-modal__field-label', 'Ваш e-mail'));

      const row = make('div', 'app-modal__field-row');
      const inp = document.createElement('input');
      inp.type         = 'email';
      inp.id           = 'appModalEmail';
      inp.className    = 'app-modal__input';
      inp.placeholder  = 'email@yandex.ru';
      inp.autocomplete = 'email';

      const err = make('span', 'app-modal__field-error', 'Некорректный адрес почты');
      err.id     = 'appModalEmailErr';
      err.hidden = true;

      row.appendChild(inp);
      row.appendChild(err);
      fieldsEl.appendChild(row);
    }
  }

  /* ── Submit state ───────────────────────────────────────────── */
  function setLoading(on) {
    isLoading = on;
    submitBtn.disabled = on;
    submitBtn.innerHTML = on
      ? '<span class="app-modal__spinner"></span>'
      : 'Подготовить заявку';
  }

  function showInputError(msg) {
    const phoneInp = document.getElementById('appModalPhone');
    const emailInp = document.getElementById('appModalEmail');
    const inp = phoneInp || emailInp;
    if (!inp) return;
    inp.classList.add('is-error');
    const row = inp.closest('.app-modal__field-row');
    const errEl = row && row.querySelector('.app-modal__field-error');
    if (errEl) { errEl.textContent = msg; errEl.hidden = false; }
  }

  function clearErrors() {
    fieldsEl.querySelectorAll('.app-modal__field-error').forEach(e => { e.hidden = true; });
    fieldsEl.querySelectorAll('.app-modal__input.is-error').forEach(e => e.classList.remove('is-error'));
    consentLabel.classList.remove('is-error');
  }

  /* ── Open / close ───────────────────────────────────────────── */
  function lockScroll() {
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = sw + 'px';
    document.body.classList.add('modal-open');
  }
  function unlockScroll() {
    document.body.style.paddingRight = '';
    document.body.classList.remove('modal-open');
  }

  function openModal(trigger) {
    returnFocusTo = trigger || document.activeElement;
    modal.hidden = false;
    modal.classList.add('is-open');
    lockScroll();
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    unlockScroll();
    modal.hidden = true;
    resetModal();
    if (returnFocusTo && document.contains(returnFocusTo)) returnFocusTo.focus();
    returnFocusTo = null;
  }

  function resetModal() {
    formWrap.hidden     = false;
    successPanel.hidden = true;
    clearErrors();
    setLoading(false);
    consentCheck.checked = false;
    // back to phone
    currentMethod = 'phone';
    modal.querySelectorAll('[name="contactMethod"]').forEach(r => {
      r.checked = r.value === 'phone';
    });
    renderFields();
  }

  /* ── Submission: open an addressed draft without claiming delivery ───── */
  async function submitForm(data) {
    const methodLabels = {
      phone: 'Телефон',
      telegram: 'Telegram',
      max: 'MAX',
      whatsapp: 'WhatsApp',
      email: 'E-mail'
    };
    const lines = [
      `Предпочтительный способ связи: ${methodLabels[data.method] || data.method}`,
      data.phone ? `Телефон: ${data.phone}` : '',
      data.email ? `E-mail: ${data.email}` : '',
      data.username ? `Имя пользователя: ${data.username}` : '',
      '',
      'Я даю согласие на обработку персональных данных для ответа на это обращение.'
    ].filter(Boolean);
    const subject = encodeURIComponent('Заявка на бесплатную консультацию с сайта');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:dom-na-kamne@mail.ru?subject=${subject}&body=${body}`;
  }

  /* ── Radio → re-render ──────────────────────────────────────── */
  modal.querySelectorAll('[name="contactMethod"]').forEach(radio => {
    radio.addEventListener('change', function () {
      if (!this.checked) return;
      currentMethod = this.value;
      clearErrors();
      renderFields();
    });
  });

  /* ── Form submit ────────────────────────────────────────────── */
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (isLoading) return;

    clearErrors();

    let valid = true;
    const data = { method: currentMethod };

    // Phone validation
    const phoneInp = document.getElementById('appModalPhone');
    if (phoneInp) {
      if (!isValidPhone(phoneInp.value)) {
        const err = document.getElementById('appModalPhoneErr');
        if (err) err.hidden = false;
        phoneInp.classList.add('is-error');
        valid = false;
      } else {
        data.phone = phoneInp.value;
      }
    }

    // Email validation
    const emailInp = document.getElementById('appModalEmail');
    if (emailInp) {
      if (!isValidEmail(emailInp.value)) {
        const err = document.getElementById('appModalEmailErr');
        if (err) err.hidden = false;
        emailInp.classList.add('is-error');
        valid = false;
      } else {
        data.email = emailInp.value;
      }
    }

    // Optional username
    const usernameInp = document.getElementById('appModalUsername');
    if (usernameInp && usernameInp.value.trim()) {
      data.username = usernameInp.value.trim();
    }

    // Consent required
    if (!consentCheck.checked) {
      consentLabel.classList.add('is-error');
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    try {
      await submitForm(data);
      setLoading(false);
      formWrap.hidden     = true;
      successPanel.hidden = false;
    } catch (_) {
      setLoading(false);
      showInputError('Ошибка системы, повторите попытку');
    }
  });

  /* ── Close triggers ─────────────────────────────────────────── */
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  successBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  /* ── Focus trap ─────────────────────────────────────────────── */
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(modal.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null);
    if (focusable.length < 2) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      last.focus(); e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus(); e.preventDefault();
    }
  });

  /* ── Open triggers ──────────────────────────────────────────── */
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(this);
    });
  });

  /* ── Init ───────────────────────────────────────────────────── */
  renderFields();

})();
