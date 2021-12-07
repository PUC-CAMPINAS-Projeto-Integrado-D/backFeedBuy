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

module.exports = async function onDeleteMedia(req, res) {
  const userData = req.body;
  const requiredBody = ['Descricao', 'Preco', 'Marca'];
  const validatedData = Validate.hasProperties(userData, requiredBody);
  const userID = res.locals.jwt.user.ID;

  

};
