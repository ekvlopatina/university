const {Schema, model} = require("mongoose")



const Object = new Schema({
    // idObject: {type: Number, required: true, unique: true},
    name: {type: String, required: true}
})

module.exports = model('Object', Object)