import { config } from 'dotenv';
config();

export const DB_CONNECTION: string = process.env.DB_CONNECTION ;
export const PORT: number = parseInt(process.env.PORT );
export const NODE_ENV: string = process.env.NODE_ENV ;
