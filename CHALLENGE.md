Challenge
Prueba para casa de desarrollo Full-Stack
El propósito es evaluar tus habilidades en el desarrollo Backend y Frontend. Debes construir una aplicación we que permita a los usuarios cargar un archivo CSV con datos pre-formateados y mostrar esos datos como tarjetas en el sitio web, pudiendo filtrar los datos.

Instrucciones

- Tienes 48 horas para completar la prueba. No subas ningún código después de entregarlo en el sistema.

- Tu solución DEBE incluir pruebas automatizadas tanto para el frontend como para el backend. Tener una buena cobertura y probar todas las funciones es parte de la prueba.

- Debes enviar tu solución como un repositorio Privado en GitHub e invitar a projects@shawandpartners.com como colaborador. También puedes intentarlo con el nombre de usuario sp-tests.

- No crees 2 repositorios, asegúrate de incluir todo el código en el mismo repositorio y codifica directamente dentro de ellos.

- El frontend y el backend deben funcionar simplesmente ejecutando "npm install" seguido de "npm run dev" (para ejecutar la aplicación) o "npm run test" (para ejecutar todas las pruebas).

- No agregues instrucciones adicionales o comandos de Docker en el readme, si algo más necesita ser ejecutado antes de iniciar la aplicación , asegúrate de incluirlo en tu script de desarrollo.

- Los archivos JavaScript solo están permitidos en archivos de configuración de lib, todo tú código DEBE estar en TypeScript y completamente tipado.

Cuando termines, despliegue tú código en un servicio de Hosting como Render o Vercel. Se te pedirá que proporciones el enlace de tu repositorio y el (los) enlace(s) de tu aplicación desplegada al final, asegúrate de proporcionar el enlace raíz sin ningún camino.

Características del Frontend

- Debe ejecutarse en el puerto 4000, y todo deb estar en la ruta "/" como una aplicación de una sola (SPA) usando React.

- Un botón para seleccionar un archivo CSV desde la máquina local y otro botón para cargar el archivo seleccionado.

- Una barra de búsqueda que permita a los usuarios buscar datos dentro del archivo CSV cargado.

- La barra de búsqueda debe actualizar las tarjetas mostradas para mostrar solo los resultados coincidentes.
- Los datos CSV cargados deben mostrarse como tarjetas en el sitio web, con cada tarjeta mostrando todos los datos de una sola fila del archivo CSV.
- Un diseño responsivo que funcione bien a tanto en dispositivos de escritorios como móviles.
- Manejo de errores claro y amigable para el usuario.

Características del Backend

- Debe ejecutarse en el puerto 3000

- El backend debe implementarse como una API Restful utilizando Node (No uses ningún framework con opiniones como Adonis o Nest).

El backend debe incluir los siguientes endpoints:
[POST/api/files]

- Un endpoint que acepta la carga de un archivo CSV desde el frontend y almacena os datos en una base de datos o una estructura de datos. Debes usar la clave "file" en la solicitude del cuerpo.

- Esta ruta debe devolver el estado 200 y un objecto con la clave "message" con el valor "El archivo se cargó correctamente".

- O esta ruta debe devolver el estado 500 y un objeto con la clave "message" con el mensaje error en el valor.

[GET/api/users]

- Debe incluir un endpoint que permita al frontend buscar a través de los datos CSV cargados. Esta ruta debe aceptar un parámetro de consulta ?q= para términos de búsqueda y debe buscar en CADA columna del CSV. El filtro debe buscar coincidencias parciales y también ser insensible a mayúsculas y minúsculas.

- Esta ruta debe devolver el estado de 200 y un objeto con la clave "data" con un array de objectos dentro de el.

- O esta ruta debe devolver el estado 500 y un objeto con la clave "message" con un message de error en el valor.

Evaluación
Evaluamos tú solución en función de los siguientes criterios:

- Completitud de todas las características y funcionalidades requeridas.
- Calidad y organización del código
- Calidad y cobertura de las pruebas automatizadas.
- Amigabilidad y capacidad de respuesta del frontend.
- Rendimiento y eficiencia del backend.
  Entender los requisitos también es parte de la prueba. Para cualquier problema, comunícate con hr@hawandpartners.com para obtener ayuda.

!Buena suerte con tu prueba!
