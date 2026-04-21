import { Request, Response } from 'express';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;

  private constructor() {
    this.logLevel = this.getLogLevel();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private getLogLevel(): LogLevel {
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

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level}: ${message}${metaString}`;
  }

  public error(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.ERROR) {
      console.error(this.formatMessage('ERROR', message, meta));
    }
  }

  public warn(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message, meta));
    }
  }

  public info(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.INFO) {
      console.log(this.formatMessage('INFO', message, meta));
    }
  }

  public debug(message: string, meta?: any): void {
    if (this.logLevel >= LogLevel.DEBUG) {
      console.log(this.formatMessage('DEBUG', message, meta));
    }
  }

  public logRequest(req: Request, res: Response, startTime: number): void {
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
    } else {
      this.info('HTTP Request', logData);
    }
  }
}

export const logger = Logger.getInstance();
