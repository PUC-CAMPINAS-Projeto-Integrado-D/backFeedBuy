require('dotenv').config();
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CoreLib = require('../../class/Functions.js');
const Validate = require('../../class/Validate.js');
const MySQL = require('../../class/BD.js');
const Midia = require('../../class/Midia.js');
const GaleriaAnuncio = require('../../class/GaleriaAnuncio.js');


const { secretHMAC } = process.env;

module.exports = async function onAddMedia(req, res) {
    const userData = req.body;
    const requiredBody = ['Descricao', 'Preco', 'Marca'];
    const validatedData = Validate.hasProperties(userData, requiredBody);
    const userID = res.locals.jwt.user.ID;
    const pathFile = 'uploads/';

    const newFileName = userData.ID+path.extname(req.file.originalname);
    console.log(newFileName);
    const media = new Midia({
        Link: newFileName,
        NomeArquivo: req.file.originalname
    });
    const saveMedia = media.save();

    try {
        const mysqlDB = new MySQL(true);
        const resultSave = await mysqlDB.query(saveMedia.query, saveMedia.dados);
        console.log(resultSave);
        if (Number(resultSave.rows.insertId) > 0) {
            const galeria = new GaleriaAnuncio({
                Midia:  resultSave.rows.insertId,
                Anuncio: Number(userData.ID)
            });
            const saveGaleria = galeria.save();
            await mysqlDB.query(saveGaleria.query, saveGaleria.dados);
        }

    }catch(ex){
        console.error(ex);
    }

    const regex = new RegExp(userData.ID+'\.[^ ]+$');
    fs.readdirSync(pathFile)
        .filter(f => regex.test(f))
        .map(f => fs.unlinkSync(pathFile + f))

    fs.rename(req.file.path, pathFile+newFileName, (err) =>{
        if ( err ) console.error('ERROR: ' + err);
    });

    return CoreLib.returnJSON(res, {
        message: 'Media registered',
    }, 201);

};
