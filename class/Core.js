const express = require('express');
const timeout = require('connect-timeout');
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

    // Users Private
    routerPrivate .get    ('/user', controller.onGetUser);
    routerPrivate .get    ('/user/:id', controller.onGetUserByID);
    routerPrivate .post   ('/user/:id', controller.onStandardRoute);
    routerPrivate .put    ('/user/:id', controller.onStandardRoute);
    routerPrivate .delete ('/user/:id', controller.onStandardRoute);

    // Ad Private
    routerPrivate .get    ('/ad', controller.onStandardRoute);
    routerPrivate .get    ('/ad/:id', controller.onStandardRoute);
    routerPrivate .post   ('/ad/:id', controller.onStandardRoute);
    routerPrivate .put    ('/ad/:id', controller.onStandardRoute);
    routerPrivate .delete ('/ad/:id', controller.onStandardRoute);

    // Routes Public
    routerPublic .post    ('/login', controller.onLogin);
    routerPublic .post    ('/register', controller.onRegister);

    // Permissions
    routerV1 .use        ('/private', routerPrivate);
    routerV1 .use        ('/public', routerPublic);

    // Versions
    app.use(jsonParser); // JSON Body

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
