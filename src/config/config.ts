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
export const jwtSecret: string = envVars.JWT_SECRET ;
export const jwtAccessExpirationMinutes: number = parseInt(envVars.JWT_ACCESS_EXPIRATION_MINUTES );
export const jwtRefreshExpirationDays: number = parseInt(envVars.JWT_REFRESH_EXPIRATION_DAYS );



