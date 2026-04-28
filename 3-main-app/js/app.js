/**
 * @file app.js
 * @description Punto de entrada de la aplicación.
 *              Orquesta servicios y renderizado del cliente web.
 * @author Mario García
 * @subject Programación Web
 */

import { IPService  } from './services/IPService.js';
import { GeoService } from './services/GeoService.js';
import { ClientInfo } from './models/ClientInfo.js';
import { UIRenderer } from './ui/UIRenderer.js';

// ─────────────────────────────────────────────────────────────────────────────
//  ⚠️  CONFIGURACIÓN: Reemplaza con tu API Key de https://ipgeolocation.io/
// ─────────────────────────────────────────────────────────────────────────────
const API_KEY = 'd1271f7268774df2b5dcf87c009127ad';

/**
 * Inicializa y ejecuta la aplicación de información del cliente.
 */
async function init() {
  const renderer   = new UIRenderer('info-grid');
  const ipService  = new IPService();
  const geoService = new GeoService(API_KEY);

  renderer.renderLoading();

  try {
    // 1. Obtener IP pública desde IPify
    const ip = await ipService.getPublicIP();
    console.log('[app] IP pública detectada:', ip);

    // 2. Obtener geolocalización desde IPGeolocation.io
    const geo = await geoService.getGeoData(ip);
    console.log('[app] Datos de geolocalización:', geo);

    // 3. Recolectar datos del navegador/dispositivo
    const clientInfo = new ClientInfo({
      ip,
      country:        `${geo.country_name} ${geo.country_flag_emoji ?? ''}`.trim(),
      city:           `${geo.city}, ${geo.state_prov}`,
      isp:            geo.isp || geo.organization || 'No disponible',
      timezone:       geo.time_zone?.name
                        ? `${geo.time_zone.name} (UTC${geo.time_zone.offset})`
                        : 'No disponible',
      currency:       geo.currency?.name
                        ? `${geo.currency.name} · ${geo.currency.code} ${geo.currency.symbol}`
                        : 'No disponible',
      language:       navigator.language || navigator.userLanguage || 'No disponible',
      browser:        GeoService.parseBrowser(navigator.userAgent),
      resolution:     `${screen.width} × ${screen.height} px (Profundidad: ${screen.colorDepth} bits)`,
      connectionType: GeoService.getConnectionType(),
    });

    // 4. Renderizar en el DOM
    renderer.renderClientInfo(clientInfo);

  } catch (error) {
    console.error('[app] Error:', error);
    renderer.renderError(error.message);
  }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
