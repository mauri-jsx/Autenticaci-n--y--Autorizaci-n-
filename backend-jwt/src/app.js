// server.js
import express from 'express';
import cookieParser from 'cookie-parser';
import { router } from './routes/authRoutes.js';
import config from './config.js';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${config.PORT}`);
});
