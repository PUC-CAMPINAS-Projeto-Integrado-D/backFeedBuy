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

module.exports = async function onGetUserByID(req, res) {
  const userData = req.body;
  const routesParam = req.params;

  const validatedData = Validate.isNumber(routesParam.id);

  if (!validatedData) {
    return CoreLib.returnJSON(res, {
      message: "You did not send 'id' as a valid number",
    }, 400);
  }

  const userID = res.locals.jwt.user.ID;

  const usuario = new Usuario({
    ID: routesParam.id,
  });

  const usuarioDB = usuario.getUserByID();
  const mysqlDB = new MySQL();

  try {
    await mysqlDB.connect();
    const userInfo = await mysqlDB.query(usuarioDB.query, usuarioDB.dados);

    const userRows = userInfo.rows[0];

    if (userRows == undefined) {
      return CoreLib.returnJSON(res, {
        message: 'We did not find a user with this ID',
      }, 404);
    }

    delete userRows.Senha; // Segredo
    mysqlDB.disconnect();

    return CoreLib.returnJSON(res, userRows, 200);
  } catch (er) {
    mysqlDB.disconnect();

    console.error(er);
    return CoreLib.returnJSON(res, {
      message: 'We had a problem we could not handle',
    }, 500);
  }
};
