declare module 'bun' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Env {
        SERVER_PORT: string;
        CLIENT_VERSION: string;
        DATABASE_URL: string;
    }
}
