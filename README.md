# NodeAPI

## Requirements

* MongoDB (to start a local server you can use ./bin/mongod --dpath ./data/db --directoryperdb)
* Tiene que crear una colección llamada nodepop.

## API Methods

http://localhost:3000/apiv1/anuncios  => para ver el JSON


### Anuncios list

http://localhost:3000                 => para ver la vista HTML

Parameters:

* limit numeric. Limits the number of results returned

# Para empezar

Ponemos en la consola los comandos npm install nodemon para que se ejecuten los comandos cada vez que guardamos

Ponemos npm init: con esto se inician una serie de preguntas sobre información y dependencias que tendrá mi aplicación

npm i -g express-generator para para crear la app y ponemos express nodeapi --ejs para instalar express en el archivo ejs.

npm install nodemon -g: para ejecutar la aplicación automáticamente cada vez que haya un cambio.

# Inicio de InstallDB

empezar con npm run installDB para hacer borrado y la carga inicial de anuncios.

# Inicio de aplicación

tecleamos npm start para iniciar la aplicación.

# Ejemplo de url con filtro

http://localhost:3000?nombre=bicicleta


