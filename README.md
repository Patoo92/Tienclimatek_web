# Tienclimatek - Documentación de la Página Web

Página web profesional de Tienclimatek, especializada en instalación y mantenimiento de calderas, aire acondicionado y sistemas energéticos en Euskadi y Madrid.

## 📋 Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Características Principales](#características-principales)
4. [Guía de Componentes](#guía-de-componentes)
5. [Sistema de Temas](#sistema-de-temas)
6. [Formulario de Contacto](#formulario-de-contacto)
7. [SEO y Metadata](#seo-y-metadata)
8. [Accesibilidad](#accesibilidad)
9. [Mobile-First Responsive](#mobile-first-responsive)
10. [Rendimiento](#rendimiento)
11. [Mejoras Futuras](#mejoras-futuras)

---

## 📁 Estructura del Proyecto

```
tienclimatek_web/
├── index.html              # Página principal (español)
├── eu/
│   └── index.html         # Página principal (euskera) - URLs limpias
├── css/
│   └── styles.css         # Estilos consolidados
├── js/
│   └── main.js            # Lógica JavaScript
├── assets/
│   ├── images/
│   │   ├── logos/         # Logos de marcas
│   │   ├── og-tienclimatek.jpg
│   │   └── favicon-*.png
│   └── ...
├── README.md              # Documentación completa
├── SETUP_QUICK.md         # Guía rápida de configuración
└── ...
```

---

## 🚀 Instalación y Configuración

### Requisitos
- Servidor web con soporte HTTP/HTTPS
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Compte de Formspree para formulario

### Pasos de Configuración

#### 1. Desplegar los archivos
Sube la carpeta `tienclimatek_web/` a tu servidor web.

#### 2. Configurar Formspree (Formulario de Contacto)
El formulario envía datos a través de [Formspree](https://formspree.io):

**Pasos:**
1. Accede a formspree.io
2. Crea una cuenta con tu email
3. Crea un nuevo formulario (proyecto)
4. Copia tu **Form ID** (formato: `mtjknbvy`)
5. Reemplaza `YOUR_FORMSPREE_ID` en:
   - `index.html` línea ~807
   - `eu/index.html` línea ~807 (URLs limpias - sin sufijo _eu)

**Ejemplo:**
```html
<form ... action="https://formspree.io/f/mtjknbvy" ...>
```

#### 3. HTTPS
Se recomienda SSL/TLS para proteger datos del formulario. Recibirás advertencias en navegadores si usas HTTP.

---

## ✨ Características Principales

### 🎨 Diseño
- **Dark Mode & Light Mode**: Toggle en la navegación
- **Mobile-First**: Optimizado para todos los dispositivos
- **Responsive**: 4 breakpoints (mobile, tablet, desktop, extra-large)
- **Animaciones**: Reveal animations al scroll, fade-ups al cargar

### 📱 Componentes
- **Navegación fija** con hamburger menu en mobile
- **Hero section** con animación y gradiente
- **Grid de servicios** (8 tarjetas, 4 en escritorio)
- **Carrusel de marcas** con scroll infinito
- **Sección de zonas** geográficas
- **Proceso de 4 pasos**
- **FAQ Accordion** interactivo con keyboard navigation
- **Formulario de contacto** con validación inline
- **Infobar** con contacto rápido

### 🌐 Multiidioma
- **Español**: `/index.html` (raíz)
- **Euskera**: `/eu/index.html` (URLs limpias - DirectoryIndex friendly)
- **Switch de idioma** en navegación y footer con links relativos

### ♿ Accesibilidad
- Skip link para saltar navegación
- ARIA labels en todos los botones
- Navegación por teclado (Tab, Enter, Escape)
- Validación con mensajes de error inline
- Contraste de colores WCAG AA
- Semántica HTML correcta

---

## 🎯 Guía de Componentes

### Navegación
```html
<nav role="navigation" aria-label="Navegación principal">
  <!-- Logo -->
  <!-- Links (desktop) -->
  <!-- Hamburger (mobile) -->
  <!-- Theme toggle -->
  <!-- Language switch -->
</nav>
```
**Clases CSS principales:**
- `.nav-links` - Lista de navegación
- `.nav-hamburger` - Botón hamburger
- `.theme-toggle` - Toggle claro/oscuro
- `.nav-cta` - Call-to-action principal

### Hero Section
```html
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-left">
    <p class="hero-eyebrow">SUBTITLE</p>
    <h1 class="hero-title">TITLE</h1>
    <p class="hero-desc">DESCRIPTION</p>
    <div class="hero-actions">
      <a class="btn-primary">CTA Primary</a>
      <a class="btn-secondary">CTA Secondary</a>
    </div>
  </div>
  <div class="hero-right">
    <img src="..." alt="...">
  </div>
  <div class="hero-badge"><!-- Stats --></div>
</section>
```
**Breakpoints:**
- Mobile: 1 columna, sin imagen
- Tablet (≥640px): 1 columna
- Desktop (≥900px): 2 columnas con imagen y badge
- XL (≥1280px): Padding aumentado

### Grid de Servicios
```html
<div class="services-grid">
  <article class="service-card">
    <svg class="service-icon">...</svg>
    <h3 class="service-name">Nombre</h3>
    <p class="service-text">Descripción</p>
    <a href="#contacto" class="service-cta-link">Presupuesto →</a>
    <span class="service-number" aria-hidden="true">1</span>
  </article>
  <!-- 8 tarjetas total -->
</div>
```
**Sistema de Grid:**
- Mobile: 1 columna
- Tablet: 2 columnas
- Desktop: `repeat(auto-fit, minmax(240px, 1fr))` para flexibilidad
- XL: 4 columnas (`repeat(4, 1fr)`)

### FAQ Accordion
```html
<section class="faq-section" id="faq">
  <div class="faq-inner">
    <h2 class="faq-title">FAQ</h2>
    <div class="faq-list">
      <div class="faq-item">
        <h3 class="faq-question">
          <button class="faq-btn" 
                  aria-controls="faq-1" 
                  aria-expanded="false">
            Pregunta
            <svg class="faq-icon">...</svg>
          </button>
        </h3>
        <div id="faq-1" class="faq-answer" hidden>
          Respuesta
        </div>
      </div>
    </div>
  </div>
</section>
```
**Keyboard Navigation:**
- Tab: Navegar entre preguntas
- Enter/Space: Abrir/cerrar respuesta
- Arrow Up/Down: Navegar (opcional, implementable)

### Formulario de Contacto
```html
<form class="cf-form" id="contactForm" 
      method="POST" 
      action="https://formspree.io/f/YOUR_FORMSPREE_ID">
  <div class="cf-row">
    <label class="cf-label" for="cf-nombre">
      Nombre <span class="cf-req">*</span>
    </label>
    <input class="cf-input" id="cf-nombre" name="nombre" required>
    <!-- Error message aparecerá aquí si es inválido -->
  </div>
  <!-- Más campos... -->
  <button class="cf-submit btn-primary" onclick="submitForm(event)">
    Enviar
  </button>
  <div class="cf-success" id="cfSuccess" role="alert">
    ¡Mensaje enviado!
  </div>
</form>
```

**Campos:**
- `cf-nombre` - Nombre (requerido)
- `cf-cp` - Código postal (requerido)
- `cf-tel` - Teléfono (requerido)
- `cf-mail` - Email (requerido, validación @)
- `cf-comentario` - Comentario (requerido)
- `cf-asunto` - Asunto (Select, opcional)
- `cf-rgpd` - Checkbox RGPD (requerido)

**Estados:**
- Inválido: Border rojo + mensaje de error en rojo
- Enviando: Botón deshabilitado + "Enviando…"
- Enviado: Mensaje de éxito + Foto verde

---

## 🎨 Sistema de Temas

### Variables CSS

#### Dark Mode (Default)
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

#### Light Mode
```css
[data-theme="light"] {
  --dark:      #F0F4FA;
  --dark2:     #E4EAF4;
  --dark3:     #D8E0EE;
  --mid:       #C8D4E8;
  --text-muted:#5A6A84;
  --off-white: #0D1422;
  --yellow:    #1565C0;   /* Swap a azul */
  --yellow-dark: #0F4FA8;
}
```

### Aplicar Tema
```javascript
// Detectar tema guardado
const saved = localStorage.getItem('tc-theme') || 'dark';
if (saved === 'light') {
  html.setAttribute('data-theme', 'light');
}

// Alternar tema
html.setAttribute('data-theme', 'light');  // Activar light
html.removeAttribute('data-theme');        // Volver a dark
```

### Personalizar Colores
Edita las variables en `styles.css` línea 1-18 (`:root`).

---

## 📧 Formulario de Contacto

### Flujo de Envío
1. Usuario rellena formulario
2. Click en "Enviar"
3. `submitForm(event)` realiza validación:
   - ✅ Campos requeridos no vacíos
   - ✅ Email contiene @
   - ✅ Checkbox RGPD marcado
4. Si error: Mostrar mensaje bajo campo + focus en primer error
5. Si válido: Enviar a Formspree via fetch
6. Mostrar estado: "Enviando…"
7. Si OK: Mostrar mensaje de éxito, resetear form
8. Si Error: Mostrar "Error al enviar"

### Validación Inline
**Mensajes de error en español:**
- `nameReq`: "El nombre es obligatorio"
- `cpReq`: "El código postal es obligatorio"
- `telReq`: "El teléfono es obligatorio"
- `mailReq`: "Correo electrónico inválido"
- `commentReq`: "El comentario es obligatorio"
- `rgpd`: "Debes aceptar la política de privacidad RGPD"

**Mensajes en euskera:** Traducidos en `main.js` línea 20-40

### Troubleshooting
- **"Error al enviar"**: Verifica que Formspree ID es correcto
- **No recibo emails**: Comprueba en spam, o usa dirección diferente en Formspree
- **CORS error**: Solo puedes hacer POST a Formspree desde cualquier origen

---

## 🔍 SEO y Metadata

### Meta Tags Implementados
- `title`: Único para cada idioma
- `description`: 160 caracteres (recomendado)
- `keywords`: Relevantes para búsqueda local
- `author`: Tienclimatek
- `robots`: index, follow
- `canonical`: URL única por idioma

### Open Graph (Social Media)
```html
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="Título">
<meta property="og:description" content="Descripción">
<meta property="og:image" content="URL imagen 1200x630">
```

### Hreflang (Internacional)
```html
<link rel="alternate" hreflang="es" href="https://tienclimatek.eus/">
<link rel="alternate" hreflang="eu" href="https://tienclimatek.eus/eu/">
<link rel="alternate" hreflang="x-default" href="https://tienclimatek.eus/">
```

### JSON-LD Schema
Incluye schema.org para:
- **LocalBusiness**: Información de negocio
- **Organization**: Logo, contacto, redes sociales
- **OfferCatalog**: Servicios ofrecidos con descripción

---

## ♿ Accesibilidad

### Skip Link
```html
<a class="skip-link" href="#contenido-principal">
  Ir al contenido principal
</a>
```
Presiona Tab al cargar la página para acceder.

### Navegación por Teclado
- **Tab**: Navegar entre elementos focusables
- **Enter/Space**: Activar botones, links, checkboxes
- **Escape**: Cerrar menú hamburger, menu móvil
- **Arrow Keys**: Navegación en FAQ (opcional)

### ARIA Labels
```html
<button aria-label="Abrir menú">☰</button>
<div class="faq-item" aria-label="Pregunta frecuente 1">
<dl role="group" aria-label="Datos de contacto">
```

### Contraste de Colores
- Texto en fondo oscuro: #F4F6FA en #0B0F17 = 16.5:1
- Cumple **WCAG AAA**

---

## 📱 Mobile-First Responsive

### Breakpoints
```css
/* Mobile (< 480px) - Default styles */
/* Extra small adjustments (≤ 479px) */
@media (max-width: 479px) { ... }

/* Tablet (≥ 640px) */
@media (min-width: 640px) { ... }

/* Tablet landscape / Small desktop (≥ 900px) */
@media (min-width: 900px) { ... }

/* Full desktop (≥ 1280px) */
@media (min-width: 1280px) { ... }
```

### Componentes Responsivos

#### Hero
- **Mobile**: 1 col, sin imagen, padding 96px horizontal
- **Tablet**: 1 col, sin imagen, padding 120px horizontal
- **Desktop**: 2 cols, con imagen, padding 130px horizontal

#### Services Grid
- **Mobile**: 1 col
- **Tablet**: 2 cols
- **Desktop**: `repeat(auto-fit, minmax(240px, 1fr))`
- **XL**: `repeat(4, 1fr)`

#### Contact Infobar
- **Mobile**: Flex column, separadores ocultos
- **Tablet**: Flex row, separadores visibles
- **Desktop**: Gap 32px, padding 80px

---

## ⚡ Rendimiento

### Optimizaciones Implementadas

#### 1. Preconnect & Preload
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="css/styles.css" as="style">
```

#### 2. Lazy Loading de Imágenes
Agrega `loading="lazy"` a imágenes bajo the fold:
```html
<img src="..." loading="lazy" alt="...">
```

#### 3. Fonts Optimizadas
Google Fonts con `display=swap`:
```html
family=...&display=swap
```

#### 4. fetchpriority en Hero
```html
<img src="hero.jpg" fetchpriority="high" alt="...">
```

#### 5. CSS Consolidado
Todo en un único `styles.css` (no importa de HTML inline).

#### 6. Smooth Scroll Nativo
```css
html { scroll-behavior: smooth; }
```

---

## 🔮 Mejoras Futuras

### Corto Plazo (Próximas 2 semanas)
- [ ] Integrar reCAPTCHA v3 para validación
- [ ] Testing en navegadores antiguos
- [ ] Optimizar imágenes (WebP, srcset)
- [ ] Añadir sitemap.xml y robots.txt

### Mediano Plazo (Próximo mes)
- [ ] Blog/Recursos educativos
- [ ] Casos de éxito / Testimonios
- [ ] Galería de instalaciones
- [ ] Chat en vivo (Intercom, Drift)
- [ ] Newsletter signup

### Largo Plazo (3+ meses)
- [ ] Sistema de reservas online
- [ ] Dashboard de cliente (tracking presupuestos)
- [ ] FAQ basada en IA
- [ ] Versión en más idiomas (Inglés)
- [ ] Integración con CRM (Salesforce, HubSpot)

---

## 📖 Guía de Edición

### Editar Contenido Hero
Archivo: `index.html` línea 350-380

```html
<p class="hero-eyebrow">CAMBIAR AQUÍ</p>
<h1 class="hero-title">CAMBIAR AQUÍ</h1>
<p class="hero-desc">CAMBIAR AQUÍ</p>
```

### Editar Servicios
Archivo: `index.html` línea 400-520

Cada tarjeta:
```html
<article class="service-card">
  <svg class="service-icon"><!-- SVG aquí --></svg>
  <h3 class="service-name">NOMBRE SERVICIO</h3>
  <p class="service-text">DESCRIPCIÓN</p>
</article>
```

### Editar FAQ
Archivo: `index.html` línea 650-720

```html
<div class="faq-item">
  <h3 class="faq-question">
    <button class="faq-btn" aria-controls="faq-1" aria-expanded="false">
      ¿PREGUNTA?
      <svg class="faq-icon">...</svg>
    </button>
  </h3>
  <div id="faq-1" class="faq-answer" hidden>
    RESPUESTA
  </div>
</div>
```

### Editar Datos de Contacto
Archivo: `index.html` línea 900 (contacto info y infobar)

Cambiar teléfono, email, ubicación en:
- `<a href="tel:+34747425656">`
- `<a href="mailto:ventas3@tienclimatek.eus">`
- Ubicación en infobar

---

## 🔧 Desarrollo Local

### Requisitos
- Editor de código (VS Code, Sublime, etc.)
- Servidor local (Live Server, Python -m http.server, etc.)

### Iniciar Servidor Local
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node (npx)
npx http-server
```

Accede a `http://localhost:8000`

### Debugging
- Abre DevTools (F12)
- Console: Errores y logs
- Network: Llamadas a Formspree
- Elements: Estructura HTML
- Lighthouse: Auditoría de rendimiento

---

## 📞 Soporte y Contacto

**Por errores o sugerencias:**
- Email: ventas3@tienclimatek.eus
- Teléfono: 747 42 56 56
- Web: https://tienclimatek.eus

---

## 📄 Licencia

© 2026 Tienclimatek. Todos los derechos reservados.

---

**Última actualización:** 27 de Marzo, 2026
