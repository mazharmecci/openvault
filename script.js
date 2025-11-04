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
  let totalViews = 0;

  cards.forEach(card => {
    const previewBtn = card.querySelector('.preview-btn');
    const title = previewBtn?.dataset.title;
    const viewKey = `vaultViews_${title}`;

    // Create view count element
    const viewEl = document.createElement('div');
    viewEl.className = 'view-count';
    card.appendChild(viewEl);

    // Load initial count
    let views = parseInt(localStorage.getItem(viewKey) || '0', 10);
    totalViews += views;
    viewEl.textContent = `Views: ${views > 1000 ? '1000+' : views}`;

    // Track clicks
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        views += 1;
        localStorage.setItem(viewKey, views);
        viewEl.textContent = `Views: ${views > 1000 ? '1000+' : views}`;

        totalViews += 1;
        document.getElementById('totalViews').textContent = `Total Views: ${totalViews > 1000 ? '1000+' : totalViews}`;
      });
    }
  });

  // Initial total view display
  document.getElementById('totalViews').textContent = `Total Views: ${totalViews > 1000 ? '1000+' : totalViews}`;
});

// Modal for view History / Trends

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.vault-card');
  const leaderboardData = [];

  cards.forEach(card => {
    const previewBtn = card.querySelector('.preview-btn');
    const title = previewBtn?.dataset.title;
    const viewKey = `vaultViews_${title}`;
    const views = parseInt(localStorage.getItem(viewKey) || '0', 10);

    leaderboardData.push({ title, views });
  });

  // Sort by views descending
  leaderboardData.sort((a, b) => b.views - a.views);

  // Render top 5
  const leaderboardList = document.getElementById('leaderboard-list');
  leaderboardData.slice(0, 5).forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.title}: ${entry.views} views`;
    leaderboardList.appendChild(li);
  });
});
