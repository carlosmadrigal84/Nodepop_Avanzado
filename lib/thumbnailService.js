'use strict';

// Servicio de cambio de moneda

const cote = require('cote');

// declarar el mircoservicio
const responder = new cote.Responder({ name: 'currency responder' });

// tabla de conversión --> la base de datos del microservicio
const rates = {
    usd_eur: 0.86,
    eur_usd: 1.14,
};

// lógica del servicio
responder.on('convertir moneda', (req, done) => {
    console.log('servicio: ', req.from, req.to, req.amount, Date.now());
    // calculamos el resultado
    const resultado = rates[`${req.from}_${req.to}`] * req.amount;
    done(resultado);
});