# PhyMaC — Guía de las nuevas funcionalidades

### Episodios, Biblioteca y Agenda con calificación

> **Estado:** Implementado en la rama `feat/episodios-biblioteca-agenda` · **Fecha:** 21 de julio de 2026 · **Repo:** `PacTal/PhyMaC_web_page`

Este documento es para ti, Johannes. Explica qué hay que configurar antes de publicar, cómo crear episodios desde el CMS y qué cosas conviene no tocar.

---

## Índice

1. [Antes que nada: revisar y mezclar la rama](#1-antes-que-nada-revisar-y-mezclar-la-rama)
2. [Configuración pendiente](#2-configuración-pendiente)
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

## 2. Configuración pendiente

Los endpoints de Formspree ya están puestos. Quedan tres campos vacíos en `config.js`; ninguno rompe el sitio, pero sin ellos no aprovechas la funcionalidad completa.

### 2.1 Endpoints de Formspree — ✅ ya configurados

Los tres formularios están creados y conectados, cada uno a su propia bandeja:

| Formulario | Endpoint | Qué recibe |
|---|---|---|
| Mensajes | `xvzeqnlz` | El panel "Correo" de `contacto.html` |
| Materiales | `xpqvlebz` | Cada descarga de guía, con el episodio y el material |
| Agenda | `xkodzayg` | Solicitudes de reunión, con `calificado` y `puntaje` |

Así puedes responder de un vistazo qué episodio genera más descargas y separar
los prospectos calificados de los que solo estaban explorando.

**Falta probarlos.** Haz un envío real por cada uno y confirma que el correo
llega a la bandeja correcta:

1. **Mensajes** — `contacto.html` → tarjeta "Correo" → llena y envía.
2. **Materiales** — necesitas primero un episodio con guía en PDF (ver sección 4). Luego descárgala desde la Biblioteca.
3. **Agenda** — `contacto.html` → "Agendar reunión" → llena con *decido + este mes + presupuesto sí*.

Formspree pide confirmar el correo la primera vez que un formulario recibe algo,
así que revisa también la carpeta de spam.

### 2.2 Cal.com — ✅ ya configurado

Tu evento `fundacion-phymac-owlzje/30min` está conectado. Quien califique en el
formulario de agenda ve el calendario incrustado en la misma página, con su
nombre y correo ya rellenados para que no los escriba dos veces.

```js
agenda: {
  calLink: "fundacion-phymac-owlzje/30min",   // solo lo que va después de cal.com/
  calOrigin: "https://cal.com",
```

**Falta probarlo de punta a punta:** llena el formulario con *decido + este mes +
presupuesto sí*, confirma que aparece el calendario y reserva un espacio de
prueba. Revisa que la reserva llegue a tu Cal.com y bórrala después.

Si algún día cambias el enlace del evento en Cal.com, acuérdate de actualizar
esta línea: si no coincide, el calendario no carga y la página cae al botón de
WhatsApp sin avisar al visitante.

### 2.3 Google Analytics — ✅ ya configurado

Tu ID `G-ZHF7F3W5SJ` está puesto y GA4 se carga en **las diez páginas**.

Ojo con esto: las cinco páginas originales (inicio, blog, artículos, servicios y
publicaciones) no cargaban el script de analítica. Se agregó, porque si no GA4
solo habría medido las páginas nuevas y se habría perdido el grueso del tráfico.

Eventos de conversión que se registran solos:

| Evento | Cuándo se dispara |
|---|---|
| `lead_material` | Alguien descarga una guía (incluye episodio, material y rol) |
| `agenda_calificado` | El formulario de agenda califica al prospecto |
| `agenda_no_calificado` | No califica (útil para ver cuánta gente filtras) |
| `reunion_reservada` | Se confirma una reserva en Cal.com |
| `contacto_mensaje` | Se envía el formulario de correo |

Para verlos en vivo mientras pruebas, pon `debug: true` en `CONFIG.analytics` y
abre la consola del navegador: cada evento se imprime antes de enviarse.

Los eventos tardan hasta 24 h en aparecer en los informes normales de GA4, pero
en **Informes → Tiempo real** se ven en segundos.

### 2.4 Canal de YouTube — ✅ ya configurado

`https://www.youtube.com/@FundaciónPhyMaC` está conectado, así que el botón
"Ver en YouTube" ya aparece en la página de la serie.

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
| `blog-data.js`, `episodios-data.js` y `sitemap.xml` | Se generan solos en cada despliegue. Cualquier cosa que edites ahí se pierde. El contenido real vive en `content/`. |
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
