PROCOMER administra el régimen de zonas francas de Costa Rica, donde operan empresas de manufactura, servicios de
back-office (BPO) y tecnología. Para instalarse, una empresa presenta una solicitud con su inversión proyectada, los
empleos que generará, su sector y su respaldo legal/fiscal.
Hoy esa solicitud se revisa a mano: un analista lee los documentos, transcribe los datos a una hoja de cálculo, compara a
criterio propio si la empresa cumple los umbrales del régimen, y responde por correo semanas después. Ya instalada, cada
empresa debe reportar periódicamente su cumplimiento real (empleos, inversión, exportaciones), y ese reporte también
se consolida a mano en Excel

lo que debemos solucionar es :
solicitudes lentas, errores de transcripción, criterios inconsistentes entre analistas, incumplimientos que nadie detecta a tiempo, y cero trazabilidad para una auditoría.

Se necesita una plataforma que reciba solicitudes y reportes, los procese de forma asíncrona sin trabar la pantalla, use IA para pre-clasificar y generar alertas, y deje siempre la decisión final en manos de un analista humano.

 

Este caso no se resuelve por completo en un solo laboratorio: somos una grupo de 2 integrantes samu y tiff. necesitamos una primera versión funcional de un recorte del problema (una zona franca, un flujo de solicitud, un flujo de cumplimiento), pero pensada para crecer — más zonas francas, más tipos de reporte, más integraciones. La sección 10 pide justamente ese ejercicio de proyección.


tambien manten un codigo limpio y facil de leer respetando buenas, y las validaciones que se deben hacer son: 
Reglas Esenciales de ValidaciónLímite de caracteres: Fija un mínimo y un máximo para campos de texto como nombres o contraseñas.Tipo de dato: Define si el campo acepta solo números, texto, fechas o correos electrónicos.Rango numérico: Establece un piso y un techo para valores como edades o precios.Listas desplegables: Usa opciones predefinidas para evitar errores de escritura en campos repetitivos.Campos obligatorios: Marca qué datos son indispensables para avanzar o guardar.Patrones específicos: Aplica formatos exactos usando reglas de coincidencia para códigos postales o teléfonos  