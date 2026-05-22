/* =========================================================
   3.js — Portfolio interactivity
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------------------------------------------------
     1.  NAVBAR — Add "scrolled" class on scroll & highlight
         the active section link.
     --------------------------------------------------------- */
  const navbar     = document.getElementById('navbar');
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;

    // Scrolled style
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // Active section
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav(); // run once on load

  /* ---------------------------------------------------------
     2.  MOBILE MENU — Toggle the hamburger & slide the links.
     --------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close menu when a link is tapped
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ---------------------------------------------------------
     3.  SCROLL REVEAL — Observe elements with .fade-up and
         add .visible when they enter the viewport.
     --------------------------------------------------------- */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // animate only once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------
     4.  CONTACT FORM — Basic client-side validation
         & success feedback (no real backend involved).
     --------------------------------------------------------- */
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple validation
    if (!name || !email || !message) {
      showFeedback('Please fill in all fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate sending
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = 'Sending… <i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
      showFeedback('Message sent successfully! I\'ll get back to you soon. 🎉', 'success');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }, 1400);
  });

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className   = 'form-feedback ' + type;

    // Auto-clear after 5 seconds
    setTimeout(() => {
      feedback.textContent = '';
      feedback.className   = 'form-feedback';
    }, 5000);
  }

  /* ---------------------------------------------------------
     5.  SMOOTH SCROLL for anchor links (polyfill-safe).
     --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
