import express from 'express';
import cors from 'cors';

import path from 'path';

import router from './routes';

import { httpLogger } from './logger/Logger';
import auth from './middlewares/auth';
import user from './middlewares/user';
import onError from './middlewares/error';
import { swaggerServe, swaggerSetup } from './middlewares/swagger';

const app = express();

app.use(httpLogger);

// Then pass these options to cors:
app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(auth);

app.use(user);

if (process.env.NODE_ENV === 'development') {
  app.use('/docs', swaggerServe, swaggerSetup);
}

app.use('/', router);

// app.use(onError);

export default app;
