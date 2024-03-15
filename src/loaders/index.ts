import mongooseLoader from './database';
import expressLoader from './express';
import logger from '../config/logger';


const initApp = async (app: any): Promise<void> => {
  try {
    await mongooseLoader();
    logger.info(`Mongoose initiated.`);
    await expressLoader(app);
    logger.info(`Express app initiated.`);
  } catch (error) {
    console.error('Error initializing app:', error);
    throw error;
  }
};

export default initApp;
