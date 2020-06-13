'use strict';
module.exports = (capability) => {
    return (req, res, next) => {
        try {
            // console.log('+-\*/-\*/-\*/-\*/-\*/-\*/-+', req.user);
            if (req.user[0].capabilities.includes(capability)) {
                next();
            } else {
                next('STOP! Access Denied');
            }
        } catch (err) {
            next('Invalid login', err.message);
        }

    }
}