# PhyMaC — Guía de las nuevas funcionalidades

### Episodios, Biblioteca y Agenda con calificación

> **Estado:** Implementado en la rama `feat/episodios-biblioteca-agenda` · **Fecha:** 21 de julio de 2026 · **Repo:** `PacTal/PhyMaC_web_page`

Este documento es para ti, Johannes. Explica qué hay que configurar antes de publicar, cómo crear episodios desde el CMS y qué cosas conviene no tocar.

---

## Índice

1. [Antes que nada: revisar y mezclar la rama](#1-antes-que-nada-revisar-y-mezclar-la-rama)
2. [Configuración pendiente (4 valores)](#2-configuración-pendiente-4-valores)
3. [Cómo crear un episodio nuevo](#3-cómo-crear-un-episodio-nuevo)
4. [Cómo funciona la Biblioteca](#4-cómo-funciona-la-biblioteca)
5. [Cómo ajustar el filtro de la agenda](#5-cómo-ajustar-el-filtro-de-la-agenda)
6. [Qué NO tocar](#6-qué-no-tocar)
7. [Qué revisar antes de publicar](#7-qué-revisar-antes-de-publicar)
8. [Decisiones que quedaron abiertas](#8-decisiones-que-quedaron-abiertas)

---

## 1. Antes que nada: revisar y mezclar la rama

Nada de esto está en producción todavía. Vive en la rama `feat/episodios-biblioteca-agenda`.

Para verlo en tu computador:

```bash
git checkout feat/episodios-biblioteca-agenda
npm install
npm run build
python -m http.server 8000
```

Abre `http://localhost:8000` y date una vuelta por las páginas nuevas: `/profes.html`, `/biblioteca.html`, `/contacto.html`, `/privacidad.html`.

**Ojo:** yo no abrí un navegador real para verificar cómo se ve. Probé que el código corre, que los datos se generan bien y que las páginas responden, pero el aspecto visual necesita tu ojo. Si algo se ve raro, es más probable que sea un ajuste de estilo que un error de fondo.

Cuando estés conforme:

```bash
git checkout main
git merge feat/episodios-biblioteca-agenda
git push
```

Netlify redespliega solo.

---

## 2. Configuración pendiente (4 valores)

Todo funciona hoy con respaldos razonables, pero hay cuatro campos vacíos en `config.js`. Ninguno rompe el sitio si lo dejas así; simplemente no aprovechas la funcionalidad completa.

### 2.1 Endpoints de Formspree (recomendado, 5 minutos)

Ahora mismo las descargas de guías y las solicitudes de reunión llegan **mezcladas** con los mensajes de contacto general, en la misma bandeja. Para separarlas:

1. Entra a [formspree.io](https://formspree.io) con tu cuenta.
2. Crea un formulario nuevo. Llámalo **"Materiales PhyMaC"**.
3. Copia su URL completa (se ve así: `https://formspree.io/f/abcdwxyz`).
4. Repite y crea otro llamado **"Agenda PhyMaC"**.
5. En `config.js`, pega cada URL en su lugar:

```js
formspree: {
  endpoint: "https://formspree.io/f/xkgdzeda",   // contacto general, no lo toques
  materiales: "https://formspree.io/f/AQUI",     // ← pega el de Materiales
  agenda: "https://formspree.io/f/AQUI"          // ← pega el de Agenda
}
```

**Por qué vale la pena:** sin esto no puedes responder "¿qué episodio genera más descargas?" ni filtrar los prospectos calificados de los que solo exploraban.

### 2.2 Cal.com (necesario para que la agenda sirva)

Mientras esté vacío, quien califique verá un botón de WhatsApp en lugar del calendario. Funciona, pero pierdes el agendamiento automático.

1. Crea tu cuenta gratis en [cal.com](https://cal.com).
2. Crea un tipo de evento (por ejemplo, "Reunión PhyMaC · 30 min").
3. Tu enlace se verá así: `https://cal.com/fundacion-phymac/30min`.
4. En `config.js` pega **solo la parte final**, sin el dominio:

```js
agenda: {
  calLink: "fundacion-phymac/30min",   // ← sin "https://cal.com/"
  calOrigin: "https://cal.com",
```

El nombre y el correo de quien llenó el formulario se pasan solos al calendario, así que no los tiene que escribir dos veces.

### 2.3 Google Analytics (opcional)

Sin esto no se carga **ningún** script de terceros y no se mide nada. Si quieres medir:

1. Entra a [analytics.google.com](https://analytics.google.com) → Administrar → Flujos de datos → Web.
2. Copia el "ID de medición" (empieza con `G-`).
3. Pégalo en `config.js`:

```js
analytics: {
  ga4Id: "G-XXXXXXXXXX",
  metaPixelId: "",
  debug: false        // ponlo en true para ver los eventos en la consola del navegador
}
```

Los eventos que se registran solos: `lead_material` (descarga de guía, con episodio y material), `agenda_calificado`, `agenda_no_calificado` y `reunion_reservada`.

### 2.4 Canal de YouTube (opcional)

El botón "Ver en YouTube" de `profes.html` está oculto hasta que pongas la URL:

```js
serie: {
  youtube: "https://www.youtube.com/@tucanal",
```

---

## 3. Cómo crear un episodio nuevo

Entra a `phymac.com/admin/` como siempre. Ahora verás **dos colecciones** en la barra lateral: "Artículos del Blog" y **"Hablando con profes (Episodios)"**.

Entra a la segunda y dale **New Episodio**. Los campos:

| Campo | Qué poner |
|---|---|
| **Título del episodio** | El título visible. Puede tener tildes y espacios. |
| **Slug (URL)** | Sin espacios ni tildes, solo minúsculas y guiones: `ep-02-la-ia-en-el-aula`. El CMS te avisa si escribes algo inválido. |
| **Número de episodio** | 1, 2, 3... Define el orden en el listado. |
| **Temporada** | 1 por ahora. |
| **Fecha de publicación** | La que corresponda. |
| **Estado** | `Próximamente` mientras grabas; `Publicado` cuando tengas el video. |
| **ID del video de YouTube** | Puedes pegar la URL completa y el sistema extrae el ID solo. |
| **Invitado(s)** | Opcional. Se muestra como "Con [nombre]". |
| **Miniatura** | Opcional. Si la dejas vacía y hay video, se usa la miniatura de YouTube. |
| **Resumen corto** | Obligatorio. Es lo que se ve en la tarjeta del listado. |
| **Notas del episodio** | Opcional, formato libre con títulos, listas y enlaces. |
| **Temas / etiquetas** | Una por línea. Sirven para filtrar la Biblioteca. |
| **¿Destacado?** | Si lo activas, ese episodio sube al principio del listado. |

Dale **Publish** y listo. En dos o tres minutos Netlify redespliega y el episodio aparece en `profes.html` sin que nadie toque código.

### Dos comportamientos que conviene conocer

- Si marcas **Publicado** pero dejas el video vacío, el sistema lo baja automáticamente a "Próximamente". Es a propósito: es mejor mostrar "muy pronto" que un reproductor roto.
- El **slug no se debe cambiar** una vez publicado. Si lo cambias, los enlaces que ya compartiste dejan de funcionar y muestran "Episodio no encontrado".

---

## 4. Cómo funciona la Biblioteca

La Biblioteca **no es una colección aparte**. Se arma sola con los episodios que tengan guía. No hay nada que mantener por separado.

Para que un material aparezca en `biblioteca.html`, en el episodio tienes que llenar:

- **Archivo de la guía (PDF)** — obligatorio. Sin esto no pasa nada.
- **Título de la guía** — el nombre visible del material.
- **Descripción de la guía** — un párrafo corto.
- **Portada de la guía** — opcional pero recomendada, es lo que se ve en la tarjeta.
- **¿Mostrar en la Biblioteca?** — déjalo activado.

### Cómo se entrega el material

Elegiste **enlace en pantalla**, así que el flujo es:

1. La persona ve el material en la Biblioteca o en la página del episodio.
2. Le da a "Descargar" y aparece el formulario: nombre, correo, rol, institución (opcional) y la casilla de autorización.
3. Al enviar, sus datos te llegan por Formspree y **el botón de descarga aparece ahí mismo**.

Sin llenar el formulario no hay descarga. Si alguien ya descargó antes, sus datos quedan prellenados para que no tenga que escribirlos de nuevo, pero igual tiene que enviar el formulario — así cada descarga queda registrada.

Un mismo material aparece en dos lugares: en la página de su episodio y en la Biblioteca. Es el mismo formulario en ambos.

---

## 5. Cómo ajustar el filtro de la agenda

La regla actual está en `config.js` y es la que propuso el brief. **Un prospecto califica si cumple las tres condiciones:**

- Su rol es "decido" **o** "recomiendo" (queda fuera "solo estoy consultando")
- Su plazo **no** es "solo estoy explorando"
- Tiene presupuesto "sí" **o** "en gestión" (queda fuera "todavía no")

```js
reglas: {
  rolesValidos: ["decido", "recomiendo"],
  plazosExcluidos: ["explorando"],
  presupuestosValidos: ["si", "gestion"]
}
```

Si te está llegando poca gente al calendario, **abre el filtro**. Por ejemplo, para aceptar también a quien todavía no tiene presupuesto:

```js
presupuestosValidos: ["si", "gestion", "no"]
```

Si te llega demasiada gente que no concreta, **ciérralo**: quita `"gestion"`.

Además de calificar o no, cada respuesta lleva un **puntaje de 0 a 13** que te llega en el correo. No decide nada, es solo para que priorices a quién llamar primero. Los pesos están en `config.js`, en `agenda.puntajes`.

**Importante:** todas las respuestas se guardan, califiquen o no. A quien no califica no se le cierra la puerta: se le ofrece la Biblioteca, la página de servicios y WhatsApp.

---

## 6. Qué NO tocar

| Archivo | Por qué |
|---|---|
| `blog-data.js` y `episodios-data.js` | Se generan solos en cada despliegue. Cualquier cosa que edites ahí se pierde. El contenido real vive en `content/`. |
| El `slug` de un episodio publicado | Rompe todos los enlaces compartidos. |
| El `media_folder` en `admin/config.yml` | Está comentado en el archivo. Decap resuelve ese campo relativo al archivo de la entrada, no a la raíz del repo, y cambiarlo rompe las subidas de imágenes en silencio. |
| La casilla de consentimiento de cualquier formulario | Es requisito de la Ley 1581 de 2012, no una decisión de diseño. |

Si alguna vez agregas un formulario nuevo, tiene que llevar la casilla de autorización con el enlace a `privacidad.html`, sin marcar por defecto.

---

## 7. Qué revisar antes de publicar

Una pasada rápida, sobre todo en celular:

- [ ] El menú abre y cierra bien. Quedó en 5 secciones (Servicios · Hablando con profes · Blog · Publicaciones · Contacto); Inicio lo cubre el logo, y El método y Biblioteca bajaron al footer. El hamburguesa aparece por debajo de 1024px.
- [ ] El inicio muestra la ventana "Lo más reciente" del blog en lugar de la galería de proyectos.
- [ ] `profes.html` muestra el episodio de ejemplo que dejé cargado.
- [ ] `episodio.html?slug=ep-01-hablando-con-profes` reproduce el video de la serie.
- [ ] Un slug inventado (`episodio.html?slug=cualquier-cosa`) muestra "Episodio no encontrado".
- [ ] `biblioteca.html` muestra el mensaje de "La Biblioteca está por abrir" — es correcto, el episodio 1 todavía no tiene guía.
- [ ] En `contacto.html`, las tarjetas **Correo** y **Agendar reunión** intercambian el formulario de abajo (WhatsApp sí sale del sitio).
- [ ] El formulario de correo envía y muestra el mensaje de confirmación.
- [ ] Prueba **los dos caminos** del formulario de agenda: uno que califique (decido + este mes + presupuesto sí) y otro que no (solo consultando + explorando + sin presupuesto).
- [ ] El footer ya no lleva formulario en ninguna página: ahora muestra dos botones, "Escríbenos" (a Contacto) y WhatsApp. En `contacto.html` ni siquiera eso, porque ya estás ahí.
- [ ] Revisa `privacidad.html`: los datos del responsable, el correo y los plazos son los que redacté a partir de la ley. **Léelos y confirma que reflejan cómo manejas los datos de verdad.** Es un documento legal con tu nombre.

Sobre el episodio 1 (`content/episodios/ep-01-hablando-con-profes.md`): es contenido **real**, migrado del artículo del blog que tenías, con su video (`eRXzo_VgzlU`) y su texto. Si ese video es la presentación de la serie y no el episodio 1 propiamente, cambia el número y el título desde el CMS.

---

## 8. Decisiones que quedaron abiertas

Estas las tomamos al empezar y conviene tenerlas presentes:

**Formspree en vez de Supabase.** Elegiste la vía rápida. Funciona bien, pero no puedes deduplicar por correo, ni consultar qué episodio convierte mejor, ni exportar la base para seguimiento. Si eso te empieza a estorbar, migrar después es cambiar solo la función de envío en `components/lead-form.js`; el resto del sitio no se toca.

**Enlace en pantalla, sin correo automático.** Cero fricción y cero configuración, pero no verificas que el correo sea real. Si empiezas a ver correos falsos, se activa el autoresponder de Formspree y se agrega el envío por correo.

**El diseño se unificó con el sitio.** Tu borrador de `profes.html` usaba otra paleta (`#2b4de0`) y otras tipografías (Fredoka). Quedó con la identidad del resto del sitio: `#2962FF`, `#FF6D00`, Montserrat y Open Sans. La estructura y las secciones de tu borrador se conservaron.

**Lo que el brief daba por hecho y no era así.** Tres cosas que corregí sobre la marcha: el sitio sí tiene un paso de compilación (el blog no lee markdown en vivo); el bug de "slug inexistente muestra otro contenido" no existía, `post.html` ya lo manejaba bien; y `profes.html` no estaba en el repositorio, era un borrador tuyo.
