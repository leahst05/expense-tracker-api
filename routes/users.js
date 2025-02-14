const usersRouter = require('express').Router();
const db = require('../config/firebase');
const {validateUser} = require('../middlewares/validationMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

//Reference to the Firebase database path "users"
const userRef = db.ref("users")


usersRouter.param('userId', (req, res, next, id) => {
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

usersRouter.get('/:userId', (req, res, next)=>{
        res.send(req.user)
})

usersRouter.post('/', validateUser, (req, res, next)=>{
    const {name, username, email, address} = req.body;

    const newUserRef = userRef.push()

    const userId = newUserRef.key;

    const userObj = {
        id: userId,
        name,
        username,
        email,
        address
    }
    
    newUserRef.set(userObj)

    res.status(201).json({
        message:'User has been created',
        user: userObj
    })
})

usersRouter.put('/:userId', (req, res, next)=>{
    const {name, username, email, address} = req.body;
    const updatedUser ={
        ...req.user, id:req.user.id, name, username, email, address
    }

    userRef.child(req.user.id).set(updatedUser)
    res.status(200).json({
        message:"User hs been updated",
        user: updatedUser
    })
})

usersRouter.delete('/:userId', (req, res, next)=>{
    const deletedUser = req.user
    userRef.child(req.user.id).set(null)
    res.json({
        message: 'User deleted',
        user:deletedUser})
})

usersRouter.use(errorMiddleware);

module.exports = usersRouter