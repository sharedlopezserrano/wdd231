const lastModEl = document.getElementById("last-modified");
if (lastModEl) {
  const formatted = new Date(document.lastModified).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short"
  });
  lastModEl.textContent = `Last Modification: ${formatted}`;
}

function initHamburgerMenu() {
  const hamburger = document.getElementById("ham-btn");
  const navigation = document.getElementById("nav-bar");

  if (hamburger && navigation) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      navigation.classList.toggle("open");
      hamburger.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navigation.contains(e.target)) {
        navigation.classList.remove("open");
        hamburger.classList.remove("open");
      }
    });

    const navLinks = navigation.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        hamburger.classList.remove("open");
      });
    });
  }
}

function setupLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.classList.add('loaded');
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initHamburgerMenu();
  setupLazyLoading();
  
  const heroBtn = document.querySelector('.hero-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', function() {
      window.location.href = 'events.html';
    });
  }
});