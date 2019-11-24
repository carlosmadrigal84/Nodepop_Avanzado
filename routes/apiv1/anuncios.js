'use strict'

const express = require('express');
var bodyParser = require('body-parser');
const router = express.Router();

const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../lib/jwtAuth');
var multer = require('multer');
var upload = multer ({ dest: '../../public/images'})

const requester = new cote.Requester({ name: 'thumbnail client' });


// create application/json parser
var jsonParser = bodyParser.json();

/**
 * GET /anuncios
 * Devuelve una lista de anuncios
 * Por ejemplo
 *  http://localhost:3000/apiv1/anuncios?limit=2&skip=2&fields=name age -_id
 */

router.get('/', jwtAuth(), async (req, res, next) => {
    try {      // Para los menos expertos en JavaScript, nos recomienda el try y el catch para la gestión de errores.
        
        const nombre = req.query.nombre;
        const precio = req.query.precio;
        const tag = req.query.tag;
        const venta = req.query.venta;
        const skip = parseInt(req.query.skip); // paginar
        const limit = parseInt(req.query.limit); // paginar
        const fields = req.query.fields; // campos de la base de datos
        const sort = req.query.sort; // ordenar 

        const filter = {};

        if (nombre) {
            filter.nombre = new RegExp('^'+ nombre, "i");
        }

        if (typeof precio !== 'undefined') {
            var preciosRecibidos = precio.split("-");
            filter.precio = {};
            if (preciosRecibidos.length === 1) {
                filter.precio = parseInt(precio);
            }
            else {
                if (preciosRecibidos[0]) {
                    filter.precio['$gte'] = preciosRecibidos[0];
                }
                if (preciosRecibidos[1]) {
                    filter.precio['$lte'] = preciosRecibidos[1];
                }
            }
        }

        if (tag){
            var tags = tag.split(",");
            filter.tags = { '$in': tags };
        }

        if (venta) {
            filter.venta = venta;
        }

        const anuncios = await Anuncio.list({ filter: filter, skip, limit, fields, sort});

        res.json({ success: true, results: anuncios });
        
    } catch (err) {
        next(err);
    }
});

router.get('/tags', async (req, res, next) => {
    const tags = await Anuncio.tags();
    res.json({ success: true, results: tags });
});

router.post('/', upload.single('images'), jsonParser, async (req, res, next) => {
    if (!req.body.tags) {
        res.status(400).send('Tags required');
    }
    try {
        await Anuncio.create(req.body);
        res.status(201).send({response:'Anuncio creado: ' + req.body.nombre});

        req.file --> ruta

         requester.send({
        type: 'crear thumbnail',
        path: path.join(__dirname, '../../public/images'),
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
    
});

module.exports = router;