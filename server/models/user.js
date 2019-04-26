const mongoose = require('mongoose');

let {Schema} = mongoose;      // let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O nome é necessário']
    },
    email: {
        type: String,
        required: [true, 'O email é necessário']
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória']
    },
    img: {
        type: String,
        required: false
    },    
    role: {
        type: String,
        default: 'USER_ROLE'
    },   
    state: {
        type: Boolean,
        default: true
    },   
    google: {
        type: Boolean,
        default: false
    }   
});

module.exports = mongoose.model('User', userSchema);