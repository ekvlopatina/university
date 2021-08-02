const {Schema, model, ObjectId} = require("mongoose")



const Teacher = new Schema({
    // numberZK: {type: Number, required: true, unique: true},
    fio: {type: String},
    login: {type: ObjectId, ref: 'User', required: true}
})

module.exports = model('Teacher', Teacher)