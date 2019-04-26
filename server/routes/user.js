const express = require('express');
const User = require('../models/user');

const app = express();

app.get('/usuario', (req, res) => {
    res.send('Olá usuário');
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    });

    // Saving in the MongoDB
    user.save((err, userDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
        
    });

});

module.exports = app;