import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { routes } from './routes';

class Server {
    readonly server = express();
    port: number;

    constructor() {
        this.server = express();

        this.setMiddlewares();
        this.setRoutes();

        this.port = Number(process.env.SERVER_PORT) || 3000;
        this.server.listen(this.port, () => {
            console.log("Server running in http://localhost:" + this.port)
        });
    }

    setMiddlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(cors());
    }

    setRoutes() {
        this.server.use(routes);
    }
}

export { Server }