
const express = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const router = express.Router()
const authMiddleware = require('../middleware/auth.middleware')
const Student = require("../models/Student")
const Group = require("../models/Group")
const Teacher = require("../models/Teacher")


router.post('/registration', [
    check('passwordNew', "Password must be longer than 3 symbols").isLength({min:3})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({message: "Incorrect request", errors})
        }
        const {login, password, passwordNew} = req.body
        const user = await User.findOne({login})
        if (!user){
            return res.status(400).json({message: `User with login ${login} not exist`})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({message: "Invalid password"})}
        const hashPassword = await bcrypt.hash(passwordNew, 5)

        await User.updateOne({login: login}, {password: hashPassword})
        return res.json({message: "Password was changed"})
    } catch (e) {
        console.log(e)
        res.send({message: "Server errors"})
    }


})

router.post('/login',
    async (req, res) => {
    try {
        const {login, password} = req.body
        const user = await User.findOne({login})
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({message: "Invalid password"})
        }
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: '1h'})
        return res.json({
            token,
            user: {
                id: user.id,
                login: user.login,
                role: user.role
            }
        })




    } catch (e) {
        console.log(e)
        res.send({message: "Server errors"})
    }


})

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            if (user.role === "student") {
                const student = await Student.findOne({login: user.id})
                const group = await Group.findOne({_id: student.group})

                return res.json({
                    token,
                    user: {
                        id: user.id,
                        login: user.login,
                        role: user.role
                    }
                    ,
                    student: {
                        id: student.id,
                        fio: student.fio
                    }
                    ,
                    group: {
                        id: group.id,
                        name: group.name
                    }
                })
            } else {
                const teacher = await Teacher.findOne({login: user.id})
                return res.json({
                    token,
                    user: {
                        id: user.id,
                        login: user.login,
                        role: user.role
                    }
                    ,
                    teacher: {
                        id: teacher.id,
                        fio: teacher.fio
                    }
                })
            }
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

module.exports = router
