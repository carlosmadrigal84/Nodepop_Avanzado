'use strict';

const cote = require('cote');

// cliente de conversión de moneda

const requester = new cote.Requester({ name: 'currency client' });

setInterval(() =>{
    requester.send({
        type: 'convertir moneda',
        amount: 100,
        from: 'usd',
        to: 'eur',
    }, response => {
        console.log(`cliente: 100 usd --> ${response} eur`, Date.now());
    });
}, 1000);