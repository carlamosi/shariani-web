# La Vall × Shariani — Image Assets

Este directorio contiene las imágenes del proyecto. Actualmente utiliza **placeholders temporales en SVG** diseñados para mantener la estructura y dirección de arte hasta que se provean las fotografías finales.

## Flujo de Reemplazo de Imágenes

Para reemplazar un placeholder con una foto real:

1. Añade tu nueva foto real (ej. `hero-real.jpg`) en esta carpeta `public/images/`. No sobrescribas los archivos SVG.
2. Abre `src/data/images.ts`.
3. Encuentra la clave correspondiente (ej. `heroSchool`).
4. Actualiza la ruta en `src`:
   ```ts
   heroSchool: {
     key: 'heroSchool',
     src: '/images/hero-real.jpg', // <--- CAMBIA ESTO
     placeholderSrc: '/images/placeholders/hero-school.svg',
     // ...
   }
   ```
5. El componente `<ProjectImage />` cargará automáticamente la foto real y la posicionará correctamente.

## Lista de Imágenes Requeridas

| Clave | Sección | Dimensiones Min. (px) | Relación de Aspecto | Sujeto | Consideraciones de Salvaguardia |
|-------|---------|-----------------------|---------------------|--------|---------------------------------|
| `heroSchool` | Hero (Cabecera) | 1440 × 630 | 16:7 (Apaisado) | Estudiantes al aire libre. | **Alta:** Consentimiento expreso de padres/tutores. No nombres en alt text. |
| `schoolBuilding` | El proyecto | 800 × 600 | 4:3 (Apaisado) | Arquitectura exterior de la escuela. | Baja: Evitar menores reconocibles. |
| `classroom` | El impacto | 800 × 600 | 4:3 (Apaisado) | Interior de aula, actividad lectiva. | Media: Obtener consentimiento. Priorizar actividad. |
| `studentLearning` | Ayuda | 600 × 800 | 3:4 (Retrato) | Retrato individual de estudiante. | **Alta:** Consentimiento expreso e informado indispensable. |
| `schoolFacilities` | Mejoras | 800 × 450 | 16:9 (Apaisado) | Entorno escolar y muro exterior. | Baja. |
| `community` | Partners (Fondo) | 1440 × 450 | 16:5 (Apaisado) | Comunidad educativa, paisaje. | Media: Consentimiento estándar de adultos. |
| `journalEntry01` | Diario (Carta 1) | 600 × 338 | 16:9 (Apaisado) | Visita, estado inicial de obras. | Baja/Media. |
| `journalEntry02` | Diario (Carta 2) | 600 × 338 | 16:9 (Apaisado) | Avance de construcción. | Baja. |
| `journalEntry03` | Diario (Carta 3) | 600 × 338 | 16:9 (Apaisado) | Paisaje o evento comunitario. | Baja/Media. |
