
# Documentación del Componente: SplitSection.astro

## Descripción General

`SplitSection.astro` es un componente de layout muy versátil que crea una sección de dos columnas. Es ideal para presentar contenido de forma equilibrada, como una imagen junto a un bloque de texto. Ofrece control sobre el color de fondo y el orden de las columnas en dispositivos móviles.

## Ubicación del Archivo

`src/components/SplitSection.astro`

## Props

El componente define la siguiente interfaz de `Props`:

```typescript
interface Props {
  bgColorClass?: string;    // Clase de Tailwind para el color de fondo.
  reverseOnMobile?: boolean; // Opción para invertir el orden en móviles.
}
```

- **`bgColorClass` (opcional)**: Una cadena de texto con una clase de utilidad de color de fondo de Tailwind CSS (ej. `'bg-gray-100'`). Por defecto es `'bg-white'`.

- **`reverseOnMobile` (opcional)**: Un booleano. Si se establece en `true`, la columna de la derecha (`slot="right"`) aparecerá *antes* que la columna de la izquierda (`slot="left"`) en pantallas pequeñas (móviles). En pantallas de escritorio, el orden siempre será izquierda y luego derecha. Por defecto es `false`.

## Estructura y Funcionalidad

### Layout y Estructura HTML

- **Contenedor Principal (`<section>`)**: Un elemento `<section>` al que se le aplica la clase de color de fondo (`bgColorClass`).
- **Grid de Dos Columnas**: Dentro de la sección, un `div` utiliza `grid` de CSS para crear el layout. 
  - En pantallas de escritorio (`md:`), se activa `grid-cols-2` para dividir el espacio en dos columnas iguales.
  - En móvil, el grid es de una sola columna por defecto, apilando los elementos verticalmente.
- **Slots Nombrados**: El componente utiliza dos `slots` nombrados para recibir el contenido:
  - **`<slot name="left" />`**: Contenido para la columna izquierda.
  - **`<slot name="right" />`**: Contenido para la columna derecha.

### Lógica de Orden Responsivo

La `prop` `reverseOnMobile` controla el orden visual de las columnas en la vista móvil.

- **Lógica de Clases**: 
  - Se calculan las clases de orden (`leftOrder` y `rightOrder`) en el script de Astro.
  - Si `reverseOnMobile` es `false` (por defecto):
    - La columna izquierda (`left`) tiene `order-1`.
    - La columna derecha (`right`) tiene `order-2`.
  - Si `reverseOnMobile` es `true`:
    - La columna izquierda (`left`) tiene `order-2 md:order-1` (segunda en móvil, primera en escritorio).
    - La columna derecha (`right`) tiene `order-1 md:order-2` (primera en móvil, segunda en escritorio).

Esta técnica permite, por ejemplo, mostrar una imagen primero y luego el texto en móvil, pero tener el texto a la izquierda y la imagen a la derecha en escritorio.

### Estilos (CSS)

- Totalmente basado en Tailwind CSS.
- Utiliza `gap-8` para crear un espacio consistente entre las columnas y `py-12 md:py-8 px-4 md:px-20` para el padding interno de la sección.
- `items-center` alinea verticalmente el contenido de ambas columnas.

## Dependencias

Este componente no tiene dependencias externas de JavaScript o de otros componentes. Es autónomo.

## Uso

Es uno de los componentes de layout más comunes y se puede usar en cualquier página para estructurar contenido.

### Ejemplo Estándar (Texto a la izquierda, Imagen a la derecha)

```astro
---
import SplitSection from '../components/SplitSection.astro';
import SanityImage from '../components/SanityImage.astro';
import { someData } from '../lib/sanity/queries';
---
<SplitSection bgColorClass="bg-custom-frosty-teal">
  <div slot="left">
    <h2>{someData.title}</h2>
    <p>{someData.description}</p>
  </div>
  <div slot="right">
    <SanityImage image={someData.image} />
  </div>
</SplitSection>
```

### Ejemplo con Orden Invertido en Móvil

En este caso, la imagen aparecerá arriba del texto en móvil.

```astro
---
import SplitSection from '../components/SplitSection.astro';
import SanityImage from '../components/SanityImage.astro';
import { otherData } from '../lib/sanity/queries';
---
<SplitSection reverseOnMobile={true}>
  <div slot="left">
    <h2>{otherData.title}</h2>
    <p>{otherData.description}</p>
  </div>
  <div slot="right">
    <SanityImage image={otherData.image} />
  </div>
</SplitSection>
```
