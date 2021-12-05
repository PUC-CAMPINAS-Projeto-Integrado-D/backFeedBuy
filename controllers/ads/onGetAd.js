require('dotenv').config();
const fs = require('fs');

const fsPromises = fs.promises;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CoreLib = require('../../class/Functions.js');
const Validate = require('../../class/Validate.js');
const MySQL = require('../../class/BD.js');
const PessoaFisica = require('../../class/PessoaFisica.js');
const Anuncio = require('../../class/Anuncio.js');
const Produto = require('../../class/Produto.js');

const { secretHMAC } = process.env;

module.exports = async function onGetAd(req, res) {
  const userData = req.body;
  const mysqlDB = new MySQL();

  if (userData.Limit != undefined) {
    if (userData.Limit > 500) {
      userData.Limit = 500;
    }
  }

  try {
    await mysqlDB.connect();
    const limit = Number(userData.Limit) || undefined;
    const page = Number(userData.Page) || undefined;

    // Get Ad
    const anuncio = new Anuncio({
      Limit: limit,
      Page: page,
    });
    const anuncios = anuncio.getListWithBrand();
    const count = anuncio.getCountTotal();

    const response = await Promise.all([
      mysqlDB.query(anuncios.query, anuncios.dados),
      mysqlDB.query(count.query, count.dados),
    ]);

    mysqlDB.disconnect();

    return CoreLib.returnJSON(res, response[0].rows, 200, {
      Total: response[1].rows[0].Total,
      Page: page,
      Limit: limit,
    });
  } catch (er) {
    mysqlDB.disconnect();

    console.error(er);
    return CoreLib.returnJSON(res, {
      message: 'We had a problem we could not handle',
    }, 500);
  }
};
