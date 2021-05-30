declare namespace NodeJS {
  export interface ProcessEnv {
    CORS_ORIGIN: string;
    DATABASE_URL: string;
    GMAIL_CLIENT_ID: string;
    GMAIL_CLIENT_SECRET: string;
    GMAIL_REFRESH_TOKEN: string;
    JWT_SECRET: string;
    PORT: string;
    REDIS_URL: string;
  }
}
