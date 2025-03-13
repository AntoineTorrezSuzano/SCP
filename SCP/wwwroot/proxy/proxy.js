const { SERVER_IP, SERVER_PORT, LISTENING_PORT } = require('./config');

const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/', proxy(`http://${SERVER_IP}${SERVER_PORT}`, {
    proxyReqPathResolver: (req) => req.url
}));

app.listen(LISTENING_PORT, () => {
    console.log(`Proxy server listeneing on port ${LISTENING_PORT}`);
})