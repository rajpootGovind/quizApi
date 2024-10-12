const quizController = require("../controller/quiz.controller")
 
module.exports = (app)=>{
     app.post("/quiz/api/", quizController.createQuiz)
     app.get("/quiz/api/", quizController.getQuizzes)
     app.get("/quiz/api/:id", quizController.getQuizDetails)
     app.post("/quiz/api/:id/result", quizController.result)
}