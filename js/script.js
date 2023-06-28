let lastScrollPos = 0;
const header = document.querySelector(".header");
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-link-list");
const overlay = document.querySelector(".overlay");

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(
    // if intersecting, add "show" for transition / animation
    (entry) => entry.isIntersecting && entry.target.classList.add("show")
  );
});

// "section-anim" only used in all section elements for transitions
const sectionsAnim = document.querySelectorAll(".section-anim");
sectionsAnim.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  const currentYaxis = window.pageYOffset || document.documentElement.scrollTop;

  if (currentYaxis > lastScrollPos) {
    // Scroll down will show header
    header.classList.add("hidden");
    header.classList.remove("show");
    header.classList.add("background-color");
  } else {
    // Scroll up will hide header
    header.classList.remove("hidden");
    header.classList.add("show");

    // Top of page, will remover background thats used when header is shown
    // anywhere that is not the very top of the page
    if (currentYaxis === 0) {
      header.classList.remove("background-color");
    }
  }
  lastScrollPos = currentYaxis;
});

// use "toggle" or "remove" as the action for parameter
function toggleNavigation(action) {
  menu.classList[action]("active"); // open or close navigation list
  document.documentElement.classList[action]("nav-open"); // enable or disable Y-axis
  overlay.classList[action]("active"); // overlay for blur
}

// Hamburger open or close transition
hamburger.addEventListener("click", function () {
  this.classList.toggle("active");
  toggleNavigation("toggle");
});

// closes navigation when links are clicked and puts back default hamburger
menu.querySelectorAll(".nav-link-list a").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    toggleNavigation("remove");
  })
);

// removes mobile navigation and it's related classes if left open during-
// resizing of width greater than 768px
window.addEventListener("resize", () => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 768 && hamburger.classList.contains("active")) {
    toggleNavigation("remove");
    hamburger.classList.remove("active");
  }
});
