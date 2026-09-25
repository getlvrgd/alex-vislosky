(function () {
  var doc = document.documentElement;
  doc.classList.add("js");
  var cfg = window.INNER_CIRCLE || {};

  /* ---------- placeholders ---------- */
  document.querySelectorAll("[data-ph]").forEach(function (el) {
    var val = (cfg[el.getAttribute("data-ph")] || "").trim();
    if (!val) return;
    el.textContent = val;
    el.classList.add("filled");
  });
  if ((cfg.SEAT_COUNT || "").trim()) {
    document.querySelectorAll("[data-seat-wrap]").forEach(function (el) { el.hidden = false; });
  }
  if ((cfg.PROGRAM_NAME || "").trim()) {
    document.title = cfg.PROGRAM_NAME + " | Alex Vislosky BRRRR Mentorship and Consulting";
  }

  /* ---------- apply links ---------- */
  var url = (cfg.APPLICATION_URL || "").trim();
  document.querySelectorAll("[data-apply]").forEach(function (a) {
    if (url) {
      a.href = url;
      if (/^https?:/i.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    } else {
      a.href = "#offer";
    }
  });

  /* ---------- hero VSL: swap poster for the player on click ---------- */
  function embedUrl(u) {
    var m;
    if ((m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/))) return "https://www.youtube.com/embed/" + m[1] + "?autoplay=1&rel=0&modestbranding=1";
    if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return "https://player.vimeo.com/video/" + m[1] + "?autoplay=1";
    if ((m = u.match(/wistia\.(?:com|net)\/(?:medias|embed\/iframe)\/(\w+)/))) return "https://fast.wistia.net/embed/iframe/" + m[1] + "?autoPlay=true";
    return u;
  }
  var vslUrl = (cfg.VSL_URL || "").trim();
  var vsl = document.querySelector("[data-vsl]");
  if (vsl && vslUrl) {
    vsl.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = embedUrl(vslUrl);
      f.title = "Inner Circle with Alex: watch this first";
      f.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      f.allowFullscreen = true;
      vsl.replaceWith(Object.assign(document.createElement("div"), { className: "vsl-player" }));
      document.querySelector(".vsl-frame .vsl-player").appendChild(f);
    }, { once: true });
  } else if (vsl && url) {
    // no video yet: the play button books a call, same as the Apply buttons
    vsl.addEventListener("click", function () {
      if (/^https?:/i.test(url)) window.open(url, "_blank", "noopener");
      else window.location.href = url;
    });
    vsl.setAttribute("aria-label", "Book a call");
  } else if (vsl) {
    vsl.disabled = true;
    vsl.style.cursor = "default";
  }

  /* ---------- top bar border + sticky CTA ---------- */
  var topbar = document.querySelector(".topbar");
  var sticky = document.getElementById("sticky");
  var hero = document.querySelector(".hero");
  var offer = document.getElementById("offer");
  var finalSec = document.querySelector(".final");
  function onScroll() {
    var y = window.scrollY;
    topbar.classList.toggle("scrolled", y > 8);
    var pastHero = hero.getBoundingClientRect().bottom < 0;
    var vh = window.innerHeight;
    function inView(el) { var r = el.getBoundingClientRect(); return r.top < vh && r.bottom > 0; }
    var hide = inView(finalSec) || inView(offer.querySelector(".offer-foot"));
    var show = pastHero && !hide;
    sticky.classList.toggle("show", show);
    sticky.setAttribute("aria-hidden", show ? "false" : "true");
    sticky.querySelector("a").tabIndex = show ? 0 : -1;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        // small stagger for siblings in the same grid
        var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains("rv"); });
        var i = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- FAQ: one open at a time ---------- */
  var faqs = document.querySelectorAll(".faq details");
  faqs.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open) return;
      faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- 75% check ---------- */
  var ids = ["c-buy", "c-rehab", "c-hold", "c-arv"];
  var inputs = ids.map(function (id) { return document.getElementById(id); });
  var fmt = function (n) { return "$" + Math.round(Math.abs(n)).toLocaleString("en-US"); };
  var num = function (el) { return parseFloat(String(el.value).replace(/[^0-9.]/g, "")) || 0; };
  var out = {
    allin: document.getElementById("o-allin"),
    s75: document.getElementById("o-75"),
    left: document.getElementById("o-left"),
    leftLabel: document.getElementById("o-leftlabel"),
    bar: document.getElementById("o-bar"),
    verdict: document.getElementById("o-verdict")
  };
  function calc() {
    var buy = num(inputs[0]), rehab = num(inputs[1]), hold = num(inputs[2]), arv = num(inputs[3]);
    var allin = buy + rehab + hold;
    var loan = arv * 0.75;
    var diff = loan - allin;
    out.allin.textContent = fmt(allin);
    out.s75.textContent = fmt(loan);
    if (diff >= 0) {
      out.leftLabel.textContent = "Cash back out at 75% refi";
      out.left.textContent = "+" + fmt(diff);
    } else {
      out.leftLabel.textContent = "Cash left in the deal";
      out.left.textContent = "−" + fmt(diff);
    }
    var pct = arv > 0 ? allin / arv : 1;
    out.bar.style.width = Math.min(100, pct * 100) + "%";
    var v = out.verdict;
    v.classList.remove("close", "no");
    if (!arv || !allin) {
      v.textContent = "Put in your numbers.";
    } else if (pct <= 0.75) {
      v.textContent = "Deal. At these numbers.";
      out.bar.style.background = "";
    } else if (pct <= 0.8) {
      v.textContent = "Close. Needs a harder look.";
      v.classList.add("close");
      out.bar.style.background = "#D9A21B";
    } else {
      v.textContent = "No deal at these numbers.";
      v.classList.add("no");
      out.bar.style.background = "#C44C14";
    }
  }
  inputs.forEach(function (el) {
    el.addEventListener("input", calc);
    el.addEventListener("blur", function () {
      var n = num(el);
      el.value = n ? Math.round(n).toLocaleString("en-US") : "";
    });
  });
  calc();
})();
