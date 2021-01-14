const appRoot = require('app-root-path')
const winston = require('winston')
const moment = require('moment')

const mydate = new Date().toISOString()
const myDateName = moment(mydate).utc().format('DD-MM-YYYY_HH.mm.ss')
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/${myDateName}.info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger
