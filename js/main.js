document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollReveal();
  initBurgerMenu();
  initProductFilters();
  initStepsSlider();
  initActiveNav();
});

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initBurgerMenu() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-card');
  if (!filterBtns.length || !products.length) return;

  const activeFilters = { shape: 'all', color: 'all', material: 'all' };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      const value = btn.dataset.value;

      document
        .querySelectorAll(`.filter-btn[data-group="${group}"]`)
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      activeFilters[group] = value;
      applyFilters();
    });
  });

  function applyFilters() {
    products.forEach((card) => {
      const shape = card.dataset.shape;
      const color = card.dataset.color;
      const material = card.dataset.material;

      const matchShape = activeFilters.shape === 'all' || shape === activeFilters.shape;
      const matchColor = activeFilters.color === 'all' || color === activeFilters.color;
      const matchMaterial = activeFilters.material === 'all' || material === activeFilters.material;

      card.classList.toggle('hidden', !(matchShape && matchColor && matchMaterial));
    });
  }
}

function initStepsSlider() {
  const track = document.querySelector('.steps-track');
  const prevBtn = document.querySelector('.step-prev');
  const nextBtn = document.querySelector('.step-next');
  const dots = document.querySelectorAll('.step-dot');
  if (!track) return;

  let currentStep = 0;
  const cards = track.querySelectorAll('.step-card');
  const total = cards.length;

  function goToStep(index) {
    currentStep = Math.max(0, Math.min(index, total - 1));
    const card = cards[currentStep];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' });
    }
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentStep));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToStep(currentStep - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToStep(currentStep + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToStep(i)));

  track.addEventListener('scroll', () => {
    const scrollLeft = track.scrollLeft;
    cards.forEach((card, i) => {
      if (Math.abs(card.offsetLeft - scrollLeft - 24) < card.offsetWidth / 2) {
        currentStep = i;
        dots.forEach((dot, j) => dot.classList.toggle('active', j === i));
      }
    });
  });
}

function initActiveNav() {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });
}
