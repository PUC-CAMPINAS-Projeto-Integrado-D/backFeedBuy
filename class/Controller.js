const fs = require('fs');
const fsPromises = fs.promises;
const crypto = require('crypto');
const CoreLib = require('./Functions.js');
const Validate = require('./Validate.js');
const MySQL = require('./BD.js');
const PessoaFisica = require('./PessoaFisica.js');
const Usuario = require('./Usuario.js');
const jwt = require('jsonwebtoken');

const secretHMAC = "$£₢rEaT1sN0tTo£ve®yOn*";

async function onMiddleware(req, res, next) {
    const authorization = req.headers['authorization'];
    const token = authorization.replace(/^Bearer\s+/, "");
    const publicKey = await fsPromises.readFile('./keys/key.pub');

    try{
        const decoded = jwt.verify(token, publicKey);

        const userHeaders = {
            'user-agent': req.headers['user-agent'],
            'accept': req.headers['accept'],
            'language': req.headers['language']
        };

        const identifier = JSON.stringify(userHeaders);
        const checkValidator = crypto.createHmac('sha256', secretHMAC).update(identifier).digest("hex");
        if(checkValidator != decoded.identifier){
            return CoreLib.returnJSON(res, {
                message: "Token is invalid"
            }, 403);
        }
        res.locals.jwt = decoded;

    }catch(err){
        console.log(err);
        return CoreLib.returnJSON(res, {
            message: "Token has expired or is invalid"
        }, 403);
    }

    next();
    return;
}

function onStandardRoute(req, res) {
    CoreLib.returnJSON(res, req.body);
    return;
}

function onRoutes(req, res) {
    CoreLib.returnJSON(res, []);
    return;
}

function onListenRoute(){
    console.log(`Example app listening at http://localhost`);
}

async function onRegister(req, res){
    const userData = req.body;
    const requiredBody = ['Email', 'Senha', 'Nome', 'Documento', 'Fone', 'Usuario'];
    const validatedData = Validate.hasProperties(userData, requiredBody);

    if(validatedData !== true){
        return CoreLib.returnJSON400(res, {
            message: 'POST Body required not sent',
            required: requiredBody,
            notSent: validatedData
        });
    }

    const senha = String(userData.Senha);
    const phoneValid = String(userData.Fone);

    if(senha.length < 8){
        return CoreLib.returnJSON400(res, {
            message: '\'Senha\' must have at least 8 char',
            required: ['Senha']
        });
    }

    if(phoneValid.match(/^\+\d+$/) == null){
        return CoreLib.returnJSON400(res, {
            message: '\'Fone\' must have COUNTRY CODE, LOCAL CODE and the PHONE NUMBER in right format',
            example: '+5519123456789',
            required: ['Fone']
        });
    }

    const senhaCriptografada = await CoreLib.hashPassword(senha);

    const pessoaFisica = new PessoaFisica({
        'CPF': userData.Documento,
        'Nome': userData.Nome,
        'Telefone': userData.Fone
    });
    const usuario = new Usuario({
        'Email': userData.Email,
        'Senha': senhaCriptografada,
        'Nome': userData.Usuario
    });

    const pessoaFisicaDB = pessoaFisica.save();
    const usuarioDB = usuario.save();

    const mysqlDB = new MySQL();
    try{
        await mysqlDB.connect();
        await mysqlDB.query(usuarioDB.query, usuarioDB.dados);
        await mysqlDB.query(pessoaFisicaDB.query, pessoaFisicaDB.dados); // Save Pessoa Fisica
    }catch(er){
        mysqlDB.disconnect();
        if(er.sqlMessage != undefined && Number(er.sqlState) === 23000){
            return CoreLib.returnJSON(res, {
                message: "It seems this USERNAME already exists, you will need to try another"
            }, 409);
        }
        console.error(er);
        return CoreLib.returnJSON(res, {
            message: "We had a problem we could not handle"
        }, 500);
    }

    mysqlDB.disconnect();
    return CoreLib.returnJSON(res, {
        message: "New user registered",
    }, 201);
}

async function onLogin(req, res){
    const userData = req.body;
    const requiredBody = ['Usuario', 'Senha'];
    const validatedData = Validate.hasProperties(userData, requiredBody);

    if(validatedData !== true){
        return CoreLib.returnJSON400(res, {
            message: 'POST Body required not sent',
            required: requiredBody,
            notSent: validatedData
        });
    }

    const usuario = new Usuario({
        'Email': userData.Usuario,
        'Nome': userData.Usuario,
    });

    const usuarioDB = usuario.getUserData();

    try {
        const mysqlDB = new MySQL();
        await mysqlDB.connect();
        const userInfo = await mysqlDB.query(usuarioDB.query, usuarioDB.dados);
        const userRows = userInfo.rows;

        if(userRows.length != 1){
            return CoreLib.returnJSON(res, {
                message: 'Invalid USER, EMAIL or PASSWORD'
            }, 401);
        }

        const userRow = userRows[0];
        const verifyPass = await CoreLib.isPasswordCorrect(userData.Senha, userRow.Senha);

        if(!verifyPass){
            return CoreLib.returnJSON(res, {
                message: 'Invalid USER, EMAIL or PASSWORD'
            }, 401);
        }

        const userHeaders = {
            'user-agent': req.headers['user-agent'],
            'accept': req.headers['accept'],
            'language': req.headers['language']
        };

        const identifier = JSON.stringify(userHeaders);
        const hashedIdentifier = crypto.createHmac('sha256', secretHMAC).update(identifier).digest("hex");

        const privateKey = await fsPromises.readFile('./keys/private.key');
        const token = jwt
        .sign(
            {
                'identifier': hashedIdentifier,
                'user': {
                    'ID': userRow.ID,
                    'Email': userRow.Email,
                    'Nome': userRow.Nome,
                    'Cargo': userRow.Cargo
                }
            },
            privateKey,
            {algorithm: 'RS256', expiresIn: '1hr'}
        );
        return CoreLib.returnJSON(res, {
            token: token
        }, 200);

    } catch (er) {
        console.error(er);
        return CoreLib.returnJSON(res, {
            message: "We had a problem we could not handle"
        }, 500);
    }
}

async function onGetUser(req, res) {
    const userData = req.body;
    const userID = res.locals.jwt.user.ID;

    const usuario = new Usuario({
        'ID': userID
    });

    const usuarioDB = usuario.getUserByID();
    const mysqlDB = new MySQL();

    try{
        await mysqlDB.connect();
        const userInfo = await mysqlDB.query(usuarioDB.query, usuarioDB.dados);

        const userRows = userInfo.rows[0];

        if(userRows == undefined){
            return CoreLib.returnJSON(res, {
                message: "We did not find you"
            }, 404);
        }

        delete userRows.Senha; // Segredo

        return CoreLib.returnJSON(res, userRows, 200);

    }catch(er){
        mysqlDB.disconnect();

        console.error(er);
        return CoreLib.returnJSON(res, {
            message: "We had a problem we could not handle"
        }, 500);
    }
}

async function onGetUserByID(req, res) {
    const userData = req.body;
    const routesParam = req.params;

    const validatedData = Validate.isNumber(routesParam.id);

    if(!validatedData){
        return CoreLib.returnJSON(res, {
            message: "You did not send 'id' as a valid number"
        }, 400);
    }

    const userID = res.locals.jwt.user.ID;

    const usuario = new Usuario({
        'ID': routesParam.id
    });

    const usuarioDB = usuario.getUserByID();
    const mysqlDB = new MySQL();

    try{
        await mysqlDB.connect();
        const userInfo = await mysqlDB.query(usuarioDB.query, usuarioDB.dados);

        const userRows = userInfo.rows[0];

        if(userRows == undefined){
            return CoreLib.returnJSON(res, {
                message: "We did not find a user with this ID"
            }, 404);
        }

        delete userRows.Senha; // Segredo

        return CoreLib.returnJSON(res, userRows, 200);

    }catch(er){
        mysqlDB.disconnect();

        console.error(er);
        return CoreLib.returnJSON(res, {
            message: "We had a problem we could not handle"
        }, 500);
    }
}

module.exports = {
    onStandardRoute,
    onListenRoute,
    onMiddleware,
    onRoutes,
    onRegister,
    onLogin,
    onGetUser,
    onGetUserByID
}
