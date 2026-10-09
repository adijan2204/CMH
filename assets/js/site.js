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
        statusDiv.innerHTML = "<strong>Thank you, " + data.full_name + "!</strong><br>Opening WhatsApp to send your inquiry to +91 9112222504...";
      }

      // Route inquiry to WhatsApp +91 9112222504
      if (window.CMHFormsConfig) {
        setTimeout(function() {
          var waUrl = window.CMHFormsConfig.formatWhatsAppUrl(data);
          window.open(waUrl, "_blank");
        }, 600);
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

  // 6. Pathway Cards Interactive Detail Modal
  var pathCards = document.querySelectorAll(".path-card[data-pathway-num]");
  var modal = document.getElementById("pathwayModal");
  var closeBtn = document.getElementById("closePathwayModalBtn");
  var cancelBtn = document.getElementById("modalCancelBtn");
  var modalNum = document.getElementById("modalNum");
  var modalTitle = document.getElementById("modalTitle");
  var modalSubtitle = document.getElementById("modalSubtitle");
  var modalDescription = document.getElementById("modalDescription");
  var modalFeatures = document.getElementById("modalFeatures");
  var modalCtaBtn = document.getElementById("modalCtaBtn");

  function openPathwayModal(card) {
    if (!modal) return;
    var num = card.getAttribute("data-pathway-num") || "01";
    var title = card.getAttribute("data-pathway-title") || "";
    var sub = card.getAttribute("data-pathway-sub") || "";
    var desc = card.getAttribute("data-pathway-desc") || "";
    var featuresStr = card.getAttribute("data-pathway-features") || "";
    var cta = card.getAttribute("data-pathway-cta") || "#home-inquiry";

    if (modalNum) modalNum.textContent = num;
    if (modalTitle) modalTitle.textContent = title;
    if (modalSubtitle) modalSubtitle.textContent = sub;
    if (modalDescription) modalDescription.textContent = desc;
    if (modalCtaBtn) {
      modalCtaBtn.setAttribute("href", cta);
      modalCtaBtn.addEventListener("click", function() {
        closePathwayModal();
      }, { once: true });
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = "";
      if (featuresStr) {
        var items = featuresStr.split("|");
        items.forEach(function(item) {
          var li = document.createElement("li");
          li.className = "flex items-start gap-2.5";
          li.innerHTML = '<span class="text-brand font-bold shrink-0 mt-0.5">✓</span><span>' + item.trim() + '</span>';
          modalFeatures.appendChild(li);
        });
      }
    }

    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closePathwayModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  if (pathCards.length && modal) {
    pathCards.forEach(function(card) {
      card.addEventListener("click", function(e) {
        openPathwayModal(card);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closePathwayModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closePathwayModal);

    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        closePathwayModal();
      }
    });

    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closePathwayModal();
      }
    });
  }

  // 7. Number Counter Scroll Animation
  var counterElements = document.querySelectorAll(".counter-number");

  if (counterElements.length > 0) {
    var animateCounter = function (el) {
      var targetStr = el.getAttribute("data-target");
      var suffix = el.getAttribute("data-suffix") || "";
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);

      var target = parseFloat(targetStr);
      var duration = 2000; // 2 seconds animation
      var startTime = null;

      var step = function (timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        // Ease-out quad formula for smooth decelerating counting animation
        var easeProgress = 1 - (1 - progress) * (1 - progress);
        var currentValue = easeProgress * target;

        if (decimals > 0) {
          el.textContent = currentValue.toFixed(decimals) + suffix;
        } else {
          el.textContent = Math.floor(currentValue) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Snap exact target value on completion
          if (decimals > 0) {
            el.textContent = target.toFixed(decimals) + suffix;
          } else {
            el.textContent = Math.round(target) + suffix;
          }
        }
      };

      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      var counterObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              obs.unobserve(entry.target); // Trigger only once when entering view
            }
          });
        },
        { threshold: 0.2 }
      );

      counterElements.forEach(function (el) {
        counterObserver.observe(el);
      });
    } else {
      // Fallback for older browsers
      counterElements.forEach(function (el) {
        animateCounter(el);
      });
    }
  }
});
