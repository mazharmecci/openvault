document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("navbar-placeholder");
  if (!placeholder) return;

  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      placeholder.innerHTML = html;
    })
    .catch(err => {
      console.error("❌ Failed to load navbar:", err);
    });
});
