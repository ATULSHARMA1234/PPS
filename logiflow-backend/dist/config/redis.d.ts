import { RedisClientType } from 'redis';
export declare class RedisConnection {
    private static instance;
    private client;
    private isConnected;
    private constructor();
    static getInstance(): RedisConnection;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getClient(): RedisClientType;
    getConnectionStatus(): boolean;
    set(key: string, value: string, expireInSeconds?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    healthCheck(): Promise<boolean>;
}
export declare const redis: RedisConnection;
//# sourceMappingURL=redis.d.ts.map