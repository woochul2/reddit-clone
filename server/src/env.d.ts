declare namespace NodeJS {
  export interface ProcessEnv {
    CORS_ORIGIN: string;
    DATABASE_DATABASE: string;
    DATABASE_HOST: string;
    DATABASE_PASSWORD: string;
    DATABASE_PORT: string;
    DATABASE_URL: string;
    DATABASE_USERNAME: string;
    GMAIL_CLIENT_ID: string;
    GMAIL_CLIENT_SECRET: string;
    GMAIL_REFRESH_TOKEN: string;
    PORT: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
  }
}
