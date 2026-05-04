# Tienclimatek - Documentación de la Página Web

Página web profesional de Tienclimatek, especializada en instalación y mantenimiento de calderas, aire acondicionado y sistemas energéticos en Euskadi y Madrid.

## 📋 Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Características Principales](#características-principales)
4. [Sistema Multiidioma](#sistema-multiidioma)
5. [Guía de Componentes](#guía-de-componentes)
6. [Sistema de Temas](#sistema-de-temas)
7. [Formulario de Contacto](#formulario-de-contacto)
8. [SEO y Metadata](#seo-y-metadata)
9. [Accesibilidad](#accesibilidad)
10. [Responsive](#mobile-first-responsive)
11. [Rendimiento](#rendimiento)
12. [Guía de Edición](#guía-de-edición)
13. [Desarrollo Local](#desarrollo-local)
14. [Mejoras Futuras](#mejoras-futuras)

---

## 📁 Estructura del Proyecto

```
tienclimatek_web/
├── index.html              # Página principal (español)
├── eu/
│   └── index.html          # Página principal (euskera) — URLs limpias
├── css/
│   └── styles.css          # Estilos consolidados
├── js/
│   └── main.js             # Lógica JavaScript
├── assets/
│   ├── images/
│   │   ├── logos/
│   │   │   ├── logo-saunier-duval.jpg
│   │   │   └── logo-vaillant.webp
│   │   ├── logo-tienclimatek_sinfondo.png
│   │   ├── tecnico-caldera.png
│   │   ├── og-tienclimatek.jpg
│   │   └── favicon-*.png
│   └── ...
├── README.md               # Documentación completa
├── SETUP_QUICK.md          # Guía rápida de configuración
└── .gitignore
```

---

## 🚀 Instalación y Configuración

### Requisitos
- Servidor web con soporte HTTP/HTTPS
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Cuenta de Formspree para el formulario de contacto

### Pasos de Configuración

#### 1. Desplegar los archivos
Sube la carpeta `tienclimatek_web/` completa a tu servidor web.

#### 2. Configurar Formspree (Formulario de Contacto)
El formulario envía datos a través de [Formspree](https://formspree.io):

1. Accede a formspree.io y crea una cuenta
2. Crea un nuevo formulario y copia tu **Form ID** (formato: `mwvwpwje`)
3. Reemplaza el ID en **ambos** archivos HTML:

```html
<!-- index.html y eu/index.html -->
<form action="https://formspree.io/f/TU_FORM_ID" ...>
```

#### 3. HTTPS
Se recomienda SSL/TLS. Los navegadores mostrarán advertencias si se usa HTTP en producción.

---

## ✨ Características Principales

### 🎨 Diseño
- **Dark Mode & Light Mode** — Toggle en la navegación, preferencia guardada en `localStorage`
- **Mobile-First** — Optimizado para todos los dispositivos
- **Responsive** — 4 breakpoints: mobile, tablet (≥640px), desktop (≥900px), XL (≥1280px)
- **Animaciones** — Reveal al scroll con `IntersectionObserver`, fade-up al cargar hero

### 📱 Componentes
- **Barra de emergencia** — Sticky top bar con número 24h, visible al hacer scroll
- **Navegación fija** — Con hamburger menu en mobile y teléfonos en desktop XL
- **Hero section** — Imagen de fondo con gradiente de marca SD/Vaillant y logos ampliados
- **Promociones** — Tarjetas tabuladas para campañas SD y Vaillant con fechas dinámicas
- **Grid de servicios** — 8 tarjetas (4 columnas en escritorio)
- **Proceso 4 pasos** — Timeline visual con hover
- **FAQ Accordion** — Interactivo con navegación por teclado
- **Formulario de contacto** — Validación inline, envío async a Formspree
- **Botón flotante mobile** — CTA de llamada siempre visible en móvil

---

## 🌐 Sistema Multiidioma

El sitio está disponible en dos idiomas con URLs limpias:

| Idioma | URL | Archivo |
|--------|-----|---------|
| Español | `tienclimatek.eus/` | `index.html` |
| Euskera | `tienclimatek.eus/eu/` | `eu/index.html` |

### Hreflang SEO
Ambas páginas incluyen las etiquetas `hreflang` correctas:
```html
<link rel="alternate" hreflang="es" href="https://tienclimatek.eus/" />
<link rel="alternate" hreflang="eu" href="https://tienclimatek.eus/eu/" />
<link rel="alternate" hreflang="x-default" href="https://tienclimatek.eus/" />
```

### Detección de idioma en JS
`main.js` detecta el atributo `lang` del `<html>` y adapta automáticamente los mensajes de validación del formulario:
```javascript
const lang = document.documentElement.lang || 'es';
const isEU = lang === 'eu';
const t = isEU ? i18n.eu : i18n.es;
```

### Rutas de assets en euskera
La página `eu/index.html` usa rutas relativas con `../` para acceder a los assets compartidos:
```html
<link rel="stylesheet" href="../css/styles.css" />
<img src="../assets/images/logos/logo-vaillant.webp" />
<script src="../js/main.js" defer></script>
```

---

## 🎯 Guía de Componentes

### Logos de Marca (Hero)
Los logos de Saunier Duval y Vaillant en el hero tienen tamaño ampliado:
```css
.hero-brand-logo-wrap {
  height: 120px;
  padding: 10px 20px;
}
.hero-brand-logo-wrap img {
  height: 90px;
  width: auto;
  max-width: 280px;
}
```

### Logos en Sección Promociones
Los logos en las tarjetas de promociones también están ampliados:
```css
.promo-logo-pill {
  height: 80px;
  padding: 10px 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,.18);
}
.promo-logo-pill img {
  height: 56px;
  max-width: 200px;
}
```

### Promociones (Tabs SD / Vaillant)
Las tarjetas de promociones usan tabs para alternar entre Calderas y Aire Acondicionado. Las fechas del pill se actualizan dinámicamente:
```javascript
window.switchTab = function (brand, tab) { ... }
// brand: 'sd' | 'v'
// tab: 'calderas' | 'aa'  (ES)  /  'galdarak' | 'aa'  (EU)
```

> ⚠️ Los IDs de tabs y paneles difieren entre español (`calderas`) y euskera (`galdarak`). Cada versión tiene su propio `switchTab` inline.

### Navegación
```html
<nav role="navigation" aria-label="Navegación principal">
  <!-- Logo -->
  <!-- Hamburger (mobile) -->
  <!-- Links + CTA + Theme toggle + Lang switch -->
  <!-- Teléfonos desktop (≥1280px) -->
</nav>
```

**Clases CSS principales:**
- `.nav-links` — Lista de navegación
- `.nav-hamburger` — Botón hamburger (mobile)
- `.nav-cta` — Call-to-action principal
- `.theme-toggle` — Toggle claro/oscuro
- `.lang-switch` — Switch de idioma (pill con borde)
- `.nav-desktop-phones` — Teléfonos visibles solo en XL

### FAQ Accordion
```html
<dl class="faq-list">
  <div class="faq-item">
    <dt class="faq-question">
      <button class="faq-btn" aria-expanded="false" aria-controls="faq-1">
        Pregunta
        <svg class="faq-icon">...</svg>
      </button>
    </dt>
    <dd class="faq-answer" id="faq-1" hidden>Respuesta</dd>
  </div>
</dl>
```

**Keyboard Navigation:** Tab para navegar, Enter/Space para abrir/cerrar, Escape cierra el menú mobile.

### Formulario de Contacto
```html
<form class="cf-form" id="contactForm" method="POST"
  action="https://formspree.io/f/TU_FORM_ID" novalidate>
  <!-- campos... -->
  <button onclick="submitForm(event)" type="button">Enviar</button>
  <div class="cf-success" id="cfSuccess" role="alert"></div>
</form>
```

**Campos:** `cf-nombre`, `cf-cp`, `cf-tel`, `cf-mail`, `cf-asunto` (select), `cf-comentario`, `cf-rgpd` (checkbox).

**Estados:** Inválido (borde rojo + mensaje inline), Enviando (botón deshabilitado), Enviado (mensaje éxito verde).

---

## 🎨 Sistema de Temas

### Variables CSS — Dark Mode (por defecto)
```css
:root {
  --blue: #1A7EC8;
  --blue-dark: #105a9a;
  --blue-light: #4DA8E8;
  --yellow: #FFC200;
  --yellow-dark: #e0a800;
  --dark: #0B0F17;
  --dark2: #111620;
  --dark3: #181e2c;
  --mid: #222a3a;
  --text-muted: #8090aa;
  --off-white: #F4F6FA;
}
```

### Light Mode
```css
[data-theme="light"] {
  --dark: #F0F4FA;
  --dark2: #E4EAF4;
  --dark3: #D8E0EE;
  --mid: #C8D4E8;
  --text-muted: #5A6A84;
  --off-white: #0D1422;
  --yellow: #1565C0;       /* Swap a azul en light */
  --yellow-dark: #0F4FA8;
}
```

### Aplicar Tema
```javascript
// Activar light mode
html.setAttribute('data-theme', 'light');
localStorage.setItem('tc-theme', 'light');

// Volver a dark mode
html.removeAttribute('data-theme');
localStorage.setItem('tc-theme', 'dark');
```

---

## 📧 Formulario de Contacto

### Flujo de Envío
1. Usuario rellena el formulario
2. Click en "Enviar" / "Bidali"
3. `submitForm(event)` valida:
   - ✅ Campos requeridos no vacíos
   - ✅ Email contiene `@`
   - ✅ Checkbox RGPD marcado
4. Si hay errores: muestra mensajes inline + focus en el primer error
5. Si es válido: fetch POST a Formspree
6. Si `response.ok`: muestra mensaje de éxito, resetea el formulario
7. Si error: muestra mensaje de error en rojo

### Mensajes de validación

| Clave | Español | Euskera |
|-------|---------|---------|
| `nameReq` | El nombre es obligatorio | Izena derrigorrezkoa da |
| `cpReq` | El código postal es obligatorio | Posta kodea derrigorrezkoa da |
| `telReq` | El teléfono es obligatorio | Telefonoa derrigorrezkoa da |
| `mailReq` | Correo electrónico inválido | Eposta baliogabea |
| `commentReq` | El comentario es obligatorio | Iruzkina derrigorrezkoa da |
| `rgpd` | Debes aceptar la política RGPD | DBNP politika onartu behar duzu |

---

## 🔍 SEO y Metadata

### Meta Tags
- `title` y `description` únicos por idioma y longitud recomendada
- `canonical` por versión de idioma
- `robots`: index, follow con snippet y preview ilimitados

### Open Graph y Twitter Card
Imágenes OG de 1200×630px, locale por idioma (`es_ES` / `eu_EU`).

### Schema.org (JSON-LD)
La versión española incluye schema completo:
- **LocalBusiness** — Dirección, teléfono, horario, área de servicio, logo
- **Organization** — Contactos, redes sociales
- **WebSite** + **WebPage** + **BreadcrumbList**
- **FAQPage** — Las 5 preguntas frecuentes

La versión euskera incluye un **LocalBusiness** simplificado con los mismos datos de contacto.

---

## ♿ Accesibilidad

- **Skip link** — `href="#contenido-principal"` / `href="#eduki-nagusia"` visible al hacer Tab
- **ARIA labels** — En todos los botones, nav, formulario y secciones
- **Contraste** — Texto `#F4F6FA` sobre `#0B0F17` = ratio 16.5:1 (WCAG AAA)
- **Semántica** — `<main>`, `<nav>`, `<footer>`, `<article>`, `<aside>`, `<address>`, `<dl>`/`<dt>`/`<dd>` para FAQ
- **Teclado** — Tab, Enter/Space, Escape para menú mobile y FAQ
- **Live regions** — `role="alert"` + `aria-live="polite"` en mensaje de éxito del formulario

---

## 📱 Mobile-First Responsive

### Breakpoints
```css
/* Mobile (< 640px) — estilos base */
@media (min-width: 640px)  { /* Tablet */ }
@media (min-width: 900px)  { /* Desktop */ }
@media (min-width: 1280px) { /* XL */ }
@media (max-width: 479px)  { /* Phones muy pequeños */ }
```

### Comportamiento por componente

| Componente | Mobile | Tablet (≥640) | Desktop (≥900) | XL (≥1280) |
|---|---|---|---|---|
| Hero | 1 col, sin imagen | 1 col | 2 cols + imagen | Padding ampliado |
| Services Grid | 1 col | 2 cols | 4 cols | 4 cols |
| Proceso | Lista vertical | 2×2 grid | 4 cols inline | 4 cols |
| Contact body | 1 col | 1 col | 2 cols | 2 cols |
| Nav phones | Oculto | Oculto | Oculto | Visible |
| Float btn (☎) | Visible | Visible | Oculto | Oculto |

---

## ⚡ Rendimiento

### Optimizaciones implementadas
- `<link rel="preconnect">` para Google Fonts
- `<link rel="preload">` para CSS y fuentes críticas
- `fetchpriority="high"` en imagen hero y logo
- `loading="lazy"` en imágenes del footer
- CSS consolidado en un único `styles.css`
- `scroll-behavior: smooth` nativo en CSS
- IntersectionObserver para animaciones reveal (sin librería externa)
- Animaciones CSS-only en el hero (`fadeUp`, `fadeIn`)

---

## 📖 Guía de Edición

### Editar textos del Hero
`index.html` — Sección `<section class="hero-full">`:
```html
<p class="hero-brand-official">Texto sobre la red oficial...</p>
<h1 class="hero-full__title">Tu <span>Calor</span>...</h1>
<p class="hero-full__desc">Descripción principal...</p>
```

### Editar servicios
`index.html` — Sección `<section class="services">`:
```html
<article class="service-card">
  <svg class="service-icon"><!-- SVG del icono --></svg>
  <h3 class="service-name">Nombre del Servicio</h3>
  <div class="badge-item">Badge</div>
  <p class="service-text">Descripción...</p>
  <a href="#contacto" class="service-cta-link">Presupuesto →</a>
</article>
```

### Editar promociones
`index.html` — Sección `<section id="promociones">`. Cada tarjeta tiene dos paneles (tabs):
- `sd-panel-calderas` / `sd-panel-aa` — Saunier Duval
- `v-panel-calderas` / `v-panel-aa` — Vaillant

Para actualizar fechas, editar los `datePills` del script inline y el texto de los `promo-date-val`.

### Editar FAQ
Añadir o modificar preguntas en `<dl class="faq-list">`. Incrementar el ID numérico:
```html
<div class="faq-item">
  <dt class="faq-question">
    <button class="faq-btn" aria-expanded="false" aria-controls="faq-6">
      ¿Nueva pregunta?
      <svg class="faq-icon">...</svg>
    </button>
  </dt>
  <dd class="faq-answer" id="faq-6" hidden>
    Respuesta nueva.
  </dd>
</div>
```

### Editar datos de contacto
Buscar y reemplazar en ambos HTML (`index.html` y `eu/index.html`):
- Teléfono principal: `943507746`
- Teléfono emergencias: `695801757`
- WhatsApp: `654344407`
- Email: `ventas3@tienclimatek.eus`
- Dirección: `Nafarroa Etorbidea 27`

---

## 🔧 Desarrollo Local

### Iniciar servidor local
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# VS Code
# Instala la extensión "Live Server" y haz click en "Go Live"
```

Accede a `http://localhost:8000`. La versión euskera estará en `http://localhost:8000/eu/`.

### Debugging
- **DevTools (F12)** — Console para errores, Network para llamadas a Formspree
- **Lighthouse** — Auditoría de rendimiento, accesibilidad y SEO
- **Device toolbar (Ctrl+Shift+M)** — Probar responsive

---

## 🔮 Mejoras Futuras

### Corto Plazo
- [ ] Optimizar imágenes a formato WebP con `srcset`
- [ ] Añadir `sitemap.xml` y `robots.txt`
- [ ] Integrar reCAPTCHA v3 para protección anti-spam
- [ ] Testing cross-browser (Safari iOS, Samsung Internet)

### Mediano Plazo
- [ ] Sección de testimonios / casos de éxito
- [ ] Galería de instalaciones realizadas
- [ ] Blog con artículos sobre eficiencia energética
- [ ] Chat en vivo o widget de WhatsApp

### Largo Plazo
- [ ] Sistema de reservas online
- [ ] Área de cliente para seguimiento de presupuestos
- [ ] Integración con CRM
- [ ] Versión en inglés

---

## 📞 Soporte y Contacto

**Por errores o sugerencias:**
- Email: ventas3@tienclimatek.eus
- Web: https://tienclimatek.eus

---

## 📄 Licencia

© 2026 Tienclimatek · Soluciones Energéticas. Todos los derechos reservados.

---

**Última actualización:** 4 de Mayo, 2026
