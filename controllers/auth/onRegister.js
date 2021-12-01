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

module.exports = async function onRegister(req, res) {
  const userData = req.body;
  const requiredBody = ['Email', 'Senha', 'Nome', 'Documento', 'Fone', 'Usuario'];
  const validatedData = Validate.hasProperties(userData, requiredBody);

  if (validatedData !== true) {
    return CoreLib.returnJSON400(res, {
      message: 'POST Body required not sent',
      required: requiredBody,
      notSent: validatedData,
    });
  }

  const senha = String(userData.Senha);
  const phoneValid = String(userData.Fone);

  if (senha.length < 8) {
    return CoreLib.returnJSON400(res, {
      message: '\'Senha\' must have at least 8 char',
      required: ['Senha'],
    });
  }

  if (phoneValid.match(/^\+\d+$/) == null) {
    return CoreLib.returnJSON400(res, {
      message: '\'Fone\' must have COUNTRY CODE, LOCAL CODE and the PHONE NUMBER in right format',
      example: '+5519123456789',
      required: ['Fone'],
    });
  }

  const senhaCriptografada = await CoreLib.hashPassword(senha);

  const pessoaFisica = new PessoaFisica({
    CPF: userData.Documento,
    Nome: userData.Nome,
    Telefone: userData.Fone,
  });
  const usuario = new Usuario({
    Email: userData.Email,
    Senha: senhaCriptografada,
    Nome: userData.Usuario,
  });

  const pessoaFisicaDB = pessoaFisica.save();
  const usuarioDB = usuario.save();

  const mysqlDB = new MySQL();
  try {
    await mysqlDB.connect();
    await mysqlDB.query(usuarioDB.query, usuarioDB.dados);
    await mysqlDB.query(pessoaFisicaDB.query, pessoaFisicaDB.dados); // Save Pessoa Fisica

    mysqlDB.disconnect();
    return CoreLib.returnJSON(res, {
      message: 'New user registered',
    }, 201);
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
