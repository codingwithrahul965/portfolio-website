/* ===========================================
   scriptt.js — Portfolio JavaScript (Premium)
   ===========================================
   Handles:
   1.  Typing animation in the hero
   2.  Scroll-based fade-in animations
   3.  Navbar scroll effect & active link tracking
   4.  Mobile nav toggle
   5.  Theme toggle (dark/light)
   6.  Project filter buttons
   7.  Skill bar animation
   8.  Stat counter animation
   9.  Floating particles in hero
   10. Back-to-top button
   11. Contact form (EmailJS)
   12. Cursor-following glow spotlight
   13. Card tilt/hover 3D effect
   14. Smooth section reveal animations
*/

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // =====================
  // 1. TYPING ANIMATION
  // =====================
  const roles = [
    "Engineering Student",
    "Web Developer",
    "Python Builder",
    "C++ Learner",
    "Problem Solver"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.getElementById("typing");

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingEl.textContent = currentRole.slice(0, charIndex);

    let speed = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  if (typingEl) {
    if (prefersReducedMotion) {
      typingEl.textContent = roles[0];
    } else {
      typeEffect();
    }
  }


  // =====================
  // 2. FADE-IN ON SCROLL
  // =====================
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
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id], header[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

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
  const navToggle = document.getElementById("nav-toggle");
  const navLinksContainer = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", navLinksContainer.classList.contains("open"));
    const icon = navToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      const icon = navToggle.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });


  // =====================
  // 5. THEME TOGGLE
  // =====================
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
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectGrid = document.getElementById("project-marquee");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      const projectCards = projectGrid ? projectGrid.querySelectorAll(".project-card") : [];

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // =====================
  // 6B. PROJECT CASE STUDIES
  // =====================
  const caseStudies = {
    portfolio: {
      type: "Featured Case Study",
      title: "Portfolio Website",
      problem: "Goal: create a personal portfolio that communicates skills, work, and contact paths with plain HTML, CSS, and JavaScript.",
      points: [
        "Built a responsive hero, project grid, dark/light theme, animated counters, and contact form fallback.",
        "Improved recruiter signal by replacing generic project cards with problem/build summaries.",
        "Added accessibility improvements like aria-expanded, reduced-motion handling, and keyboard-friendly dialog controls."
      ],
      next: "Next improvement: add a resume PDF, real deployed project links, and performance screenshots."
    },
    todo: {
      type: "Productivity UI",
      title: "ToDo App",
      problem: "Goal: make task capture and progress tracking simple enough to use every day.",
      points: [
        "Designed task creation, completion, filtering, and local storage persistence.",
        "Practiced state management, reusable UI components, and empty/error states.",
        "Focused on clarity over decoration so the app remains usable on mobile."
      ],
      next: "Next improvement: deploy the app and link the exact repository/demo here."
    },
    automation: {
      type: "Automation Utility",
      title: "Python Automation Tool",
      problem: "Goal: reduce repetitive cleanup and reporting work with scripts that can be reused.",
      points: [
        "Organized files by rules, collected data with scraping libraries, and produced repeatable reports.",
        "Practiced working with paths, modules, error handling, and command-line style workflows.",
        "Learned how to turn a small personal pain point into a useful tool."
      ],
      next: "Next improvement: add a README with before/after examples and sample terminal output."
    },
    weather: {
      type: "API Project",
      title: "Weather Dashboard",
      problem: "Goal: fetch live weather data and display it in a clean, searchable interface.",
      points: [
        "Used async JavaScript to request API data and update the UI.",
        "Handled city search, loading feedback, and invalid-input states.",
        "Practiced building API-driven UI with responsive cards."
      ],
      next: "Next improvement: add screenshots, a live deployment, and API error examples."
    },
    dsa: {
      type: "C++ Fundamentals",
      title: "DSA Problem Tracker",
      problem: "Goal: track DSA practice by topic, difficulty, revision status, and solved history.",
      points: [
        "Modeled problems with OOP and persisted data with file I/O.",
        "Added progress summaries to make revision easier.",
        "Strengthened fundamentals around data structures, files, and program organization."
      ],
      next: "Next improvement: publish the source repo and include a sample input/output screenshot."
    }
  };

  const caseDialog = document.getElementById("case-study-dialog");
  const caseClose = document.getElementById("case-study-close");
  const caseType = document.getElementById("case-study-type");
  const caseTitle = document.getElementById("case-study-title");
  const caseProblem = document.getElementById("case-study-problem");
  const casePoints = document.getElementById("case-study-points");
  const caseNext = document.getElementById("case-study-next");

  function openCaseStudy(key) {
    const study = caseStudies[key];
    if (!study || !caseDialog) return;

    caseType.textContent = study.type;
    caseTitle.textContent = study.title;
    caseProblem.textContent = study.problem;
    casePoints.innerHTML = study.points.map((point) => `<li>${point}</li>`).join("");
    caseNext.textContent = study.next;

    if (typeof caseDialog.showModal === "function") {
      caseDialog.showModal();
    } else {
      caseDialog.setAttribute("open", "");
    }
  }

  document.querySelectorAll("[data-case]").forEach((button) => {
    button.addEventListener("click", () => openCaseStudy(button.getAttribute("data-case")));
  });

  if (caseClose && caseDialog) {
    caseClose.addEventListener("click", () => caseDialog.close());
    caseDialog.addEventListener("click", (event) => {
      if (event.target === caseDialog) {
        caseDialog.close();
      }
    });
  }


  // =====================
  // 7. SKILL BAR ANIMATION
  // =====================
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".skill-fill");
        fills.forEach((fill, index) => {
          const width = fill.getAttribute("data-width");
          setTimeout(() => {
            fill.style.width = width + "%";
          }, index * 100); // Stagger animation
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
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll(".stat-number");
        nums.forEach((num) => {
          const target = parseInt(num.getAttribute("data-target"));
          let current = 0;
          const step = Math.ceil(target / 50);
          const counter = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(counter);
            }
            num.textContent = current;
          }, 30);
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
  // 9. HERO PARTICLES (Enhanced)
  // =====================
  const particlesContainer = document.getElementById("particles");

  if (particlesContainer && !prefersReducedMotion) {
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = 5 + Math.random() * 7 + "s";
      
      // Vary particle sizes
      const size = 2 + Math.random() * 3;
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      
      // Vary particle colors between accent and secondary
      if (Math.random() > 0.7) {
        particle.style.background = "#7c4dff";
        particle.style.boxShadow = "0 0 6px rgba(124, 77, 255, 0.4)";
      } else if (Math.random() > 0.5) {
        particle.style.background = "#e040fb";
        particle.style.boxShadow = "0 0 6px rgba(224, 64, 251, 0.3)";
      }
      
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
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formMessage = document.getElementById("form-message");

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
        formMessage.textContent = "Form submitted! (EmailJS not configured yet)";
        formMessage.style.color = "var(--accent)";
        contactForm.reset();
      }
    });
  }


  // =====================
  // 12. CURSOR-FOLLOWING GLOW SPOTLIGHT
  // =====================
  const cursorGlow = document.getElementById("cursor-glow");
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  if (cursorGlow && !prefersReducedMotion) {
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth lerp animation for the glow
    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + "px";
      cursorGlow.style.top = glowY + "px";
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Hide glow when mouse leaves the window
    document.addEventListener("mouseleave", () => {
      cursorGlow.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      cursorGlow.style.opacity = "1";
    });
  }


  // =====================
  // 13. CARD TILT / 3D HOVER EFFECT
  // =====================
  const tiltCards = document.querySelectorAll(".glass-card");

  if (!prefersReducedMotion) tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    });
  });


  // =====================
  // 14. MAGNETIC BUTTON EFFECT
  // =====================
  const magneticBtns = document.querySelectorAll(".btn-primary, .btn-outline");

  if (!prefersReducedMotion) magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });


  // =====================
  // 15. SMOOTH REVEAL FOR TIMELINE ITEMS
  // =====================
  const timelineItems = document.querySelectorAll(".timeline-item");
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";
    item.style.transition = `all 0.6s ease ${index * 0.15}s`;
    timelineObserver.observe(item);
  });

});

/* CSS keyframes for filter animation */
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ===== CONTACT FORM TO MONGODB =====

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("input-name").value;
    const email = document.getElementById("input-email").value;
    const subject = document.getElementById("input-subject").value;
    const message = document.getElementById("input-message").value;

    formMessage.textContent = "Sending...";

    try {

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                message
            })
        });

        const data = await response.json();

        if (data.success) {

            formMessage.textContent = "✅ Message sent successfully!";
            formMessage.style.color = "lightgreen";

            contactForm.reset();

        } else {

            formMessage.textContent = "❌ Failed to send message";
            formMessage.style.color = "red";

        }

    } catch (error) {

        console.error(error);

        formMessage.textContent = "❌ Server error";
        formMessage.style.color = "red";

    }

});
