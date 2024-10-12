const mongoose = require("mongoose")
const validator = require("validator")

/**
 * usename
 * password
 * email
 * userID
 * userType
 */

const userSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     userID:{
        type:String,
        required:true,
        unique:true
     },
     email:{
        type:String,
        required:true,
        unique:[true, "email is already taken"],
        validate(value){
           if(!validator.isEmail(value)){
            throw new error("Invalid email")
           }
        }
     },

     userType:{
        type:String,
        required:true,
        default:"USER",
        enum:["ADMIN","USER"]
     },
     password:{
        type:String,
        required:true
     }
},{timestamps:true, versionKeys:false})

module.exports = mongoose.model("User", userSchema)