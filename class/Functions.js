const bcrypt = require('bcrypt');

function returnJSON(res, objectJSON = {}, httpCode = 200, metadata = undefined) {
  return res.status(httpCode).json({ data: objectJSON, status: httpCode, metadata});
}

function returnJSON400(res, {
  message, required, notSent, example,
}) {
  const httpCode = 400;
  return res.status(httpCode).json({
    data: {
      message,
      required,
      notSent,
      example,
    },
    status: httpCode,
  });
}

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function isPasswordCorrect(passwordAttempt, hash) {
  return bcrypt.compare(passwordAttempt, hash);
}

module.exports = {
  returnJSON,
  returnJSON400,
  hashPassword,
  isPasswordCorrect,
};
