const express = require('express');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const routerV1 = express.Router();
const routerPublic = express.Router();
const routerPrivate = express.Router();

// Auth
const onMiddleware = require('../controllers/auth/onMiddleware.js');
const onLogin = require('../controllers/auth/onLogin.js');
const onRegister = require('../controllers/auth/onRegister.js');

const onListenRoute = require('../controllers/auth/onListenRoute.js');
const onStandardRoute = require('../controllers/auth/onStandardRoute.js');
const onRoutes = require('../controllers/auth/onRoutes.js');

// Users
const onDeleteUser = require('../controllers/users/onDeleteUser.js');
const onUpdateUserByID = require('../controllers/users/onUpdateUserByID.js');
const onGetUser = require('../controllers/users/onGetUser.js');
const onGetUserByID = require('../controllers/users/onGetUserByID.js');

// Ads
const onGetAds = require('../controllers/ads/onGetAds.js');
const onAddAd = require('../controllers/ads/onAddAd.js');

function setRoutes() {
  // Middlewares
  routerPrivate.use(onMiddleware);

  // Routes Private
  routerPrivate.get('/routes', onRoutes);

  // Users Private
  routerPrivate.delete('/user', onDeleteUser);
  routerPrivate.patch('/user', onUpdateUserByID);
  routerPrivate.get('/user', onGetUser);
  routerPrivate.get('/user/:id', onGetUserByID);

  // Ad
  routerPrivate.post('/ad', onAddAd);
  routerPrivate.patch('/ad/:id', onStandardRoute);
  routerPrivate.delete('/ad/:id', onStandardRoute);

  routerPublic.get('/ad/:id', onStandardRoute);
  routerPublic.get('/ad', onGetAds);

  // Routes Public
  routerPublic.post('/login', onLogin);
  routerPublic.post('/register', onRegister);

  // Permissions
  routerV1.use('/private', routerPrivate);
  routerV1.use('/public', routerPublic);

  // Versions
  app.use(jsonParser); // JSON Body

  app.use('/v1', routerV1);

  // Listen
  app.listen(port, onListenRoute);
}

function main() {
  setRoutes();
}

module.exports = {
  main,
};
