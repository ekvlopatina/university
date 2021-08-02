const {Schema, model, ObjectId} = require("mongoose")



const Lesson = new Schema({
    // idLesson: {type: Number, required: true, unique: true},
    date: {type: Date},
    planLesson: {type: ObjectId, ref: 'PlanLesson'},
    tema: {type: String},
    homework: {type: String}
})

module.exports = model('Lesson', Lesson)