const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
    console.log('cookieController.setSSIDCookie');
    res.cookie('ssid', res.locals.userId, {
        httpOnly: true,
        secure: true
    });
    return next();
}

module.exports = cookieController;