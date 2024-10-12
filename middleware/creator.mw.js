// for only admin can create quiz
/**
 * 1. a person who can login
 * 2. that person is admin or not
 */

const jwt = require("jsonwebtoken")
const secretCode = require("../config/token.config")
const userModel = require("../model/user.model")

const verifyToken = (req, res, next)=>{
    // check token in present in header or not
   const token = req.headers['x-access-token']

   if(!token){
    return res.status(201).send("no token found")
   }

   //vallid or not

   jwt.verify(token,secretCode.code,async(err, decoded)=>{
    if(err){
      return res.status(401).send({
        message: "unAuthorised!"
      })
    }
    const user = await userModel.findOne({userId:decoded.id})
    if(!user){
        return res.status(400).send({
            message: "unAuthorised! this user for this token does't exist"
        })
    }
    //set the user info in the req body
    req.user = user
    next()
} )
}

//check for admin only admin can create quizz
 
const isAdmin = (req, res, next)=>{
    user = req.user
   if(user&&user.userType=="ADMIN"){
    next()
   }else{
    res.status(400).send("Only admin allow to create quiz")
   }
}

module.exports = {
    verifyToken:verifyToken,
    isAdmin:isAdmin
}