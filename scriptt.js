const text = ["Frontend Developer", "UI/UX Designer", "Tech Enthusiast"];
let count = 0, index = 0;
let currentText = '', isDeleting = false;

function type() {
  const typingEl = document.getElementById("typing");
  currentText = text[count];

  if (isDeleting) {
    index--;
  } else {
    index++;
  }

  typingEl.textContent = currentText.slice(0, index);

  let typingSpeed = isDeleting ? 80 : 120;

  if (!isDeleting && index === currentText.length) {
    // Pause at the end before deleting
    isDeleting = true;
    typingSpeed = 1500; // Wait 1.5s
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    count = (count + 1) % text.length;
    typingSpeed = 500; // Wait before starting next word
  }

  setTimeout(type, typingSpeed);
}

// Start typing after page load

document.addEventListener("DOMContentLoaded", () => {
  type();

  const fadeElements = document.querySelectorAll(".fade-in, .skill-tags span");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));
});



// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("light");
  const btn = document.querySelector('.toggle-theme');
  btn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
}
// EmailJS integration
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual Public Key
})();

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const formMessage = document.getElementById('form-message');

  emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
    .then(() => {
      formMessage.textContent = "Message sent successfully! ✅";
      formMessage.style.color = "limegreen";
      this.reset();
    }, (error) => {
      formMessage.textContent = "Oops! Something went wrong.";
      formMessage.style.color = "crimson";
    });
});


