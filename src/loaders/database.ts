import mongoose, { ConnectOptions } from 'mongoose';
import { DB_CONNECTION } from '../config/config';

const connectToDatabase = async (): Promise<mongoose.Connection> => {
  try {
     const connection = await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Connected to MongoDB');
    return connection.connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectToDatabase;
