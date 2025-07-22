# 3. Frontend con Astro

Este documento detalla la arquitectura, estructura y componentes del frontend del proyecto NAU, construido con Astro.

## 1. Estructura de Directorios Clave

El código del frontend reside en la carpeta `nau-astro-site/`. La estructura interna sigue las convenciones de Astro:

```
/src
|-- assets/         # Imágenes y otros activos estáticos optimizados por Astro.
|-- components/     # Componentes reutilizables de Astro (.astro) y React (.tsx).
|-- layouts/        # Plantillas de página base (ej. MainLayout.astro).
|-- lib/            # Código auxiliar, como los clientes de API (Sanity).
|-- pages/          # Cada archivo .astro aquí se convierte en una ruta del sitio.
|-- styles/         # Hojas de estilo globales (ej. global.css con Tailwind).
```

## 2. Filosofía de Componentes

Seguimos una filosofía de **componentes reutilizables y de propósito único**. Un componente debe hacer una sola cosa y hacerla bien. Esto facilita su mantenimiento, testeo y reutilización a lo largo del sitio.

-   **Componentes de Presentación:** La mayoría de nuestros componentes son de presentación. Reciben datos a través de `props` y renderizan HTML. No contienen lógica de negocio compleja.
-   **Nomenclatura:** Los nombres de los componentes son en `PascalCase` (ej. `HeroBanner.astro`) y reflejan claramente su función.
-   **Datos desde Sanity:** Los componentes que muestran contenido de Sanity reciben los datos directamente desde las páginas que los utilizan. Una página (ej. `src/pages/encuentros.astro`) es la responsable de obtener los datos y pasarlos a los componentes.

## 3. Catálogo de Componentes

A continuación se documentan los componentes clave del sistema.

---

### `EncuentroCard.astro`

Este componente se utiliza para mostrar una "tarjeta" de presentación para un tipo de encuentro o servicio ofrecido por NAU. Es un pilar en páginas como `/encuentros` y `/simbolismo-numerico`.

**Ubicación:** `src/components/EncuentroCard.astro`

**Visualización:**

![Visualización de una tarjeta de encuentro](https://i.imgur.com/xxxx.png) <!-- Placeholder, se reemplazaría con una imagen real -->

**Props (Propiedades):**

El componente espera las siguientes `props` para renderizarse correctamente:

| Propiedad | Tipo                          | Requerido | Descripción                                                                 |
| :-------- | :---------------------------- | :-------- | :-------------------------------------------------------------------------- |
| `image`   | `SanityImageType`             | Sí        | El objeto de imagen proveniente de Sanity para la cabecera de la tarjeta.   |
| `imageAlt`| `string`                      | No        | Texto alternativo para la imagen. Si no se provee, se usa el `title`.      |
| `icon`    | `ImageMetadata` (de Astro)    | Sí        | El icono que se superpone en la esquina superior derecha de la tarjeta.     |
| `iconAlt` | `string`                      | No        | Texto alternativo para el icono. Por defecto: "Icono representativo de NAU".|
| `title`   | `string`                      | Sí        | El título principal de la tarjeta.                                          |

**Slots (Contenido Dinámico):**

-   **`<slot />` (default):** Este componente tiene un slot por defecto. Cualquier contenido que se coloque entre las etiquetas `<EncuentroCard>` y `</EncuentroCard>` se renderizará en el cuerpo de la tarjeta, debajo del título y la línea divisoria. Esto permite que cada tarjeta tenga una descripción o llamado a la acción único.

**Ejemplo de Uso:**

En una página `.astro`, se usaría de la siguiente manera:

```astro
---
import EncuentroCard from '../components/EncuentroCard.astro';
import { sanityFetch } from '../lib/sanity/client'; // Asumiendo que existe

const encuentros = await sanityFetch(/* ... GROQ query ... */);
---

<div class="grid grid-cols-2 gap-8">
  {encuentros.map(encuentro => (
    <EncuentroCard 
      image={encuentro.mainImage}
      icon={import('../assets/icon.svg')}
      title={encuentro.title}
    >
      <p>{encuentro.summary}</p>
      <a href={`/encuentros/${encuentro.slug}`}>Ver más</a>
    </EncuentroCard>
  ))}
</div>
```