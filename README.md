# nodejs-pg-testing
 Contenedor para testear una api de nodejs con bbdd postgres

# Requisitos
Es necesario tener instalado Docker -> https://www.docker.com/products/docker-desktop

Para lanzar el contenedor abrimos un terminal (p.e. en Visual Studio Code), navegamos a la raiz del proyecto y ejecutamos:

`docker-compose up --build` 

o si preferimos que se ejecute en segudo plano

`docker-compose up --build -d`

# Configuración
La configuración de nodejs, la base de datos y pgAdmin(el administrador de bbdd) se hace
mediante el archivo [docker-compose.yml](https://github.com/icaroinflames/nodejs-pg-testing/blob/main/docker-compose.yml). 
Ahí quedan definidos los puertos a través de los cuales damos acceso a cada servicio y las claves
de acceso tanto de la base de datos como de pgAdmin.

