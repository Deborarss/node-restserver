const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} não é uma função válida'
}

let {Schema} = mongoose;      // let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O nome é necessário']
    },
    email: {
        type: String,
        unique: true,
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
        default: 'USER_ROLE',
        enum: validRoles
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

userSchema.plugin(uniqueValidator, {message: '{PATH} deve ser único'});

module.exports = mongoose.model('User', userSchema);