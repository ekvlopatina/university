const PlanLesson = require("../models/PlanLesson")
const Lesson = require("../models/Lesson")
const Teacher = require("../models/Teacher")
const User = require("../models/User")
const Student = require("../models/Student")
const Object = require("../models/Object")
const Marks = require("../models/Marks")
class LessonController {

    async getLessons(req, res) {
        try {
            const typeSort = ['на день', 'на неделю', 'на дату']
            const {sort, day, date} = req.query
            let planLessons = []
            let plans = []
            let less
            const user = await User.findOne({_id: req.user.id})
            switch (user.role){
                case 'teacher':
                    const teacher = await Teacher.findOne({login: req.user.id})
                    switch (sort) {
                        case 'на день':
                            planLessons = await PlanLesson.find({day: day, teacher: teacher._id})
                            break
                        case 'на неделю':
                            planLessons = await PlanLesson.find({teacher: teacher._id})
                            break
                        case 'на дату':
                            plans = await PlanLesson.find({day: day, teacher: teacher._id})
                            for (let plan of plans){
                                // console.log(date, 'datesearch')
                                less = await Lesson.findOne({date:date, planLesson: plan._id})
                                // console.log(less)
                                if (less){planLessons.push(less)}

                            }
                            break
                        default:
                            planLessons = await PlanLesson.find({teacher: teacher._id})
                            break;}
                    break
                case 'student':
                    const student = await Student.findOne({login: req.user.id})
                    switch (sort) {
                        case 'на день':
                            planLessons = await PlanLesson.find({day: day, group: student.group})
                            break
                        case 'на неделю':
                            planLessons = await PlanLesson.find({group: student.group})
                            break
                        case 'на дату':
                            plans = await PlanLesson.find({day: day, group: student.group})
                            for (let plan of plans){
                                less = await Lesson.findOne({date:date, planLesson: plan._id})
                                planLessons.push(less)}
                            break
                        default:
                            planLessons = await PlanLesson.find({group: student.group})
                            break;}
                    break
                default:
                    break
            }
            return res.json({planLessons, plans})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get plan"})
        }
    }

    async getStudentLessons(req, res) {
        try {
            const typeSort = ['на день', 'на неделю', 'на дату']
            const {sort, day, date} = req.query
            let planLessons = []
            let plans = []
            let objects = []
            let teachers = []
            let less
            const marks = []

            const student = await Student.findOne({login: req.user.id})
            switch (sort) {
                case 'на день':
                    planLessons = await PlanLesson.find({day: day, group: student.group})
                    for (let less of planLessons){
                        objects.push(await Object.findOne({_id: less.object}))
                        teachers.push(await Teacher.findOne({_id: less.teacher}))
                    }
                    break
                case 'на неделю':
                    planLessons = await PlanLesson.find({group: student.group})
                    for (let less of planLessons){
                        objects.push(await Object.findOne({_id: less.object}))
                        teachers.push(await Teacher.findOne({_id: less.teacher}))
                    }
                    break
                case 'на дату':
                    plans = await PlanLesson.find({day: day, group: student.group})
                    for (let plan of plans){
                        less = await Lesson.findOne({date:date, planLesson: plan._id})
                        if (less){planLessons.push(less)}

                        objects.push(await Object.findOne({_id: plan.object}))
                        teachers.push(await Teacher.findOne({_id: plan.teacher}))
                    }
                    for (let lesson of planLessons) {marks.push(await Marks.findOne({lesson: lesson._id, student: student._id}))}
                    break
                default:
                    planLessons = await PlanLesson.find({group: student.group})
                    for (let less of planLessons){
                        objects.push(await Object.findOne({_id: less.object}))
                        teachers.push(await Teacher.findOne({_id: less.teacher}))
                    }
                    break;}
            console.log(objects, teachers)
            return res.json({planLessons, plans, objects, teachers, marks})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get plan"})
        }
    }

    // async getMarks(req, res) {
    //     try {
    //         const {lesson} = req.query
    //         const marks = await Marks.find({lesson: lesson})
    //         return res.json({marks})
    //     } catch (e) {
    //         console.log(e)
    //         return res.status(500).json({message: "Can not get marks"})
    //     }
    // }


    async getLessonsObj(req, res) {
        try {

            const {object, sort, day, date} = req.query

            let planLessons = []
            let plans
            const teacher = await Teacher.findOne({login: req.user.id})
            // if (sort==='day'){planLessons = await Lesson.findOne({day: day, teacher: teacher._id})}
            switch (sort) {
                // case 'day':
                //     plans = await PlanLesson.find({day: day, teacher: teacher._id, object: object._id})
                //     // planLessons = await Lesson.findOne({day: day, teacher: teacher._id})
                //     for (let plan of plans){planLessons.push(await Lesson.findOne({planLesson: plan._id}))}
                //     break
                // case 'week':
                //     plans = await PlanLesson.find({teacher: teacher._id, object: object._id})
                //     break
                case 'date':

                    plans = await PlanLesson.find({day: day, teacher: teacher._id, object: object._id})
                    for (let plan of plans){planLessons.push(await Lesson.findOne({date:date, planLesson: plan._id}))}


                    break
                default:
                    // planLessons = await PlanLesson.find({teacher: teacher._id})

                    break;
            }
            // console.log('les', planLessons)
            // console.log("req", req.user)
            // return res.json({planLessons, plans})
            return res.json({planLessons})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get plan"})
        }
    }

}

module.exports = new LessonController()