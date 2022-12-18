const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    }
})

exports.module = mongoose.model('User', UserSchema)