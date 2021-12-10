const multer  = require('multer');
const express = require('express');
const timeout = require('connect-timeout');
const bodyParser = require('body-parser');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
const port = 8080;
const app = express();
app.use(cors());
app.options('*', cors());
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
const onAddAd = require('../controllers/ads/onAddAd.js');
const onGetAd = require('../controllers/ads/onGetAd.js');
const onDeleteAd = require('../controllers/ads/onDeleteAd.js');

// Buy
const onBuy = require('../controllers/buy/onBuy.js');

// Address
const onAddAddress = require('../controllers/address/onAddAddress.js');

// Media
const onAddMedia = require('../controllers/medias/onAddMedia.js');
const onDeleteMedia = require('../controllers/medias/onDeleteMedia.js');
const onGetMedia = require('../controllers/medias/onGetMedia.js');

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
  routerPrivate.delete('/ad/:id', onDeleteAd);

  routerPublic.get('/ad/:id', onStandardRoute);
  routerPublic.get('/ad', onGetAd);

  // Media
  routerPrivate.delete('/media', upload.single('media'), onDeleteMedia);
  routerPrivate.put('/media', upload.single('media'), onAddMedia);

  routerPublic.get('/media/:id', onGetMedia);

  // Buy
  routerPrivate.post('/buy', onBuy);

  // Address
  routerPrivate.post('/address', onAddAddress);

  // Auth routes
  routerPublic.post('/login', onLogin);
  routerPublic.post('/register', onRegister);

  // Permissions
  routerV1.use('/private', routerPrivate);
  routerV1.use('/public', routerPublic);

  // Versions
  app.use(bodyParser.urlencoded({ extended: false })); // URLEncoded Body
  app.use(bodyParser.json()); // JSON Body

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
