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

let prevScrollPos = window.pageYOffset;
window.addEventListener("scroll", () => {
  const currentScrollPos =
    window.pageYOffset || document.documentElement.scrollTop;

  // insures when navigation list is open the header do not vanish
  if (!menu.classList.contains("active")) {
    header.style.transform =
      prevScrollPos > currentScrollPos ? "translateY(0)" : "translateY(-100%)";
  }
  prevScrollPos = currentScrollPos;
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
