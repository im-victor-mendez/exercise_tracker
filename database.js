const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const DATABASE = process.env.DATABASE

mongoose.connect(DATABASE)
.then(() => console.log('Database connected'))
.catch(error => console.error(error))

exports.module = mongoose