const express = require("express")
const router = express.Router()

const { Student } = require('../models/Student')

router.get('/', async (req, res) => {
    try {
        const studentData = await Student.find()
        res.status(200).json({
            message: 'fetched Successfully',
            data: studentData
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/age/:age', async (req, res) => {
    try {
        const age = req.params.age
        if (age > 20) {
            const studentData = await Student.find({ age: age })
            res.status(200).json({
                message: 'fetched Successfully',
                data: studentData
            })
        }
        else {
            res.status(404).json({ message: 'Not found' })
        }

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
router.get('/skills/:skillsdata', async (req, res) => {
    try {
        const skills = req.params.skillsdata
        if (skills == 'React' || skills == 'Node.js' || skills == 'MongoDB' || skills == 'Express') {
            const studentData = await Student.find({ skills: skills })
            res.status(200).json({
                message: 'fetched Successfully',
                data: studentData
            })
        }
        else {
            res.status(404).json({ message: 'Not found' })
        }

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put('/:student_id', async (req, res) => {
    try {
        const id = req.params.student_id
        const newStudentData = req.body
        console.log(newStudentData)
        const response = await Student.findByIdAndUpdate(id, newStudentData, {
            new: true,
            runValidators: true
        })
        console.log(response)
        if (!response) { res.status(404).json({ message: 'student not found' }) }
        else { res.status(200).json({ message: 'updated successfully', data: response }) }
    }
    catch (err) {
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = router