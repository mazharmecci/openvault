document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;

  fetch("/navbar.html")
    .then(res => res.text())
    .then(html => {
      placeholder.innerHTML = html;

      // Attach toggle logic after injection
      const toggle = document.getElementById("nav-toggle");
      const links = document.getElementById("nav-links");

      if (toggle && links) {
        toggle.addEventListener("click", () => {
          links.classList.toggle("active");
        });
      }
    })
    .catch(err => console.error("❌ Failed to load navbar:", err));
});
