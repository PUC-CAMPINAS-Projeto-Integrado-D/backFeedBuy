require('dotenv').config();
const fs = require('fs');

const fsPromises = fs.promises;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CoreLib = require('../../class/Functions.js');
const Validate = require('../../class/Validate.js');
const MySQL = require('../../class/BD.js');
const PessoaFisica = require('../../class/PessoaFisica.js');
const Usuario = require('../../class/Usuario.js');

const { secretHMAC } = process.env;

module.exports = async function onMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization.replace(/^Bearer\s+/, '');
  const publicKey = await fsPromises.readFile('./keys/key.pub');

  try {
    const decoded = jwt.verify(token, publicKey);

    const userHeaders = {
      'user-agent': req.headers['user-agent'],
      accept: req.headers.accept,
      language: req.headers.language,
    };

    const identifier = JSON.stringify(userHeaders);
    const checkValidator = crypto.createHmac('sha256', secretHMAC).update(identifier).digest('hex');
    if (checkValidator != decoded.identifier) {
      return CoreLib.returnJSON(res, {
        message: 'Token is invalid',
      }, 403);
    }
    res.locals.jwt = decoded;
  } catch (err) {
    console.log(err);
    return CoreLib.returnJSON(res, {
      message: 'Token has expired or is invalid',
    }, 403);
  }

  next();
};
