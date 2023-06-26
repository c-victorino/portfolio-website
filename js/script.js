let lastScrollPos = 0;
const header = document.querySelector(".header");
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-link-list");
const overlay = document.querySelector(".overlay");
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

    // Top of page
    if (currentYaxis === 0) {
      header.classList.remove("background-color");
    }
  }
  lastScrollPos = currentYaxis;
});

// use as toggle or remove as the action
function toggleNavigation(action) {
  menu.classList[action]("active"); // open or close navigation list
  document.documentElement.classList[action]("nav-open"); // enable or disable Y-axis
  overlay.classList[action]("active"); // overlay for blur
}

// Hamburger open or close
hamburger.addEventListener("click", function () {
  this.classList.toggle("active");
  toggleNavigation("toggle");
});

// closes navigation wen links are clicked and puts back default hamburger
menu.querySelectorAll(".nav-link-list a").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    toggleNavigation("remove");
  })
);

// removes mobile navigation and it related classes if left open during-
// resizing of width greater than 768px
window.addEventListener("resize", () => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 768 && hamburger.classList.contains("active")) {
    toggleNavigation("remove");
    hamburger.classList.remove("active");
  }
});
