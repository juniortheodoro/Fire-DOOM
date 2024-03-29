'use strict'

const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

var route = router.get('/', (req, res, next) => {
    res.status(200).sendFile({
        title: "Fire-DOOM",
        version: "0.0.1"
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/fire.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/fire.js'));
});

app.use('/', route);

server.listen(port);
server.on('error', onError);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind = ' requires elevated privileges');
            process.exit(1);
            break
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
        default:
            throw error;
    }
}