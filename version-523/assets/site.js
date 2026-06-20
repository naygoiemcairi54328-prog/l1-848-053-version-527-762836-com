document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", menu.classList.contains("is-open"));
    });
  }

  const slider = document.querySelector("[data-hero-slider]");

  if (slider) {
    const slides = Array.from(slider.querySelectorAll("[data-hero-slide]"));
    const dots = Array.from(slider.querySelectorAll("[data-hero-dot]"));
    const prev = slider.querySelector("[data-hero-prev]");
    const next = slider.querySelector("[data-hero-next]");
    let index = 0;
    let timer = null;

    function showSlide(nextIndex) {
      if (!slides.length) {
        return;
      }
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === index);
      });
    }

    function startTimer() {
      timer = window.setInterval(() => {
        showSlide(index + 1);
      }, 5200);
    }

    function restartTimer() {
      if (timer) {
        window.clearInterval(timer);
      }
      startTimer();
    }

    if (prev) {
      prev.addEventListener("click", () => {
        showSlide(index - 1);
        restartTimer();
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        showSlide(index + 1);
        restartTimer();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.heroDot));
        restartTimer();
      });
    });

    showSlide(0);
    startTimer();
  }

  const searchInput = document.querySelector("[data-search-input]");
  const searchCount = document.querySelector("[data-search-count]");

  if (searchInput) {
    const cards = Array.from(document.querySelectorAll("[data-card]"));

    function applySearch() {
      const query = searchInput.value.trim().toLowerCase();
      let visible = 0;

      cards.forEach((card) => {
        const source = (card.dataset.title || card.textContent || "").toLowerCase();
        const matched = !query || source.includes(query);
        card.classList.toggle("is-hidden", !matched);
        if (matched) {
          visible += 1;
        }
      });

      if (searchCount) {
        searchCount.textContent = query ? `${visible} 条匹配` : "";
      }
    }

    searchInput.addEventListener("input", applySearch);
  }
});
