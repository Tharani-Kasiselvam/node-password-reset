const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
    {
        name : String,
        email : String,
        password : String
    },
    {
        collection : 'Users',
        versionKey : false
    }
)

module.exports = mongoose.model('Users',usersSchema,'users')