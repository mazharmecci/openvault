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
