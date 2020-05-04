'use strict';

//para usar el archivo .env donde estan las varaibles de entorno
require('dotenv').config();
//requerimos express
const express = require('express');
//requereimos las rutas que estan en Router->Router.js
const endPoint = require('./Router/Router');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//para poder coger la ruta de la carpeta htt://localhost:3001/img/nombrefoto.jpg
app.use('/img', express.static(__dirname + '/img', {
    maxAge: '12h'
}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//llamamos a la funcion donde estan todas las rutas
endPoint(app);

app.listen(process.env.PORT, () => {
    console.log(`Api Rest corriendo en http://localhost:${process.env.PORT}`)
})