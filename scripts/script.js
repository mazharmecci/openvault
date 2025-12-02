// 🔄 Filter Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const activeBtn = document.querySelector(".filter-btn.active");
    if (activeBtn) activeBtn.classList.remove("active");
    btn.classList.add("active");

    const filter = btn.dataset.filter || "all";

    courseCards.forEach(card => {
      const category = card.dataset.category || "other";
      card.style.display = (filter === "all" || category === filter) ? "block" : "none";
    });
  });
});

// 📈 Progress Tracking
courseCards.forEach(card => {
  const titleElement = card.querySelector("h3");
  if (!titleElement) return;

  const title = titleElement.textContent.trim().toLowerCase();
  const key = `viewed-${title}`;

  const badge = document.createElement("div");
  badge.className = "progress-badge";

  const isViewed = localStorage.getItem(key);
  badge.textContent = isViewed ? "✅ Viewed" : "🔓 Not Viewed";
  card.appendChild(badge);

  card.addEventListener("click", () => {
    localStorage.setItem(key, "true");
    badge.textContent = "✅ Viewed";
    badge.classList.add("unlocked");
  });
});
