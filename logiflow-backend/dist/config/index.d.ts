export declare const config: {
    port: number;
    nodeEnv: string;
    database: {
        uri: string;
        testUri: string;
    };
    jwt: {
        accessTokenSecret: string;
        refreshTokenSecret: string;
        accessTokenExpiresIn: string;
        refreshTokenExpiresIn: string;
    };
    redis: {
        url: string;
    };
    email: {
        smtp: {
            host: string;
            port: number;
            user: string | undefined;
            pass: string | undefined;
        };
    };
    cors: {
        origin: string;
        credentials: boolean;
    };
    upload: {
        maxFileSize: number;
        uploadPath: string;
    };
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    };
};
//# sourceMappingURL=index.d.ts.map