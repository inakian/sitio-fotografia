// Animación de carga de contenido
function animateOnScroll() {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Navegación suave
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Cambio de tema claro/oscuro
function setupThemeSwitch() {
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false);

  const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null;
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("caption");
  const close = document.querySelector(".close");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const galleryItems = document.querySelectorAll(".gallery-item img");
  let currentIndex = 0;

  function openLightbox(index) {
    lightbox.classList.add("active");
    lightboxImg.src = galleryItems[index].src;
    caption.textContent = galleryItems[index].alt;
    currentIndex = index;
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  function navigateLightbox(direction) {
    currentIndex =
      (currentIndex + direction + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  close.addEventListener("click", closeLightbox);
  prev.addEventListener("click", () => navigateLightbox(-1));
  next.addEventListener("click", () => navigateLightbox(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("DOMContentLoaded", setupLightbox);

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  smoothScroll();
  setupThemeSwitch();
  setupMobileMenu();
  setupLightbox();
});
