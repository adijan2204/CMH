/* ==========================================================================
   CAREER MASTERY HUB - INTERACTIVITY & NAVIGATION SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Menu Toggle
  var siteNav = document.querySelector(".site-nav");
  var menuToggle = document.querySelector(".menu-toggle");
  var navLinks = document.querySelectorAll(".nav-links a");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = siteNav.getAttribute("data-open") === "true";
      siteNav.setAttribute("data-open", (!isOpen).toString());
      menuToggle.setAttribute("aria-expanded", (!isOpen).toString());
    });

    // Close menu when clicking nav link
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.setAttribute("data-open", "false");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Sticky Navbar Scroll Effect
  window.addEventListener("scroll", function () {
    if (siteNav) {
      if (window.scrollY > 40) {
        siteNav.classList.add("scrolled");
      } else {
        siteNav.classList.remove("scrolled");
      }
    }
  });

  // 3. Active Nav Link on Scroll
  var sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    var scrollY = window.pageYOffset;
    sections.forEach(function (current) {
      var sectionHeight = current.offsetHeight;
      var sectionTop = current.offsetTop - 100;
      var sectionId = current.getAttribute("id");
      var navItem = document.querySelector('.nav-links a[href*="#' + sectionId + '"]');

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          navItem.classList.add("active");
        }
      }
    });
  });

  // 4. Consultation Form Handler
  var form = document.getElementById("consultationForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var statusDiv = form.querySelector(".form-status");
      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      if (!data.full_name || !data.phone || !data.email) {
        if (statusDiv) {
          statusDiv.className = "form-status error";
          statusDiv.textContent = "Please fill in all required contact fields.";
        }
        return;
      }

      // Show success feedback
      if (statusDiv) {
        statusDiv.className = "form-status success";
        statusDiv.innerHTML = "<strong>Thank you, " + data.full_name + "!</strong><br>Your consultation request has been received. Our team will contact you shortly.";
      }

      // If preferred contact is WhatsApp, option to open WhatsApp directly
      if (data.preferred_contact === "WhatsApp" && window.CMHFormsConfig) {
        setTimeout(function() {
          var waUrl = window.CMHFormsConfig.formatWhatsAppUrl(data);
          window.open(waUrl, "_blank");
        }, 1200);
      }

      form.reset();
    });
  }

  // 5. Cookie Consent Banner
  var cookieBanner = document.getElementById("cookieBanner");
  var acceptBtn = document.getElementById("acceptCookiesBtn");
  var dismissBtn = document.getElementById("dismissCookiesBtn");

  if (cookieBanner) {
    if (localStorage.getItem("cmh_cookie_ok") === "1") {
      cookieBanner.classList.add("hidden");
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        localStorage.setItem("cmh_cookie_ok", "1");
        cookieBanner.classList.add("hidden");
      });
    }

    if (dismissBtn) {
      dismissBtn.addEventListener("click", function () {
        cookieBanner.classList.add("hidden");
      });
    }
  }
});
