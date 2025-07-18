
# Documentación de Componentes: Iconos SVG

## Descripción General

El proyecto utiliza componentes de Astro para encapsular iconos SVG, lo que permite reutilizarlos fácilmente y pasarles propiedades, como clases de CSS. `IconMinus.astro` y `IconPlus.astro` son dos de estos componentes, usados comúnmente en elementos de UI como acordeones o contadores.

## Ubicación de los Archivos

- `src/components/icons/IconMinus.astro`
- `src/components/icons/IconPlus.astro`

---

## Componente: IconMinus.astro

### Descripción

Renderiza un icono de "menos" o resta (`—`). Típicamente se usa para indicar una acción de colapsar, cerrar o disminuir.

### Props

```typescript
interface Props {
  class?: string;
}
```

- **`class` (opcional)**: Una cadena de texto con clases de CSS que se aplicarán directamente al elemento `<svg>`.

### Estructura

- El componente contiene un único elemento `<svg>`.
- El `path` del SVG dibuja una línea horizontal simple.
- Atributos como `xmlns`, `fill`, `viewBox`, `stroke`, y `stroke-width` están predefinidos para asegurar que el icono se renderice correctamente.

### Uso

```astro
---
import IconMinus from '../components/icons/IconMinus.astro';
---
<button>
  <IconMinus class="w-6 h-6 text-red-500" />
</button>
```

---

## Componente: IconPlus.astro

### Descripción

Renderiza un icono de "más" o suma (`+`). Típicamente se usa para indicar una acción de expandir, abrir o añadir.

### Props

```typescript
interface Props {
  class?: string;
}
```

- **`class` (opcional)**: Una cadena de texto con clases de CSS que se aplicarán directamente al elemento `<svg>`.

### Estructura

- El componente contiene un único elemento `<svg>`.
- Los `path` del SVG dibujan una línea horizontal y una vertical que se cruzan para formar el signo de más.
- Al igual que `IconMinus`, tiene los atributos SVG necesarios predefinidos.

### Uso

Se utiliza en conjunto con `IconMinus` en el componente `SimbolismoNumericoCard.astro` para el control del acordeón.

```astro
---
import IconPlus from '../components/icons/IconPlus.astro';
---
<button>
  <IconPlus class="w-6 h-6 text-green-500" />
</button>
```
