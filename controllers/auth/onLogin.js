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

module.exports = async function onLogin(req, res) {
  const userData = req.body;
  const requiredBody = ['Usuario', 'Senha'];
  const validatedData = Validate.hasProperties(userData, requiredBody);

  if (validatedData !== true) {
    return CoreLib.returnJSON400(res, {
      message: 'POST Body required not sent',
      required: requiredBody,
      notSent: validatedData,
    });
  }

  const usuario = new Usuario({
    Email: userData.Usuario,
    Nome: userData.Usuario,
  });

  const usuarioDB = usuario.getUserData();

  try {
    const mysqlDB = new MySQL();
    await mysqlDB.connect();
    const userInfo = await mysqlDB.query(usuarioDB.query, usuarioDB.dados);
    const userRows = userInfo.rows;

    if (userRows.length != 1) {
      return CoreLib.returnJSON(res, {
        message: 'Invalid USER, EMAIL or PASSWORD',
      }, 401);
    }

    const userRow = userRows[0];
    const verifyPass = await CoreLib.isPasswordCorrect(userData.Senha, userRow.Senha);

    if (!verifyPass) {
      return CoreLib.returnJSON(res, {
        message: 'Invalid USER, EMAIL or PASSWORD',
      }, 401);
    }

    const userHeaders = {
      'user-agent': req.headers['user-agent'],
      accept: req.headers.accept,
      language: req.headers.language,
    };

    const identifier = JSON.stringify(userHeaders);
    const hashedIdentifier = crypto.createHmac('sha256', secretHMAC).update(identifier).digest('hex');

    const privateKey = await fsPromises.readFile('./keys/private.key');
    const token = jwt
      .sign(
        {
          identifier: hashedIdentifier,
          user: {
            ID: userRow.ID,
            Email: userRow.Email,
            Nome: userRow.Nome,
            Cargo: userRow.Cargo,
          },
        },
        privateKey,
        { algorithm: 'RS256', expiresIn: '1hr' },
      );
    mysqlDB.disconnect();
    return CoreLib.returnJSON(res, {
      token,
      user: {
        ID: userRow.ID,
        Email: userRow.Email,
        Nome: userRow.Nome,
        Cargo: userRow.Cargo,
      },
    }, 200);
  } catch (er) {
    mysqlDB.disconnect();
    console.error(er);
    return CoreLib.returnJSON(res, {
      message: 'We had a problem we could not handle',
    }, 500);
  }
};
