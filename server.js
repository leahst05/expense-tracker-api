const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const usersRouter = require('./routes/users');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expense');

app.use('/users', usersRouter);
app.use('/income', incomeRouter);
app.use('/expense', expenseRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})