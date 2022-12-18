const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))

/* Database */
const database = require('./database.js')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

/* Middleware */

const morgan = require('morgan')
app.use(morgan('dev'))

/* Routes */

app.use('/api/users', require('./routes/user.routes.js'))

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
