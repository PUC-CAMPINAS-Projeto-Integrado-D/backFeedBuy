require('dotenv').config();
const fs = require('fs');

const fsPromises = fs.promises;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CoreLib = require('../../class/Functions.js');
const Validate = require('../../class/Validate.js');
const MySQL = require('../../class/BD.js');
const Anuncio = require('../../class/Anuncio.js');
const HashTag = require('../../class/Hashtag.js');
const AssuntosAnuncio = require('../../class/AssuntosAnuncio.js');
const Produto = require('../../class/Produto.js');

const { secretHMAC } = process.env;

module.exports = async function onAddAd(req, res) {
  const userData = req.body;
  const routesParam = req.params;
  const validatedData = Validate.isNumber(routesParam.id);
  const userID = res.locals.jwt.user.ID;

  if (!validatedData) {
    return CoreLib.returnJSON(res, {
      message: "You did not send 'id' as a valid number",
    }, 400);
  }

  const mysqlDB = new MySQL();

  try {
    await mysqlDB.connect();

    // Register Brand
    const produto = new Produto({
      Marca: userData.Marca,
    });
    const produtoDBSave = produto.save();
    await mysqlDB.query(produtoDBSave.query, produtoDBSave.dados);

    // Register Ad
    const anuncio = new Anuncio({
      ID: routesParam.id,
      Anunciante: userID,
    });
    const anuncios = anuncio.delete();
    await mysqlDB.query(anuncios.query, anuncios.dados);

    mysqlDB.disconnect();

    return CoreLib.returnJSON(res, {
      message: 'Ad registered',
    }, 201);
  } catch (er) {
    mysqlDB.disconnect();

    console.error(er);
    return CoreLib.returnJSON(res, {
      message: 'We had a problem we could not handle',
    }, 500);
  }
};
