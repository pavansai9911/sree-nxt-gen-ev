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

  /* Homepage link worked out from wherever the site is actually hosted,
     so it is correct on GitHub Pages, a subfolder or a custom domain. */
  function homeUrl() {
    return new URL("index.html", document.baseURI).href;
  }

  function shareLink() {
    var message = "Check out " + S.name + " — electric scooters and bikes in Anakapalle: " + homeUrl();
    /* No phone number in the URL, so WhatsApp opens its own contact
       picker and lets the visitor choose who to share the link with. */
    return "https://api.whatsapp.com/send?text=" + encodeURIComponent(message);
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
    $$("[data-link='share']").forEach(function (el) {
      el.href = shareLink();
      el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-fill='phone']").forEach(function (el) { el.textContent = S.phoneDisplay; });
    $$("[data-fill='address']").forEach(function (el) { el.textContent = S.address; });
    $$("[data-fill='hours']").forEach(function (el) { el.textContent = S.hours; });
    $$("[data-fill='year']").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    /* Instagram / email icons only show once a real value is set in
       data.js, so the footer stays clean until the owner has one to add. */
    $$("[data-link='instagram']").forEach(function (el) {
      if (S.instagram) { el.href = S.instagram; el.target = "_blank"; el.rel = "noopener"; el.hidden = false; }
      else { el.hidden = true; }
    });
    $$("[data-link='email']").forEach(function (el) {
      if (S.email) { el.href = "mailto:" + S.email; el.hidden = false; }
      else { el.hidden = true; }
    });
  }

  /* ---------- Structured data --------------------------------------------
     Fills in the "AutoDealer" JSON-LD block (read by search engines, not
     shown on the page) from data.js, so it can never drift out of sync
     with the phone number / address printed on the page itself.
     ------------------------------------------------------------------- */
  function schema() {
    var el = $("#ld-business");
    if (!el) return;
    var ap = S.addressParts || {};
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutoDealer",
      "name": S.name,
      "description": S.businessDescription,
      "image": S.ogImage,
      "telephone": "+" + S.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": ap.street,
        "addressLocality": ap.locality,
        "addressRegion": ap.region,
        "postalCode": ap.postalCode,
        "addressCountry": ap.country
      },
      "hasMap": S.mapsLink,
      "openingHoursSpecification": (S.hoursSpec || []).map(function (h) {
        return { "@type": "OpeningHoursSpecification", "dayOfWeek": h.days, "opens": h.opens, "closes": h.closes };
      })
    }, null, 2);
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
    function play() { if (!still) { stop(); timer = setInterval(function () { go(i + 1); }, 3000); } }
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

  /* ---------- ADD THIS: EV vs petrol savings calculator -----------------
     Admin configuration. These five numbers are the only things to change
     when fuel or power prices move.
     ------------------------------------------------------------------- */
  var PETROL_PRICE = 100;             // rupees per litre
  var PETROL_MILEAGE = 60;            // km per litre
  var POWER_UNIT_PRICE = 5;           // rupees per unit
  var EV_UNITS_PER_FULL_CHARGE = 3;   // units for a full charge
  var EV_RANGE_PER_FULL_CHARGE = 100; // km on a full charge

  function rupees(n) {
    return "\u20B9" + Math.round(n).toLocaleString("en-IN");
  }

  function savingsCalculator() {
    var slider = $("#calcKm");
    if (!slider) return;

    var petrolCostPerKm = PETROL_PRICE / PETROL_MILEAGE;
    var evCostPerKm = (EV_UNITS_PER_FULL_CHARGE * POWER_UNIT_PRICE) / EV_RANGE_PER_FULL_CHARGE;

    var out = $("#calcKmOut");
    var canvas = $("#calcChart");
    var fallback = $("#calcFallback");
    var chart = null;

    // Chart.js is loaded with defer, so it is ready by DOMContentLoaded.
    // If the file could not be reached, fall back to two plain CSS bars.
    if (window.Chart && canvas) {
      chart = new window.Chart(canvas.getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Petrol", "Electric"],
          datasets: [{
            label: "Cost a month",
            data: [0, 0],
            backgroundColor: ["#e23b26", "#8cc63f"],
            borderWidth: 0,
            barPercentage: 0.62,
            categoryPercentage: 0.7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 250 },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#000",
              padding: 10,
              displayColors: false,
              callbacks: {
                label: function (c) { return rupees(c.parsed.y) + " a month"; }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              border: { color: "#dcdedd" },
              ticks: { color: "#0a0a0a", font: { family: "Archivo, Arial, sans-serif", size: 13, weight: "700" } }
            },
            y: {
              beginAtZero: true,
              grid: { color: "#eceeed" },
              border: { display: false },
              ticks: {
                maxTicksLimit: 6,
                color: "#6b7074",
                font: { family: "Archivo, Arial, sans-serif", size: 12 },
                callback: function (v) { return rupees(v); }
              }
            }
          }
        }
      });
    } else if (fallback) {
      if (canvas) canvas.style.display = "none";
      fallback.classList.add("is-on");
      fallback.setAttribute("aria-hidden", "false");
    }

    function update() {
      var dailyKm = parseInt(slider.value, 10);
      var monthlyKm = dailyKm * 30;
      var monthlyPetrolCost = monthlyKm * petrolCostPerKm;
      var monthlyEvCost = monthlyKm * evCostPerKm;
      var monthlySaving = monthlyPetrolCost - monthlyEvCost;
      var yearlySaving = monthlySaving * 12;

      out.innerHTML = dailyKm + " <span>KM / day</span>";

      $("#calcMonthly").textContent = rupees(monthlySaving);
      $("#calcYearly").textContent = rupees(yearlySaving);
      $("#calcMonthlyNote").textContent =
        "Petrol " + rupees(monthlyPetrolCost) + " against electric " + rupees(monthlyEvCost);

      $("#calcKmPetrol").textContent = Math.round(100 / petrolCostPerKm) + " km";
      $("#calcKmEv").textContent = Math.round(100 / evCostPerKm) + " km";

      if (chart) {
        chart.data.datasets[0].data = [monthlyPetrolCost, monthlyEvCost];
        chart.update();
      } else if (fallback) {
        var top = Math.max(monthlyPetrolCost, monthlyEvCost, 1);
        $("#fbPetrol").style.height = (monthlyPetrolCost / top * 100) + "%";
        $("#fbEv").style.height = Math.max(monthlyEvCost / top * 100, 1.5) + "%";
        $("#fbPetrolVal").textContent = rupees(monthlyPetrolCost);
        $("#fbEvVal").textContent = rupees(monthlyEvCost);
      }
    }

    slider.addEventListener("input", update);
    update();
  }

  /* ---------- Start ------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    wireLinks();
    schema();
    menu();
    hero();
    renderBuilds();
    modal();
    renderReviews();
    renderFaqs();
    form();
    gallery();
    savingsCalculator(); // ADD THIS
  });
})();
