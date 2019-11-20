
const mongoose = require('mongoose');
const Anuncio = require('../models/Anuncio');
const conn = mongoose.connection;
const fs = require('fs');

const ads = JSON.parse(fs.readFileSync('./bin/adsInitLoad.json', 'utf8'));

// gestionar eventos de conexión
conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

conn.once('open', async () => {
    try {
        await Anuncio.deleteMany({});
        console.log("Borrada DB...");
        await Anuncio.insertMany(ads);
        console.log("Insertados anuncios.");
        process.exit(0);
    } catch (err) {
        console.log("Error inicializando DB: " + err);
        process.exit(1);
    }
    
});

// conectar
mongoose.connect('mongodb://localhost/nodepop', { useNewUrlParser: true});