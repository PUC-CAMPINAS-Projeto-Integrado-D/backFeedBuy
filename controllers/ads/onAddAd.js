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
  const requiredBody = ['Descricao', 'Preco', 'Marca'];
  const validatedData = Validate.hasProperties(userData, requiredBody);
  const userID = res.locals.jwt.user.ID;

  if (validatedData !== true) {
    return CoreLib.returnJSON400(res, {
      message: 'POST Body required not sent',
      required: requiredBody,
      notSent: validatedData,
    });
  }

  if (!Validate.isNumber(userData.Preco)) {
    return CoreLib.returnJSON400(res, {
      message: 'PRECO must be a Number',
    });
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

    const produtoDBGet = produto.getByMarca();
    const resultProduto = await mysqlDB.query(produtoDBGet.query, produtoDBGet.dados);

    const produtoRow = resultProduto.rows[0];
    const hashtags = userData.Descricao.match(/\#[^ ]+/gi);
    const cleanedDesc = userData.Descricao;

    // Register Ad
    const anuncio = new Anuncio({
      Descricao: cleanedDesc,
      Preco: userData.Preco,
      Marca: produtoRow.ID,
      Anunciante: userID,
    });

    const anuncios = anuncio.save();

    const adResult = await mysqlDB.query(anuncios.query, anuncios.dados);
    const adId = adResult.rows.insertId;

    if (hashtags != null) {
      const hashtag = new HashTag({});
      const subject = new AssuntosAnuncio({});

      const saveHashtag = hashtag.save();
      const saveSubject = subject.save();

      const bindsHashtag = [hashtags.map((hash) => [hash])];
      await mysqlDB.query(saveHashtag.query, bindsHashtag);

      const bindsSubject = [adId, hashtags];
      await mysqlDB.query(saveSubject.query, bindsSubject);
    }

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
