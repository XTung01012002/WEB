module.exports = {
    WINSTON: {
        TIME_FORMAT: 'DD-MM-YYYY HH:mm:ss',
        DIRNAME: 'logs/',
        FILENAME_INFO: 'WEB%DATE%.info.log',
        FILENAME_ERROR: 'WEB%DATE%.error.log',
        DATE_PATTERN: 'YYYY-MM-DD-HH',
        MAX_SIZE: '20m',
        MAX_FILES: '14d',
        LEVELS: {
            ERROR: 'error',
            WARN: 'warn',
            INFO: 'info',
            HTTP: 'http',
            VERBOSE: 'verbose',
            DEBUG: 'debug',
            SILLY: 'silly'
        }
    }
}