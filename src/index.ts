import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`);

import app from './app';
import Logger from './logger/Logger';
import BaseError from './errors/BaseError';

import { Bootstrapper, dbClient } from './config';

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || '0.0.0.0';

const initDB = async () => {
  await dbClient.init();
};

try {
  initDB().then(() => {
    Bootstrapper.init();
  });
} catch (error) {
  Logger.error(error);
}

const server = app.listen(PORT, HOST, () => {
  Logger.info(`Server running on http://${HOST}:${PORT}/root`);
});

const handleExit = (reason: string) => {
  server.close(() => {
    Logger.info(`Server closed, reason: ${reason}`);
    process.exit(1);
  });
};

const handleUnexpectedError = (err: Error): void => {
  Logger.error(err);

  if (err instanceof BaseError) {
    if (!err.isOperational()) {
      handleExit('Unexpected error');
    }
  } else {
    handleExit('Unexpected error');
  }
};

process.on('uncaughtException', handleUnexpectedError);

process.on('unhandledRejection', (err: Error) => {
  throw err;
});

export default server;
