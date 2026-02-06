import { LoginServer } from './network/server.ts';

const port = parseInt(process.env.SERVER_PORT);

const server = new LoginServer({
    port,
});
server.start();

process.on('SIGINT', () => {
    server.stop();
    process.exit(0);
});
