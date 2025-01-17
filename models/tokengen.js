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
            default : Date.now,
            expires : '1m'
        }
    },
    {
        collection : 'Tokengen',
        versionKey : false
    }
)
module.exports = mongoose.model('Tokengen',tokengenSchema,'tokengen')