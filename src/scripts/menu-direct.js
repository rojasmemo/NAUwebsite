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
    event.stopPropagation();
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      openMenu();
    } else {
      closeMenu();
    }
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
    if (!mobileMenu.classList.contains('hidden')) {
      // El botón de la hamburguesa no está dentro del menú, así que también lo excluimos.
      if (!mobileMenu.contains(event.target) && event.target !== hamburgerButton) {
        closeMenu();
      }
    }
  });

  // Listener para cerrar al redimensionar a escritorio
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  }, { passive: true });
}

export { initializeDirectMenu };