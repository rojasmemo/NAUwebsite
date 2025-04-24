// main.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', () => {
            // Alternar la clase 'hidden' en el menú móvil
            mobileMenu.classList.toggle('hidden');

            // Alternar atributos ARIA para accesibilidad
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);

            // Opcional: Cambiar el icono de hamburguesa a 'X' y viceversa
            // Para esto, necesitarías tener ambos SVGs dentro del botón y alternar su visibilidad.
            // Ejemplo (requiere añadir otro SVG con clase 'close-icon' y 'hidden' inicialmente):
            // const hamburgerIcon = hamburgerButton.querySelector('.hamburger-icon');
            // const closeIcon = hamburgerButton.querySelector('.close-icon');
            // hamburgerIcon.classList.toggle('hidden');
            // closeIcon.classList.toggle('hidden');
        });
    } else {
        console.error("No se encontró el botón de hamburguesa o el menú móvil.");
    }

    // Opcional: Cerrar el menú si se hace clic fuera de él en móvil
    document.addEventListener('click', (event) => {
        // Comprueba si el menú está visible y si el clic fue fuera del botón Y fuera del menú
        if (!mobileMenu.classList.contains('hidden') &&
            !hamburgerButton.contains(event.target) &&
            !mobileMenu.contains(event.target)) {

            mobileMenu.classList.add('hidden');
            hamburgerButton.setAttribute('aria-expanded', 'false');
            // Asegúrate de que el icono vuelva a ser hamburguesa si implementaste el cambio de icono
        }
    });

     // Opcional: Cerrar el menú si la ventana se redimensiona a tamaño desktop
     window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) { // 768px es el breakpoint 'md' por defecto de Tailwind
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                hamburgerButton.setAttribute('aria-expanded', 'false');
                 // Asegúrate de que el icono vuelva a ser hamburguesa si implementaste el cambio de icono
            }
        }
    });

});
