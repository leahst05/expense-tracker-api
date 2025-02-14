const express = require('express')
const app = express()

 // Load environment variables from the .env file
const dotenv = require('dotenv');
dotenv.config()

// Middleware to parse incoming reques
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Importing route handlers for different sections of the API
const usersRouter = require('./routes/users');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expenses');

//// Route to serve static index.html when accessing the root URL
app.use(express.static('public'))
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

// Define routes for different resources
app.use('/users', usersRouter);
app.use('/income', incomeRouter);
app.use('/expenses', expenseRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})