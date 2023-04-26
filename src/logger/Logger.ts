import winston, { transports } from "winston";
import morgan from "morgan";
import util from "util"

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
      Object.assign(info, { message: info.stack });
    }
  
    return info;
  });

  const isDev = () => process.env.NODE_ENV === "development";
  
  const Logger = winston.createLogger({
    level: isDev() ? "debug" : "info",
    format: winston.format.combine(
      enumerateErrorFormat(),
      winston.format.timestamp(),
      winston.format.json(),
      isDev() ? winston.format.colorize() : winston.format.uncolorize(),
      winston.format.splat(),
      winston.format.printf(({ level, message }) => `${level}: ${util.inspect(message, false, null, true)}`),
    ),
    transports: [
      new transports.Console({
        level: 'debug',
        handleExceptions: true,
      }),
      new transports.File({
        level: 'info',
        filename: './logs/app.log',
        handleExceptions: true,
      }),
      new transports.File({
        level: 'error',
        filename: './logs/app.error.log',
        handleExceptions: true,
      }),
    ],
  });
  
  const httpLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {
      stream: {
        write: (message) => {
          Logger.info(`HTTP Access Log: ${message}`, {
            timestamp: new Date().toString(),
          });
        },
      },
    },
  );
  
  export { httpLogger };
  export default Logger;
  