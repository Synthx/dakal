import { registerLoginHandlers } from './message/handler.ts';
import { registerLoginMessages } from './message/registry.ts';
import { LoginServer } from './network/server.ts';

registerLoginMessages();
registerLoginHandlers();

const port = parseInt(process.env.SERVER_PORT);

const server = new LoginServer({
    port,
});
server.start();

process.on('SIGINT', () => {
    server.stop();
    process.exit(0);
});
