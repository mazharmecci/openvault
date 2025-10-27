// 🔄 Filter Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    courseCards.forEach(card => {
      const category = card.dataset.category;
      card.style.display = (filter === "all" || category === filter) ? "block" : "none";
    });
  });
});

// 📈 Progress Tracking
courseCards.forEach(card => {
  const title = card.querySelector("h3").textContent;
  const badge = document.createElement("div");
  badge.className = "progress-badge";

  const isViewed = localStorage.getItem(`viewed-${title}`);
  badge.textContent = isViewed ? "✅ Viewed" : "🔓 Not Viewed";
  card.appendChild(badge);

  card.addEventListener("click", () => {
    localStorage.setItem(`viewed-${title}`, "true");
    badge.textContent = "✅ Viewed";
  });
});
