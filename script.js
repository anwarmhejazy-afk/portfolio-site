document.addEventListener("DOMContentLoaded", function () {
  /* =========================================
     MOBILE MENU TOGGLE
  ========================================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      mobileNav.classList.toggle("show");
    });

    const mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("show");
      });
    });
  }

  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */
  const header = document.querySelector(".site-header");

  function updateHeaderOnScroll() {
    if (!header) return;

    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);

  /* =========================================
     FADE-IN SECTIONS ON SCROLL
  ========================================= */
  const fadeSections = document.querySelectorAll(".fade-in-section");

  if (fadeSections.length > 0) {
    const fadeObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    fadeSections.forEach((section) => {
      fadeObserver.observe(section);
    });
  }

  /* =========================================
     ANIMATED STATS COUNTERS
  ========================================= */
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateCounter(el) {
    const target = Number(el.getAttribute("data-target")) || 0;
    const duration = 1400;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    statNumbers.forEach((stat) => {
      statsObserver.observe(stat);
    });
  }

  /* =========================================
     MOBILE CERTIFICATE DETAILS TOGGLE
  ========================================= */
  const certToggleButtons = document.querySelectorAll(".cert-details-toggle");

  certToggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const panel = this.nextElementSibling;
      if (!panel) return;

      const isOpen = panel.classList.contains("show");

      certToggleButtons.forEach((otherButton) => {
        const otherPanel = otherButton.nextElementSibling;
        if (otherPanel && otherPanel !== panel) {
          otherPanel.classList.remove("show");
          otherButton.classList.remove("active");
          otherButton.textContent = "View Details";
        }
      });

      if (isOpen) {
        panel.classList.remove("show");
        this.classList.remove("active");
        this.textContent = "View Details";
      } else {
        panel.classList.add("show");
        this.classList.add("active");
        this.textContent = "Hide Details";
      }
    });
  });
});

/* =========================================
   CONTACT FORM → WHATSAPP
========================================= */
function sendToWhatsApp(e) {
  e.preventDefault();

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const firstName = firstNameInput ? firstNameInput.value.trim() : "";
  const lastName = lastNameInput ? lastNameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const message = messageInput ? messageInput.value.trim() : "";

  if (!firstName || !lastName || !email || !message) {
    alert("Please complete all required fields before sending.");
    return;
  }

  const button = document.querySelector('.demo-form button[type="submit"]');
  let originalButtonText = "";

  if (button) {
    originalButtonText = button.textContent;
    button.textContent = "Opening WhatsApp...";
    button.disabled = true;
    button.style.opacity = "0.8";
    button.style.cursor = "not-allowed";
  }

  const phone = "971528112120";

  const text =
    `New Inquiry from Portfolio Website:\n\n` +
    `Name: ${firstName} ${lastName}\n` +
    `Email: ${email}\n` +
    `Message: ${message}`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  setTimeout(function () {
    window.open(url, "_blank");

    if (button) {
      button.textContent = originalButtonText;
      button.disabled = false;
      button.style.opacity = "1";
      button.style.cursor = "pointer";
    }
  }, 500);
}