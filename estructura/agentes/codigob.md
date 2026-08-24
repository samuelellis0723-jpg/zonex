El siguiente código es un punto de partida. El equipo debe ampliarlo, comentarlo, conectarlo a json-server y a la interfaz
diseñada en Stitch.
8.1 Motor de evaluación asíncrono (IA simulada)
// zonaFranca.js — reglas de negocio de la zona franca
const zonaFranca = {
nombre: &#39;ZF Ejemplo&#39;,
sectoresPermitidos: [&#39;tecnologia&#39;, &#39;manufactura&#39;, &#39;bpo&#39;],
inversionMinima: 50000,
empleosMinimos: 10
};
// iaService.js — simula una llamada asíncrona a un motor de IA
function evaluarConIA(solicitud, zonaFranca) {
return new Promise((resolve, reject) =&gt; {
setTimeout(() =&gt; { // simula latencia de red
if (!solicitud || !solicitud.sector) {
return reject(new Error(&#39;Datos de la solicitud incompletos&#39;));
}
const sectorValido = zonaFranca.sectoresPermitidos
.includes(solicitud.sector.toLowerCase()) ? 40 : 0;
const puntajeInversion = Math.min(
solicitud.inversionProyectada / zonaFranca.inversionMinima, 1
) * 30;
const puntajeEmpleos = Math.min(
solicitud.empleosProyectados / zonaFranca.empleosMinimos, 1
) * 30;
const puntaje = Math.round(sectorValido + puntajeInversion +
puntajeEmpleos);
resolve({
empresa: solicitud.empresa,
puntaje,
justificacion: `Sector ${sectorValido ? &#39;permitido&#39; : &#39;no permitido&#39;}, `
+
`inversión y empleos proyectados evaluados contra los mínimos.`
});
}, 800);
});
}

FWD Costa Rica · Laboratorio #3 · ZoFranca CR · Página 17 de
8.2 Clasificación y ejecución en paralelo, conectadas a json-server
function clasificar(puntaje) {
if (puntaje &gt;= 75) return &#39;Recomendada&#39;;
if (puntaje &gt;= 50) return &#39;Revisar&#39;;
return &#39;Rechazada&#39;;
}
async function obtenerSolicitudesPendientes() {
const res = await fetch(&#39;http://localhost:3001/solicitudes?estado=pendiente&#39;);
if (!res.ok) throw new Error(&#39;No se pudieron obtener las solicitudes&#39;);
return res.json();
}
async function procesarSolicitudes(zonaFranca) {
mostrarCargando(true); // estado de UI: cargando
try {
const solicitudes = await obtenerSolicitudesPendientes();
// Promise.all -&gt; evalúa en paralelo, no bloquea la interfaz
const resultados = await Promise.all(
solicitudes.map(s =&gt; evaluarConIA(s, zonaFranca))
);
return resultados
.map(r =&gt; ({ ...r, estado: clasificar(r.puntaje) }))
.sort((a, b) =&gt; b.puntaje - a.puntaje); // prioriza mejores
} catch (error) {
notificarError(error.message); // manejo de error
return [];
} finally {
mostrarCargando(false);
}
}

Nota: si el equipo elige la Opción A (IA real, sección 5.4), debe reemplazar el cuerpo de evaluarConIA por una llamada fetch
con async/await al proveedor de IA, manteniendo el mismo contrato de entrada/salida. El resto de la arquitectura (json-
server, Promise.all, estados de carga) no cambia.