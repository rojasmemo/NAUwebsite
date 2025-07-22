# ADR 001: Elección del Stack Tecnológico Principal (Astro + Sanity)

-   **Fecha:** 2025-07-21
-   **Estado:** Aceptado

## Contexto

Para el desarrollo del sitio web de NAU, se necesitaba una pila tecnológica que cumpliera con los siguientes requisitos clave:

1.  **Alto Rendimiento:** El sitio debía ser extremadamente rápido para garantizar una excelente experiencia de usuario y un posicionamiento SEO óptimo.
2.  **Gestión de Contenido Flexible:** El contenido debía ser fácilmente editable por un equipo no técnico, sin necesidad de intervención de los desarrolladores para cambios cotidianos.
3.  **Escalabilidad y Mantenibilidad:** La arquitectura debía ser moderna, escalable y fácil de mantener a largo plazo.
4.  **Excelente Experiencia de Desarrollo:** El framework debía ser productivo y agradable para los desarrolladores.

## Decisión

Se decidió utilizar la siguiente combinación tecnológica:

-   **Frontend:** **Astro** como framework de construcción.
-   **Backend (CMS):** **Sanity.io** como sistema de gestión de contenidos (CMS) headless.

## Justificación

### ¿Por qué Astro?

-   **Rendimiento por Defecto:** Astro sigue una filosofía de "cero JavaScript por defecto". Renderiza todo el sitio a HTML y CSS estáticos durante la compilación, enviando solo el JavaScript estrictamente necesario al cliente (hidratación parcial). Esto resulta en tiempos de carga casi instantáneos (Core Web Vitals excelentes).
-   **Centrado en el Contenido:** Es un framework ideal para sitios ricos en contenido como el de NAU, donde el rendimiento y el SEO son primordiales.
-   **Flexibilidad de UI:** Permite usar componentes de diferentes frameworks (React, Vue, Svelte) si fuera necesario en el futuro, aunque para este proyecto se utilizan sus componentes `.astro` nativos, que son ligeros y eficientes.
-   **Experiencia de Desarrollo:** Ofrece un entorno de desarrollo rápido (HMR) y una sintaxis intuitiva que combina HTML, JSX-like y JavaScript en un solo archivo.

### ¿Por qué Sanity?

-   **CMS Headless Real:** Desacopla completamente el contenido de la presentación. Sanity proporciona el contenido a través de una API, y cualquier frontend (en este caso, Astro) puede consumirlo. Esto nos da flexibilidad para cambiar el frontend en el futuro sin migrar el contenido.
-   **Modelado de Contenido como Código:** Los esquemas de contenido se definen en archivos JavaScript dentro del repositorio (`nau-sanity-studio/schemas`). Esto permite versionar la estructura del contenido, facilita la colaboración y mantiene la coherencia.
-   **Sanity Studio Personalizable:** El estudio de Sanity es una aplicación de React de código abierto que podemos personalizar y ampliar según las necesidades del proyecto.
-   **GROQ (GraphQL-like Query Language):** Ofrece un lenguaje de consulta potente y flexible para obtener exactamente los datos que necesitamos, incluyendo la capacidad de transformar y proyectar los datos en la propia consulta.
-   **Escalabilidad:** El "Content Lake" de Sanity es altamente escalable y su CDN de assets (imágenes, archivos) es robusto y rápido.

## Consecuencias

-   **Positivas:**
    -   Se obtiene un sitio web con un rendimiento de primer nivel.
    -   El equipo de contenido tiene total autonomía para gestionar el sitio.
    -   La arquitectura es limpia, desacoplada y fácil de razonar.
-   **A Considerar:**
    -   El equipo de desarrollo necesita familiaridad con ambos sistemas (Astro y Sanity).
    -   Al ser un sitio generado estáticamente, ciertos tipos de contenido dinámico en tiempo real (si se necesitaran en el futuro) requerirían el uso de funciones serverless o el modo SSR de Astro, lo que añadiría complejidad.
