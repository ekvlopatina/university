const {Schema, model} = require("mongoose")



const Group = new Schema({
    // numberGR: {type: Number, required: true, unique: true},
    name: {type: String, required: true}
})

module.exports = model('Group', Group)