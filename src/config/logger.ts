import winston from 'winston';
import {NODE_ENV} from './config';

const { format, createLogger, transports } = winston;
const { printf, combine, timestamp, colorize, uncolorize } = format;

const winstonFormat = printf(
  ({ level, message, timestamp, stack }: { level: string, message: string, timestamp: string, stack?: string }) =>
    `${timestamp}: ${level}: ${stack || message}`,
);

const logger = createLogger({
  level: NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp(),
    winstonFormat,
    NODE_ENV === 'development' ? colorize() : uncolorize(),
  ),
  transports: [new transports.Console()],
});

export default logger;
