firstly we create a node.js project.
Than we install express for creating server and api, bcryptjs for password encryption, mongodb for model and jsonwebtoken for access token.
Than we create server.js file .
we create backend in three layers model, routes, controller.
we craete user model with contraints.
than we create Admin inside server.js.
after the user controller (for signin and signup) and user routes we create user registration.
when we signup we register the user and when we signin we get a access token
After that we create quiz model.
than we create quiz controller for quiz create , get quiz details and get quiz result.
quiz creation complete
after quiz creation we add a middleware for only admin can create the quiz.
firstly we verify the token than we add condition user&userType is Admin.
Time to time I test my API by Postman.
