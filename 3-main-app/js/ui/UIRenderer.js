/**
 * @module ui/UIRenderer
 * @description Clase OOP responsable de renderizar la UI en el DOM.
 *              Maneja estados: loading, error y datos del cliente.
 */

export class UIRenderer {
  #grid;

  /**
   * @param {string} gridId - ID del contenedor del grid en el DOM
   */
  constructor(gridId) {
    this.#grid = document.getElementById(gridId);
    if (!this.#grid) {
      throw new Error(`[UIRenderer] No se encontró el elemento #${gridId}`);
    }
  }

  /** Muestra el estado de carga */
  renderLoading() {
    this.#grid.innerHTML = `
      <div id="loading-state">
        <div class="spinner-ring"></div>
        <p class="loading-label">ANALIZANDO CONEXIÓN...</p>
      </div>
    `;
  }

  /**
   * Muestra un mensaje de error.
   * @param {string} message
   */
  renderError(message) {
    this.#grid.innerHTML = `
      <div class="error-card">
        <i class="bi bi-exclamation-triangle-fill"></i>
        <h5 class="mt-2" style="color:#ff4d6d;">Error al obtener datos</h5>
        <p>${message}</p>
        <small style="color:#6a8fa8;">
          Verifica tu API Key en <code>js/app.js</code> y recarga la página.
        </small>
      </div>
    `;
  }

  /**
   * Renderiza las 10 tarjetas con datos del cliente.
   * @param {import('../models/ClientInfo.js').ClientInfo} clientInfo
   */
  renderClientInfo(clientInfo) {
    const items = clientInfo.getAll();
    this.#grid.innerHTML = items
      .map((item, index) => this.#buildCard(item, index + 1))
      .join('');
  }

  /**
   * Construye el HTML de una tarjeta de dato.
   * @private
   * @param {{label: string, value: string, icon: string}} item
   * @param {number} index
   * @returns {string}
   */
  #buildCard({ label, value, icon }, index) {
    const safeValue = value ?? 'No disponible';
    return `
      <div class="data-card">
        <span class="card-index">#${String(index).padStart(2, '0')}</span>
        <i class="bi ${icon} card-icon"></i>
        <p class="card-label">${label}</p>
        <p class="card-value">${safeValue}</p>
      </div>
    `;
  }
}
