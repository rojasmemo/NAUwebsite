// main.js

// Punto de entrada principal para Vite.
// Importamos el CSS para que Tailwind y Vite lo procesen y lo incluyan en la página.
import '../styles/input.css';

/**
 * Gestiona el estado visual de los enlaces de navegación.
 * Resalta el enlace correspondiente a la página actual.
 */
function setActiveMenuItem() {
    // Obtiene el nombre del archivo de la página actual (ej. "index.html", "sobre-nau.html").
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Selecciona solo los enlaces de navegación principales (excluyendo el botón de donar).
    const navLinks = document.querySelectorAll('header nav a:not([href="donar.html"])');

    navLinks.forEach(link => {
        // Limpia el estado anterior en todos los enlaces.
        link.removeAttribute('aria-current');

        const linkPage = new URL(link.href).pathname.split('/').pop() || 'index.html';

        // Si el href del enlace coincide con la página actual, lo marca como activo.
        if (linkPage === currentPage) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Configura la funcionalidad del menú hamburguesa para dispositivos móviles.
 */
function initializeHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
        });

        document.addEventListener('click', (event) => {
            const isMenuVisible = !mobileMenu.classList.contains('hidden');
            const clickedOutside = !hamburgerButton.contains(event.target) && !mobileMenu.contains(event.target);
            if (isMenuVisible && clickedOutside) {
                mobileMenu.classList.add('hidden');
                hamburgerButton.setAttribute('aria-expanded', 'false');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
}

/**
 * Actualiza el año del copyright en el footer.
 */
function updateCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Inicializa el botón de "Volver Arriba".
 */
function initScrollToTopButton() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const scrollThreshold = 300;

  if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > scrollThreshold) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        scrollToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        scrollToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
        scrollToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
      }
    });

    scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// =============================================
//            EJECUCIÓN PRINCIPAL
// =============================================
// Se ejecuta cuando el DOM está completamente cargado y listo.
document.addEventListener('DOMContentLoaded', () => {
  // Llama a todas las funciones necesarias para inicializar la página.
  setActiveMenuItem();
  initializeHamburgerMenu();
  updateCurrentYear();
  initScrollToTopButton();
});
