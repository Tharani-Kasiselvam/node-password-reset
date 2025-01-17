const users = require('../models/users')
const tokengen = require('../models/tokengen')
const crypto = require('crypto')
const Joi = require('joi')
require('dotenv').config()
const sendEmail = require('../utils/sendEmail')

const pwdresetController = {
    //Token generation
    createToken : async(req,res)=>{
        try{
            const {email} = req.body
            const user_data = await users.findOne({ "email": email })

        if (!user_data)
            return res.status(400).send({error:"user with given Email doesn't exist"});

        let token = await tokengen.findOne({ "userId" : user_data._id.toString()});

        let user_name = user_data.name
        let userId = user_data._id.toString()
        let tokenStr = crypto.randomBytes(32).toString("hex")

        if (!token) {
            token =  new tokengen({
                userId,
                tokenStr
            })
            await token.save()
            const BASE_URL = process.env.BASE_URL
            const link = `${BASE_URL}/password-reset/${userId}/${token.tokenStr}`

            await sendEmail(user_name, email, "Password reset-Sending Email using Node.js", link)
            
            res.status(200).send({message:"Password Reset link sent to your Email account"})
        }
        else
            res.status(400).send({error:"Password Reset Link already sent to your Email account"})

        }catch(error){
            res.status(400).send({error:"Error in generating the Token/sending email"})
        }
    },

    passwordReset : async (req,res) => {
        try{
            const userId = req.params.userId
            const tokenStr = req.params.tokenStr
            const {password} = req.body

        const schema = Joi.object(
            { 
                password: Joi.string().required(), 
                email: Joi.string().email().min(5).max(50).optional()
            })
        const { error } = schema.validate(req.body);

        if (error) {
            const error_msg = error.details[0].message
            res.status(400).send({error:error_msg})
        }
        else{
        const user = await users.findOne({"_id" : userId});

        const token = await tokengen.findOne({
            userId : userId,
            tokenStr : tokenStr,
        })

        if (!token) 
            return res.status(400).json({error:"Invalid Token link or expired"});
        
        else{
        user.password = password
        await user.save()
        .then(async ()=>{
            await token.deleteOne()
        }).catch(error => {
            console.log(error)
        })

        res.json({message:"Password Reset sucessfully"})
        }
    }
        }catch(error){
         res.status(400).send({error:"Error while verifying the User/Token, kindly enter valid details"});
        }
    }
}
module.exports = pwdresetController