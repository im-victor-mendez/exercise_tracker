const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const User = require('../models/User.js')

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

module.exports = router