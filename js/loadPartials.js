/**
 * /home/guillermo/NuevoWSNau/js/loadPartials.js
 * ------------------------------------------------------------------------------------------
 * Carga contenido HTML desde una URL en un elemento específico.
 * Utilizado para inyectar parciales como el header y el footer en las páginas.
 * 
 * @param {string} url La URL del archivo HTML a cargar (ej. '_header.html').
 * @param {string} elementId El ID del elemento donde insertar el HTML.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el contenido se ha cargado.
 */
async function loadHTML(url, elementId) {
    // Obtener el elemento del DOM donde se cargará el HTML.
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Error: Elemento con ID "${elementId}" no encontrado.`);
        return;
    }
    try {
        const response = await fetch(url);
        // Verificar si la petición fue exitosa.
        if (!response.ok) {
            throw new Error(`No se pudo cargar ${url}: ${response.statusText}`);
        }
        const text = await response.text();
        // Insertar el HTML cargado en el elemento especificado.

        if (url === '_footer.html') {
            console.log(`loadPartials.js: Contenido crudo de _footer.html (primeros 300 caracteres): ${text.substring(0, 300)}`);
            if (text.includes('<script src="js/main.js">')) {
                console.log("loadPartials.js: El contenido de _footer.html SÍ incluye la etiqueta script para main.js ANTES de la inyección.");
            } else {
                console.error("loadPartials.js: ERROR CRÍTICO - El contenido de _footer.html NO incluye la etiqueta script para main.js ANTES de la inyección.");
            }
        }
 
        element.innerHTML = text;
 
        // Específicamente para el footer, manejar la carga del script main.js
        if (url === '_footer.html') {
            const mainScriptInDOM = element.querySelector('script[src="js/main.js"]');
            if (mainScriptInDOM) {
                console.log("loadPartials.js: Etiqueta <script src='js/main.js'> ENCONTRADA en el DOM después de inyectar el footer.");
                // Eliminar el script original insertado por innerHTML (que no se ejecuta)
                mainScriptInDOM.remove();

                // Crear un nuevo elemento script y añadirlo al body para que se ejecute
                const newScript = document.createElement('script');
                newScript.src = 'js/main.js'; // O podrías tomarlo de mainScriptInDOM.src
                document.body.appendChild(newScript);
                console.log("loadPartials.js: Nuevo script para main.js creado y añadido dinámicamente al body.");
            } else {
                console.error("loadPartials.js: ERROR CRÍTICO - Etiqueta <script src='js/main.js'> NO FUE ENCONTRADA en el DOM después de inyectar el footer.");
            }
        }
    } catch (error) {
        console.error(`Error al cargar ${url}:`, error);
        // Opcional: Mostrar un mensaje de error en la interfaz de usuario dentro del elemento.
        element.innerHTML = `<p>Error al cargar el contenido desde ${url}. Por favor, intente recargar la página.</p>`;
    }
}

/**
 * Gestiona el estado visual de los enlaces de navegación.
 * Resalta el enlace correspondiente a la página actual y aplica estilos específicos
 * al botón "Dona ahora" para asegurar su visibilidad y diseño correctos.
 */
function setActiveMenuItem() {
    // Obtener la ruta actual del navegador.
    let currentPath = window.location.pathname;

    // Normalizar la ruta: si termina con 'index.html', quitarlo para que coincida con enlaces como '/'.
    if (currentPath.endsWith('/index.html')) {
        currentPath = currentPath.substring(0, currentPath.length - 'index.html'.length);
    }
    // Normalizar la ruta raíz: si es una cadena vacía (ej. 'dominio.com/'), convertirla a '/'.
    if (currentPath === '') {
        currentPath = '/';
    }

    const navLinks = document.querySelectorAll('#mobile-menu ul li a');

    navLinks.forEach(link => {
        // Identificar si el enlace actual es el botón "Dona ahora" por su atributo href.
        const isDonateButton = link.getAttribute('href') === 'donar.html';

        // --- Reset de estilos y atributos ARIA ---
        // Eliminar todas las clases de estilo gestionadas por esta función para evitar conflictos.
        // Esto asegura un estado limpio antes de aplicar los estilos correctos.
        link.classList.remove('text-custom-darker-teal', 'text-white', 'text-custom-hover-teal', 'hover:text-custom-hover-teal', 'hover:text-white', 'text-custom-dark-teal');
        link.removeAttribute('aria-current'); // Quitar el atributo ARIA de página actual.

        if (isDonateButton) {
            // --- Caso Especial: Botón "Dona ahora" ---
            // Este botón tiene un estilo distintivo y siempre debe tener texto blanco.
            // Las clases de fondo y hover ya están definidas en su HTML (_header.html).
            link.classList.add('text-white');
        } else {
            // --- Caso: Enlaces de Navegación Normales ---
            // Obtener y normalizar la ruta del enlace.
            let linkPath = new URL(link.href, window.location.origin).pathname;
            if (linkPath.endsWith('/index.html')) {
                linkPath = linkPath.substring(0, linkPath.length - 'index.html'.length);
            }
             // Normalizar la ruta raíz del enlace.
             if (linkPath === '') {
                linkPath = '/';
            }

            // Comprobar si la ruta del enlace coincide con la ruta de la página actual.
            const isMatchingPage = linkPath === currentPath;

            if (isMatchingPage) {
                // El enlace corresponde a la página activa.
                link.classList.add('text-white'); // Aplicar estilo de enlace activo (texto blanco).
                link.setAttribute('aria-current', 'page');
            } else {
                // El enlace no corresponde a la página activa.
                link.classList.add('text-custom-dark-teal', 'hover:text-custom-hover-teal'); // Aplicar estilos de enlace inactivo.
                // 'aria-current' ya fue removido al inicio del bucle.
            }
        }
    });
}


/**
 * Configura la funcionalidad del menú hamburguesa para dispositivos móviles.
 * Incluye el toggle del menú, cierre al hacer clic fuera y cierre al redimensionar a vista de escritorio.
 * Esta función debe llamarse DESPUÉS de que el contenido del header (que incluye el botón y el menú) haya sido cargado.
 */
function initializeHamburgerMenu() {
    // Obtener los elementos del DOM para el botón hamburguesa y el menú móvil.
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        // --- Event Listener: Clic en el botón hamburguesa ---
        // Alterna la visibilidad del menú móvil y actualiza el estado ARIA.
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
            // Opcional: Aquí se podría implementar la lógica para cambiar el icono de hamburguesa a 'X'.
        });

        // --- Event Listener: Clic fuera del menú (en el documento) ---
        // Cierra el menú si está visible y el clic ocurre fuera del botón y del propio menú.
        document.addEventListener('click', (event) => {
            const isMenuVisible = !mobileMenu.classList.contains('hidden');
            // Verificar que el clic no fue en el botón ni dentro del menú.
            const clickedOutside = !hamburgerButton.contains(event.target) && !mobileMenu.contains(event.target);
            
            if (isMenuVisible && clickedOutside) {
                mobileMenu.classList.add('hidden');
                hamburgerButton.setAttribute('aria-expanded', 'false');
                // Opcional: Resetear el icono si se cambió a 'X'.
            }
        });

         // --- Event Listener: Redimensionamiento de la ventana ---
         // Cierra el menú móvil si la ventana se redimensiona a un tamaño de escritorio (>= 768px)
         // y el menú estaba abierto. Esto evita que el menú móvil permanezca visible en vistas de escritorio.
         window.addEventListener('resize', () => {
            const isDesktopView = window.innerWidth >= 768; // 768px es el breakpoint 'md' por defecto de Tailwind.
            if (isDesktopView) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                    // Opcional: Resetear el icono si se cambió a 'X'.
                }
            }
        });

    } else {
        // Error si no se encuentran los elementos necesarios para el menú hamburguesa.
        // Esto podría ocurrir si los IDs en _header.html no coinciden o si el header no se cargó correctamente.
        console.error("No se encontró el botón de hamburguesa ('hamburger-button') o el menú móvil ('mobile-menu') después de cargar el header.");
    }
}


// =============================================
//            EJECUCIÓN PRINCIPAL
// =============================================
// Se ejecuta cuando el DOM está completamente cargado y listo.
document.addEventListener('DOMContentLoaded', async () => {
    await loadHTML('_header.html', 'header-placeholder');
    setActiveMenuItem();
    initializeHamburgerMenu();
    loadHTML('_footer.html', 'footer-placeholder');
});
