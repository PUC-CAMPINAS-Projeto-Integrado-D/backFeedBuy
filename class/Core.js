const express = require('express');
const app = express();
const port = 3000;

const setRoutes = () => {
    app.get('/', (req, res) => returnJSON(res, [1, 2, 3, 4]));
    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
}

const returnJSON = (res, objectJSON = {}, httpCode = 200) => {
    return res.status(httpCode).json({data: objectJSON, status: httpCode});
}

const main = () => {
    setRoutes();
}

module.exports = {
    main
}
