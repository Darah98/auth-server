const userSchema = require('../models/users-schema.js');
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        next('Invalid login, please send token');
    } else {
        const [auth, token] = req.headers.authorization.split(' ');
        if (auth == 'Bearer') {
            // console.log('-------nice-----');
            userSchema.tokenAuthentication(token).then(validUser => {
                req.user = validUser;
                next();
            }).catch((err) => next('Invalid Login', err.message));
        } else {
            next('Invalid header info');
        }
    }
}