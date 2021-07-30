import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import API_v1 from './api';
import config from './server.config';

const morgan = require('morgan');
require('dotenv').config();

const app = express();
const server = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true, limit: '1536mb' }));
app.use(bodyParser.json({ limit: '1536mb' }));
app.use(cookieParser());

app.set(__dirname, 'views');
app.set('view engine', 'pug');

app.use(
    morgan('dev', {
        skip: (req, res) => {
            return res.statusCode < 400;
        },
        stream: process.stderr,
    }),
);

app.use(
    morgan('dev', {
        skip: (req, res) => {
            return res.statusCode >= 400;
        },
        stream: process.stdout,
    }),
);

app.use(function (req, res, next) {
    const allowedOrigins = config.allowedOrigin;
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    req.method === 'OPTIONS' ? res.sendStatus(200) : next();
});

app.use('/static', express.static('static'));
app.use('/v1', API_v1);

server.listen(process.env.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
