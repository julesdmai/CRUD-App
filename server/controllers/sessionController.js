const Session = require('../models/sessionModel.js');

const sessionController = {};

// Middleware to start a session
sessionController.startSession = async (req, res, next) => {
    console.log('sessionController.startSession');
    console.log('res.locals.userId: ', res.locals.userId);
    try {
        const session = await Session.create({ userId: res.locals.userId})
        console.log('session was created');
        return next();
    }
    catch (err) {
        return next({
            log: 'Error occured in sessionController.startSession.',
            status: 500,
            message: {err: 'Error occurred in sessionController.startSession. Check server logs for more details.'}
        });
    }
}

// Middleware to check if a user is logged in
sessionController.checkSession = async (req, res, next) => {
    console.log('sessionController.checkSession');

    // testing
    console.log('req.cookies: ', req.cookies); // expect undefined before cookie parser

    const { ssid } = req.cookies;
    try {
        const session = await Session.find({ userId: ssid});
        if (session.length === 0) {
            console.log('no active session found');
            return res.status(401).send('unauthorized access');
        }
        return next();
    }
    catch (err) {
        return next({
            log: 'Error occured in sessionController.checkSession.',
            status: 500,
            message: {err: 'Error occurred in sessionController.checkSession. Check server logs for more details.'}
        });
    }
}

module.exports = sessionController;