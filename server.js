const express = require("express")
const mongoose= require("mongoose")
const configDB = require("./config/db.config")
const server = require("./config/server.config")
const userModel = require("./model/user.model")
const bcrypt = require("bcryptjs")

const app = express()

app.use(express.json())

// Create connection with mongoDB
mongoose.connect(configDB.dbUrl)
const db = mongoose.connection

db.on("error", ()=>{
    console.log("error produced")
    console.log(`error while connecting to database${error}`);
})

db.once("open", ()=>{
    console.log("Database connection successfully")
    init()
})

async function init(){
    let user = await userModel.findOne({userID:"admin"})
    if(user){
        console.log("admin already exist")
        return;
    }
    try{
        user = await userModel.create({
            name:"Govind",
            userID:"admin",
            email: "hitgo@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("welcome1",8)
        })
        console.log(`Admin created successfully ${user}`)
    }
    catch(error){
       console.log(`error during creating admin ${error}`)
    }
}

//add route to the Server

require("./routes/auth.routes")(app) //calling routes and passing obj

// Start the server
app.listen(server.portNumber, ()=>{
    console.log(`server start on port no.${server.portNumber}`)
})
