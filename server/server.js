require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// user route
app.use(require('./routes/user'));

// Connecting to MongoDB
mongoose.connect(process.env.URLDB, 
    {useNewUrlParser: true, useCreateIndex: true}, 
    (err, res) => {
        if (err) throw err;
        console.log('Database online');    
});

app.listen(process.env.PORT, () => {
    console.log("listining port 3001");    
});
