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

module.exports = async function onGetMedia(req, res) {

    const mime = {
        gif: 'image/gif',
        jpg: 'image/jpeg',
        png: 'image/png',
        svg: 'image/svg+xml',
    };
    const routesParam = req.params;
    const pathFile = 'uploads/';

    const regex = new RegExp('^'+routesParam.id+'\\.[^ ]+$');
    const filePath = fs.readdirSync(pathFile).filter(f => regex.test(f)).map(f => pathFile + f);
    if(filePath.length <= 0){
        var s = fs.createReadStream('uploads/default.jpg');
        s.on('open', function () {
            res.set('Content-Type', 'image/jpeg');
            s.pipe(res);
        });
        s.on('error', function () {
            res.set('Content-Type', 'text/plain');
            res.status(404).end('Not found');
        });
        return;
    }

    const foundFilename = filePath[0];
    const type = mime[path.extname(foundFilename).slice(1)] || 'text/plain';
    var s = fs.createReadStream(foundFilename);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });

};
