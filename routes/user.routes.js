const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

/* Schemas */
const User = require('../models/User.js')
const Exercise = require('../models/Exercise.js')

router.post('/', async (req, res) => {
    const username = req.body.username

    let user

    try {
        user = new User({ username })
        await user.save()
        
        console.log('User saved into database')
    } catch {
        user = await User.findOne({ username })

        console.error('User already are in database')
    }

    const _id = user._id
    
    res.json({ username, _id })
})

router.get('/', async (req, res) => {
    const collection = await User.find({})

    res.send(collection)
})

/* POST exercise */
router.post('/:_id/exercises', async (req, res) => {
    const _id = req.params._id || req.body[':_id']
    const user = await User.findById(_id)

    const { description, duration } = req.body

    if (!_id || !description || !duration) {
        console.error('Exercise validation to save has been failed')
        res.json({ 'error': 'Exercise validation to save has been failed' })
    } else {
        let { date } = req.body

        if (!date) date = new Date()
        else date = new Date(date)

        const exercise = new Exercise({
            username: user.username,
            description,
            duration,
            date,
            userId: _id
        })

        try {
            exercise.save()

            console.log('Exercise saved')

            //To fix response IDK :/
            res.send({
                username: user.username,
                description,
                duration,
                date: date.toDateString(),
                _id
            })
        } catch {
            console.error('Error saving exercise, please try again')
            res.json({ 'error': 'Error saving exercise, please try again' })
        }
    }
})

/* GET User logs */
router.get('/:_id/logs', async (req, res) => {
    const _id = req.params._id

    try {
        const user = await User.findById(_id)
        let exercises = await Exercise.find({ userId: _id })
        exercises = exercises.map(
            exercise => {
                return {
                    _id: exercise._id,
                    username: exercise.username,
                    description: exercise.description,
                    duration: exercise.duration,
                    date: exercise.date.toDateString(),
                    userId: exercise.userId
                }
            }
        )

        const username = user.username

        res.json({
            username,
            count : exercises.length,
            _id,
            log: exercises
        })

    } catch {
        res.json({ 'error': 'User not founded' })
    }
})

module.exports = router