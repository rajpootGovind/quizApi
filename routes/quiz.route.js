const quizController = require("../controller/quiz.controller")
const MW = require("../middleware/creator.mw")
 
module.exports = (app)=>{
     app.post("/quiz/api/",[MW.verifyToken, MW.isAdmin], quizController.createQuiz)
     app.get("/quiz/api/", quizController.getQuizzes)
     app.get("/quiz/api/:id", quizController.getQuizDetails)
     app.post("/quiz/api/:id/result", [MW.verifyToken, MW.isAdmin],quizController.result)
}