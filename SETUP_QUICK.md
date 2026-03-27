# 🚀 Guía de Configuración Rápida - Tienclimatek

## ⚡ 5 Minutos para Poner en Producción

### Paso 1: Obtener ID de Formspree
1. Ve a https://formspree.io
2. Crea una cuenta (usa tu email de negocio)
3. Haz click en "New Project"
4. Ingresa tu email donde quieres recibir los formularios
5. **Copia tu Form ID** (ej: `mtjknbvy`)

### Paso 2: Configurar en HTML
Reemplaza `YOUR_FORMSPREE_ID` en dos archivos:

**Archivo 1: `index.html` (línea ~807)**
```html
<!-- ANTES -->
<form ... action="https://formspree.io/f/YOUR_FORMSPREE_ID" ...>

<!-- DESPUÉS -->
<form ... action="https://formspree.io/f/mtjknbvy" ...>
```

**Archivo 2: `eu/index.html` (línea ~807)** - Mismo cambio
```html
<!-- Archivo renombrado en carpeta eu/ para URLs limpias -->
```

### Paso 3: Desplegar

#### Opción A: Subir a Hosting
1. Conecta via FTP/SFTP
2. Sube la carpeta `tienclimatek_web/` completa
3. Asegúrate que `index.html` esté en raíz de tu dominio

#### Opción B: Usar Netlify (Gratis)
1. Ve a https://netlify.com
2. Drag & drop la carpeta `tienclimatek_web/`
3. Listo, obtiene URL automáticamente

#### Opción C: GitHub Pages
1. Crea repo en GitHub
2. Push los archivos
3. Enable GitHub Pages en Settings

### Paso 4: Probar Formulario
1. Abre `https://tudominio.com`
2. Completa el formulario
3. Click "Enviar"
4. Revisa tu email (incluido spam)

---

## 🛠️ Configuración Avanzada (Opcional)

### SSL/HTTPS (Recomendado)
El formulario enviará datos en texto plano sin HTTPS. Para producción:
- **Hosting**: Solicita certificado SSL (a menudo gratis con Let's Encrypt)
- **Netlify**: Automático con HTTPS
- **GitHub Pages**: Automático con HTTPS

### Dominio Personalizado
1. Compra dominio (GoDaddy, Namecheap, etc.)
2. Configura DNS pointing a tu servidor
3. Actualiza URL de Formspree si es necesario

### Email Personalizado en Formspree
Por defecto, Formspree envía desde noreply@formspree.io.
Para usar tu email:
1. En Formspree, ve a Settings
2. Configura "From email"
3. Formspree enviará desde tu dominio

### Configurar CNAME en Formspree (Avanzado)
Para ocultar que usas Formspree:
1. En Formspree Settings, genera CNAME
2. Añade registro DNS en tu registrador
3. Cambia action del form a tu subdominio

---

## 🐛 Troubleshooting

### El formulario no envía
- ✅ ¿Formspree ID es correcto? (Copia exacta)
- ✅ ¿Action apunta a dos archivos? (index.html y eu/index.html)
- ✅ ¿Campo `method="POST"`? (Debe estar en ambos)
- ✅ ¿HTTPS en producción? (Formspree requiere HTTPS)

### No recibo emails
- Revisa carpeta de spam
- Verifica que confirmaste tu email en Formspree
- Intenta con otro email en Formspree Settings

### Errores en Console Browser
- Si ves red error sobre reCAPTCHA: Normal, reCAPTCHA removido de momento
- Si ves errores de POST a Formspree: Revisa ID y configuración

### El formulario se envía pero no funciona
- Abre DevTools (F12) → Network
- Envía formulario de nuevo
- Busca el POST a `formspree.io`
- Verifica que status es 200 (éxito)

---

## 📋 Checklist Pre-Producción

- [ ] Formspree ID configurado en ambos HTMLs
- [ ] Teléfono/email de contacto actualizado
- [ ] SSL/HTTPS habilitado
- [ ] Dominio apunta correctamente
- [ ] Probé formulario en mobile
- [ ] Probé formulario en desktop
- [ ] Recibí email de prueba
- [ ] Analytics configurado (Google Analytics, etc.)
- [ ] Backup de archivos locales
- [ ] Dns propagado (esperar 24h en algunos casos)

---

## 📧 Campos del Formulario

Cuando alguien envíe el formulario, recibirás:
```
Nombre: Ana García López
Código postal: 20200
Teléfono: 647 123 456
Correo: ana@email.com
Asunto: Presupuesto aire acondicionado
Comentario: Tengo un piso de 85m2...
```

---

## 🔐 Seguridad

### Validación
- Campo email: Debe contener @
- Campos requeridos: No pueden estar vacíos
- RGPD: Debe estar marcado

### SPAM
Por ahora, sin captcha. Si recibes spam:
- Opción 1: Activa reCAPTCHA v3 (guía en README.md)
- Opción 2: Usa honeypot field (campo oculto)
- Opción 3: Rate limiting en Formspree

---

## 📱 Testing Responsive

### Devices Críticos
- iPhone 12 (390x844)
- iPhone SE (375x667)
- Galaxy S21 (360x800)
- iPad Air (820x1180)
- Desktop (1920x1080)

**Verificar en Chrome DevTools:**
1. F12
2. Ctrl+Shift+M (Device toolbar)
3. Selecciona device
4. Prueba formulario y scroll

---

## 🚨 Errores Comunes

### "Invalid site key" en Console
**Causa:** Intenta cargar reCAPTCHA sin configurar
**Solución:** Está removido, ignore el error por ahora

### Formulario envía pero no muestra "Enviado"
**Causa:** CORS/Network error
**Solución:** Abre DevTools → Network, envía, busca POST a formspree

### Checkbox RGPD no se marca
**Causa:** Bug en custom checkbox
**Solución:** Abre Issue o contacta soporte

---

## 🎓 Variables Dinámicas (Futuro)

Actualmente, datos de contacto en HTML. Opciones futuras:
- Usar `.env` para variables
- Backend para gestionar datos
- CMS como Strapi o Contentful

---

## 📞 Soporte

Si te atascas:
1. Consulta README.md (documentación completa)
2. Abre DevTools y revisa Network/Console
3. Contacta a soporte: ventas3@tienclimatek.eus

---

**¡Listo! Tu página web Tienclimatek está lista para producción.** 🎉
