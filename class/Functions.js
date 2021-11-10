const bcrypt = require('bcrypt');

function returnJSON(res, objectJSON = {}, httpCode = 200) {
    return res.status(httpCode).json({data: objectJSON, status: httpCode});
}

function returnJSON400(res, {message, required, notSent, example}){
    const httpCode = 400;
    return res.status(httpCode).json({data: {
        message,
        required,
        notSent,
        example
    }, status: httpCode});
}

function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

function isPasswordCorrect(passwordAttempt, hash) {
    return bcrypt.compareSync(passwordAttempt, hash);
}

module.exports = {
    returnJSON,
    returnJSON400,
    hashPassword,
    isPasswordCorrect
}
