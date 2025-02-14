const incomeRouter = require('express').Router();
const db = require('../config/firebase')
const {validateIncome} = require('../middlewares/validationMiddleware')
const errorMiddleware = require('../middlewares/errorMiddleware');


const incomeRef = db.ref("income")


incomeRouter.param('incomeId', (req, res, next, id) => {
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

incomeRouter.get('/:incomeId', (req, res, next)=>{
        res.send(req.income)
})

incomeRouter.post('/', validateIncome, (req, res, next)=>{
    const {wages, "secondary income":secondaryIncome, interest, "support payment": supportPayment, others} = req.body;

    const newIncomeRef = incomeRef.push()

    const incomeId = newIncomeRef.key;

    const incomeObj = {
        id: incomeId,
        wages,
        "secondary income":secondaryIncome,
        interest,
        "support payment": supportPayment,
        others
    }
    
    newIncomeRef.set(incomeObj)

    res.status(201).json({
        message:'Income has been created',
        income: incomeObj
    })
})

incomeRouter.put('/:incomeId', (req, res, next)=>{
    const {wages, "secondary income":secondaryIncome, interest, "support payment": supportPayment, others} = req.body;
    const updatedIncome ={
        ...req.income, id:req.income.id, wages, "secondary income":secondaryIncome, interest, "support payment": supportPayment, others
    }

    incomeRef.child(req.income.id).set(updatedIncome)
    res.status(200).json({
        message:"Income has been updated",
        income: updatedIncome
    })
})

incomeRouter.delete('/:incomeId', (req, res, next)=>{
    const deletedIncome = req.income
    incomeRef.child(req.income.id).set(null)
    res.json({
        message: 'Income deleted',
        income:deletedIncome})
})

incomeRouter.use(errorMiddleware);

module.exports = incomeRouter