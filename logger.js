import { createLogger, transports } from 'winston';

const tsFormat = () => (new Date()).toLocaleTimeString();
const logger= createLogger({
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6
  },
  transports:[
    new transports.Console({
      timestamp:tsFormat,
      colorize: true,
      prettyPrint: true,
      handleExceptions: true,
    })
  ]
  })
 export default logger;