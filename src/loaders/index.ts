import mongooseLoader from './database';
import expressLoader from './express';

const initApp = async (app: any): Promise<void> => {
  try {
    await mongooseLoader();
    console.log(`Mongoose initiated.`);
    await expressLoader(app);
    console.log(`Express app initiated.`);
  } catch (error) {
    console.error('Error initializing app:', error);
    throw error;
  }
};

export default initApp;
