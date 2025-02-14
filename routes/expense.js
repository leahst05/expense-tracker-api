const expenseRouter = require('express').Router();
const db = require('../config/firebase')
const {validateExpense} = require('../middlewares/validationMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');


const expenseRef = db.ref("expense")


expenseRouter.param('expenseId', (req, res, next, id) => {
    let expenseId = id;
    try{
        expenseRef.once("value", function(snapshot) {
            const expense = (snapshot.val());
            console.log(expense)
            if(expense){
                const expenseArr = Object.values(expense);
                console.log(expenseArr)
                const foundIncome = expenseArr.find((expense) => expenseId === expense.id);
                if (foundIncome){
                    req.expense = foundIncome;
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


expenseRouter.get('/', (req, res, next) => {
    expenseRef.once("value", function(snapshot) {
        const expense = (snapshot.val());
        if(expense){
            const usersArr = Object.values(expense);
            res.send(usersArr);
        }else{
            const err = new Error('No expense has been created')
            err.status = 404
            next(err);
        }
      })
})

expenseRouter.get('/:expenseId', (req, res, next)=>{
        res.send(req.expense)
})

expenseRouter.post('/', validateExpense, (req, res, next)=>{
    const{
        Savings: {
            RRSP,
            "Investment Savings": investmentSavings,
            "Long-term savings": longTermSavings,
            Bonds,
            others: savingsOthers
        },
        "Payment Obligations": {
            "credit card": creditCard,
            Loan,
            "vehicle lease": vehicleLease,
            "Line of credit": lineOfCredit
        },
        Insurance: {
            "life insurance": lifeInsurance,
            "health insurance": healthInsurance,
            others: insuranceOthers
        },
        Housing: {
            Rent,
            "rent insurance": rentInsurance,
            "storage and parking": storageAndParking,
            utilities,
            maintenance
        },
        Utilities: {
            phone,
            Internet,
            water,
            Heat,
            Electricity,
            Cable,
            others: utilitiesOthers
        },
        Personal: {
            transportation,
            clothing,
            "gifts-family": giftsFamily,
            "Personal grooming": personalGrooming,
            "dining out": diningOut,
            Hobbies,
            others: personalOthers
        }
    }  = req.body 

    const newExpenseRef = expenseRef.push()

    const expenseId = newExpenseRef.key;

    const expenseObj = {
        id: expenseId,
        Savings: {
            RRSP,
            "Investment Savings": investmentSavings,
            "Long-term savings": longTermSavings,
            Bonds,
            others: savingsOthers
        },
        "Payment Obligations": {
            "credit card": creditCard,
            Loan,
            "vehicle lease": vehicleLease,
            "Line of credit": lineOfCredit
        },
        Insurance: {
            "life insurance": lifeInsurance,
            "health insurance": healthInsurance,
            others: insuranceOthers
        },
        Housing: {
            Rent,
            "rent insurance": rentInsurance,
            "storage and parking": storageAndParking,
            utilities,
            maintenance,
        },
        Utilities: {
            phone,
            Internet,
            water,
            Heat,
            Electricity,
            Cable,
            others: utilitiesOthers
        },
        Personal: {
            transportation,
            clothing,
            "gifts-family": giftsFamily,
            "Personal grooming": personalGrooming,
            "dining out": diningOut,
            Hobbies,
            others: personalOthers
        }
    };
    
    newExpenseRef.set(expenseObj)

    res.status(201).json({
        message:'Income has been created',
        expense: expenseObj
    })
})

expenseRouter.put('/:expenseId', validateExpense, (req, res, next)=>{
    const{
        Savings: {
            RRSP,
            "Investment Savings": investmentSavings,
            "Long-term savings": longTermSavings,
            Bonds,
            others: savingsOthers
        },
        "Payment Obligations": {
            "credit card": creditCard,
            Loan,
            "vehicle lease": vehicleLease,
            "Line of credit": lineOfCredit
        },
        Insurance: {
            "life insurance": lifeInsurance,
            "health insurance": healthInsurance,
            others: insuranceOthers
        },
        Housing: {
            Rent,
            "rent insurance": rentInsurance,
            "storage and parking": storageAndParking,
            utilities,
            maintenance
        },
        Utilities: {
            phone,
            Internet,
            water,
            Heat,
            Electricity,
            Cable,
            others: utilitiesOthers
        },
        Personal: {
            transportation,
            clothing,
            "gifts-family": giftsFamily,
            "Personal grooming": personalGrooming,
            "dining out": diningOut,
            Hobbies,
            others: personalOthers
        }
    }  = req.body 

    const updatedIncome ={
        ...req.expense, 
        id: req.expense.id,
        Savings: {
            RRSP,
            "Investment Savings": investmentSavings,
            "Long-term savings": longTermSavings,
            Bonds,
            others: savingsOthers
        },
        "Payment Obligations": {
            "credit card": creditCard,
            Loan,
            "vehicle lease": vehicleLease,
            "Line of credit": lineOfCredit
        },
        Insurance: {
            "life insurance": lifeInsurance,
            "health insurance": healthInsurance,
            others: insuranceOthers
        },
        Housing: {
            Rent,
            "rent insurance": rentInsurance,
            "storage and parking": storageAndParking,
            utilities,
            maintenance,
        },
        Utilities: {
            phone,
            Internet,
            water,
            Heat,
            Electricity,
            Cable,
            others:utilitiesOthers
        },
        Personal: {
            transportation,
            clothing,
            "gifts-family": giftsFamily,
            "Personal grooming": personalGrooming,
            "dining out": diningOut,
            Hobbies,
            others: personalOthers
        }
    }

    expenseRef.child(req.expense.id).set(updatedIncome)
    res.status(200).json({
        message:"Income has been updated",
        expense: updatedIncome
    })
})

expenseRouter.delete('/:expenseId', (req, res, next)=>{
    const deletedIncome = req.expense
    expenseRef.child(req.expense.id).set(null)
    res.json({
        message: 'Income deleted',
        expense:deletedIncome})
})

expenseRouter.use(errorMiddleware);

module.exports = expenseRouter