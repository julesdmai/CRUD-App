const Session = require('../models/sessionModel.js');

const sessionController = {};

// Middleware to start a session
sessionController.startSession = async (req, res, next) => {
    console.log('sessionController.startSession');
    try {
        const session = await Session.create({ cookieId: res.locals.userId})
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
    try {
        const session = await Session.find({cookieId: ssid});
        if (session.length === 0) {
            console.log('no active session found');
            return res.status(403).redirect('/login');
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