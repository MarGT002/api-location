/**
 * @module services/GeoService
 * @description Servicio OOP para obtener datos de geolocalización
 *              usando la API de ipgeolocation.io.
 */

export class GeoService {
  static #BASE_URL = 'https://api.ipgeolocation.io/ipgeo';
  #apiKey;

  /**
   * @param {string} apiKey - Clave de API de ipgeolocation.io
   */
  constructor(apiKey) {
    if (!apiKey || apiKey === 'TU_API_KEY_AQUI') {
      console.warn('[GeoService] ⚠️ API Key no configurada. Registrarse en https://ipgeolocation.io/');
    }
    this.#apiKey = apiKey;
  }

  /**
   * Obtiene datos de geolocalización para una IP dada.
   * @param {string} ip - Dirección IP a consultar
   * @returns {Promise<Object>} Datos de geolocalización
   * @throws {Error} Si la solicitud falla
   */
  async getGeoData(ip) {
    const params = new URLSearchParams({ apiKey: this.#apiKey, ip });
    const url = `${GeoService.#BASE_URL}?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.message || `GeoService error ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Parsea el nombre del navegador desde el User-Agent.
   * @param {string} userAgent
   * @returns {string}
   */
  static parseBrowser(userAgent) {
    if (/Edg\//i.test(userAgent))     return 'Microsoft Edge';
    if (/OPR\//i.test(userAgent))     return 'Opera';
    if (/Chrome\//i.test(userAgent))  return 'Google Chrome';
    if (/Firefox\//i.test(userAgent)) return 'Mozilla Firefox';
    if (/Safari\//i.test(userAgent))  return 'Apple Safari';
    return 'Navegador desconocido';
  }

  /**
   * Obtiene el tipo de conexión del dispositivo.
   * @returns {string}
   */
  static getConnectionType() {
    const conn = navigator.connection
               || navigator.mozConnection
               || navigator.webkitConnection;
    if (!conn) return 'No disponible (API no soportada)';

    const parts = [];
    if (conn.type)           parts.push(conn.type);
    if (conn.effectiveType)  parts.push(conn.effectiveType.toUpperCase());
    if (conn.downlink)       parts.push(`↓ ${conn.downlink} Mbps`);
    return parts.length ? parts.join(' · ') : 'Desconocido';
  }
}
