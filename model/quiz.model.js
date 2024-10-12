const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
    /**
     * title
     * description
     * questions
     */

    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    questions:[
        {
            questionText:{
                type:String,
                required:true
            },
            options:[
                {
                    opetionText:{
                        type:String,
                        required:true
                    },
                    isCorrect:{
                        type:Boolean,
                        required:true
                    }
                }
            ]
        }
    ]
},{timestamps:true, versionKey:false})

module.exports = mongoose.model("Quiz",quizSchema)