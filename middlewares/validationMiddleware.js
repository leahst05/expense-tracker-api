//Middleware to validate user data before creating a user
const validateUser = (req, res, next) =>{
    //Ensure all keys are present when creating a user.
    const {name, username, email, address} = req.body;
    if(!name || !username || !email || !address || !address.street || !address.suite || !address.city || !address.zipcode){
        const err = new Error('You need to provide all required information in order to create the user.');
        err.status = 400
        next(err)}
    next()
}

//Middleware to validate user data before creating income
const validateIncome = (req, res, next) =>{
    //Ensure all keys are present when creating income.
    const {wages, "secondary income":secondaryIncome, interest, "support payment": supportPayment, others} = req.body;
    if(!wages || !secondaryIncome || !interest || !supportPayment|| !others){
        const err = new Error('You need to provide all required information in order to create the income.');
        err.status = 400
        next(err)}
    next()
};

//Middleware to validate expense data before creating expense
const validateExpense = (req, res, next) =>{

    const exampleObj = {
    Savings: {
        RRSP: 10005,
        "Investment Savings": 4000,
        "Long-term savings": 5008,
        Bonds: 200,
        others: 500
    },
    "Payment Obligations": {
        "credit card": 5000,
        Loan: 6000,
        "vehicle lease": 200,
        "Line of credit": 1000
    },
    Insurance: {
        "life insurance": 400,
        "health insurance": 600,
        others: 300
    },
    Housing: {
        Rent: 600,
        "rent insurance": 400,
        "storage and parking": 500,
        utilities: 280,
        maintenance: 100
    },
    Utilities: {
        phone: 600,
        Internet: 300,
        water: 400,
        Heat: 100,
        Electricity: 400,
        Cable: 200,
        others: 150
    },
    Personal: {
        transportation: 50,
        clothing: 60,
        "gifts-family": 40,
        "Personal grooming": 200,
        "dining out": 300,
        Hobbies: 200,
        others: 60
    }
    };

    //To check if all keys in objA are in objB
    const hasAllKeys = (objA, objB) => {
        return Object.keys(objA).every(key=> key in objB)
    };
    
    //Ensure all keys are present when creating expense
    if (
        !req.body.Savings || !hasAllKeys(exampleObj.Savings, req.body.Savings) ||
        !req.body["Payment Obligations"] || !hasAllKeys(exampleObj["Payment Obligations"], req.body["Payment Obligations"]) ||
        !req.body.Insurance || !hasAllKeys(exampleObj.Insurance, req.body.Insurance) ||
        !req.body.Housing || !hasAllKeys(exampleObj.Housing, req.body.Housing) ||
        !req.body.Utilities || !hasAllKeys(exampleObj.Utilities, req.body.Utilities) ||
        !req.body.Personal || !hasAllKeys(exampleObj.Personal, req.body.Personal)
    ) {
        const err = new Error('You need to provide all required information in order to create the expense.');
        err.status = 400
        next(err)
    }
    
    next();

}  

module.exports = {
    validateUser,
    validateIncome,
    validateExpense 
}