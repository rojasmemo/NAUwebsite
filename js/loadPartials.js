/**
 * Carga contenido HTML desde una URL en un elemento específico.
 * @param {string} url La URL del archivo HTML a cargar (ej. '_header.html').
 * @param {string} elementId El ID del elemento donde insertar el HTML.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el contenido se ha cargado.
 */
async function loadHTML(url, elementId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Error: Elemento con ID "${elementId}" no encontrado.`);
        return;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo cargar ${url}: ${response.statusText}`);
        }
        const text = await response.text();
        element.innerHTML = text;
    } catch (error) {
        console.error(`Error al cargar ${url}:`, error);
        element.innerHTML = `<p>Error al cargar el contenido desde ${url}.</p>`; // Mensaje de error opcional
    }
}

/**
 * Establece el estado activo del elemento de menú correspondiente a la página actual
 * y asegura que el botón "Dona ahora" mantenga su estilo correcto.
 */
function setActiveMenuItem() {
    let currentPath = window.location.pathname;
    if (currentPath.endsWith('/index.html')) {
        currentPath = currentPath.substring(0, currentPath.length - 'index.html'.length);
    }
    // Considerar '/' como la ruta raíz normalizada
    if (currentPath === '') {
        currentPath = '/';
    }

    const navLinks = document.querySelectorAll('#mobile-menu ul li a');

    navLinks.forEach(link => {
        // Identificar el botón "Dona ahora" (podemos usar su href o una clase específica si la tuviera)
        const isDonateButton = link.getAttribute('href') === 'donar.html';

        // Quitar clases de estado activo/inactivo y aria-current (solo las que gestionamos aquí)
        link.classList.remove('text-custom-darker-teal', 'text-white', 'hover:text-custom-hover-teal');
        link.removeAttribute('aria-current');

        if (isDonateButton) {
            // --- Caso Especial: Botón "Dona ahora" ---
            // Siempre debe tener texto blanco (las clases de fondo y hover ya están en el HTML)
            link.classList.add('text-white');
        } else {
            // --- Caso: Enlaces de Navegación Normales ---
            let linkPath = new URL(link.href, window.location.origin).pathname;
            if (linkPath.endsWith('/index.html')) {
                linkPath = linkPath.substring(0, linkPath.length - 'index.html'.length);
            }
             // Considerar '/' como la ruta raíz normalizada para el enlace también
             if (linkPath === '') {
                linkPath = '/';
            }

            // Comprobar si el enlace coincide con la página actual
            const isMatchingPage = linkPath === currentPath;

            if (isMatchingPage) {
                // Es la página activa
                link.classList.add('text-custom-darker-teal'); // Clase activa
                link.setAttribute('aria-current', 'page');
            } else {
                // Es una página inactiva
                link.classList.add('text-white', 'hover:text-custom-hover-teal'); // Clases inactivas
            }
        }
    });
}


/**
 * Inicializa la lógica completa del menú hamburguesa.
 * Se ejecuta después de que el header ha sido cargado.
 */
function initializeHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        // Toggle al hacer clic en el botón
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
        });

        // Cerrar el menú si se hace clic fuera de él en móvil
        document.addEventListener('click', (event) => {
            const isMenuVisible = !mobileMenu.classList.contains('hidden');
            const clickedOutside = !hamburgerButton.contains(event.target) && !mobileMenu.contains(event.target);
            if (isMenuVisible && clickedOutside) {
                mobileMenu.classList.add('hidden');
                hamburgerButton.setAttribute('aria-expanded', 'false');
            }
        });

         // Cerrar el menú si la ventana se redimensiona a tamaño desktop
         window.addEventListener('resize', () => {
            const isDesktopView = window.innerWidth >= 768; // md breakpoint
            if (isDesktopView) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                }
            }
        });

    } else {
        console.error("No se encontró el botón de hamburguesa ('hamburger-button') o el menú móvil ('mobile-menu') después de cargar el header.");
    }
}


// --- Ejecución Principal ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadHTML('_header.html', 'header-placeholder');
    setActiveMenuItem();
    initializeHamburgerMenu();
    loadHTML('_footer.html', 'footer-placeholder');
});
