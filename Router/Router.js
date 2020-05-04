'use strict';

const express = require('express');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: './img'}) /// ./img es pa carpeta donde se subira la foto
//objeto dnde estan todos los metodos de la base de datos
const Database = require('../Database/Database');

//************** */

function endPoint(app){
    const router = express.Router();

    app.use('/api', router);

    //todos los productos
    //comprobar -> http://localhost:3001/api/all
    router.get('/all', (req, res) => {

        Database.getAllData( (err, data) => {
            if(err) return res.status(500).json({messaje: `error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `producto no encontrado`});
            res.status(200).json({success:true, message:'usuario agregado',data:data});
        });

    })

    //productos por id
    router.get('/:id', (req, res) => {
        let id_usuario = req.params.id;

        Database.getDataForId(id_usuario, (err, data) => {
            if(err) return res.status(500).json({messaje: `error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `producto no encontrado`});
            res.status(200).json({success:true, message:'usuario agregado',data:data});
        })
    })

    //subir productos //multipartMiddleware,
    //comprobar -> http://localhost:3001/api/add
    router.post('/add', (req, res) => {
        let usuario = 
            {
                id_usuario: '',   
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                edad: req.body.edad,
                correo: req.body.correo,
                clave: req.body.clave,
            };
       
        Database.insertData(usuario, (err, data) => {
            if(err) return res.status(500).json({messaje: `error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `producto no encontrado`});
         
            res.status(200).json({success:true, message:'usuario insertado',data:data});
        })
    })

    //actualizar producto
    //comprobar -> http://localhost:3001/api/update/1
    router.put('/update/:id', (req, res) => {
        let usuario = 
            {
                id_usuario: req.params.id,   
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                edad: req.body.edad,
                correo: req.body.correo,
                clave: req.body.clave,
            };

        Database.updateData(usuario, (err, data) => {
            if(err) return res.status(500).json({messaje: `error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `producto no encontrado`});
          
            res.status(200).json({success:true, message:'usuario modificado', data:data})
        })
    })

    //borrar productos
     //comprobar -> http://localhost:3001/api/delete/6
    router.delete('/delete/:id', (req, res) => {
        let id_usuario = req.params.id;

        Database.deleteData(id_usuario, (err, data) => {
            if(err) return res.status(500).json({messaje: `error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({messaje: `producto no encontrado`});
          
            res.status(200).json({success:true, message:'usuario modificado', data:data})
        })
    })


}

module.exports = endPoint;
