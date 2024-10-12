const bcrypt = require('bcryptjs')
const userModel= require("../module/user.module")

exports.sighUp = async (req, res)=>{
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