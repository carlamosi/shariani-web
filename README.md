# La Vall × Shariani

Sitio web oficial de la colaboración educativa entre el colegio La Vall (Barcelona) y Shariani Primary School (Kenia).

## 🚀 Despliegue y Ejecución

Este es un proyecto [Next.js](https://nextjs.org) 15 configurado con Tailwind CSS v4.

### Instalación

```bash
npm install
```

### Entorno de desarrollo

Para iniciar el servidor local en `http://localhost:3000`:

```bash
npm run dev
```

### Compilación para producción

Para crear una versión optimizada de producción y ejecutarla:

```bash
npm run build
npm run start
```

## 📸 Gestión de Imágenes y Placeholders

El proyecto se entrega con un sistema robusto de placeholders en formato SVG. **No elimines los archivos `.svg` de `public/images/placeholders/`.**

Cuando recibas las fotografías finales reales:

1. Coloca la fotografía (ej. `mi-foto.jpg`) en la carpeta `public/images/`.
2. Edita el archivo `src/data/images.ts`.
3. Modifica únicamente la propiedad `src` del registro correspondiente (ej. `src: '/images/mi-foto.jpg'`).
4. Deja intacto `placeholderSrc`. Si la imagen real falla, el sistema usará automáticamente el placeholder como respaldo.

Consulta `public/images/README.md` para el listado completo de imágenes necesarias, tamaños recomendados y consideraciones legales/de salvaguardia.

## 🔗 Integraciones y Tareas Pendientes (TODO)

El sitio está estructurado y listo para producción, pero requiere la inserción de los datos finales por parte de la organización:

- **Bizum (Ayuda)**: Actualmente configurado con el código `03367` (Fundació Montblanc). *Requiere confirmación de que este código sigue activo y corresponde a este proyecto.*
- **Teaming (Ayuda)**: Falta la URL real del grupo de Teaming. Actualizar el atributo `href` en `src/components/sections/HowToHelp.tsx`.
- **Donaciones (Ayuda/CTA)**: Faltan las URLs de destino para los botones "Donar ahora" y "Donación económica". Actualizar en `Navbar.tsx`, `Hero.tsx`, `CtaBanner.tsx`, etc.
- **Textos Legales (Footer)**: Faltan las URLs de Política de Privacidad, Aviso Legal y Cookies.

## 🎨 Arquitectura y Diseño

- **Framework:** Next.js 15 (App Router).
- **Estilos:** Tailwind CSS v4 (CSS-first, `@theme` integrado en `globals.css`).
- **Tipografía:** *Newsreader* para titulares editoriales, *DM Sans* para el cuerpo y componentes.
- **Componentes:** Totalmente responsivos (mobile-first), accesibles (gestión de `focus-visible`, soporte teclado `Escape` en menú móvil) y respetuosos con las preferencias de reducción de movimiento (`prefers-reduced-motion`).
- **Arquitectura UI:** Modularizada en `src/components/sections/` y `src/components/layout/`.
