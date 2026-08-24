Rol de la asincronía
Concepto asíncrono Uso en el sistema
Promesas (Promise) Encapsular la llamada al servicio de IA y las llamadas al backend (json-server).
async / await Escribir el flujo de evaluación de solicitudes y reportes de forma legible y

secuencial.

Promise.all Evaluar varias solicitudes o reportes en paralelo sin esperar uno por uno.
try / catch Capturar fallos de red o respuestas inválidas del backend o del motor de IA.
Estados de UI Mostrar ‘cargando’, ‘listo’ y ‘error’ según el estado de cada Promesa, reflejado

en los mockups de Stitch.

Rol de la inteligencia artificial
La IA sustituye la decisión manual de “¿esta solicitud cumple?” o “¿esta empresa está incumpliendo?”. Se acepta
cualquiera de estos dos enfoques:
● Opción A (real): una API de un modelo de lenguaje que reciba el perfil de la solicitud o del reporte y devuelva un
puntaje con justificación.
● Opción B (simulada): una función que calcule el puntaje comparando datos (sector, inversión, empleos), envuelta en
una Promesa para simular latencia — pero leyendo los datos desde json-server, no desde un arreglo fijo en memoria.