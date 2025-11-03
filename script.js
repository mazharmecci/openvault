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

// unlock badges

@keyframes unlockBadge {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.badge.unlocked {
  animation: unlockBadge 0.4s ease-out forwards;
  background-color: #28a745;
  color: white;
}
