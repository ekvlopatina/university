

const express = require("express");
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const Student = require("../models/Student")
const Group = require("../models/Group")
const Teacher = require("../models/Teacher")
const Lesson = require("../models/Lesson")
const PlanLesson = require("../models/PlanLesson")
const Object = require("../models/Object")
const Marks = require("../models/Marks")
const lessonController = require("../controllers/lessons")
const changeDBController = require("../controllers/changeDB")


router.get('/',
    async (req, res) => {
        try {

        } catch (e) {
            console.log(e)
            res.send({message: "Server errors"})
        }
    })

router.get('/student', authMiddleware,
    async (req, res) => {
        try {

            const student = await Student.findOne({login: req.user.id})
            const group = await Group.findOne({_id: student.group})

            return res.json({
                student: {id: student.id, fio: student.fio},
                group: {id: group.id, name: group.name}
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server errors"})
        }


    })
router.get('/teacher', authMiddleware,
    async (req, res) => {
        try {
            const teacher = await Teacher.findOne({login: req.user.id})
            const lessons = await PlanLesson.find()
            // const lessons = await PlanLesson.find({teacher: teacher._id})
            // console.log(lessons)
            const grSet = new Set()
            const groups = []
            const obSet = new Set()
            const objects = []
            for (lesson of lessons){
                grSet.add(String(lesson.group))
                obSet.add(String(lesson.object))
            }
            for (gr of grSet){groups.push(await Group.findOne({_id: gr}))}
            for (ob of obSet){objects.push(await Object.findOne({_id: ob}))}
            return res.json({
                teacher: {id: teacher.id, fio: teacher.fio}, groups, objects})

        } catch (e) {
            console.log(e)
            res.send({message: "Server errors"})
        }


    })
router.get('/teacher/lessons', authMiddleware, lessonController.getLessons)
router.get('/student/lessons', authMiddleware, lessonController.getStudentLessons)
router.post('/lessons/marks',
    async (req, res) => {
    try {
        const {lesson} = req.body
        const marks = await Marks.find({lesson: lesson})
        return res.json({marks})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Can not get marks"})
    }
})
router.post('/student/lessons/marks',
    async (req, res) => {
        try {
            const {lessons, student} = req.body
            const marks = []
            for (let lesson of lessons) {marks.push(await Marks.findOne({lesson: lesson._id, student: student._id}))}
            // const marks = await Marks.find({lesson: lesson})
            return res.json({marks})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get marks"})
        }
    })
router.post('/group',
    async (req, res) => {
    try {
        const {group} = req.body
        // console.log(req.body)
        const groupObj = await Group.findOne({_id: group})
        const groupList = await Student.find({group:group})
        // console.log(grouplist)
        return res.json({group: groupObj, groupList})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Can not get group list"})
    }
})
router.post('/addgroup',
    async (req, res) => {
        try {
            const {group} = req.body
            const groupObj = await Group.findOne({name: group})
            return res.json({group: groupObj})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get group"})
        }
    })


router.post('/addobject',
    async (req, res) => {
        try {
            const {object} = req.body
            const obj = await Object.findOne({name: object})
            return res.json({object: obj})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get object"})
        }
    })


router.get('/groups',
    async (req, res) => {
        try {
            const groups = await Group.find()
            return res.json({groups})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get groups"})
        }
    })

router.get('/objects',
    async (req, res) => {
        try {
            const objects = await Object.find()
            return res.json({objects})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get objects"})
        }
    })

router.post('/marks',
    async (req, res) => {
        try {
            const {marks} = req.body

            for (let mark of marks){
                const currMark = await Marks.findOne({lesson: mark.lesson, student: mark.student})
                if (currMark) {
                    await Marks.updateOne({_id: currMark._id}, {mark: mark.mark})
                } else{
                    const markNew = new Marks({lesson: mark.lesson, student: mark.student, mark: mark.mark})
                    await markNew.save()
                }
            }
            return res.json({message: "Add marks"})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get group list"})
        }
    })

router.post('/planlesson', changeDBController.addPlanLesson)
router.post('/changelesson', changeDBController.changeLesson)

router.post('/lesson', changeDBController.addLesson)
router.delete('/lesson', changeDBController.deleteLesson)



module.exports = router
