function initializeDirectMenu() {
  const hamburgerButton = document.getElementById('hamburger-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!hamburgerButton || !mobileMenu) {
    return;
  }

  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    hamburgerButton.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    hamburgerButton.setAttribute('aria-expanded', 'true');
  };

  hamburgerButton.addEventListener('click', (event) => {
    // Detenemos la propagación para que el listener del documento no lo cierre inmediatamente.
    mobileMenu.classList.contains('hidden') ? openMenu() : closeMenu();
  });

  // Listener para cerrar con scroll
  window.addEventListener('scroll', () => {
    if (!mobileMenu.classList.contains('hidden')) {
      closeMenu();
    }
  }, { passive: true });

  // Listener para cerrar al hacer clic fuera
  document.addEventListener('click', (event) => {
    // Si el menú está visible y el clic NO fue dentro del menú
    if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && !hamburgerButton.contains(event.target)) {
      closeMenu();
    }
  });

  // Listener para cerrar al redimensionar a escritorio
  let resizeTimeout;
  window.addEventListener('resize', () => {
    // "Debounce" para no ejecutar el código en cada píxel de redimensión
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
        closeMenu();
      }
    }, 150);
  }, { passive: true });
}

export { initializeDirectMenu };