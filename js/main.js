// js/main.js
console.log("main.js (desde _footer.html) está siendo leído por el navegador.");

function initializeMainFunctions() {
  console.log("Inicializando funciones de main.js (DOM listo o ya estaba listo).");
  // Función para actualizar el año actual en el footer
  function updateCurrentYear() {
    const yearSpan = document.getElementById('currentYear'); // Asumiendo que tienes un <span id="currentYear"> en tu footer
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    } else {
      console.warn('Elemento con id "currentYear" no encontrado en el footer.');
    }
  }

  // Función para inicializar el botón de "Volver Arriba"
  function initScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 300; 

    if (scrollToTopBtn) {
      console.log('Botón "scrollToTopBtn" encontrado. Añadiendo listeners.');
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
          scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
          scrollToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
          scrollToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
          scrollToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
        }
      });

      scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault(); 
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    } else {
      console.warn('El botón "scrollToTopBtn" no fue encontrado en el DOM.');
    }
  }

  // Llamar a las funciones necesarias que dependen de elementos del footer
  updateCurrentYear();
  initScrollToTopButton();
}

// Verificar el estado del DOM. Si ya está 'interactive' o 'complete',
// DOMContentLoaded ya ha ocurrido, así que ejecutamos las funciones directamente.
// Si no, esperamos al evento.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMainFunctions);
} else {
  initializeMainFunctions();
}
