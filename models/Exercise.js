const mongoose = require('mongoose')
const { Schema } = require('mongoose')

/**
 * @param {String} description (String, required)
 * @param {Number} duration (Number, required)
 * @param {Date} date (Date, required), in case that don't bring us, use current date
 */
const ExerciseSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Exercise', ExerciseSchema)