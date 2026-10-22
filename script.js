/* ============================================================
   Junel T. Abelgas - Student Portfolio
   Interactions: typewriter, theme, mobile menu, scroll reveals,
   active nav, back-to-top, copy email. No dependencies.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeToggle");
  var stored = null;

  try {
    stored = localStorage.getItem("portfolio-theme");
  } catch (e) { /* storage unavailable */ }

  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("portfolio-theme", next);
      } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Typewriter (role line) ---------- */
  var typedEl = document.getElementById("typed");
  var phrases = [
    "4th Year Student",
    "Web Development Learner",
    "Computer Networking | Cisco",
    "Office Productivity | Excel"
  ];

  function typeLoop(el, phrases) {
    var p = 0, c = 0, deleting = false;

    function tick() {
      var phrase = phrases[p];
      el.textContent = deleting ? phrase.slice(0, c--) : phrase.slice(0, c++);

      var delay = deleting ? 34 : 72;

      if (!deleting && c > phrase.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && c < 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
        delay = 350;
      }

      setTimeout(tick, delay);
    }

    tick();
  }

  if (typedEl) typeLoop(typedEl, phrases);

  /* ---------- Typewriter starts when hero is seen ---------- */
  /* (it runs immediately; harmless) */

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menuBtn");

  function setMenu(open) {
    if (!nav || !menuBtn) return;
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var isOpen = nav.classList.contains("open");
      setMenu(!isOpen);
    });
  }

  document.querySelectorAll(".menu-link").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) setMenu(false);
  });

  /* ---------- Scroll reveals + skill bars ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

    /* Stagger siblings inside the same parent */
    var groups = new Map();
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      var index = (groups.get(parent) || 0);
      groups.set(parent, index + 1);
      el.style.setProperty("--d", Math.min(index * 0.09, 0.45) + "s");
    });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Active nav link + back-to-top ---------- */
  var heroArt = document.getElementById("home");
  var sections = document.querySelectorAll("main section");
  var navLinks = document.querySelectorAll(".menu-link");
  var toTop = document.getElementById("toTop");

  var sectionIO = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var isMatch = link.getAttribute("href") === "#" + id;
            link.classList.toggle("active", isMatch);
          });
        });
      }, { rootMargin: "-38% 0px -55% 0px" })
    : null;

  if (sectionIO) {
    sections.forEach(function (s) { sectionIO.observe(s); });
  }

  function onScroll() {
    var y = window.scrollY;
    if (toTop) toTop.classList.toggle("show", y > 620);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById("copyEmail");
  var copyStatus = document.getElementById("copyStatus");
  var statusTimer = null;

  if (copyBtn && copyStatus) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "junelabelgas6@gmail.com";

      function flash(msg) {
        copyStatus.textContent = msg;
        copyStatus.classList.add("show");
        if (statusTimer) clearTimeout(statusTimer);
        statusTimer = setTimeout(function () {
          copyStatus.classList.remove("show");
        }, 2200);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(function () { flash("Email copied to clipboard"); })
          .catch(function () { flash(email); });
      } else {
        flash(email);
      }
    });
  }
})();
