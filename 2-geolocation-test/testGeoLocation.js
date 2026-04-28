/**
 * testGeoLocation.js
 * Pruebas de la API de IPGeolocation.io usando console.log
 * 
 * Requisito previo:
 *   Node.js 18+  (fetch nativo disponible)
 *   O ejecutar:  npm install node-fetch
 *
 * Uso:
 *   node testGeoLocation.js
 *
 * Reemplaza TU_API_KEY_AQUI con tu clave obtenida en:
 *   https://ipgeolocation.io/
 */

// ─── Configuración ────────────────────────────────────────────────────────────
const API_KEY = 'd1271f7268774df2b5dcf87c009127ad';
const BASE_URL = 'https://api.ipgeolocation.io/ipgeo';

// IPs de prueba representativas de distintas partes del mundo
const TEST_IPS = [
  { ip: '8.8.8.8',        descripcion: 'Google DNS (EE.UU.)' },
  { ip: '1.1.1.1',        descripcion: 'Cloudflare DNS (Australia)' },
  { ip: '200.78.192.1',   descripcion: 'IP de México' },
  { ip: '185.220.101.1',  descripcion: 'IP de Europa (Alemania)' },
  { ip: '',               descripcion: 'Mi IP pública (automática)' },
];

// ─── Función principal ─────────────────────────────────────────────────────────
async function consultarIP(ip, descripcion) {
  const params = new URLSearchParams({ apiKey: API_KEY });
  if (ip) params.append('ip', ip);

  const url = `${BASE_URL}?${params.toString()}`;
  console.log('\n' + '─'.repeat(60));
  console.log(`🌐 Prueba: ${descripcion}`);
  console.log(`🔗 URL: ${url.replace(API_KEY, '***OCULTA***')}`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error(`❌ Error HTTP ${response.status}: ${response.statusText}`);
      console.error('   Mensaje API:', errorBody.message || 'Sin detalle');
      return;
    }

    const data = await response.json();

    // ─── Mostrar datos significativos ────────────────────────────────────────
    console.log('\n📊 Respuesta de la API:');
    console.log('   IP:              ', data.ip);
    console.log('   País:            ', data.country_name, `(${data.country_code2})`);
    console.log('   Estado/Región:   ', data.state_prov);
    console.log('   Ciudad:          ', data.city);
    console.log('   Código postal:   ', data.zipcode);
    console.log('   Latitud/Longitud:', data.latitude, '/', data.longitude);
    console.log('   ISP:             ', data.isp);
    console.log('   Organización:    ', data.organization);
    console.log('   Zona horaria:    ', data.time_zone?.name, `(UTC${data.time_zone?.offset})`);
    console.log('   Moneda:          ', data.currency?.name, `(${data.currency?.code} ${data.currency?.symbol})`);
    console.log('   Idiomas:         ', data.languages);
    console.log('   Continente:      ', data.continent_name);
    console.log('   Es UE:           ', data.is_eu ? 'Sí' : 'No');
    console.log('   Emoji bandera:   ', data.country_flag_emoji || 'N/A');

    // ─── Respuesta JSON completa ─────────────────────────────────────────────
    console.log('\n🗂️  JSON completo:');
    console.log(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error(`❌ Error de red o parsing: ${error.message}`);
  }
}

// ─── Ejecutar todas las pruebas secuencialmente ────────────────────────────────
async function ejecutarPruebas() {
  console.log('='.repeat(60));
  console.log('   TEST SUITE – IPGeolocation.io API');
  console.log('='.repeat(60));

  for (const { ip, descripcion } of TEST_IPS) {
    await consultarIP(ip, descripcion);
    // Pausa de 1 segundo entre solicitudes para respetar límites de la API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n' + '='.repeat(60));
  console.log('   ✅ Pruebas finalizadas');
  console.log('='.repeat(60));
}

ejecutarPruebas();
