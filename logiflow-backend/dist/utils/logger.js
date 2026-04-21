"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor() {
        this.logLevel = this.getLogLevel();
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    getLogLevel() {
        const env = process.env.NODE_ENV || 'development';
        switch (env) {
            case 'production':
                return LogLevel.INFO;
            case 'test':
                return LogLevel.WARN;
            default:
                return LogLevel.DEBUG;
        }
    }
    formatMessage(level, message, meta) {
        const timestamp = new Date().toISOString();
        const metaString = meta ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] ${level}: ${message}${metaString}`;
    }
    error(message, meta) {
        if (this.logLevel >= LogLevel.ERROR) {
            console.error(this.formatMessage('ERROR', message, meta));
        }
    }
    warn(message, meta) {
        if (this.logLevel >= LogLevel.WARN) {
            console.warn(this.formatMessage('WARN', message, meta));
        }
    }
    info(message, meta) {
        if (this.logLevel >= LogLevel.INFO) {
            console.log(this.formatMessage('INFO', message, meta));
        }
    }
    debug(message, meta) {
        if (this.logLevel >= LogLevel.DEBUG) {
            console.log(this.formatMessage('DEBUG', message, meta));
        }
    }
    logRequest(req, res, startTime) {
        const duration = Date.now() - startTime;
        const logData = {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: `${duration}ms`,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
        };
        if (res.statusCode >= 400) {
            this.warn('HTTP Request', logData);
        }
        else {
            this.info('HTTP Request', logData);
        }
    }
}
exports.Logger = Logger;
exports.logger = Logger.getInstance();
//# sourceMappingURL=logger.js.map