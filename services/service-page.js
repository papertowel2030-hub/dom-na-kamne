(function () {
  "use strict";

  var data = window.DNK_SERVICE_DATA || {};
  var order = window.DNK_SERVICE_ORDER || [];
  var key = document.body.getAttribute("data-service");
  var service = data[key] || data[order[0]];
  var PHONE_PLACEHOLDER = "+7 (___) ___-__-__";
  var OZON_LOGO_SVG = '<svg class="service-footer__ozon-logo" viewBox="0 0 485 106" aria-hidden="true" focusable="false"><path fill="currentColor" fill-rule="nonzero" d="M56.485 80.751c12.543-1.595 22.67-11.723 24.266-24.266 2.338-18.4-13.207-33.946-31.608-31.607C36.6 26.472 26.472 36.6 24.878 49.143c-2.34 18.401 13.207 33.947 31.607 31.608zM58.203.267c24.717 2.448 44.71 22.441 47.158 47.16 3.308 33.401-24.533 61.242-57.936 57.934-24.717-2.448-44.71-22.44-47.157-47.158C-3.042 24.801 24.8-3.04 58.203.267zm75.497 2.09h77.314c2.935 0 4.603 3.36 2.83 5.698L160.358 78.62h41.907c7.638 0 13.653 6.95 12.067 14.87-1.163 5.807-6.608 9.774-12.531 9.774h-83.963c-2.908 0-4.561-3.328-2.805-5.645l53.527-70.618h-34.396c-5.923 0-11.368-3.966-12.531-9.774-1.586-7.92 4.429-14.87 12.067-14.87zm335.513.281c7.975-1.679 15 4.36 15 12.04V99.71c0 2.967-3.426 4.622-5.751 2.778l-66.694-52.91v41.386c0 7.68-7.025 13.718-15 12.04-5.72-1.203-9.644-6.526-9.644-12.368V5.911c0-2.967 3.426-4.623 5.75-2.779l66.696 52.912-.001-41.038c0-5.843 3.927-11.165 9.644-12.368zM295.56 0c40.83 0 73.932 23.64 73.932 52.8 0 29.16-33.101 52.8-73.932 52.8-40.832 0-73.933-23.64-73.933-52.8 0-29.16 33.1-52.8 73.933-52.8zm0 24.644c-28.21 0-49.288 14.865-49.288 28.156 0 13.291 21.078 28.156 49.288 28.156 28.209 0 49.287-14.865 49.287-28.156 0-13.29-21.078-28.156-49.287-28.156z"></path></svg>';
  var MARKET_LOGO_SVG = '<svg class="service-footer__market-logo" viewBox="0 0 204 30" aria-hidden="true" focusable="false"><circle cx="15" cy="15" r="15" fill="#FF5226"/><path d="M17.43 24.45V8.39h-1.884c-1.358 0-2.388.288-3.088.865-.7.556-1.05 1.297-1.05 2.224 0 .7.123 1.297.37 1.791s.608.947 1.081 1.359c.474.412 1.071.865 1.792 1.359l1.791 1.204-5.25 7.259H7.238l5.004-6.795 2.347 2.1-1.853-1.174a23.446 23.446 0 01-2.656-2.007c-.742-.66-1.308-1.38-1.699-2.162-.391-.783-.587-1.699-.587-2.749 0-1.812.649-3.274 1.946-4.386 1.318-1.132 3.243-1.698 5.775-1.698h5.59v18.87H17.43z" fill="#fff"/><path d="M47.555 30c-8.275 0-15-6.699-15-14.973C32.555 6.752 39.28 0 47.555 0c8.274 0 15 6.752 15 15.027 0 8.274-6.726 14.973-15 14.973z" fill="#FF5226"/><path d="M45.232 2.03L28.498 28.14h7.671l9.667-15.05-.236-.107-2.68 10.77 5.674 1 5.832-7.33-.316-.157-1.97 8.326 12.363-2.356-2.522-4.154-4.456 1.02.526.605 2.075-8.695-4.834-3.232-6.33 7.96.315.158 2.6-10.43-6.645-4.438z" fill="#FFDD00"/><path d="M68.305 24.45l9.327-18.87h7.103l1.452 11.489 7.196-11.49h7.042V24.45h-6.887V14.32l-6.394 10.13h-6.887L78.93 14.227 73.864 24.45h-5.56zm53.276-3.737c0 .639.011 1.267.031 1.884.021.618.062 1.225.124 1.822h-6.394a5.371 5.371 0 01-.37-.926 6.529 6.529 0 01-.247-1.297c-.659.782-1.493 1.43-2.502 1.945-.988.495-2.399.742-4.231.742-1.853 0-3.336-.433-4.448-1.297-1.091-.865-1.636-2.018-1.636-3.46 0-1.338.38-2.367 1.142-3.088.783-.741 1.997-1.256 3.645-1.544 1.647-.31 3.757-.464 6.331-.464h1.606v-.34c0-.658-.278-1.163-.834-1.513-.556-.35-1.596-.525-3.119-.525-1.503 0-2.903.196-4.201.587-1.276.37-2.316.741-3.119 1.112v-4.139c.906-.33 2.121-.659 3.645-.988 1.544-.35 3.304-.525 5.281-.525 1.997 0 3.685.185 5.065.556 1.38.35 2.43.957 3.15 1.822.721.844 1.081 2.018 1.081 3.521v6.115zm2.1-11.55h6.394l.37 2.624c.783-1.029 1.719-1.78 2.811-2.254 1.091-.474 2.347-.71 3.768-.71 1.606 0 3.047.288 4.324.864a6.824 6.824 0 013.026 2.626c.742 1.173 1.112 2.656 1.112 4.447s-.37 3.284-1.112 4.478c-.72 1.174-1.729 2.06-3.026 2.656-1.298.598-2.78.896-4.448.896a9.387 9.387 0 01-3.49-.649c-1.071-.452-1.997-1.163-2.779-2.13v6.424h-6.95V9.162zm41.942 7.597c0-1.524.412-2.883 1.236-4.077.844-1.194 2.038-2.13 3.582-2.81 1.565-.7 3.408-1.05 5.529-1.05 2.203 0 4.046.38 5.528 1.142 1.503.762 2.553 1.843 3.15 3.243.618 1.4.7 3.058.247 4.973h-12.199c.247.885.793 1.554 1.637 2.007.865.433 2.141.649 3.829.649 1.174 0 2.265-.103 3.274-.31a29.001 29.001 0 002.811-.771v3.675c-.886.412-1.874.741-2.965.988-1.071.247-2.481.371-4.231.371-3.851 0-6.723-.71-8.617-2.131-1.874-1.441-2.811-3.408-2.811-5.9zm19.859-7.598h17.636v3.954h-5.498v11.303h-6.949V13.116h-5.189V9.162zm-38.668 0h6.949v6.918l6.579-6.918h5.992l-6.116 6.362 7.382 8.895h-8.401l-5.436-6.733v6.733h-6.949V9.162zm29.187 3.12c-.948 0-1.699.278-2.255.834-.556.535-.916 1.225-1.081 2.069h6.115c-.02-.844-.247-1.534-.679-2.07-.433-.555-1.133-.833-2.1-.833zm-37.618 4.478c0-1.236-.34-2.214-1.02-2.934-.658-.741-1.606-1.112-2.841-1.112-1.132 0-2.08.35-2.841 1.05-.762.68-1.143 1.678-1.143 2.996s.37 2.337 1.112 3.058c.762.7 1.719 1.05 2.872 1.05 1.277 0 2.234-.371 2.872-1.112.659-.741.989-1.74.989-2.996zm-23.751 1.08h-1.575c-1.503 0-2.584.125-3.243.372-.638.247-.957.72-.957 1.42 0 .597.206 1.04.617 1.328.433.268.947.402 1.545.402.906 0 1.647-.165 2.223-.494.597-.35 1.061-.752 1.39-1.205v-1.822z" fill="#000"/></svg>';

  if (!service) return;

  function empty(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    while (el.firstChild) el.removeChild(el.firstChild);
    return el;
  }

  function make(tag, className, value) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (value != null) el.textContent = value;
    return el;
  }

  function loadAppModalAssets() {
    if (!document.querySelector('link[href^="../modal.css"]')) {
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "../modal.css?v=20261102d";
      document.head.appendChild(css);
    }

    if (!document.querySelector('script[src^="../modal.js"]')) {
      var script = document.createElement("script");
      script.src = "../modal.js?v=20261102b";
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  function renderAppModal() {
    if (document.getElementById("appModal")) return;

    var modal = make("div", "app-modal");
    modal.id = "appModal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "appModalTitle");
    modal.hidden = true;
    modal.innerHTML =
      '<div class="app-modal__backdrop" id="appModalBackdrop"></div>' +
      '<div class="app-modal__panel">' +
        '<button class="app-modal__close" id="appModalClose" aria-label="Закрыть">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
            '<path d="M1 1L15 15M15 1L1 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
        '<h2 class="app-modal__title" id="appModalTitle">Получите бесплатную консультацию</h2>' +
        '<div class="app-modal__body">' +
          '<div class="app-modal__photo">' +
            '<img src="../assets/img/house-small.webp" alt="" loading="lazy">' +
          '</div>' +
          '<div class="app-modal__col">' +
            '<div class="app-modal__form-wrap" id="appModalFormWrap">' +
              '<form id="appModalForm" novalidate>' +
                '<fieldset class="app-modal__methods">' +
                  '<legend class="app-modal__methods-label">Выберите удобный способ связи</legend>' +
                  '<label class="app-modal__method"><input type="radio" name="contactMethod" value="phone" checked> Телефон</label>' +
                  '<label class="app-modal__method"><input type="radio" name="contactMethod" value="telegram"> Telegram</label>' +
                  '<label class="app-modal__method"><input type="radio" name="contactMethod" value="max"> Макс</label>' +
                  '<label class="app-modal__method"><input type="radio" name="contactMethod" value="whatsapp"> WhatsApp</label>' +
                  '<label class="app-modal__method"><input type="radio" name="contactMethod" value="email"> E-mail</label>' +
                '</fieldset>' +
                '<div class="app-modal__fields" id="appModalFields"></div>' +
                '<button type="submit" class="app-modal__submit" id="appModalSubmit">Отправить</button>' +
                '<label class="app-modal__consent" id="appModalConsent">' +
                  '<input type="checkbox" id="appModalConsentCheck">' +
                  '<span class="app-modal__consent-text">Я согласен с <a href="../privacy.html" target="_blank" rel="noopener">политикой конфиденциальности</a> и обработки персональных данных</span>' +
                '</label>' +
              '</form>' +
            '</div>' +
            '<div class="app-modal__success" id="appModalSuccess" hidden>' +
              '<p class="app-modal__success-text">Ваша заявка успешно отправлена!<br>Мы вам ответим в течение двух рабочих дней.</p>' +
              '<button class="app-modal__success-btn" id="appModalSuccessBtn">Отлично</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
  }

  function markAppModalTriggers() {
    Array.prototype.forEach.call(document.querySelectorAll('a[href="#service-lead"]'), function (link) {
      link.setAttribute("data-open-modal", "app");
      link.setAttribute("aria-haspopup", "dialog");
      link.setAttribute("aria-controls", "appModal");
    });
  }

  function linkFor(serviceKey) {
    return serviceKey + ".html";
  }

  function cardImages(card) {
    if (card.images && card.images.length) return card.images;
    return card.image ? [card.image] : [];
  }

  function renderHeading() {
    var heading = empty("serviceHeading");
    if (heading) heading.textContent = service.metaTitle || service.navTitle;
  }

  function renderTabs() {
    var root = empty("serviceTabs");
    if (!root) return;

    root.classList.add("service-tabs--collapsed");

    order.forEach(function (serviceKey) {
      var item = data[serviceKey];
      if (!item) return;

      var a = make("a", "service-tabs__link", item.navTitle);
      a.href = linkFor(serviceKey);
      if (serviceKey === key) a.setAttribute("aria-current", "page");
      root.appendChild(a);
    });

    var toggle = make("button", "service-tabs__toggle", "Посмотреть все услуги");
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      var expanded = root.classList.toggle("is-expanded");
      toggle.setAttribute("aria-expanded", String(expanded));
      toggle.textContent = expanded ? "Спрятать" : "Посмотреть все услуги";
    });
    root.appendChild(toggle);
  }

  function wireMobileMenu() {
    var header = document.querySelector(".service-header");
    var inner = document.querySelector(".service-header__inner");
    var nav = document.querySelector(".service-header__nav");
    var cta = document.querySelector(".service-header__cta");
    if (!header || !inner || !nav || !cta) return;

    nav.id = "serviceMainNav";

    var close = make("button", "service-mobile-menu-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Закрыть меню");
    nav.insertBefore(close, nav.firstChild);

    var toggle = make("button", "service-mobile-menu-toggle");
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Открыть меню");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", nav.id);
    toggle.innerHTML = '<span aria-hidden="true"></span>';

    var drawerCta = cta.cloneNode(true);
    drawerCta.classList.add("service-header__cta--drawer");

    var contacts = make("div", "service-mobile-menu-contacts");
    contacts.setAttribute("aria-label", "Контакты");
    var phone = make("a", "service-mobile-menu-phone", "+7 913 831 46 44");
    phone.href = "tel:+79138314644";
    contacts.appendChild(phone);

    var socials = make("div", "service-mobile-menu-socials");
    socials.setAttribute("aria-label", "Социальные сети и магазины");

    function appendSocial(tag, href, src, label) {
      var item = make(tag, "", "");
      if (href) item.href = href;
      if (tag === "a") {
        item.target = "_blank";
        item.rel = "noopener";
      }
      item.setAttribute("aria-label", label);
      var icon = make("img", "", "");
      icon.src = src;
      icon.alt = "";
      item.appendChild(icon);
      socials.appendChild(item);
    }

    appendSocial("a", "https://t.me/domnakamne", "../assets/icons/social-telegram.svg", "Telegram");
    appendSocial("a", "https://max.ru/join/D5skTTydiMQeMCexBT6VzL-IjJFQNpfEGrf_WvoXwhg", "../assets/icons/social-max.svg", "MAX");
    appendSocial("a", "https://www.ozon.ru/seller/dom-na-kamne-4017365/", "../assets/icons/social-ozon.svg", "Ozon");
    appendSocial("a", "https://market.yandex.ru/cc/ALhct3", "../assets/icons/social-yandex-market.svg?v=official-1", "Яндекс Маркет");
    appendSocial("a", "https://www.avito.ru/brands/i70994095/all", "../assets/icons/social-avito.svg", "Авито");
    contacts.appendChild(socials);

    nav.appendChild(contacts);
    nav.appendChild(drawerCta);

    var backdrop = make("button", "service-mobile-menu-backdrop");
    backdrop.type = "button";
    backdrop.setAttribute("aria-label", "Закрыть меню");
    backdrop.tabIndex = -1;

    inner.appendChild(toggle);
    header.appendChild(backdrop);

    function closeMenu(restoreFocus) {
      header.classList.remove("is-menu-open");
      document.body.classList.remove("is-menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
      if (restoreFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-menu-open");
      document.body.classList.toggle("is-menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    });

    close.addEventListener("click", function () { closeMenu(true); });
    backdrop.addEventListener("click", function () { closeMenu(true); });
    Array.prototype.forEach.call(nav.querySelectorAll("a"), function (link) {
      link.addEventListener("click", function () { closeMenu(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-menu-open")) closeMenu(true);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) closeMenu(false);
    });
  }

  // Photos in assets/img/ are 1600 px wide and have an 800 px copy
  // (name-800.webp). The small card art in service-cards/ has no copies.
  // Sizes follow .service-card__media: a 480 px column on desktop, otherwise
  // the full width inside the .container padding.
  var OFFER_IMAGE_SIZES = "(min-width: 1181px) 480px, calc(100vw - max(40px, 8.4vw))";
  // The promo figure is a 520 px column on desktop and the same full width below.
  var PROMO_IMAGE_SIZES = "(min-width: 1181px) 520px, calc(100vw - max(40px, 8.4vw))";

  function setPhotoSource(img, src) {
    if (src && src.indexOf("/service-cards/") === -1) {
      img.srcset = src.replace(/\.webp$/, "-800.webp") + " 800w, " + src + " 1600w";
    } else {
      img.removeAttribute("srcset");
    }
    img.src = src;
  }

  function renderCard(card, index) {
    var images = cardImages(card);
    var article = make("article", "service-card service-reveal");
    article.style.transitionDelay = (index * 0.04) + "s";

    var inner = make("div", "service-card__inner container");
    var media = make("figure", "service-card__media");
    var image = make("img");
    image.alt = card.imageAlt || card.title;
    image.loading = index === 0 ? "eager" : "lazy";
    if (index === 0) image.setAttribute("fetchpriority", "high");
    image.decoding = "async";
    image.sizes = OFFER_IMAGE_SIZES;
    setPhotoSource(image, images[0] || "");
    media.appendChild(image);

    if (images.length > 1) {
      media.setAttribute("data-carousel", "true");
      media.setAttribute("data-index", "0");
      media.setAttribute("data-images", images.join("|"));

      var prev = make("button", "service-card__control service-card__control--prev", "←");
      var next = make("button", "service-card__control service-card__control--next", "→");
      prev.type = "button";
      next.type = "button";
      prev.setAttribute("aria-label", "Предыдущее изображение");
      next.setAttribute("aria-label", "Следующее изображение");
      media.appendChild(prev);
      media.appendChild(next);

      var dots = make("div", "service-card__dots");
      images.forEach(function (_, dotIndex) {
        var dot = make("button", "service-card__dot");
        dot.type = "button";
        dot.setAttribute("aria-label", "Изображение " + (dotIndex + 1));
        if (dotIndex === 0) dot.setAttribute("aria-current", "true");
        dots.appendChild(dot);
      });
      media.appendChild(dots);
    }

    var copy = make("div", "service-card__copy");
    copy.appendChild(make("h2", "service-card__title", card.title));
    if (card.intro) copy.appendChild(make("p", "service-card__intro", card.intro));

    var list = make("ul", "service-card__list");
    card.bullets.forEach(function (item) {
      list.appendChild(make("li", "", item));
    });
    copy.appendChild(list);

    var cta = make("a", "service-card__cta", card.ctaLabel || "Оставить заявку");
    cta.href = "#service-lead";
    cta.appendChild(make("span", "svc__arrow", ""));
    copy.appendChild(cta);

    inner.appendChild(media);
    inner.appendChild(copy);
    article.appendChild(inner);
    return article;
  }

  function renderOffers() {
    var root = empty("serviceOffers");
    if (!root) return;

    service.cards.forEach(function (card, index) {
      root.appendChild(renderCard(card, index));
    });
  }

  function renderPromo() {
    var root = empty("servicePromo");
    if (!root) return;
    if (!service.promo) {
      root.hidden = true;
      return;
    }

    root.hidden = false;
    var inner = make("div", "service-promo__inner container");
    var copy = make("div", "service-promo__copy");
    var title = make("h2", "service-promo__title");
    var accent = "10%";
    var accentIndex = service.promo.title.indexOf(accent);
    if (accentIndex >= 0) {
      title.appendChild(document.createTextNode(service.promo.title.slice(0, accentIndex)));
      title.appendChild(make("em", "service-promo__accent", accent));
      title.appendChild(document.createTextNode(service.promo.title.slice(accentIndex + accent.length)));
    } else {
      title.textContent = service.promo.title;
    }
    copy.appendChild(title);
    copy.appendChild(make("p", "service-promo__text", service.promo.text));
    copy.appendChild(renderInlineForm(service.promo.ctaLabel || "Оставить заявку", "service-promo"));

    var figure = make("figure", "service-promo__media");
    var image = make("img");
    image.sizes = PROMO_IMAGE_SIZES;
    setPhotoSource(image, service.promo.image);
    image.alt = service.promo.imageAlt || "";
    image.loading = "lazy";
    image.decoding = "async";
    figure.appendChild(image);

    inner.appendChild(copy);
    inner.appendChild(figure);
    root.appendChild(inner);
  }

  function renderTrust() {
    var root = empty("serviceTrust");
    if (!root) return;
    if (!service.trust) {
      root.hidden = true;
      return;
    }

    root.hidden = false;
    var inner = make("div", "service-trust__inner container");
    inner.appendChild(make("h2", "service-trust__title", service.trust.title));
    var list = make("ul", "service-trust__list");
    service.trust.items.forEach(function (item) {
      list.appendChild(make("li", "", item));
    });
    inner.appendChild(list);
    root.appendChild(inner);
  }

  function renderInlineForm(buttonLabel, modifier) {
    var form = make("form", "service-form" + (modifier ? " service-form--" + modifier : ""));
    form.action = "#";
    form.setAttribute("data-service-form", "");

    var label = make("label", "service-form__label", "Ваш номер телефона");
    var inputId = modifier + "-phone-" + key;
    label.setAttribute("for", inputId);

    var row = make("div", "service-form__row");
    var input = make("input", "service-form__input");
    input.id = inputId;
    input.type = "tel";
    input.placeholder = PHONE_PLACEHOLDER;
    input.autocomplete = "tel";
    input.inputMode = "tel";
    input.enterKeyHint = "done";
    input.setAttribute("aria-label", "Телефон");

    var button = make("button", "service-form__button", buttonLabel);
    button.type = "submit";
    button.appendChild(make("span", "svc__arrow", ""));

    row.appendChild(input);
    row.appendChild(button);

    var consent = make("label", "service-form__consent");
    var checkbox = make("input");
    checkbox.type = "checkbox";
    consent.appendChild(checkbox);
    var consentText = make("span", "");
    consentText.appendChild(document.createTextNode("Я согласен с "));
    var consentLink = make("a", "", "политикой конфиденциальности");
    consentLink.href = "../privacy.html";
    consentLink.target = "_blank";
    consentLink.rel = "noopener";
    consentText.appendChild(consentLink);
    consentText.appendChild(document.createTextNode(" и обработки персональных данных"));
    consent.appendChild(consentText);

    form.appendChild(label);
    form.appendChild(row);
    form.appendChild(consent);

    var status = make("p", "service-form__status", "");
    status.setAttribute("aria-live", "polite");
    form.appendChild(status);

    var trap = make("input", "service-form__trap");
    trap.type = "text";
    trap.name = "lead_ref";
    trap.tabIndex = -1;
    trap.autocomplete = "off";
    trap.setAttribute("aria-hidden", "true");
    form.appendChild(trap);
    return form;
  }

  function renderLead() {
    var root = empty("service-lead");
    if (!root) return;

    var inner = make("div", "service-lead__inner container");
    var title = make("h2", "service-lead__title", "Дарим проект при заключении договора на строительство");
    inner.appendChild(title);
    inner.appendChild(renderInlineForm("Получить проект", "lead"));
    root.appendChild(inner);
  }

  function renderFooter() {
    var root = empty("serviceFooter");
    if (!root) return;

    var body = make("div", "service-footer__body container");
    var company = make("div", "service-footer__company");
    var logo = make("a", "service-footer__logo", "Дом на камне");
    logo.href = "../index.html";
    company.appendChild(logo);
    company.appendChild(make("p", "service-footer__tagline", "Строительные работы под ключ, продажа материалов и готовых объектов."));
    var ozon = make("a", "service-footer__ozon", "");
    ozon.href = "https://www.ozon.ru/seller/dom-na-kamne-4017365/";
    ozon.target = "_blank";
    ozon.rel = "noopener";
    ozon.setAttribute("aria-label", "Магазин на OZON");
    ozon.innerHTML = OZON_LOGO_SVG;
    company.appendChild(ozon);
    var market = make("a", "service-footer__market", "");
    market.href = "https://market.yandex.ru/cc/ALhct3";
    market.target = "_blank";
    market.rel = "noopener";
    market.setAttribute("aria-label", "Магазин на Яндекс Маркете");
    market.innerHTML = MARKET_LOGO_SVG;
    company.appendChild(market);
    body.appendChild(company);

    body.appendChild(renderFooterNav("Услуги - часть 1", [
      ["Дома", "doma.html"],
      ["Бани", "bani.html"],
      ["Фундамент", "fundament.html"],
      ["Кровля", "krovlya.html"],
      ["Отделка", "otdelka.html"]
    ]));

    body.appendChild(renderFooterNav("Услуги - часть 2", [
      ["Гаражи", "garazhi.html"],
      ["Беседки", "besedki.html"],
      ["Фасады", "fasady.html"],
      ["Инженерия", "inzheneriya.html"],
      ["Заборы и ворота", "zabory.html"]
    ]));

    body.appendChild(renderFooterNav("Разделы сайта", [
      ["Наши проекты", "../index.html#projects"],
      ["Акции", "../index.html#banya"],
      ["Отзывы", "../index.html#reviews"],
      ["О компании", "../index.html#about"]
    ]));

    var contacts = make("address", "service-footer__contacts");
    [
      ["a", "8 913 831 46 44", "tel:+79138314644"],
      ["a", "dom-na-kamne@mail.ru", "mailto:dom-na-kamne@mail.ru"],
      ["span", "г. Железногорск"],
      ["span", "ул. Южная, 38А"],
      ["span", "ИНН 2452039776", "", "service-footer__inn"]
    ].forEach(function (item) {
      var el = make(item[0], "", item[1]);
      if (item[2]) el.href = item[2];
      if (item[3]) el.className = item[3];
      contacts.appendChild(el);
    });
    body.appendChild(contacts);

    var bottom = make("div", "service-footer__bottom container");
    bottom.appendChild(make("span", "service-footer__copyright", "© 2026 Строительство качественных домов в Красноярском крае"));
    var credit = make("a", "service-footer__legal-link", "Разработка сайта");
    credit.href = "https://moontahaj.com";
    credit.target = "_blank";
    credit.rel = "noopener";
    bottom.appendChild(credit);
    var legal = make("a", "", "Политика конфиденциальности");
    legal.href = "../privacy.html";
    legal.className = "service-footer__legal-link";
    bottom.appendChild(legal);

    var disclaimer = make("p", "service-footer__disclaimer container", "Сайт носит исключительно информационный характер и не является публичной офертой, определяемой положениями №152-ФЗ ГК РФ. Для получения подробной информации о наличии, видах, характеристиках и стоимости услуг обращайтесь в офис продаж. Официальный сайт ООО «Дом на камне».");

    root.appendChild(body);
    root.appendChild(bottom);
    root.appendChild(disclaimer);
  }

  function renderFooterNav(label, links) {
    var nav = make("nav", "service-footer__nav");
    nav.setAttribute("aria-label", label);
    links.forEach(function (item) {
      var a = make("a", "", item[0]);
      a.href = item[1];
      nav.appendChild(a);
    });
    return nav;
  }

  function updateCarousel(media, nextIndex) {
    var images = media.getAttribute("data-images").split("|");
    var index = (nextIndex + images.length) % images.length;
    var img = media.querySelector("img");
    if (img) setPhotoSource(img, images[index]);
    media.setAttribute("data-index", String(index));
    Array.prototype.forEach.call(media.querySelectorAll(".service-card__dot"), function (dot, dotIndex) {
      if (dotIndex === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function wireCarousels() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-carousel='true']"), function (media) {
      var prev = media.querySelector(".service-card__control--prev");
      var next = media.querySelector(".service-card__control--next");
      var dots = Array.prototype.slice.call(media.querySelectorAll(".service-card__dot"));

      if (prev) prev.addEventListener("click", function () {
        updateCarousel(media, Number(media.getAttribute("data-index")) - 1);
      });

      if (next) next.addEventListener("click", function () {
        updateCarousel(media, Number(media.getAttribute("data-index")) + 1);
      });

      dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
          updateCarousel(media, index);
        });
      });
    });
  }

  function wireForms() {
    var toastTimer = 0;

    function getSuccessToast() {
      var toast = document.getElementById("serviceLeadSuccess");
      if (toast) return toast;

      toast = make("div", "service-lead-toast");
      toast.id = "serviceLeadSuccess";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      toast.setAttribute("aria-atomic", "true");
      toast.hidden = true;

      var copy = make("div", "service-lead-toast__copy");
      var eyebrow = make("span", "service-lead-toast__eyebrow", "Заявка отправлена");
      var title = make("p", "service-lead-toast__title", "Спасибо за обращение");
      var message = make("p", "service-lead-toast__text", "Мы свяжемся с вами в течение двух рабочих дней.");
      copy.appendChild(eyebrow);
      copy.appendChild(title);
      copy.appendChild(message);
      var close = make("button", "service-lead-toast__close", "");
      close.type = "button";
      close.setAttribute("aria-label", "Закрыть уведомление");
      close.addEventListener("click", function () {
        window.clearTimeout(toastTimer);
        toast.classList.remove("is-visible");
        window.setTimeout(function () { toast.hidden = true; }, 180);
      });

      toast.appendChild(copy);
      toast.appendChild(close);
      document.body.appendChild(toast);
      return toast;
    }

    function showSuccessToast() {
      var toast = getSuccessToast();
      window.clearTimeout(toastTimer);
      toast.hidden = false;
      window.requestAnimationFrame(function () {
        toast.classList.add("is-visible");
      });
      toastTimer = window.setTimeout(function () {
        toast.classList.remove("is-visible");
        window.setTimeout(function () { toast.hidden = true; }, 180);
      }, 7000);
    }

    function isValidPhone(value) {
      return value.replace(/\D/g, "").length === 11;
    }

    function setFormStatus(form, message) {
      var status = form.querySelector(".service-form__status");
      if (status) status.textContent = message;
    }

    function addCallLink(form) {
      var status = form.querySelector(".service-form__status");
      if (!status) return;
      var link = make("a", "", "+7 913 831 46 44");
      link.href = "tel:+79138314644";
      status.appendChild(document.createTextNode(" Или позвоните "));
      status.appendChild(link);
    }

    function setLoading(button, loading) {
      if (loading) {
        button.setAttribute("data-label", button.textContent.trim());
        button.disabled = true;
        button.classList.add("is-loading");
        button.setAttribute("aria-label", "Отправка заявки");
        button.textContent = "";
        button.appendChild(make("span", "service-form__spinner", ""));
        return;
      }

      var label = button.getAttribute("data-label") || "Отправить";
      button.disabled = false;
      button.classList.remove("is-loading");
      button.removeAttribute("aria-label");
      button.removeAttribute("data-label");
      button.textContent = label;
      button.appendChild(make("span", "svc__arrow", ""));
    }

    Array.prototype.forEach.call(document.querySelectorAll("[data-service-form]"), function (form) {
      var button = form.querySelector(".service-form__button");
      var phone = form.querySelector("input[type='tel']");
      var consent = form.querySelector("input[type='checkbox']");
      var consentLabel = form.querySelector(".service-form__consent");
      var trap = form.querySelector(".service-form__trap");

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!button || button.disabled) return;

        phone.removeAttribute("aria-invalid");
        consent.removeAttribute("aria-invalid");
        consentLabel.classList.remove("is-error");
        setFormStatus(form, "");

        if (!isValidPhone(phone.value)) {
          phone.setAttribute("aria-invalid", "true");
          setFormStatus(form, "Введите номер телефона полностью.");
          phone.focus();
          return;
        }

        if (!consent.checked) {
          consent.setAttribute("aria-invalid", "true");
          consentLabel.classList.add("is-error");
          setFormStatus(form, "Подтвердите согласие на обработку персональных данных.");
          consent.focus();
          return;
        }

        setLoading(button, true);

        // Topic = the form's section heading + this page's service, e.g.
        // "Дарим проект при заключении договора на строительство · Дома".
        var section = form.closest("section");
        var heading = section && section.querySelector("h2");
        var topic = [
          heading ? heading.textContent.replace(/\s+/g, " ").trim() : "",
          service.metaTitle || service.navTitle || ""
        ].filter(Boolean).join(" · ") || "Заявка с сайта";

        var send = window.dnkSendLead
          ? window.dnkSendLead({ topic: topic, method: "phone", phone: phone.value, lead_ref: trap ? trap.value : "" })
          : Promise.resolve(false);

        send.then(function (sent) {
          setLoading(button, false);
          if (sent) {
            phone.value = "";
            consent.checked = false;
            showSuccessToast();
            return;
          }
          setFormStatus(form, "Открываем почтовое приложение с готовой заявкой. Проверьте её и нажмите «Отправить».");
          addCallLink(form);
          var lines = ["Тема: " + topic, "Телефон для связи: " + phone.value];
          if (window.dnkMailtoLead) {
            window.dnkMailtoLead(topic, lines);
          } else {
            window.location.href = "mailto:dom-na-kamne@mail.ru?subject=" +
              encodeURIComponent("Заявка с сайта: " + topic) + "&body=" + encodeURIComponent(lines.join("\n"));
          }
        });
      });
    });
  }

  // How many leading digits are the country code. People type "8…" or "+7…"
  // after the prefilled +7, so a 7 or 8 right after it is a repeat, not the
  // area code, once there are more than ten digits behind the prefix.
  function countryDigits(d) {
    if (d.length === 11 && (d[0] === "7" || d[0] === "8")) return 1;
    if (d[0] !== "7") return 0;
    return d.length > 11 && (d[1] === "7" || d[1] === "8") ? 2 : 1;
  }

  function formatPhone(raw) {
    var all = raw.replace(/\D/g, "");
    if (!all.length) return "";
    var skip = countryDigits(all);
    var d = "7" + all.slice(skip, skip + 10);
    var out = "+7";
    if (d.length > 1) {
      out += " (" + d.slice(1, Math.min(4, d.length));
      if (d.length >= 4) out += ")";
    }
    if (d.length > 4) out += " " + d.slice(4, Math.min(7, d.length));
    if (d.length > 7) out += "-" + d.slice(7, Math.min(9, d.length));
    if (d.length > 9) out += "-" + d.slice(9, 11);
    return out;
  }

  function digitCaretIndex(value, caret) {
    var before = value.slice(0, caret).replace(/\D/g, "").length;
    return before - countryDigits(value.replace(/\D/g, "")) + 1;
  }

  function caretFromDigitIndex(value, digitIndex) {
    if (digitIndex <= 0) return 0;
    var count = 0;
    for (var i = 0; i < value.length; i += 1) {
      if (/\d/.test(value[i])) count += 1;
      if (count >= digitIndex) return i + 1;
    }
    return value.length;
  }

  function setPhoneCaret(input, digitIndex) {
    var caret = caretFromDigitIndex(input.value, digitIndex);
    try { input.setSelectionRange(caret, caret); } catch (_) {}
  }

  function removeDigitAt(value, digitIndex) {
    var digits = value.replace(/\D/g, "").split("");
    if (digitIndex <= 0) return "";
    if (digitIndex >= digits.length) return formatPhone(value);
    digits.splice(digitIndex, 1);
    return formatPhone(digits.join(""));
  }

  function applyPhoneMask(input) {
    input.placeholder = PHONE_PLACEHOLDER;
    // A 7 or 8 typed first may be a repeated country code, so one extra
    // digit is let through for formatPhone to read. Otherwise a full number
    // takes no more digits.
    var countryTyped = false;

    input.addEventListener("focus", function () {
      countryTyped = false;
      if (!this.value) this.value = "+7";
    });
    input.addEventListener("blur", function () {
      if (this.value === "+7") this.value = "";
    });
    input.addEventListener("input", function () {
      var prev = this.value;
      var pos = this.selectionStart || 0;
      var digits = prev.replace(/\D/g, "");
      if (digits.length <= 2) {
        countryTyped = digits.length === 2 && digits[0] === "7" && (digits[1] === "7" || digits[1] === "8");
      }
      if (digits.length > 11 && !countryTyped) {
        var typedAt = Math.max(prev.slice(0, pos).replace(/\D/g, "").length - 1, 0);
        this.value = formatPhone(digits.slice(0, typedAt) + digits.slice(typedAt + 1));
        setPhoneCaret(this, typedAt);
        return;
      }
      var next = formatPhone(prev);
      this.value = next;
      if (digits.length > 11) countryTyped = false;
      setPhoneCaret(this, digitCaretIndex(prev, pos));
    });
    // A pasted full number replaces the field rather than merging into it.
    input.addEventListener("paste", function (event) {
      var text = event.clipboardData ? event.clipboardData.getData("text") : "";
      if (text.replace(/\D/g, "").length < 10) return;
      event.preventDefault();
      this.value = formatPhone(text);
      setPhoneCaret(this, 11);
    });
    input.addEventListener("keydown", function (event) {
      if (event.ctrlKey || event.metaKey) return;
      if ((event.key === "Backspace" || event.key === "Delete") && this.selectionStart !== null) {
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var value = this.value;

        event.preventDefault();
        if (start !== end) {
          var selectionDigitIndex = digitCaretIndex(value, start);
          this.value = formatPhone(value.slice(0, start) + value.slice(end));
          setPhoneCaret(this, selectionDigitIndex);
          return;
        }

        if (event.key === "Backspace") {
          if (start <= 2) {
            this.value = "";
            return;
          }
          var backspaceDigitIndex = digitCaretIndex(value, start) - 1;
          this.value = removeDigitAt(value, backspaceDigitIndex);
          setPhoneCaret(this, backspaceDigitIndex);
          return;
        }

        var deleteDigitIndex = digitCaretIndex(value, start);
        this.value = removeDigitAt(value, deleteDigitIndex);
        setPhoneCaret(this, deleteDigitIndex);
        return;
      }
      var pass = ["Backspace", "Delete", "Tab", "Enter",
                  "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
                  "Home", "End"];
      if (pass.indexOf(event.key) !== -1) return;
      if (event.key >= "0" && event.key <= "9") {
        return;
      }
      event.preventDefault();
    });
  }

  function wirePhoneFields() {
    Array.prototype.forEach.call(document.querySelectorAll("input[type='tel']"), applyPhoneMask);
  }

  function wireLeadLinks() {
    var lead = document.getElementById("service-lead");
    if (!lead) return;

    var prefersReducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    Array.prototype.forEach.call(document.querySelectorAll('a[href="#service-lead"]'), function (link) {
      if (link.hasAttribute("data-open-modal")) return;

      link.addEventListener("click", function (event) {
        event.preventDefault();
        lead.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start"
        });

        var phone = lead.querySelector("input[type='tel']");
        if (!phone) return;

        window.setTimeout(function () {
          try { phone.focus({ preventScroll: true }); }
          catch (_) { phone.focus(); }
        }, prefersReducedMotion ? 0 : 450);
      });
    });
  }

  function wireScrollTop() {
    var button = document.querySelector(".service-scrolltop");
    if (!button) return;

    function sync() {
      button.classList.toggle("is-visible", window.scrollY > 720);
    }

    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", sync, { passive: true });
    sync();
  }

  function reveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".service-reveal"));
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach(function (el) { io.observe(el); });
  }

  // The page <title> is set statically in each services/*.html file so that
  // crawlers (and social/link previews) get the full geo-targeted title even
  // without executing JS. Overwriting it here would replace it with the short
  // "metaTitle" and lose those keywords, so it is intentionally left alone.
  renderHeading();
  renderTabs();
  renderOffers();
  renderPromo();
  renderTrust();
  renderLead();
  renderFooter();
  wireMobileMenu();
  markAppModalTriggers();
  renderAppModal();
  loadAppModalAssets();
  wireCarousels();
  wireForms();
  wirePhoneFields();
  wireLeadLinks();
  wireScrollTop();
  reveal();
})();
