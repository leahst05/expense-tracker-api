const incomeRouter = require('express').Router();
const db = require('../config/firebase')
const {validateIncome} = require('../middlewares/validationMiddleware')
const errorMiddleware = require('../middlewares/errorMiddleware');
const {incomeObj} = require('../controller/createObjects')

//Reference to the Firebase database path "income"
const incomeRef = db.ref("income")

//Pre-processing route parameters
incomeRouter.param('id', (req, res, next, id) => {
    let incomeId = id;
    try{
        incomeRef.once("value", function(snapshot) {
            const income = (snapshot.val());
            if(income){
                const incomeArr = Object.values(income);
                const foundIncome = incomeArr.find((income) => incomeId === income.id);
                if (foundIncome){
                    req.income = foundIncome;
                    next();
                }else{
                    const err = new Error('The income was not found.')
                    err.status = 404
                    next(err);
                }
            }})
    }catch (err){
            next(err)
        }
    }
)

// Route to get all income
incomeRouter.get('/', (req, res, next) => {
    incomeRef.once("value", function(snapshot) {
        const income = (snapshot.val());
        if(income){
            const usersArr = Object.values(income);
            res.send(usersArr);
        }else{
            const err = new Error('No income has been created')
            err.status = 404
            next(err);
        }
      })
})

// Route to get a single income by incomeId
incomeRouter.get('/:id', (req, res, next)=>{
        res.send(req.income)
})

// Route to create a new income.
incomeRouter.post('/', validateIncome, (req, res, next)=>{
    const newIncomeRef = incomeRef.push()
    const incomeId = newIncomeRef.key;

    const newIncomeObj = incomeObj(req.body)
    newIncomeObj.id = incomeId
    
    newIncomeRef.set(newIncomeObj)

    res.status(201).json({
        message:'Income has been created',
        income: newIncomeObj
    })
})

//// Route to update an existing income data
incomeRouter.put('/:id', (req, res, next)=>{
    const updatedIncome = incomeObj(req.body);
    updatedIncome.id = req.income.id;

    incomeRef.child(req.income.id).set(updatedIncome)
    res.status(200).json({
        message:"Income has been updated",
        income: updatedIncome
    })
})

// Route to delete an existing income
incomeRouter.delete('/:id', (req, res, next)=>{
    const deletedIncome = req.income
    incomeRef.child(req.income.id).set(null)
    res.json({
        message: 'Income deleted',
        income:deletedIncome})
})

// Use the error handling middleware for all routes in this router
incomeRouter.use(errorMiddleware);

module.exports = incomeRouter