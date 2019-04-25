require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/user', (req, res) => {
    let body = req.body;

    if(body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'The name is necessary'
        });
    } else {
        res.json({
            person: body
        });
    } 
});

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true}, (err, res) => {
    if (err) throw err;
    console.log('Database online');    
});

app.listen(process.env.PORT, () => {
    console.log("listining port 3000");    
});
