/* =========================================================
   CHANDAN CYCLE STORE — script.js
   Vanilla JS only. No dependencies.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Back to top (declared early: referenced by onScroll below) ---------- */
  var backToTop = document.getElementById("back-to-top");
  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 700) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  }
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Navbar scroll state ---------- */
  var navbar = document.getElementById("navbar");
  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
    toggleBackToTop();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobile-menu");

  function openMenu() {
    mobileMenu.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });
  document.querySelectorAll("[data-mobile]").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Smooth scroll w/ sticky-header offset ---------- */
  var headerOffset = 90;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: top, behavior: "smooth" });
      history.pushState(null, "", id);
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Animated stat counters ---------- */
  var statEls = document.querySelectorAll(".stat[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var valueEl = el.querySelector(".stat__value");
    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      valueEl.textContent = Math.round(eased * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        valueEl.textContent = target;
      }
    }
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && statEls.length) {
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statEls.forEach(function (el) { statObserver.observe(el); });
  }

  /* ---------- Active nav-section indicator ---------- */
  var sections = ["home", "bikes", "services", "about", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = document.querySelectorAll(".nav-link[data-nav]");

  function setActiveLink() {
    var scrollPos = window.scrollY + headerOffset + 10;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-active", match);
    });
  }
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Contact form ---------- */
  var form = document.getElementById("enquiry-form");
  var statusEl = document.getElementById("form-status");
  var STORE_PHONE = "917782864311";
  var STORE_EMAIL = "info@chandancyclestore.store";

  function setError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var wrap = field.closest(".field");
    var errorEl = document.getElementById("err-" + fieldId.replace("f-", ""));
    if (message) {
      wrap.classList.add("has-error");
      errorEl.textContent = message;
    } else {
      wrap.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  function validate(data) {
    var valid = true;

    if (!data.name.trim()) {
      setError("f-name", "Please enter your name.");
      valid = false;
    } else {
      setError("f-name", "");
    }

    var phoneDigits = data.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setError("f-phone", "Enter a valid phone number.");
      valid = false;
    } else {
      setError("f-phone", "");
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("f-email", "Enter a valid email address, or leave it blank.");
      valid = false;
    } else {
      setError("f-email", "");
    }

    if (!data.message.trim()) {
      setError("f-message", "Tell us a little about what you need.");
      valid = false;
    } else {
      setError("f-message", "");
    }

    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      message: form.message.value,
      channel: form.channel.value
    };

    if (!validate(data)) {
      statusEl.textContent = "Please fix the highlighted fields and try again.";
      statusEl.className = "form-status is-error";
      return;
    }

    var summary =
      "Enquiry from Chandan Cycle Store website%0A" +
      "Name: " + encodeURIComponent(data.name) + "%0A" +
      "Phone: " + encodeURIComponent(data.phone) + "%0A" +
      (data.email ? "Email: " + encodeURIComponent(data.email) + "%0A" : "") +
      "Message: " + encodeURIComponent(data.message);

    if (data.channel === "email") {
      var subject = encodeURIComponent("Enquiry from website — " + data.name);
      window.location.href =
        "mailto:" + STORE_EMAIL + "?subject=" + subject + "&body=" + summary;
    } else {
      window.open("https://wa.me/" + STORE_PHONE + "?text=" + summary, "_blank", "noopener");
    }

    statusEl.textContent = "Thanks! Your enquiry is ready to send.";
    statusEl.className = "form-status is-success";
    form.reset();
  });

})();
