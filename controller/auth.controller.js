const bcrypt = require('bcryptjs')
const userModel= require("../model/user.model")
const jwt = require("jsonwebtoken")
const secretCode =require("../config/token.config")


//logic to register user

exports.signUp = async (req, res)=>{
//  logic to create user

// 1. read the req body
const requestBody = req.body

// 2. insert data in the mongoDB users collection
const userObj ={
    name: requestBody.name,
    userID: requestBody.userID,
    email: requestBody.email,
    userType: requestBody.userType,
    password:bcrypt.hashSync(requestBody.password, 8)
}
try{
    const userCreated = await userModel.create(userObj)
    // return the userObj
    const resObj ={
        name: userCreated.name,
        userID: userCreated.userID,
        email: userCreated.email,
        userType: userCreated.userType,
        createdAt : userCreated.createdAt,
        updatedAt : userCreated.updatedAt
    }
    res.status(201).send(resObj)

}catch(error){
    console.log(`Error while registering the user ${error}`);
        res.status(500).send({
            message: "Some error happened during registering the user"
        })
}
}


exports.signIn = async(req, res)=>{

 try{
    // check email and passsword
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compareSync(req.body.password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
 //using json web token we can create access token for security(we can also add time)
     //create token
const token =jwt.sign({id:user.userId},secretCode.code)

res.status(200).send(
   {
    name:user.name,
    userID: user.userID,
    email:user.email,
    userType: user.userType,

    accessToken : token
   }
)
 }
 catch(error){
    res.status(400).send({ error: 'Error logging in' });
 }

}