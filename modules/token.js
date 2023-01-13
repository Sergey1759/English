const jwt = require('jsonwebtoken');
function createJWT(user) {
    return jwt.sign({
        time: new Date(),
        user,
    }, process.env.JWT_SECRET_KEY);
}

function verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {createJWT,verify};