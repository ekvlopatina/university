const {Schema, model, ObjectId} = require("mongoose")



const Mark = new Schema({
    // idMark: {type: Number, required: true, unique: true},
    student: {type: ObjectId, ref: 'Student'},
    lesson: {type: ObjectId, ref: 'Lesson'},
    mark: {type: Number}
})

module.exports = model('Mark', Mark)