// Import
const User = require('../models/userModel.js');

// Export object
const userController = {};

// Middleware to create new user in database
userController.createUser = async (req, res, next) => {
    console.log('userController.createUser');
    console.log('req.body contains: ', req.body);

    // Destructure variables from req.body
    const { username, password, confirmPassword} = req.body;

    // Check user input
    if (!username || !password || !confirmPassword) {
        return next({
            log: 'Error occured in userController.createUser.',
            status: 400,
            message:{err: 'Missing user registration parameters'},
        });
    }

    // Creating user and storing in mongoDB
    try {
        const user = await User.create({
            username: username,
            password: password,
        });        
        console.log('user created: ', user);
        return next();
    }

    // Error handler
    catch (err) {
        return next({
            log: 'Error occured in userController.createUser.',
            status: 500,
            message: {err: 'Error occurred in controller.createUser. Check server logs for more details.'}
        });
    }
}


// Middleware to verify a user in database
userController.verifyUser = async (req, res, next) => {
    console.log('userController.verifyUser');
    console.log('req.body contains: ', req.body);

    // Destructure variables from req.body
    const { username, password } = req.body;


    // Check user input
    if (!username || !password) {
        return next({
            log: 'Error occured in userController.createUser.',
            status: 400,
            message:{err: 'Missing user login parameters'},
        });
    }


    // Finding user in mongoDB
    try {
        const user = await User.find({
            username: username,
            password: password,
        });
        if (user.length === 0) {
            console.log('no user found');
            return res.status(203).redirect('/login');
        }

        // important that this is user[0]
        console.log('user[0].id:', user[0].id);
        
        res.locals.userId = user[0].id;

        return next();
    }


    // Error handler
    catch (err) {
        return next({
            log: 'Error occured in userController.verifyUser.',
            status: 500,
            message: {err: 'Error occurred in controller.verifyUser. Check server logs for more details.'}
        });
    }
}


// Middleware to find all users in database
userController.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.locals.users = users;
        return next();
    }
    catch (err) {
        return next({
            log: 'Error occured in userController.getUsers.',
            status: 500,
            message: {err: 'Error occurred in controller.getUsers. Check server logs for more details.'}
        });
    }
}


// Export controller
module.exports = userController;