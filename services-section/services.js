/* ==========================================================================
   Дом на камне — Services interaction
   ~Vanilla, no dependencies. Each service is one of two kinds:
     • a "leader" — draws an SVG line + node to a concrete part of the house
     • a "preview" — has no single point on the house (Отделка / Инженерия),
       so it blooms a framed photo card instead.
   Geometry is recomputed from the LIVE layout on load / resize so it stays
   pixel-accurate at any width. Hover / focus state is CSS-class driven.
   ========================================================================== */
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";

  var section  = document.querySelector(".services");
  var stage    = document.getElementById("stage");
  var svg      = document.getElementById("leaders");
  var house    = document.getElementById("house");
  if (!stage || !svg || !house) return;

  var services = Array.prototype.slice.call(stage.querySelectorAll(".service"));

  // --- build one controller per service ------------------------------------
  var items = services.map(function (svc) {
    var link = svc.querySelector(".service__link");
    var side = svc.parentElement.classList.contains("col--right") ? "right" : "left";
    var previewSrc = link.getAttribute("data-preview");

    if (previewSrc) {
      // ---- preview card (intangible service) ----
      var fig = document.createElement("figure");
      fig.className = "preview";
      var img = document.createElement("img");
      img.src = previewSrc;
      img.alt = "";
      img.loading = "lazy";
      var cap = document.createElement("figcaption");
      cap.textContent = svc.querySelector(".service__label").textContent;
      var mark = document.createElement("span");
      mark.className = "preview__mark";
      mark.textContent = "↗";
      cap.appendChild(mark);
      fig.appendChild(img);
      fig.appendChild(cap);
      stage.appendChild(fig);
      return { type: "preview", svc: svc, link: link, side: side, el: fig };
    }

    // ---- leader line (tangible service) ----
    var g = document.createElementNS(SVGNS, "g");
    g.setAttribute("class", "leader");
    g.setAttribute("data-key", svc.getAttribute("data-key") || "");
    var casing = document.createElementNS(SVGNS, "path");
    casing.setAttribute("class", "leader__casing");
    casing.setAttribute("pathLength", "1");
    var line = document.createElementNS(SVGNS, "path");
    line.setAttribute("class", "leader__line");
    line.setAttribute("pathLength", "1");
    var ping = document.createElementNS(SVGNS, "circle");
    ping.setAttribute("class", "leader__ping");
    var ring = document.createElementNS(SVGNS, "circle");
    ring.setAttribute("class", "leader__ring");
    var dot = document.createElementNS(SVGNS, "circle");
    dot.setAttribute("class", "leader__dot");
    g.appendChild(casing); g.appendChild(line);
    g.appendChild(ping); g.appendChild(ring); g.appendChild(dot);
    svg.appendChild(g);

    return { type: "leader", svc: svc, link: link, side: side, g: g,
             casing: casing, line: line, ping: ping, ring: ring, dot: dot };
  });

  // --- geometry ------------------------------------------------------------
  function layout() {
    var sr = stage.getBoundingClientRect();
    if (!sr.width) return;

    svg.setAttribute("viewBox", "0 0 " + sr.width + " " + sr.height);

    var hr = house.getBoundingClientRect();
    var hx = hr.left - sr.left;
    var hy = hr.top - sr.top;

    items.forEach(function (o) {
      var a  = o.link.getAttribute("data-anchor").split(",");
      var nx = hx + parseFloat(a[0]) * hr.width;
      var ny = hy + parseFloat(a[1]) * hr.height;

      if (o.type === "preview") {
        // centre the photo card on the anchor point
        o.el.style.left = nx + "px";
        o.el.style.top  = ny + "px";
        return;
      }

      var lr = o.link.getBoundingClientRect();
      var sx = (o.side === "left" ? lr.right : lr.left) - sr.left;
      var sy = lr.top + lr.height / 2 - sr.top;

      // smooth leader: launches horizontally from the label, eases into node
      var c1x = sx + (nx - sx) * 0.45;
      var c2x = sx + (nx - sx) * 0.72;
      var d = "M " + sx + " " + sy +
              " C " + c1x + " " + sy + ", " + c2x + " " + ny + ", " + nx + " " + ny;

      o.casing.setAttribute("d", d);
      o.line.setAttribute("d", d);
      [o.ping, o.ring, o.dot].forEach(function (c) {
        c.setAttribute("cx", nx);
        c.setAttribute("cy", ny);
      });
    });
  }

  // --- activation ----------------------------------------------------------
  function activate(target) {
    // position the spotlight hole at this service's anchor on the house
    var a = target.link.getAttribute("data-anchor").split(",");
    house.parentElement.style.setProperty("--spot-x", (parseFloat(a[0]) * 100) + "%");
    house.parentElement.style.setProperty("--spot-y", (parseFloat(a[1]) * 100) + "%");

    stage.classList.add("is-focused");
    items.forEach(function (o) {
      var on = o === target;
      o.svc.classList.toggle("is-on", on);
      if (o.type === "leader") o.g.classList.toggle("is-active", on);
      else o.el.classList.toggle("is-shown", on);
    });
  }
  function clear() {
    house.parentElement.style.removeProperty("--spot-x");
    house.parentElement.style.removeProperty("--spot-y");
    stage.classList.remove("is-focused");
    items.forEach(function (o) {
      o.svc.classList.remove("is-on");
      if (o.type === "leader") o.g.classList.remove("is-active");
      else o.el.classList.remove("is-shown");
    });
  }

  items.forEach(function (o) {
    o.link.addEventListener("mouseenter", function () { activate(o); });
    o.link.addEventListener("focus", function () { activate(o); });
  });
  stage.addEventListener("mouseleave", clear);
  stage.addEventListener("focusout", function (e) {
    if (!stage.contains(e.relatedTarget)) clear();
  });

  // --- lifecycle -----------------------------------------------------------
  function ready() {
    layout();
    // re-measure once webfonts settle (label widths shift the start points)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(layout);
    }
  }
  if (house.complete) ready();
  else house.addEventListener("load", ready);
  window.addEventListener("load", layout);

  var rAF;
  window.addEventListener("resize", function () {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(layout);
  });

  // --- entrance reveal -----------------------------------------------------
  if (section) {
    section.setAttribute("data-reveal", "");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            section.classList.add("is-in");
            io.disconnect();
          }
        });
      }, { threshold: 0.25 });
      io.observe(section);
    } else {
      section.classList.add("is-in");
    }
  }
})();
