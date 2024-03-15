import http from 'http';
import express from 'express';
import {PORT} from './config/config';
import loader from './loaders';
import logger from './config/logger';

const exitHandler = (server: http.Server | null) => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unExpectedErrorHandler = (server: http.Server | null) => {
  return function (error: Error) {
    logger.error(error);
    exitHandler(server);
  };
};

const startServer = async (): Promise<void> => {

    const app = express();
    await loader(app);

    const httpServer = http.createServer(app);
    const server = httpServer.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });


  
    process.on('uncaughtException', unExpectedErrorHandler(server));
    process.on('unhandledRejection', unExpectedErrorHandler(server));
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received');
      if (server) {
        server.close();
      }
    });
 
};

startServer();
