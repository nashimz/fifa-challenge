/// CORRER LA APP

- Tener instalado NodeJS, Angular y MYSQL
- Tener 3 consolas, en una ingresar a la ruta proyecto/backend/dist y ejecutar nodemon index.js o npx nodemon index.js, en la otra ingresar a proyecto/frontend y ejecutar ng serve y en la ultima entrar a la ruta proyecto/backend/src y ejecutar tsc --watch por si esta la necesidad de transpilar algo.
- Chequear el archivo connection.ts para la correcta configuracion a la BD propia.

/// DECISIONES TECNICAS

- Se utilizo Express para el ruteo del backend
- Se utilizo Bootstrap y fuentes de google para estilos en general
- Se utilizo Auth0 para manejar la autenticacion y la autorizacion del usuario y para proteger los endpoints del backend con Bearer Token JWT
- Se utilizo https://www.chartjs.org/docs/latest/charts/radar.html para realizar el radar de las habilidades de los jugadores
- Se utilizo https://www.chartjs.org/docs/latest/charts/line.html para realizar la linea del tiempo de una habilidad en particular
- Se decidio calcular el overall del jugador cuando el usuario inventa o actualiza un jugador para que se realize con los parametros que elige solamente
- Se realizo un filtrado que se renderiza en tiempo real y parcialmente mientras se tipea
