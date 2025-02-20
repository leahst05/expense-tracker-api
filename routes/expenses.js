const expenseRouter = require('express').Router();
const db = require('../config/firebase')
const {validateExpense} = require('../middlewares/validationMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');
const {expenseObj} = require('../controller/createObjects.js');
const displayObjArr = require('../controller/displayObjArr.js')


//Reference to the Firebase database path "expenses"
const expenseRef = db.ref("expenses")

//Pre-processing route parameters
expenseRouter.param('id', (req, res, next, id) => {
    let expenseId = id;
    try{
        expenseRef.once("value", function(snapshot) {
            const expenses = (snapshot.val());
            if(expenses){
                const expenseArr = Object.values(expenses);
                const foundExpense= expenseArr.find((expense) => expenseId === expense.id);
                if (foundExpense){
                    req.expense = foundExpense;
                    next();
                }else{
                    const err = new Error('The expense was not found.')
                    err.status = 404
                    next(err);
                }
            }})
    }catch (err){
            next(err)
        }
    }
)

// Route to get all expense
expenseRouter.get('/', (req, res, next) => {
    expenseRef.once("value", function(snapshot) {
        const expenses = (snapshot.val());
        displayObjArr(expenses, res,next)
      })
})

// Route to get a single expense by expenseId
expenseRouter.get('/:id', (req, res, next)=>{
    req.expense = {id:req.expense.id, ...req.expense}
    res.send(req.expense)
})

//Route to create a new expense
expenseRouter.post('/', validateExpense, (req, res, next)=>{
    const newExpenseRef = expenseRef.push()
    const expenseId = newExpenseRef.key;
    console.log(expenseId);

    
    const newExpenseObj = expenseObj(req.body);
    newExpenseObj.id = expenseId;
    console.log(newExpenseObj.id)
    
    
    newExpenseRef.set(newExpenseObj)

    res.status(201).json({
        message:'Expense has been created',
        expense: newExpenseObj
    })
})


// Route to update an existing user's data
expenseRouter.put('/:id', validateExpense, (req, res, next)=>{
    const updatedExpense = expenseObj(req.body)
    updatedExpense.id = req.expense.id;

    expenseRef.child(req.expense.id).set(updatedExpense)
    res.status(200).json({
        message:"Expense has been updated",
        expense: updatedExpense
    })
})

// Route to delete an existing expense
expenseRouter.delete('/:id', (req, res, next)=>{
    const deletedExpense = req.expense
    expenseRef.child(req.expense.id).set(null)
    res.json({
        message: 'Expense deleted',
        expense:deletedExpense})
})

// Use the error handling middleware for all routes in this router
expenseRouter.use(errorMiddleware);

module.exports = expenseRouter