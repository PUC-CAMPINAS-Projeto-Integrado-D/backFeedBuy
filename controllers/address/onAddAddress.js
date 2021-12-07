require('dotenv').config();
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CoreLib = require('../../class/Functions.js');
const Validate = require('../../class/Validate.js');
const MySQL = require('../../class/BD.js');
const Endereco = require('../../class/Endereco.js');
const Compra = require('../../class/Compra.js');


const { secretHMAC } = process.env;

module.exports = async function onBuy(req, res) {
    const userData = req.body;
    const requiredBody = [Endereco, Bairro, Numero, CEP, Cidade];
    const validatedData = Validate.hasProperties(userData, requiredBody);
    const userID = res.locals.jwt.user.ID;

    if (validatedData !== true) {
        return CoreLib.returnJSON400(res, {
            message: 'POST Body required not sent',
            required: requiredBody,
            notSent: validatedData,
        });
    }

    const end = new Endereco({
        'Endereco': userData.Endereco,
        'Bairro': userData.Bairro,
        'Numero': userData.Numero,
        'CEP': userData.CEP,
        'Cidade': userData.Cidade,
    });
    const endSave = end.save();

    const mysqlDB = new MySQL();

    try {
        await mysqlDB.connect();
        await mysqlDB.query(endSave.query, endSave.dados);
        mysqlDB.disconnect();

        return CoreLib.returnJSON(res, {
            message: 'Address registered',
        }, 201);
    } catch (er) {
        mysqlDB.disconnect();

        console.error(er);
        return CoreLib.returnJSON(res, {
            message: 'We had a problem we could not handle',
        }, 500);
    }
};
