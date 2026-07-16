(function () {
  'use strict';

  const CONSENT_KEY = 'dnk-cookies-consent';
  const CONSENT_VERSION = '1.0';

  function getCookiesConsent() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      return stored === CONSENT_VERSION;
    } catch (e) {
      return false;
    }
  }

  function setCookiesConsent() {
    try {
      localStorage.setItem(CONSENT_KEY, CONSENT_VERSION);
    } catch (e) {
      // localStorage not available, fail silently
    }
  }

  function hideBanner() {
    const banner = document.getElementById('cookiesBanner');
    if (banner) {
      banner.style.opacity = '0';
      banner.style.visibility = 'hidden';
      banner.style.transition = 'opacity var(--dur) var(--ease)';
      setTimeout(() => {
        banner.hidden = true;
      }, 280);
    }
  }

  function initCookiesBanner() {
    // Check if user has already consented
    if (getCookiesConsent()) {
      hideBanner();
      return;
    }

    const banner = document.getElementById('cookiesBanner');
    const button = document.querySelector('.cookies-banner__button');

    if (!banner) return;

    // Show banner with fade-in
    banner.hidden = false;
    banner.style.opacity = '0';
    banner.style.transition = 'opacity var(--dur) var(--ease)';

    // Trigger fade in
    requestAnimationFrame(() => {
      banner.style.opacity = '1';
    });

    // Handle button click
    if (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        setCookiesConsent();
        hideBanner();
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookiesBanner);
  } else {
    initCookiesBanner();
  }
})();
