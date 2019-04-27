const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.get('/usuario', (req, res) => {
    
    let since = req.query.since || 0;
    since = Number(since);

    User.find({state: true}, 'name email')
        .skip(since)
        .limit(5)
        .exec((err, users)=> {

            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({state: true}, (err, counting) => {

                res.json({
                    ok: true,
                    users,
                    howmany: counting
                });
            });      
        });
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
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

        // userDB.password = null;

        res.json({
            ok: true,
            user: userDB
        });
        
    });

});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    User.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {

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

app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let changeState = {
        state: false
    }

    User.findByIdAndUpdate(id, changeState, {new: true}, (err, userDeleted) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(userDeleted === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userDeleted
        });
    });

    /*
    User.findByIdAndRemove(id, (err, userDeleted) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(userDeleted === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userDeleted
        });
    });

    */
});

module.exports = app;