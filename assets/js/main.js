/* ==========================================================================
   Sree NXT GEN EV — behaviour
   Plain JavaScript. No libraries, no build step.
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Links ------------------------------------------------------
     Every Call / WhatsApp / Directions link on every page is written from
     the values in data.js, so there is only one place to change a number.
     ------------------------------------------------------------------- */
  function waLink(message) {
    return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(message || S.waDefault);
  }

  function wireLinks() {
    $$("[data-link='call']").forEach(function (el) { el.href = "tel:+" + S.phone; });
    $$("[data-link='maps']").forEach(function (el) {
      el.href = S.mapsLink; el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-link='whatsapp']").forEach(function (el) {
      el.href = waLink(el.getAttribute("data-msg"));
      el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-fill='phone']").forEach(function (el) { el.textContent = S.phoneDisplay; });
    $$("[data-fill='address']").forEach(function (el) { el.textContent = S.address; });
    $$("[data-fill='hours']").forEach(function (el) { el.textContent = S.hours; });
    $$("[data-fill='year']").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- Mobile menu ---------------------------------------------- */
  function menu() {
    var burger = $(".burger");
    var panel = $(".menu");
    if (!burger || !panel) return;

    function set(open) {
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    }
    burger.addEventListener("click", function () {
      set(!document.body.classList.contains("menu-open"));
    });
    $$(".menu a").forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) set(false);
    });
  }

  /* ---------- Hero slider ----------------------------------------------
     Swipe on touch, dots on all sizes, auto-advance unless the visitor has
     asked for reduced motion or is interacting with it.
     ------------------------------------------------------------------- */
  function hero() {
    var root = $(".hero");
    if (!root) return;
    var slides = $$(".hero__slide", root);
    var dots = $$(".hero__dots button", root);
    if (slides.length < 2) return;

    var i = 0, timer = null;
    var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
      dots.forEach(function (d, k) { d.setAttribute("aria-selected", k === i ? "true" : "false"); });
    }
    function play() { if (!still) { stop(); timer = setInterval(function () { go(i + 1); }, 6500); } }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    dots.forEach(function (d, k) {
      d.addEventListener("click", function () { go(k); play(); });
    });

    var x0 = null;
    root.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) go(dx < 0 ? i + 1 : i - 1);
      x0 = null; play();
    }, { passive: true });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", play);
    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : play();
    });

    go(0);
    play();
  }

  /* ---------- Build cards ---------------------------------------------- */
  function cardHTML(b) {
    var tag = b.tag
      ? '<span class="card__tag' + (b.tagStyle === "flare" ? " card__tag--flare" : "") + '">' + b.tag + "</span>"
      : "";
    return (
      '<button class="card" type="button" data-build="' + b.id + '">' +
        '<div class="card__media">' + tag +
          '<img src="' + b.image + '" alt="' + b.name + '" loading="lazy" width="1200" height="900">' +
        "</div>" +
        '<div class="card__body">' +
          '<span class="card__name">' + b.name + "</span>" +
          '<span class="card__spec">' + b.specs[0][1] + " range · " + b.specs[1][1] + "</span>" +
          '<span class="card__foot">' +
            '<span class="card__price">' + b.price + "<span>" + b.priceNote + "</span></span>" +
            '<span class="card__more">View details</span>' +
          "</span>" +
        "</div>" +
      "</button>"
    );
  }

  function renderBuilds() {
    var list = window.BUILDS || [];

    var featured = $("[data-builds='featured']");
    if (featured) {
      featured.innerHTML = list.slice(0, 4).map(cardHTML).join("");
    }

    var all = $("[data-builds='all']");
    if (all) {
      var paint = function (cat) {
        var shown = cat === "all" ? list : list.filter(function (b) { return b.category === cat; });
        all.innerHTML = shown.length
          ? shown.map(cardHTML).join("")
          : '<p class="lede">Nothing in this category right now. Message us on WhatsApp and we will tell you what is coming in.</p>';
      };
      paint("all");
      $$(".chip").forEach(function (chip) {
        chip.addEventListener("click", function () {
          $$(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
          chip.setAttribute("aria-pressed", "true");
          paint(chip.getAttribute("data-cat"));
        });
      });
    }

    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest("[data-build]") : null;
      if (btn) openBuild(btn.getAttribute("data-build"));
    });
  }

  /* ---------- Build detail modal ---------------------------------------- */
  var lastFocus = null;

  function openBuild(id) {
    var b = (window.BUILDS || []).filter(function (x) { return x.id === id; })[0];
    var modal = $("#buildModal");
    if (!b || !modal) return;

    lastFocus = document.activeElement;
    $(".modal__media img", modal).src = b.image;
    $(".modal__media img", modal).alt = b.name;
    $("#buildName", modal).textContent = b.name;
    $("#buildSummary", modal).textContent = b.summary;
    $("#buildPrice", modal).innerHTML = b.price + " <span>" + b.priceNote + "</span>";
    $("#buildSpecs", modal).innerHTML = b.specs.map(function (row) {
      return "<li><span>" + row[0] + "</span><span>" + row[1] + "</span></li>";
    }).join("");

    var msg = "Hello Sree NXT GEN EV, I am interested in the " + b.name +
      " (" + b.price + "). Please tell me about availability and EMI options.";
    var wa = $("#buildWa", modal);
    wa.href = waLink(msg);
    wa.target = "_blank"; wa.rel = "noopener";
    $("#buildCall", modal).href = "tel:+" + S.phone;

    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    $(".modal__close", modal).focus();
  }

  function closeBuild() {
    var modal = $("#buildModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  function modal() {
    var m = $("#buildModal");
    if (!m) return;
    $(".modal__close", m).addEventListener("click", closeBuild);
    m.addEventListener("click", function (e) { if (e.target === m) closeBuild(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && m.classList.contains("is-open")) closeBuild();
    });
  }

  /* ---------- Reviews ---------------------------------------------------- */
  function renderReviews() {
    var host = $("[data-reviews]");
    if (!host) return;
    host.innerHTML = (window.REVIEWS || []).map(function (r) {
      var stars = "";
      for (var k = 0; k < 5; k++) stars += k < r.stars ? "★" : "☆";
      return (
        '<figure class="quote">' +
          '<span class="quote__stars" aria-label="' + r.stars + ' out of 5">' + stars + "</span>" +
          "<blockquote><p>" + r.text + "</p></blockquote>" +
          '<figcaption class="quote__who">' +
            '<span class="quote__av" aria-hidden="true">' + r.name.charAt(0) + "</span>" +
            "<span><b>" + r.name + "</b><span>" + r.place + "</span></span>" +
          "</figcaption>" +
        "</figure>"
      );
    }).join("");
  }

  /* ---------- FAQ accordion ---------------------------------------------- */
  function renderFaqs() {
    var host = $("[data-faqs]");
    if (!host) return;
    host.innerHTML = (window.FAQS || []).map(function (f, k) {
      return (
        '<div class="acc__item">' +
          '<h3 style="margin:0"><button class="acc__btn" type="button" aria-expanded="false" aria-controls="faq' + k + '">' +
            "<span>" + f.q + '</span><span class="acc__sign" aria-hidden="true"></span>' +
          "</button></h3>" +
          '<div class="acc__panel" id="faq' + k + '"><p>' + f.a + "</p></div>" +
        "</div>"
      );
    }).join("");

    $$(".acc__btn", host).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        document.getElementById(btn.getAttribute("aria-controls")).classList.toggle("is-open", !open);
      });
    });
  }

  /* ---------- Enquiry form ----------------------------------------------
     A GitHub Pages site has no server, so the form composes a WhatsApp
     message and hands it to the visitor's WhatsApp app.
     ------------------------------------------------------------------- */
  function form() {
    var f = $("#enquiry");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = f.name_field.value.trim();
      var phone = f.phone_field.value.trim();
      var model = f.model_field.value;
      var note = f.note_field.value.trim();

      if (!name || phone.replace(/\D/g, "").length < 10) {
        $("#formMsg").textContent = "Add your name and a 10 digit phone number so we can call you back.";
        return;
      }

      var msg =
        "Hello Sree NXT GEN EV." +
        "\nName: " + name +
        "\nPhone: " + phone +
        "\nInterested in: " + model +
        (note ? "\nQuestion: " + note : "");

      $("#formMsg").textContent = "Opening WhatsApp with your message.";
      window.open(waLink(msg), "_blank", "noopener");
    });
  }

  /* ---------- Gallery lightbox ------------------------------------------- */
  function gallery() {
    var box = $("#lightbox");
    if (!box) return;
    $$("[data-full]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        $("img", box).src = a.getAttribute("data-full");
        $("img", box).alt = a.getAttribute("data-caption") || "";
        box.classList.add("is-open");
        document.body.style.overflow = "hidden";
        $(".modal__close", box).focus();
      });
    });
    function shut() { box.classList.remove("is-open"); document.body.style.overflow = ""; }
    $(".modal__close", box).addEventListener("click", shut);
    box.addEventListener("click", function (e) { if (e.target === box) shut(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("is-open")) shut();
    });
  }

  /* ---------- Start ------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    wireLinks();
    menu();
    hero();
    renderBuilds();
    modal();
    renderReviews();
    renderFaqs();
    form();
    gallery();
  });
})();
