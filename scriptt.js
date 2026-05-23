/* ===========================================
   scriptt.js — Portfolio JavaScript
   ===========================================
   Handles:
   1. Typing animation in the hero
   2. Scroll-based fade-in animations
   3. Navbar scroll effect & active link tracking
   4. Mobile nav toggle
   5. Theme toggle (dark/light)
   6. Project filter buttons
   7. Skill bar animation
   8. Stat counter animation
   9. Floating particles in hero
   10. Back-to-top button
   11. Contact form (EmailJS)
*/

document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // 1. TYPING ANIMATION
  // =====================
  // Cycles through an array of roles, typing and deleting
  // each one to create a typewriter effect.
  const roles = [
    "Engineering Student",
    "Python Developer",
    "C++ Programmer",
    "Web Developer",
    "Tech Enthusiast"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.getElementById("typing");

  function typeEffect() {
    const currentRole = roles[roleIndex];

    // Add or remove one character
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingEl.textContent = currentRole.slice(0, charIndex);

    // Decide typing speed
    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      // Finished typing — pause, then start deleting
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();


  // =====================
  // 2. FADE-IN ON SCROLL
  // =====================
  // Uses IntersectionObserver to watch elements with class 'fade-in'.
  // When they enter the viewport, the class 'visible' is added,
  // triggering the CSS transition (opacity + translateY).
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach((el) => fadeObserver.observe(el));


  // =====================
  // 3. NAVBAR SCROLL EFFECT & ACTIVE LINK
  // =====================
  // Adds a 'scrolled' class to the navbar when the page is scrolled,
  // giving it a solid background.
  // Also highlights the nav link for the section currently in view.
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id], header[id]");

  window.addEventListener("scroll", () => {
    // Navbar background
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active section tracking
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Back to top button visibility
    const backToTop = document.getElementById("back-to-top");
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });


  // =====================
  // 4. MOBILE NAV TOGGLE
  // =====================
  // Opens/closes the mobile side menu when the hamburger is clicked.
  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("open");
    // Switch icon between bars and X
    const icon = navToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("open");
      const icon = navToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });


  // =====================
  // 5. THEME TOGGLE
  // =====================
  // Switches between dark and light themes.
  // Saves the user's preference in localStorage so it persists.
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const icon = themeToggle.querySelector("i");
    const isLight = document.body.classList.contains("light");
    icon.classList.replace(isLight ? "fa-moon" : "fa-sun", isLight ? "fa-sun" : "fa-moon");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });


  // =====================
  // 6. PROJECT FILTER
  // =====================
  // Filters project cards by category (all, web, python, cpp)
  // based on the data-filter attribute on buttons and
  // data-category attribute on project cards.
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.classList.remove("hidden");
          card.style.animation = "fadeInUp 0.4s ease forwards";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });


  // =====================
  // 7. SKILL BAR ANIMATION
  // =====================
  // Animates the skill progress bars from 0% to their target width
  // when the skills section scrolls into view.
  const skillFills = document.querySelectorAll(".skill-fill");

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".skill-fill");
        fills.forEach((fill) => {
          const width = fill.getAttribute("data-width");
          fill.style.width = width + "%";
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.querySelector(".skills");
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }


  // =====================
  // 8. STAT COUNTER ANIMATION
  // =====================
  // Counts up numbers in the About section (e.g. "0" → "10+")
  // when they scroll into view.
  const statNumbers = document.querySelectorAll(".stat-number");

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll(".stat-number");
        nums.forEach((num) => {
          const target = parseInt(num.getAttribute("data-target"));
          let current = 0;
          const step = Math.ceil(target / 40);
          const counter = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(counter);
            }
            num.textContent = current;
          }, 40);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const aboutSection = document.querySelector(".about");
  if (aboutSection) {
    statObserver.observe(aboutSection);
  }


  // =====================
  // 9. HERO PARTICLES
  // =====================
  // Creates small floating dots in the hero background
  // for a subtle, dynamic feel.
  const particlesContainer = document.getElementById("particles");

  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = 6 + Math.random() * 6 + "s";
      particlesContainer.appendChild(particle);
    }
  }


  // =====================
  // 10. BACK TO TOP
  // =====================
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  // =====================
  // 11. CONTACT FORM
  // =====================
  // Uses EmailJS to send emails directly from the browser.
  // Replace the placeholder IDs below with your real EmailJS credentials.
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formMessage = document.getElementById("form-message");

      // Check if EmailJS is loaded
      if (typeof emailjs !== "undefined") {
        emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", contactForm)
          .then(() => {
            formMessage.textContent = "Message sent successfully! ✅";
            formMessage.style.color = "limegreen";
            contactForm.reset();
          })
          .catch(() => {
            formMessage.textContent = "Oops! Something went wrong.";
            formMessage.style.color = "crimson";
          });
      } else {
        // EmailJS not configured — show friendly message
        formMessage.textContent = "Form submitted! (EmailJS not configured yet)";
        formMessage.style.color = "var(--accent)";
        contactForm.reset();
      }
    });
  }

});

/* CSS keyframes for filter animation (injected via JS) */
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
