'use strict'

//para usar el archivo .env donde estan las varaibles de entorno
require('dotenv').config();
//requereimos el conector de mysql
const  mysql = require('mysql');

const conexion = mysql.createConnection({
    host:process.env.SERVIDOR,
    user:process.env.USUARIO,
    password:process.env.CLAVE,
    database:process.env.BBDD
})

//funcon para mostrar todos los usuarios
const getAllData = (callback) => {
    conexion.connect();

    if(conexion){
        conexion.query('SELECT * FROM usuarios', (err, res) => {
            if(err){
                throw err;
            }else{
                callback(null, res); //null seria el error, en este caso vacio
            }
        })
    }
    conexion.end();
};

//mostrar datos por id, clave primaria
const getDataForId = (id, callback) => {
    conexion.connect();

    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE id_usuario = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                throw err;
            }else{
                callback(null, {message:'success'});
            }
        })
    }
    conexion.end();
}

//funcion para insertar usuarios
const insertData = (usuario, callback) => {
    conexion.connect();

    if(conexion){
        //usuario es el objeto que le enviamsod ede router
        conexion.query("INSERT INTO usuarios SET ?",usuario, (err, res) => {
            if(err){
                throw err;
            }else{
                callback(null, {data: res});//null seria el error, en este caso vacio
            }
        })
    }
    conexion.end();
}

//funcion para actualizar usuarios
const updateData = (usuario, callback) => {
    conexion.connect();
    //connection.scape() es para escapar las comillas por si nos hacen un boby table 
    if(conexion){

        const sql = 
        `UPDATE usuarios SET
        nombre = ${conexion.escape(usuario.nombre)},
        apellido = ${conexion.escape(usuario.apellido)},
        edad = ${conexion.escape(usuario.edad)},
        correo = ${conexion.escape(usuario.apellido)},
        clave = ${conexion.escape(usuario.clave)}
        WHERE id_usuario = ${conexion.escape(usuario.id_usuario)}
        `;
        conexion.query(sql, (err, res) => {
            if(err){
                throw err;
            }else{
                callback(null, {message:'success'});
            }
        })
    }
    conexion.end();
};

//funcion para borrar usuarios
const deleteData = (id, callback) => {
    conexion.connect();
    if(conexion){
        const sql = 
            `DELETE FROM usuarios WHERE id_usuario = ${conexion.escape(id)}
            `;
        conexion.query(sql, (err, res) => {
            if(err){
                throw err;
            }else{
                callback(null, {message:'success'});
            }
        })
    }
    conexion.end();
};


//exportamos las funciones
module.exports = 
    {
        getAllData,
        getDataForId,
        insertData,
        updateData,
        deleteData
    }