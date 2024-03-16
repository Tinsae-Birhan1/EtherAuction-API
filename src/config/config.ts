import { config } from 'dotenv';
import { envValidation } from '../validations';
import logger from './logger';
config();
const { value: envVars, error } = envValidation.validate(process.env);
if (error) {
  logger.error(error);
}

export const DB_CONNECTION: string = envVars.DB_CONNECTION ;
export const PORT: number = parseInt(envVars.PORT );
export const NODE_ENV: string = envVars.NODE_ENV ;
