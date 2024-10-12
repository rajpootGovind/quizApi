const quizModel = require("../model/quiz.model")

// create quiz
exports.createQuiz = async(req, res)=>{
    try {
        // Extract quiz data from the request body
        const { title, description, questions } = req.body;

        // Create a new quiz document
        const quiz = await new quizModel({
            title:req.body.title,
            description:req.body.description,
            questions: req.body.questions
           
        });
   
        console.log(quiz);
        

        // Respond with the created quiz
        res.status(201).send(quiz);
    }
catch(error){
    
    res.status(400).send("quiz can't create")
 }
}

// get quiz

exports.getQuizzes = async (req, res)=>{
 try{
    const quizess= await quizModel.find()
 res.send(quizess)
 }catch(error){
   res.status(400).send("Can't get any quizzes")
 }
}

//for quiz details

exports.getQuizDetails = async (req, res)=>{
    try{
       const quizDetails= await quizModel.findById(req.params.id)
       if (!quizDetails) {
        res.status(404).send({ error: 'Quiz not found' });
       }
    res.send(quizDetails)
    }catch(error){
      res.status(400).send("Can't get any quizzes")
    }
   }

   //Viewing result
     //- take help for this
   exports.result = async (req, res)=>{
    try{
        const quizDetails= await quizModel.findById(req.params.id)
        if (!quizDetails) {
         res.status(404).send({ error: 'Quiz not found' });
        }
    let score = 0;
    quizDetails.questions.forEach((question, index)=>{
        const correctOption = question.options.find(opt => opt.isCorrect);
        if (correctOption && correctOption._id.toString() === req.body.answers[index]) {
            score++;
        }
        res.json({ score, total: quizDetails.questions.length });
    })
     }catch(error){
        res.status(400).send("failed in result viewing")
     }
   }