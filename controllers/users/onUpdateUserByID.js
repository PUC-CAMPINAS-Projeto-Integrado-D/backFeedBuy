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

module.exports = async function onUpdateUserByID(req, res) {
  const routesParam = req.params;
  const userData = req.body;
  const userID = res.locals.jwt.user.ID;
  const userPermission = res.locals.jwt.user.Cargo;

  const validatedData = Validate.isNumber(userID);

  if (!validatedData) {
    return CoreLib.returnJSON(res, {
      message: "You did not send 'id' as a valid number",
    }, 400);
  }

  if (userPermission != 'ADMINISTRADOR' && userData.Cargo != null && userData.Cargo != undefined) {
    return CoreLib.returnJSON(res, {
      message: 'You have no permission to update your Role!',
    }, 403);
  }

  if (userData.Senha != undefined) {
    userData.Senha = String(userData.Senha);

    if (userData.Senha.length < 8) {
      return CoreLib.returnJSON400(res, {
        message: '\'Senha\' must have at least 8 char',
        required: ['Senha'],
      });
    }
    userData.Senha = await CoreLib.hashPassword(userData.Senha);
  }

  const usuario = new Usuario({
    ID: userID,
    Email: userData.Email,
    Senha: userData.Senha,
    Nome: userData.Usuario,
    Cargo: userData.Cargo,
  });

  const usuarioDB = usuario.update();

  const mysqlDB = new MySQL();
  try {
    await mysqlDB.connect();
    await mysqlDB.query(usuarioDB.query, usuarioDB.dados);
    mysqlDB.disconnect();

    return CoreLib.returnJSON(res, {}, 204);
  } catch (er) {
    mysqlDB.disconnect();
    if (er.sqlMessage != undefined && Number(er.sqlState) === 23000) {
      return CoreLib.returnJSON(res, {
        message: 'It seems this USERNAME already exists, you will need to try another',
      }, 409);
    }
    console.error(er);
    return CoreLib.returnJSON(res, {
      message: 'We had a problem we could not handle',
    }, 500);
  }
};
