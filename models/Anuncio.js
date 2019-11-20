'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const anuncioSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    venta: { type: Boolean, required: true },
    precio: { type: Number, required: true },
    foto: { type: String, required: true },
    tags: [{type: String, enum: ['work', 'lifestyle', 'motor', 'mobile']}]
}, { collection: 'anuncios'} );

// En los métodos de los modelos de Mongoose no usar arrow functions (perdemos el this a la instancia)
anuncioSchema.statics.list = function({filter, skip, limit, fields, sort}) { 
    const query = Anuncio.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}

anuncioSchema.statics.tags = function () {
    const query = Anuncio.find().distinct('tags');
    return query.exec();
}

// Creamos el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;