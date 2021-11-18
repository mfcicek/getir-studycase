const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const app = express();
const { returnError, isOperationalError} = require('./middlewares/errorHandler');
const api404Error = require('./utils/api404Error');
const logger = require('./utils/logger')
const routes = require('./routes/recordRoute');
const config = require('./config/config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

let server;
mongoose
    .connect(config.mongodb_url)
    .then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(config.port, () => {
        console.log(`Listening to port ${config.port}`);
    });
    })
    .catch((err) => {
        logger.error(err)
    });

process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    if (server) {
        server.close();
    }
});

//Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options('*', cors());

// gzip compression
app.use(compression());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/', routes);

app.use((req, res, next) => {
    next(new api404Error());
});

// handle error
app.use(returnError);

//When unexpected errors happen, send a notification and restart the app to avoid unexpected behavior.
process.on('uncaughtException', error => {
    logger.error(error)

    if (!isOperationalError(error)) {
        process.exit(1)
    }
})

// if the Promise is rejected this will catch it
process.on('unhandledRejection', error => {
    throw error
})

module.exports = app;