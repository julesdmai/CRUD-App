const Session = require('../models/sessionModel.js');

const sessionController = {};

// Middleware to start a session
sessionController.startSession = async (req, res, next) => {
    return next();
}

// Middleware to check if a user is logged in
sessionController.checkSession = async (req, res, next) => {
    return next();
}

module.exports = sessionController;