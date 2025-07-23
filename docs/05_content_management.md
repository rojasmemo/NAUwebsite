# 5. Guía de Gestión de Contenido

Esta guía está dirigida a los editores y administradores de contenido del sitio web de NAU. El objetivo es explicar cómo utilizar Sanity Studio para actualizar y gestionar todo el contenido del sitio de manera autónoma.

## 1. Acceso al Sanity Studio

El Sanity Studio es la interfaz donde se gestiona todo el contenido. Para acceder, normalmente se debe visitar la URL específica del estudio (por ejemplo, `https://nau.sanity.studio` o la URL proporcionada por los desarrolladores).

Una vez allí, deberás iniciar sesión con las credenciales proporcionadas (generalmente una cuenta de Google, GitHub o un email y contraseña).

## 2. La Interfaz del Studio

Una vez dentro, verás una interfaz con tres columnas principales:

-   **Columna Izquierda (Tipos de Contenido):** Aquí se listan todos los tipos de contenido que puedes editar, como "Página de Inicio", "Encuentro", "Simbolismo Numérico", etc.
-   **Columna Central (Documentos):** Al seleccionar un tipo de contenido, aquí aparecerán los documentos existentes de ese tipo. Por ejemplo, si seleccionas "Encuentro", verás una lista de todos los encuentros creados.
-   **Columna Derecha (Editor):** Al seleccionar un documento, aquí se abrirá el formulario de edición con todos sus campos.

## 3. Editando Contenido Principal

A continuación se detalla cómo editar las secciones más importantes del sitio.

### 3.1. Editar la Página de Inicio

La página de inicio es un documento único. Para editarla:

1.  En la columna izquierda, selecciona **"Página de Inicio"**.
2.  En la columna central, selecciona el único documento que aparece.
3.  En la columna derecha, verás todos los campos que componen la página, organizados en secciones (Hero Banner 1, Sección Dividida 1, etc.).
4.  Modifica los textos, reemplaza las imágenes o ajusta los botones según sea necesario.
5.  Una vez que termines, haz clic en el botón **"Publish"** en la esquina inferior derecha para que los cambios se reflejen en el sitio web.

### 3.2. Gestionar Encuentros

Los encuentros son un tipo de contenido que puede tener múltiples entradas.

-   **Para crear un nuevo encuentro:**
    1.  Selecciona **"Encuentro"** en la columna izquierda.
    2.  Haz clic en el icono del lápiz en la parte superior de la columna central para crear un nuevo documento.
    3.  Rellena todos los campos: Título, imagen principal, descripción, contenido, etc.
    4.  El **Slug** (la URL) se generará automáticamente a partir del título.
    5.  Haz clic en **"Publish"**.

-   **Para editar un encuentro existente:**
    1.  Selecciona **"Encuentro"** en la columna izquierda.
    2.  Busca y selecciona el encuentro que deseas editar en la columna central.
    3.  Modifica los campos necesarios en la columna derecha y haz clic en **"Publish"**.

### 3.3. Gestionar Simbolismo Numérico

El proceso es idéntico al de los Encuentros, pero seleccionando **"Simbolismo Numérico"** en el menú de la izquierda.

### 3.4. Editar la Página de Simbolismo Numérico

Esta página tiene una estructura de contenido más compleja. Para editarla:

1.  En la columna izquierda, selecciona **"Página de Simbolismo Numérico"**.
2.  En la columna central, selecciona el único documento que aparece.
3.  En la columna derecha, encontrarás los siguientes campos para editar:

    -   **Título (SEO):** El título que aparece en la pestaña del navegador y en los resultados de Google.
    -   **Descripción (SEO):** El texto que verán los usuarios en los resultados de búsqueda de Google.
    -   **Banner Principal:** La primera imagen y texto que ven los usuarios al entrar a la página.
    -   **Sección de Introducción (Fondo claro):** Un bloque de texto enriquecido (con formato) que aparece justo debajo del banner principal. No tiene título, solo cuerpo de texto.
    -   **Banner con 3 Tarjetas:** Una sección visualmente destacada.
        -   **Título del Banner:** El encabezado principal de esta sección.
        -   **Imagen de Fondo:** La imagen que se mostrará detrás del título y las tarjetas.
        -   **Tarjetas:** Debes rellenar el texto descriptivo para cada una de las 3 tarjetas. Los iconos de las tarjetas son fijos y no se editan aquí.
        -   **Icono Inferior:** La imagen pequeña que aparece centrada en la parte inferior de este banner.
    -   **Sección Detallada (Fondo blanco):** Una sección con un título y un cuerpo de texto enriquecido, ideal para dar más detalles o explicaciones.
    -   **Sección Final (Pre-CTA):** La última sección de texto antes del banner final. También tiene un título y un cuerpo de texto enriquecido.
    -   **Banner de Llamada a la Acción (Final):** El último banner de la página, que invita al usuario a realizar una acción (ej. contactar).

## 4. El Editor de Texto Enriquecido (Portable Text)

Campos como "Contenido Principal" o "Descripción" utilizan un editor de texto enriquecido. Esto te permite:

-   Aplicar formato como **negrita**, *cursiva*.
-   Crear listas con viñetas o numeradas.
-   Añadir enlaces.

Simplemente selecciona el texto que deseas formatear y utiliza la barra de herramientas que aparece.

## 5. Publicación de Cambios

Sanity no guarda los cambios en el sitio en vivo automáticamente. Siempre debes hacer clic en el botón **"Publish"** para que tus modificaciones sean visibles para los usuarios. Si solo quieres guardar un borrador sin publicar, puedes hacer clic en la flecha junto al botón y seleccionar **"Save"**.
