import { type TCPSocketListener } from 'bun';
import { MESSAGE_DELIMITER } from '../config';
import type { ServerOptions, Socket } from '../type';
import { logger } from '../util';
import { Client } from './client.ts';

const decoder = new TextDecoder();

export abstract class Server {
    readonly #port: number;
    readonly #clients = new Map<string, Client>();
    readonly #logger = logger.child({ name: 'Server' });

    #server?: TCPSocketListener;

    constructor(options: ServerOptions) {
        this.#port = options.port;
    }

    abstract createClient(socket: Socket): Client;

    start() {
        this.#server = Bun.listen({
            hostname: '0.0.0.0',
            port: this.#port,
            socket: {
                open: (socket: Socket) => {
                    const client = this.createClient(socket);
                    this.#clients.set(client.id, client);

                    client.handleConnect();
                },
                data: (socket, data) => {
                    const id = socket.data.id;
                    if (!this.#clients.has(id)) {
                        return;
                    }

                    const client = this.#clients.get(id);
                    const message = decoder.decode(data);
                    const messages = message.split(MESSAGE_DELIMITER).filter((m) => m.length > 0);

                    messages.forEach((message) => {
                        client?.handleData(message);
                    });
                },
                close: (socket) => {
                    const id = socket.data.id;
                    if (!this.#clients.has(id)) {
                        return;
                    }

                    this.#clients.delete(id);
                    this.#clients.get(id)?.close();
                },
            },
        });

        this.#logger.info(`Server started on port ${this.#port}`);
    }

    stop() {
        this.#clients.forEach((client) => {
            client.close();
        });
        this.#clients.clear();

        this.#server?.stop();
        this.#logger.info('Server stopped');
    }
}
