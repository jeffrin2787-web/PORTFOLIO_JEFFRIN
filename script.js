const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector(".theme-toggle");
const typingText = document.getElementById("typing-text");
const cursorGlow = document.querySelector(".cursor-glow");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navItems.forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const savedTheme = localStorage.getItem("jeffrin-theme");
if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark");
  const dark = body.classList.contains("dark");
  localStorage.setItem("jeffrin-theme", dark ? "dark" : "light");
  themeToggle.textContent = dark ? "☀" : "☾";
});

const phrases = ["web experiences", "full-stack projects", "secure solutions", "useful ideas"];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  typingText.textContent = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let delay = deleting ? 55 : 90;
  if (!deleting && charIndex > current.length) {
    deleting = true;
    delay = 1200;
  } else if (deleting && charIndex < 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    delay = 350;
  }
  setTimeout(typeLoop, delay);
}
typeLoop();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = document.querySelectorAll("main section[id], header[id]");
const updateActiveNav = () => {
  let current = "home";
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 140) current = section.id;
  });
  navItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
  });
};
window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

window.addEventListener("mousemove", e => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

contactForm?.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const bodyText = encodeURIComponent(`Hi Jeffrin,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:jeffrin2787@gmail.com?subject=${subject}&body=${bodyText}`;
  formNote.textContent = "Your email app should open now.";
});

document.getElementById("year").textContent = new Date().getFullYear();
