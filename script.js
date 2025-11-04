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

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.vault-card');
  let totalViews = 0;
  const leaderboardData = [];

  cards.forEach(card => {
    const previewBtn = card.querySelector('.preview-btn');
    const titleEl = card.querySelector('h3');
    const title = titleEl ? titleEl.textContent.trim() : 'Untitled';
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
        const totalViewsEl = document.getElementById('totalViews');
        if (totalViewsEl) {
          totalViewsEl.textContent = `Total Views: ${totalViews > 1000 ? '1000+' : totalViews}`;
        }
      });
    }

    leaderboardData.push({ title, views });
  });

  // Initial total view display
  const totalViewsEl = document.getElementById('totalViews');
  if (totalViewsEl) {
    totalViewsEl.textContent = `Total Views: ${totalViews > 1000 ? '1000+' : totalViews}`;
  }

  // Sort and render leaderboard
  leaderboardData.sort((a, b) => b.views - a.views);
  const leaderboardList = document.getElementById('leaderboard-list');
  if (leaderboardList) {
    leaderboardData.slice(0, 5).forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.title}: ${entry.views} views`;
      leaderboardList.appendChild(li);
    });
  }

  // Modal logic
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.querySelector('.close-btn');
  const modal = document.getElementById('viewModal');
  const historyList = document.getElementById('view-history-list');

  if (openModalBtn && modal && historyList) {
    openModalBtn.addEventListener('click', () => {
      historyList.innerHTML = '';
      leaderboardData.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.title}: ${entry.views} views`;
        historyList.appendChild(li);
      });
      modal.style.display = 'block';
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
});

