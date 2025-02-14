const usersRouter = require('express').Router();
const db = require('../config/firebase');
const {validateUser} = require('../middlewares/validationMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');
const {userObj} = require('../controller/createObjects')
 
//Reference to the Firebase database path "users"
const userRef = db.ref("users")

//Pre-processing route parameters
usersRouter.param('id', (req, res, next, id) => {
    let userId = id;
    try{
        userRef.once("value", function(snapshot) {
            const users = (snapshot.val());
            if(users){
                const usersArr = Object.values(users);
                const foundUser = usersArr.find((user) => userId === user.id);
                if (foundUser){
                    req.user = foundUser;
                    next();
                }else{
                    const err = new Error('The user was not found.')
                    err.status = 404
                    next(err);
                }
            }})
    }catch (err){
            next(err)
        }
    }
)

// Route to get all users
usersRouter.get('/', (req, res, next) => {
    userRef.once("value", function(snapshot) {
        const users = (snapshot.val());
        if(users){
            const usersArr = Object.values(users);
            res.send(usersArr);
        }else{
            const err = new Error('No user has been created')
            err.status = 404
            next(err);
        }
      })
})

// Route to get a single user by userId
usersRouter.get('/:id', (req, res, next)=>{
        res.send(req.user)
})

// Route to create a new user
usersRouter.post('/', validateUser, (req, res, next)=>{
    const newUserRef = userRef.push()
    const userId = newUserRef.key;

    const newUserObj = userObj(req.body);
    newUserObj.id = userId

    newUserRef.set(newUserObj)

    res.status(201).json({
        message:'User has been created',
        user: newUserObj
    })
})

// Route to update an existing user's data
usersRouter.put('/:id', (req, res, next)=>{
    const updatedUser = userObj(req.body);
    updatedUser.id = req.user.id;

    userRef.child(req.user.id).set(updatedUser)
    res.status(200).json({
        message:"User hs been updated",
        user: updatedUser
    })
})

// Route to delete an existing user
usersRouter.delete('/:id', (req, res, next)=>{
    const deletedUser = req.user
    userRef.child(req.user.id).set(null)
    res.json({
        message: 'User deleted',
        user:deletedUser})
})

// Use the error handling middleware for all routes in this router
usersRouter.use(errorMiddleware);

module.exports = usersRouter