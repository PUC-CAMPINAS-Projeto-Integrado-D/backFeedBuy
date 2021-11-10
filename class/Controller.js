const CoreLib = require('./Functions.js');
const Validate = require('./Validate.js');
const MySQL = require('./BD.js');
const PessoaFisica = require('./PessoaFisica.js');
const Usuario = require('./Usuario.js');

function onMiddleware(req, res, next) {


    next();
    return;
}

function onStandardRoute(req, res) {
    console.log(res);
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

    const senhaCriptografada = CoreLib.hashPassword(senha);

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

    const saveUsuario = MySQL.query(usuarioDB.query, usuarioDB.dados);

    saveUsuario
    .then((response)=>{
        return MySQL.query(pessoaFisicaDB.query, pessoaFisicaDB.dados); // Save Pessoa Fisica
    })
    .then((response)=>{
        console.log(response);
        return CoreLib.returnJSON(res, {
            message: "New user registered",
        }, 201);
    })
    .catch((er)=>{
        if(er.sqlMessage != undefined && Number(er.sqlState) === 23000){
            return CoreLib.returnJSON(res, {
                message: "It seems this USERNAME already exists, you will need to try another"
            }, 409);
        }
        console.error(er);
        return CoreLib.returnJSON(res, {
            message: "We had a problem we didn't solve"
        }, 500);
    });

}

module.exports = {
    onStandardRoute,
    onListenRoute,
    onMiddleware,
    onRoutes,
    onRegister
}
