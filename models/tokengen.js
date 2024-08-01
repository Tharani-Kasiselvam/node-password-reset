const mongoose = require('mongoose')

const tokengenSchema = new mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users'
        },
        tokenStr : String,
        createdAt : {
            type : Date,
            expires : 3600
        }
    },
    {
        collection : 'Tokengen',
        versionKey : false
    }
)
module.exports = mongoose.model('Tokengen',tokengenSchema,'tokengen')