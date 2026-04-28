/**
 * @module models/ClientInfo
 * @description Modelo OOP que encapsula los 10 datos significativos
 *              de la conexión del cliente web.
 */

export class ClientInfo {
  /**
   * @param {Object} params
   * @param {string} params.ip              - IP pública del cliente
   * @param {string} params.country         - País con emoji de bandera
   * @param {string} params.city            - Ciudad y región
   * @param {string} params.isp             - Proveedor de internet (ISP)
   * @param {string} params.timezone        - Zona horaria IANA
   * @param {string} params.currency        - Moneda del país
   * @param {string} params.language        - Idioma del navegador
   * @param {string} params.browser         - Nombre del navegador detectado
   * @param {string} params.resolution      - Resolución de pantalla
   * @param {string} params.connectionType  - Tipo de conexión (4G, WiFi, etc.)
   */
  constructor({ ip, country, city, isp, timezone, currency, language, browser, resolution, connectionType }) {
    this.ip             = ip;
    this.country        = country;
    this.city           = city;
    this.isp            = isp;
    this.timezone       = timezone;
    this.currency       = currency;
    this.language       = language;
    this.browser        = browser;
    this.resolution     = resolution;
    this.connectionType = connectionType;
  }

  /**
   * Retorna los 10 datos como arreglo de objetos para renderizar.
   * @returns {Array<{label: string, value: string, icon: string}>}
   */
  getAll() {
    return [
      { label: 'IP Pública',         value: this.ip,             icon: 'bi-globe2'             },
      { label: 'País',               value: this.country,        icon: 'bi-flag-fill'          },
      { label: 'Ciudad / Región',    value: this.city,           icon: 'bi-geo-alt-fill'       },
      { label: 'ISP / Organización', value: this.isp,            icon: 'bi-building-fill'      },
      { label: 'Zona Horaria',       value: this.timezone,       icon: 'bi-clock-fill'         },
      { label: 'Moneda',             value: this.currency,       icon: 'bi-currency-exchange'  },
      { label: 'Idioma',             value: this.language,       icon: 'bi-translate'          },
      { label: 'Navegador',          value: this.browser,        icon: 'bi-browser-chrome'     },
      { label: 'Resolución',         value: this.resolution,     icon: 'bi-display-fill'       },
      { label: 'Tipo de Conexión',   value: this.connectionType, icon: 'bi-wifi'               },
    ];
  }
}
