//File for declaring our Model

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String, required: true, min: 5, max: 20},
    password: {type: String, required: true, min: 6, max: 20},
    firstname: {type: String, required: true, min: 3, max: 20},
    lastname: {type: String}

})

//Making the user model exportable
module.exports = mongoose.model('User', userSchema);