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

module.exports = async function onGetAds(req, res) {
  const reqBody = req.body;
  const anuncio = new Anuncio();

  const anuncios = anuncio.getAll();
  const mysqlDB = new MySQL();

  try {
    await mysqlDB.connect();
    const userInfo = await mysqlDB.query(anuncios.query, anuncios.dados);
    const listOfItens = userInfo.rows;

    mysqlDB.disconnect();

    return CoreLib.returnJSON(res, listOfItens, 200);
  } catch (er) {
    mysqlDB.disconnect();

    console.error(er);
    return CoreLib.returnJSON(res, {
      message: 'We had a problem we could not handle',
    }, 500);
  }
};
