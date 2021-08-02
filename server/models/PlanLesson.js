const {Schema, model, ObjectId} = require("mongoose")



const PlanLesson = new Schema({
    day: {type: String},
    group: {type: ObjectId, ref: 'Group'},
    teacher: {type: ObjectId, ref: 'Teacher'},
    object: {type: ObjectId, ref: 'Object'}
})

module.exports = model('PlanLesson', PlanLesson)