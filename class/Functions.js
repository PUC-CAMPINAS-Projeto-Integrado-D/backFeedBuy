const bcrypt = require('bcrypt');
const fs = require('fs');

function returnJSON(res, objectJSON = {}, httpCode = 200, metadata = undefined) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return res.status(httpCode).json({ data: objectJSON, status: httpCode, metadata });
}

function returnJSON400(res, {
  message, required, notSent, example,
}) {
  const httpCode = 400;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
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

function moveFile(from, to) {
    const source = fs.createReadStream(from);
    const dest = fs.createWriteStream(to);

    return new Promise((resolve, reject) => {
        source.on('end', resolve);
        source.on('error', reject);
        source.pipe(dest);
    });
}

module.exports = {
  returnJSON,
  returnJSON400,
  hashPassword,
  isPasswordCorrect,
  moveFile
};
