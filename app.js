const morgan = require('morgan')
const cors = require('cors')
const express = require('express')

const app = express()

const passwordResetRoutes = require('./routes/passwordResetRoutes')

//middleware to all cross-origin requests from any domain
app.use(cors())

//middleware to parse the request body
app.use(express.json())

//middleware to log the request
app.use(morgan('dev'))

// define endpoint
app.use('/',passwordResetRoutes)

app.get('/',(req,res)=>{
    res.send("This is a Passowrd Reset module")
})

module.exports = app
