require('dotenv').config();
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CoreLib = require('../../class/Functions.js');
const Validate = require('../../class/Validate.js');
const MySQL = require('../../class/BD.js');
const Compra = require('../../class/Compra.js');
const ItensCompra = require('../../class/ItensCompra.js');


const { secretHMAC } = process.env;

module.exports = async function onBuy(req, res) {
    const userData = req.body;
    const requiredBody = [ 'Endereco', 'Itens' ];
    const validatedData = Validate.hasProperties(userData, requiredBody);
    const userID = res.locals.jwt.user.ID;

    if (validatedData !== true || typeof userData.Itens !== 'object') {
        return CoreLib.returnJSON400(res, {
            message: 'POST Body required not sent',
            required: requiredBody,
            notSent: validatedData,
        });
    }
    const newInput = [];
    userData.Itens.forEach((value)=>{
        const requiredValues = [ 'Anuncio', 'Valor',  'Quantidade'];
        const validatedValues = Validate.hasProperties(value, requiredValues);

        if(validatedValues !== true){
            return CoreLib.returnJSON400(res, {
                message: 'POST Body required not sent [ITENS]',
                required: requiredBody,
                notSent: validatedData,
            });
        }
        newInput.push([
            value.Anuncio,
            value.Valor,
            value.Quantidade,
        ]);
    });

    const compra = new Compra({
        'Endereco': userData.Endereco,
        'Observacoes': userData.Observacoes,
        'Usuario': userID
    });

    const compraSave = compra.save();

    const mysqlDB = new MySQL();

    try {
        await mysqlDB.connect();
        const response = await mysqlDB.query(compraSave.query, compraSave.dados);
        const fullfilledInput = newInput.map(x=>{
            x.push(response.rows.insertId);
            return x;
        });


        const itens = new ItensCompra({});
        console.log(itens);
        const itensSave = itens.save();

        await mysqlDB.query(itensSave.query, [fullfilledInput]);
        mysqlDB.disconnect();

        return CoreLib.returnJSON(res, {
            message: 'Purchase registered',
        }, 201);
    } catch (er) {
        mysqlDB.disconnect();

        console.error(er);
        return CoreLib.returnJSON(res, {
            message: 'We had a problem we could not handle',
        }, 500);
    }
};
