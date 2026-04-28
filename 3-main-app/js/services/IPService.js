/**
 * @module services/IPService
 * @description Servicio OOP para obtener la IP pública usando la API de ipify.
 */

export class IPService {
  static #API_URL = 'https://api.ipify.org?format=json';

  /**
   * Obtiene la IP pública del cliente.
   * @returns {Promise<string>} Dirección IP pública
   * @throws {Error} Si la solicitud falla
   */
  async getPublicIP() {
    const response = await fetch(IPService.#API_URL);
    if (!response.ok) {
      throw new Error(`IPify respondió con código ${response.status}`);
    }
    const { ip } = await response.json();
    return ip;
  }
}
