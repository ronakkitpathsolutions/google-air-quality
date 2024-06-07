import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import rfs from 'rotating-file-stream'
import morgan from 'morgan';

import Engine from './src/utils/engine.js';
import Database from './src/db/index.js';
import router from './src/routes/index.js';

const stream = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const filename = `${day}-${month}-${year}.log`
    const loggerStream = rfs.createStream(`logger/${filename}`, {
        size: "10M", // rotate every 10 MegaBytes written
        interval: "1d", // rotate daily
        compress: "gzip", // compress rotated files,
    });
    return loggerStream
}

class App {
    constructor() {
        dotenv.config();
        Engine.ignition()
            .then(() => express())
            .then((app) => this.dbConfiguration(app))
            .then((app) => {
                console.log('2. server configuration completed.');
                return this.configureServer(app);
            })
            .then((app) => {
                console.log('3. server starting.');
                return this.startServer(app);
            });
    }

    configureServer = async () => {
        try {
            const app = express();
            app.use(cors());
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            app.use(bodyParser.urlencoded({ extended: false }));
            
            // create a rotating write stream
            
            app.use(morgan('combined', { stream: stream() }));
            app.use('/api/v1', router);
            return app;
        } catch (error) {
            console.log('error', error);
        }
    };

    startServer = (app) => {
        new Promise((resolve) => {
            const port = process.env.PORT || 4000;
            app.set(port);
            const server = http.createServer(app);
            server.on('listening', () => {
                const PORT = server.address().port;
                console.log('4. server started on:', `http://localhost:${PORT}/api/v1`);
                resolve(server);
            });
            server.listen(port);
        });
    };

    dbConfiguration = async (app) => {
        try {
            await Database.connection().then(() => {
                console.log('1. database connected.');
                return app;
            });
        } catch (error) {
            console.log('error', error);
        }
    };
}

export default new App();
