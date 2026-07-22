/**
 * ----------------------------------------------------------------------
 * ANALÍTICA - EVENTOS DE CONVERSIÓN
 * PhyMaC Web Page
 * ----------------------------------------------------------------------
 * Carga GA4 y/o Meta Pixel SOLO si hay un ID configurado en
 * CONFIG.analytics. Sin IDs, el sitio no pide nada a terceros y
 * trackEvent() se convierte en una operación sin efecto.
 *
 * Eventos que emite el sitio:
 *   lead_material          → alguien descargó una guía (episodio, material)
 *   agenda_calificado      → el formulario de agenda calificó al prospecto
 *   agenda_no_calificado   → el formulario de agenda NO lo calificó
 *   reunion_reservada      → se abrió/confirmó la reserva en el calendario
 */

(function () {
  'use strict';

  var loaded = false;

  function analyticsConfig() {
    if (typeof CONFIG === 'undefined' || !CONFIG.analytics) return {};
    return CONFIG.analytics;
  }

  /**
   * Inyecta un <script> externo en el head.
   */
  function loadScript(src) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
    return s;
  }

  /**
   * Inicializa GA4 si hay measurement ID.
   */
  function initGA4(id) {
    if (!id) return;

    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id));

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });
  }

  /**
   * Inicializa Meta Pixel si hay pixel ID.
   */
  function initMetaPixel(id) {
    if (!id) return;

    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    window.fbq('init', id);
    window.fbq('track', 'PageView');
  }

  /**
   * Arranca la analítica. Idempotente: llamarla dos veces no duplica scripts.
   */
  function initAnalytics() {
    if (loaded) return;
    loaded = true;

    var cfg = analyticsConfig();
    initGA4(cfg.ga4Id);
    initMetaPixel(cfg.metaPixelId);
  }

  /**
   * Registra un evento de conversión en los destinos disponibles.
   * Seguro de llamar aunque no haya ninguna analítica configurada.
   *
   * @param {string} name   Nombre del evento (ej. 'lead_material')
   * @param {Object} params Parámetros adicionales (ej. { episodio, material })
   */
  function trackEvent(name, params) {
    var payload = params || {};
    var cfg = analyticsConfig();

    if (cfg.debug) {
      console.info('[analytics]', name, payload);
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', name, payload);
    }

    if (typeof window.fbq === 'function') {
      // Meta usa Lead como evento estándar para captura de datos
      var estandar = { lead_material: 'Lead', agenda_calificado: 'Lead', reunion_reservada: 'Schedule' };
      if (estandar[name]) {
        window.fbq('track', estandar[name], payload);
      } else {
        window.fbq('trackCustom', name, payload);
      }
    }
  }

  window.initAnalytics = initAnalytics;
  window.trackEvent = trackEvent;

  // Autoarranque: no dependemos de main.js porque algunas páginas
  // (post.html, episodio.html) hidratan sus componentes por su cuenta.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
  } else {
    initAnalytics();
  }
})();
