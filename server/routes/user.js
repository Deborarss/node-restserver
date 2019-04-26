const express = require('express');

const app = express();

app.get('/usuario', (req, res) => {
    res.send('Olá usuário');
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    if(body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'O nome é necessário'
        });
    } else {
        res.json({
            person: body
        });
    } 
});

module.exports = app;