import http from 'http';
import express from 'express';
import {PORT} from './config/config';
import loader from './loaders';

const startServer = async (): Promise<void> => {
  try {
    const app = express();
    await loader(app);

    const httpServer = http.createServer(app);
    const server = httpServer.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
