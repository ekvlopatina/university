const PlanLesson = require("../models/PlanLesson")
const Lesson = require("../models/Lesson")
const Teacher = require("../models/Teacher")
const User = require("../models/User")
const Student = require("../models/Student")
const Object = require("../models/Object")
const Group = require("../models/Group")
const Marks = require("../models/Marks")

class ChangeDBController {
    async addGroup(req, res) {
        try {
            return res.json()
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: ""})
        }
    }

    async addObject(req, res) {
        try {
            return res.json()
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: ""})
        }
    }
    async addPlanLesson(req, res) {
        try {
            const {day, group, teacher, object} = req.body
            // console.log(day, group, teacher, object)
            const newGroup = await Group.findOne({name: group})
            const newTeacher = await Teacher.findOne({fio: teacher})
            const newObject = await Object.findOne({name: object})
            const planLesson = new PlanLesson({day, group: newGroup._id, teacher: newTeacher._id, object: newObject._id})
            await planLesson.save()


            return res.json({planLesson})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "not"})
        }
    }
    async addLesson(req, res) {
        try {
            let less
            let lesson
            const lessons = []
            const {day, date, teacher} = req.body
            console.log(req.body)
            console.log(date, 'datechange ')
            const dat = new Date(Date.parse(date))
            const dateNew = new Date(dat.getFullYear(), dat.getMonth(), dat.getDate(), 14, 0, 0)

            const planLessons = await PlanLesson.find({day: day, teacher: teacher.id})
            // console.log(planLessons)
            for (let plan of planLessons){
                less = await Lesson.findOne({date:dateNew, planLesson: plan._id})
                // console.log(less)
                if (!less){

                    lesson = new Lesson({ date: dateNew, planLesson: plan._id, tema: '', homework: ''})
                    lessons.push(lesson)
                    // console.log(lesson)
                    await lesson.save()
                }
            }
            // console.log(lesson)
            return res.json({lessons})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "not"})
        }
    }
    async addMark(req, res) {
        try {
            const {student, lesson, mark} = req.body
            const newMark = new Marks({student, lesson, mark})
            await newMark.save()
            return res.json()
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: ""})
        }
    }
    async changeLesson(req, res) {
        try {
            let less
            const lessons = []
            const week = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
            const {lesson} = req.body
            const todayLesson = await Lesson.findOne({_id: lesson.id})
            const date = todayLesson.date
            const day = week[date.getDay()]
            await Lesson.updateOne({_id: lesson.id}, {tema: lesson.tema, homework: lesson.homework})
            const plans = await PlanLesson.find({day: day, teacher: lesson.teacher})
            for (let plan of plans){
                less = await Lesson.findOne({date:date, planLesson: plan._id})
                if (less){lessons.push(less)}}
            return res.json({lessons})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "not change"})
        }
    }


    async deleteLesson(req, res) {
        try {
            const {type, id} = req.query
            switch (type) {
                case 'lesson':
                    await Lesson.deleteOne({_id: id})
                    break
                case 'plan':
                    await Lesson.deleteMany({planLesson: id})
                    await PlanLesson.deleteOne({_id: id})
                    break
                default:
                    break;
            }
            return res.json({message: "Lesson delete"})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "not change"})
        }
    }

}


module.exports = new ChangeDBController()