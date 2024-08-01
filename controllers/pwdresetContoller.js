const users = require('../models/users')

const pwdresetController = {
    getUser : async (req,res) => {
        try{

            const userData = await users.find()
            console.log(userData)
            res.json({message:"Users Data", userData})

        }catch(error){

        }
    }


}
module.exports = pwdresetController