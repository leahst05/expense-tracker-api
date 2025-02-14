const userObj = (body) =>{
    const {name, username, email, address} = body 

    return {
        name,
        username,
        email,
        address
    }
};

const incomeObj = (body) =>{
    const {wages, "secondary income":secondaryIncome, interest, "support payment": supportPayment, others} = body;

    return{
        wages,
        "secondary income":secondaryIncome,
        interest,
        "support payment": supportPayment,
        others
    }
}




const expenseObj = (body) => {
    const {
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
    } = body;

    return {
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
};


module.exports = {
    userObj,
    incomeObj,
    expenseObj
}