const express = require('express');
const controller = require('./Controller.js');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const routerV1 = express.Router();
const routerPublic = express.Router();
const routerPrivate = express.Router();

function setRoutes () {

    // Middlewares
    routerPrivate .use       (controller.onMiddleware);

    // Routes Private
    routerPrivate .get    ('/routes', controller.onRoutes);

    // User
    routerPrivate .get    ('/user', controller.onStandardRoute);
    routerPrivate .get    ('/user/:id', controller.onStandardRoute);
    routerPrivate .post   ('/user/:id', controller.onStandardRoute);
    routerPrivate .put    ('/user/:id', controller.onStandardRoute);
    routerPrivate .delete ('/user/:id', controller.onStandardRoute);

    routerPrivate .get    ('/ad', controller.onStandardRoute);
    routerPrivate .get    ('/ad/:id', controller.onStandardRoute);
    routerPrivate .post   ('/ad/:id', controller.onStandardRoute);
    routerPrivate .put    ('/ad/:id', controller.onStandardRoute);
    routerPrivate .delete ('/ad/:id', controller.onStandardRoute);

    // Routes Public
    routerPublic .post    ('/login', controller.onStandardRoute);
    routerPublic .post    ('/register', controller.onRegister);

    // Permissions
    routerV1 .use        ('/signed', routerPrivate);
    routerV1 .use        ('/public', routerPublic);

    // Version
    app.use(jsonParser);
    app.use('/v1', routerV1);

    // Listen
    app.listen(port, controller.onListenRoute);
}

function main() {
    setRoutes();
}

module.exports = {
    main
}
