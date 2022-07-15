const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const ColumnController = require('./controllers/ColumnController');
const secret = process.env.NODE_APP_SECRET;

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).end();
        res.userId = decoded.userId;
        next();
    })
}

//Initial route
routes.get('/', (req, res) => {
    res.json({ message: "Tudo certo por aqui!" });
})


//Column route
routes.post('/Columns', ColumnController.create);
routes.get('/Columns', ColumnController.get);


module.exports = routes;