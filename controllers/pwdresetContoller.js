const users = require('../models/users')
const tokengen = require('../models/tokengen')
const crypto = require('crypto')
const Joi = require('joi')
require('dotenv').config()
const sendEmail = require('../utils/sendEmail')

const pwdresetController = {
    getUser : async (req,res) => {
        try{
            const {email} = req.body

            const userData = await users.findOne({"email":email})

            if (!userData)
                return res.status(400).json({error:"user with given email doesn't exist"})
            else
                res.json({message:"Users Data", userData})

         }catch(error){
            res.json({message:"Error in fetching user data"})
        }
    },

    createToken : async(req,res)=>{
        try{
            const {email} = req.body

            const user_data = await users.findOne({ "email": email })

        if (!user_data)
            return res.status(400).json({error:"user with given email doesn't exist"});

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
        }
        else
            res.json({message:"Token already generated for this user"});

        const link = `${process.env.BASE_URL}/password-reset/${userId}/${token.tokenStr}`

        await sendEmail(user_name, email, "Password reset-Sending Email using Node.js", link)
            .then(()=>{
                res.json({message:"password reset link sent to your email account"})
            }).catch(error => {
                res.json({message:"Error occurred while sending email"})
            })

        }catch(error){
            res.json({message:"Error in generating the Token/sending email"})
            console.log(error);
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
        if (error) 
            return res.status(400).send(error.details[0].message);
        
        const user = await users.findOne({"_id" : userId});

        const token = await tokengen.findOne({
            userId : userId,
            tokenStr : tokenStr,
        })

        if (!token) 
            return res.status(400).json({error:"Invalid Token link or expired"});
        
        user.password = password
        await user.save()
        .then(async ()=>{
            await token.deleteOne()
        }).catch(error => {
            console.log(error)
        })

        res.json({message:"Password Reset sucessfully"})

        }catch(error){
        return res.json({message:"Error while verifying the User/Token, kindly enter valid details"});
        }
    }
}
module.exports = pwdresetController