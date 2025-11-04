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

// Viewership count logic

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.vault-card');

  cards.forEach((card, index) => {
    const demoBtn = card.querySelector('.preview-btn');
    const viewKey = `vaultViews_${index}`;

    // Create view count element
    const viewEl = document.createElement('div');
    viewEl.className = 'view-count';
    card.appendChild(viewEl);

    // Load initial count
    let views = parseInt(localStorage.getItem(viewKey) || '0', 10);
    viewEl.textContent = `Views: ${views > 1000 ? '1000+' : views}`;

    // Track clicks
    demoBtn.addEventListener('click', () => {
      views += 1;
      localStorage.setItem(viewKey, views);
      viewEl.textContent = `Views: ${views > 1000 ? '1000+' : views}`;
    });
  });
});
