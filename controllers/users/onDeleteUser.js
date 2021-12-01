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

module.exports = async function onDeleteUser(req, res) {
  const userData = req.body;
  const userID = res.locals.jwt.user.ID;

  const usuario = new Usuario({
    ID: userID,
  });

  const usuarioDB = usuario.delete();
  const mysqlDB = new MySQL();

  try {
    await mysqlDB.connect();
    const userInfo = await mysqlDB.query(usuarioDB.query, usuarioDB.dados);

    mysqlDB.disconnect();

    return CoreLib.returnJSON(res, {}, 204);
  } catch (er) {
    mysqlDB.disconnect();

    console.error(er);
    return CoreLib.returnJSON(res, {
      message: 'We had a problem we could not handle',
    }, 500);
  }
};
