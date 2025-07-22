# Plan de Acción: Migración a Monorepo NAU

Este documento describe los pasos para reconfigurar el proyecto NAU a una estructura de monorepo funcional, utilizando `pnpm` como gestor de paquetes y workspaces.

### Paso 0: Limpieza de Artefactos Previos

Antes de configurar el monorepo, es crucial eliminar cualquier directorio `node_modules` y archivos de lock (`pnpm-lock.yaml`) existentes dentro de los subdirectorios del proyecto. Esto previene conflictos de dependencias y asegura una instalación limpia desde la raíz.

**Acción:**
1.  Abre una terminal en el directorio raíz del proyecto.
2.  Ejecuta los siguientes comandos para eliminar las carpetas y archivos de lock antiguos:

    ```bash
    rm -rf nau-astro-site/node_modules
    rm -rf nau-sanity-studio/node_modules
    rm -f nau-astro-site/pnpm-lock.yaml
    rm -f nau-sanity-studio/pnpm-lock.yaml
    ```
    *Si no existen, los comandos simplemente no harán nada, así que es seguro ejecutarlos.*


## Objetivo
Restaurar y optimizar los entornos de desarrollo y construcción para el sitio de Astro (`nau-astro-site`) y el estudio de Sanity (`nau-sanity-studio`) dentro de un único repositorio.

---

### Paso 1: Configurar el Workspace de PNPM

Para que `pnpm` pueda gestionar las dependencias de ambos proyectos de forma centralizada, necesitamos definir un "workspace".

**Acción:**
1.  Crea un archivo llamado `pnpm-workspace.yaml` en el directorio raíz del proyecto (`/home/guillermo/NAU-website/`).
2.  Añade el siguiente contenido al archivo:

    ```yaml
    packages:
      - 'nau-astro-site'
      - 'nau-sanity-studio'
    ```

### Paso 2: Crear un `package.json` en la Raíz

Un `package.json` en la raíz nos permitirá ejecutar comandos para ambos proyectos desde un solo lugar, simplificando el flujo de trabajo.

**Acción:**
1.  Crea un archivo `package.json` en el directorio raíz.
2.  Añade el siguiente contenido. Estos scripts nos permitirán controlar ambos proyectos a la vez o de forma individual:

    ```json
    {
      "name": "nau-monorepo",
      "private": true,
      "scripts": {
        "dev": "pnpm --parallel --stream -r dev",
        "build": "pnpm -r build",
        "astro": "pnpm --filter nau-astro-site",
        "sanity": "pnpm --filter nau-sanity-studio"
      }
    }
    ```
    *   `pnpm dev`: Inicia ambos servidores de desarrollo (Astro y Sanity) en paralelo.
    *   `pnpm build`: Construye ambos proyectos para producción.
    *   `pnpm astro ...`: Ejecuta comandos solo en el proyecto de Astro (ej: `pnpm astro dev`).
    *   `pnpm sanity ...`: Ejecuta comandos solo en el proyecto de Sanity (ej: `pnpm sanity dev`).

### Paso 3: Instalar Todas las Dependencias

Con el workspace ya configurado, `pnpm` puede instalar las dependencias de ambos proyectos de manera eficiente.

**Acción:**
1.  Abre tu terminal en el directorio raíz del proyecto.
2.  Ejecuta el siguiente comando. Esto leerá los `package.json` de cada subdirectorio y los instalará en una única carpeta `node_modules` en la raíz.

    ```bash
    pnpm install
    ```

### Paso 4: Iniciar los Servidores de Desarrollo

Ahora probaremos que ambos proyectos puedan correr simultáneamente.

**Acción:**
1.  En la misma terminal en la raíz, ejecuta el script `dev` que creamos:

    ```bash
    pnpm dev
    ```
2.  **Verificación:** Deberías ver en la terminal los logs de Astro y Sanity.
    *   El sitio de Astro estará disponible en `http://localhost:4321`.
    *   El estudio de Sanity estará disponible en `http://localhost:3333`.

### Paso 5: Verificación Final y Próximos Pasos

**Acción:**
1.  Abre ambas URLs en tu navegador.
2.  Comprueba que el sitio de Astro se ve correctamente y que carga el contenido desde Sanity.
3.  Comprueba que puedes iniciar sesión en el estudio de Sanity y ver tus modelos de contenido.

**Si todo funciona, ¡lo hemos logrado!**

**Próximos Pasos (si es necesario):**
*   **Ajustar configuración de Netlify:** El archivo `netlify.toml` dentro de `nau-astro-site` probablemente necesite ser ajustado para los despliegues desde un monorepo. La configuración en Netlify también deberá ser actualizada para apuntar al directorio correcto y usar los comandos de construcción del monorepo.
*   **Variables de entorno:** Asegurarse de que el sitio de Astro (`nau-astro-site/.env`) tenga las variables correctas para conectar con Sanity.