const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const { v4: uuidv4 } = require('uuid')
const { WINSTON } = require('../../configs/logger.config.js')

class MyLogger {
    constructor() {
        const formatPrint = format.printf(({ level, message, context, requestId, timestamp, metadata }) => {
            return `${timestamp} - ${level} - ${context} - ${requestId} - ${message} - ${JSON.stringify(metadata)}`
        })
        this.logger = createLogger({
            format: format.combine(
                format.timestamp({ format: WINSTON.TIME_FORMAT }),
                formatPrint
            ),
            transports: [
                new transports.DailyRotateFile({
                    dirname: WINSTON.DIRNAME,
                    filename: WINSTON.FILENAME_INFO,
                    datePattern: WINSTON.DATE_PATTERN,
                    zippedArchive: true,
                    maxSize: WINSTON.MAX_SIZE,
                    maxFiles: WINSTON.MAX_FILES,
                    format: format.combine(
                        format.timestamp({ format: WINSTON.TIME_FORMAT }),
                        formatPrint
                    ),
                    level: WINSTON.LEVELS.INFO
                }),
                new transports.DailyRotateFile({
                    dirname: WINSTON.DIRNAME,
                    filename: WINSTON.FILENAME_ERROR,
                    datePattern: WINSTON.DATE_PATTERN,
                    maxSize: WINSTON.MAX_SIZE,
                    maxFiles: WINSTON.MAX_FILES,
                    format: format.combine(
                        format.timestamp({ format: WINSTON.TIME_FORMAT }),
                        formatPrint
                    ),
                    level: WINSTON.LEVELS.ERROR
                })
            ]
        })
    }
    commonParams(params) {
        let context, req, metadata
        if (!Array.isArray(params)) {
            context = params
        } else {
            [context, req, metadata] = params
        }
        const requestId = req?.requestId || uuidv4()
        return {
            requestId, context, metadata
        }
    }
    log(message, params) {
        const paramLog = this.commonParams(params)
        const logObject = Object.assign({ message }, paramLog)
        this.logger.info(logObject)
    }
    error(message, params) {
        const paramLog = this.commonParams(params)
        const logObject = Object.assign({ message }, paramLog)
        this.logger.error(logObject)
    }
}

module.exports = new MyLogger()