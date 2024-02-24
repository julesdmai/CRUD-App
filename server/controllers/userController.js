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


    return next();
}

module.exports = userController;