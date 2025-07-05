// js/main.js

// Punto de entrada de JavaScript para todas las páginas.
// Importamos el CSS para que Tailwind y Vite lo procesen y lo incluyan en la página.
import '../styles/input.css';

/**
 * Limita la frecuencia con la que se ejecuta una función. Útil para eventos como 'resize' o 'scroll'.
 * @param {Function} func La función a ejecutar.
 * @param {number} wait El tiempo de espera en milisegundos.
 * @returns {Function} La función "debounced".
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

        // Usamos debounce para optimizar el evento de redimensionamiento.
        // La función solo se llamará 250ms después de que el usuario deje de redimensionar la ventana.
        const handleResize = debounce(() => {
            if (window.innerWidth >= 768) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                }
            }
        }, 250);

        window.addEventListener('resize', handleResize);
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
    // Usamos debounce para que la comprobación no se ejecute en cada píxel de scroll, mejorando el rendimiento.
    const handleScroll = debounce(() => {
      if (window.pageYOffset > scrollThreshold) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
        scrollToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
      } else {
        scrollToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
        scrollToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
      }
    }, 100); // Un tiempo de espera corto (100ms) es ideal para el scroll.
    window.addEventListener('scroll', handleScroll);

    scrollToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Gestiona el envío del formulario de contacto con reCAPTCHA v3.
 */
function handleContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    grecaptcha.ready(function () {
      // REEMPLAZA 'TU_RECAPTCHA_SITE_KEY' con tu clave pública de reCAPTCHA v3
      grecaptcha.execute('6Lcy43grAAAAAPTd99MJiK7E42tofYVIbLD8sXgQ', { action: 'submit' }).then(async function (token) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.recaptchaToken = token; // Añadimos el token al objeto de datos

        try {
          const response = await fetch('/.netlify/functions/enviar-formulario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            window.location.href = '/gracias.html';
          } else {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Ocurrió un error al enviar el mensaje.');
          }
        } catch (error) {
          console.error('Error en el envío del formulario:', error);
          alert(`Error: ${error.message}`);
        }
      });
    });
  });
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
  handleContactForm(); // Añadido para el formulario de contacto
});
