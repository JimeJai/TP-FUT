INSTRUCTIVO API FUTBOL
http://tp-fut-1.onrender.com
desde postman: localhost:8080

AUTH: En el auth contamos con la parte de registro, login y logout. Que generan las bases de datos de auth y users.
Desde Postman

---> Post - register: /auth/register
necesita recibir en el body los siguientes datos:
{
"name": "string",
"email": "string",
"pass": "string"
}

---> Post - login: /auth/login
necesita recibir en el body los siguientes datos:
{
"email": "string",
"pass": "string"
}

---> Post - logout: /auth/logout
necesita recibir en el body el token a elimminar:
{
"token": "string"
}

//-----------------------------------------------------------------------------------------------------------

USERS: En el users tambien se generan cambios en las bases de datos de auth y users.
Patch y Delete desde postman

---> Peticiones posibles:

---> GetAll: /users
Se hace la peticion a la raiz y obtengo todos los usuarios.

---> GetById: /users/:id
Se pasa el ID por params en la url.

---> PatchById: /users/:id?token=
Se pasa el ID por params en la url y requiere Token (query). En el body iran los cambios a realizar (solo las propiedades con cambios), ej:

{
"name": "string",
"email": "string"
}

---> DeleteById: /users/:id?token=
Se pasa el ID por params en la url y requiere Token (query).
Esta funcion, modifica la base de datos del usuario y del auth.

//------------------------------------------------------------------------------------------------------------
Contamos con 2 base de datos, a las cuales podremos hacerles peticiones.

PLAYERS:
Create, Patch y Delete desde postman.

---> Peticiones posibles:

---> GetById: /players/id
Se pasa el ID por params en la url.

---> GetByFilters: se pasa la peticion por query en la url: podemos filtrar por nombre (todos los que incluyen X); por condicion (inactive o active); por posicion (arquera, defensora o atacante); en caso de no enviar query obtendremos toda la db de jugadores.
/players
/players/?name=j
/players/?position=atacante
/players/?condition=active

---> PatchById: /players/:id?token=
Se pasa el ID por params en la url y requiere Token (query) y en el body los cambios a realizar (solo las propiedades con cambios), ej:

{
"name": "string",
"position": "string",
"condition": "string",
"numero": "string"
}

---> DeleteById: /players/:id?token=
Se pasa el ID por params en la url y requiere Token.

---> Create: /players/?token=
Requiere Token y en el body los datos para crear jugador, ej:
{
"name": "string",
"position": "string",
"condition": "string",
"numero": "string"
}
//-----------------------------------------------------------------------------------------------------------
TEAMS:
Create, Patch y Delete desde postman.

---> Peticiones posibles:

---> GetById: /teams/:id
Se pasa el ID por params en la url.

---> GetByFilters: se pasa la peticion por query en la url: podemos filtrar por nombre o en caso de no enviar query obtendremos toda la db de equipos.
/teams
/teams/?name=Black

---> PatchById: /teams/:id?token=
Se pasa el ID por params en la url y requiere Token y en el body los cambios a realizar (solo las propiedades con cambios), ej:

{
"name": "string",
"description": "string"
}

---> DeleteById: /teams/:id?token=
Se pasa el ID por params en la url y requiere Token (query).

---> Create: /teams/?token=
Requiere Token y en el body los datos para crear equipo, ej:

{
"name": "string",
"description": "string"
}

//---------------------------------------------------------------------------------------------------
