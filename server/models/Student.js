const {Schema, model, ObjectId} = require("mongoose")



const Student = new Schema({

    fio: {type: String},
    group: {type: ObjectId, ref: 'Group'},
    login: {type: ObjectId, ref: 'User', required: true}
    })
// numberZK: {type: Number, required: true, unique: true},
module.exports = model('Student', Student)