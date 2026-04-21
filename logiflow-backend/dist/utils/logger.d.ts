import { Request, Response } from 'express';
export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3
}
export declare class Logger {
    private static instance;
    private logLevel;
    private constructor();
    static getInstance(): Logger;
    private getLogLevel;
    private formatMessage;
    error(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    info(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
    logRequest(req: Request, res: Response, startTime: number): void;
}
export declare const logger: Logger;
//# sourceMappingURL=logger.d.ts.map