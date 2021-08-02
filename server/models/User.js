const {Schema, model} = require("mongoose")
// const mongoose = require("mongoose")


const User = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String}
})




module.exports = model('User', User)