# Prueba desarrollo Squaads

Este desarrollo esta desarrollado con las siguientes caracteristicas:

# Herramientas locales

- [json-server](https://github.com/typicode/json-server)

# Herramientas graficas

- [Ng-Bootstrap](https://ng-bootstrap.github.io/)
- [NG-ZORRO](https://ng.ant.design/docs/introduce/en)

# Json Server Watch

```
$ json-server --watch api/db.json
```

## Let’s play football !

Hola, hola :) Bienvenido a la prueba. En este caso, el objetivo es
desarrollar una web app con angular (si conoces algo de ionic sería mucho mejor
que la hagas con ionic) orientada a móviles que servirá para gestionar diferentes
equipos de fútbol e incluso de diferentes ligas y jugadores.

## La idea.

Consiste en una app para visualizar las ligas de fútbol y los distintos equipos
que juegan en cada liga y sus jugadores.

### El cliente

El cliente, en este caso ficticio, es un árbitro de la liga veterana de fútbol de las
palmas que tiene ganas de emprender y molar con sus amigos teniendo una
solución que nadie más tiene, “digitalizando” a todos los jugadores y equipos
de fútbol de la isla. Quiere de manera sencilla poder añadir, editar y buscar la
ficha de todos los jugadores de los distintos equipos que juegan aquí en la isla.

### Lo que le hemos vendido al cliente.

Le hemos dicho, que de aquí a dentro de 3 días le vamos a enseñar una
aplicación web (adaptada al móvil, o mejor aún una mini app de ionic) dónde
podrá entrar a través de un enlace web y podrá visualizar y dar de alta tanto
jugadores como a equipos. La idea de este primer MVP es que pueda
consultar de manera sencilla qué jugadores tenía cada equipo para
aprenderse los nombres e incorporar alguno nuevo o equipo nuevo.

## Lo que se pide.

La idea de esta prueba es que desarrolles una pequeña aplicación web (o app
móvil con ionic) en angular que cumpla con el apartado de arriba, usando
componentes visuales de librerías externas como primeng, o ng-zorro, tailwinds o
los componentes visuales de ionic.
Se ha preparado una pequeña api con una base de datos con datos de ligas de
fútbol, equipos y jugadores, se encuentra en https://footbal-api.herokuapp.com.
Te invitamos, a que simules un entorno en local también en tu máquina con
json-server con esos datos que están ahí.
https://github.com/typicode/json-server

#### Los mínimos que pedimos son:

- CRUD de jugadores.
- CRUD de equipos.
- Visualizar las ligas.
- Buscar a un jugador por su nombre y/o por su equipo.
- Vistas de detalles de una liga (ver sus equipos) y vista de detalles de un
  equipo (ver sus jugadores) y vista de detalles de un jugador.
- Repositorio de github donde vayas comiteando poco a poco el proyecto.
- Que vayas comunicando por slack los avances y cualquier duda que
  tengas.

## Changelog

[Initial Commit](https://github.com/felde/squaads-test-FELDE/commit/69f5f438f8baeb3a4ded5a4e293bff3d6586b11f)

Se agrego la base del proyecto

[Json Server Data](https://github.com/felde/squaads-test-FELDE/commit/63f533c2d0fdd3f5080bec0ca7133e3bda16a495)

Se agrego la data para que funcione el json server

[First doc](https://github.com/felde/squaads-test-FELDE/commit/fb159df1d5475affd266e5524a245076a5d8ac69)

Se agrega la primera documentación en README file

[Teams Module completly](https://github.com/felde/squaads-test-FELDE/commit/1f051d054fe491532a7e177d19f154a1d846ad92)

Se logra hacer el CRUD de equipos, así mismo como la visualización por Ligas

[Teams Module completly](https://github.com/felde/squaads-test-FELDE/commit/1f051d054fe491532a7e177d19f154a1d846ad92)

Se logra hacer el CRUD de equipos, así mismo como la visualización por Ligas

[Players module completed](https://github.com/felde/squaads-test-FELDE/commit/084230d628a66caa74e2d37f3bf32e593f908ac4)

Se logra hacer el CRUD de equipos, así mismo como la visualización por Ligas

[Mini dashboard]()

Se agrega mini dashboard con lso conteos ligas, equipos y jugadores

