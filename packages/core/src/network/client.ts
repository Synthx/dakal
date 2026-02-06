import { randomUUIDv7 } from 'bun';
import { MESSAGE_DELIMITER } from '../config';
import { OutboundMessage } from '../message';
import type { Socket } from '../type';
import { logger } from '../util';

export abstract class Client {
    readonly #logger = logger.child({});

    readonly id: string;
    protected readonly socket: Socket;

    constructor(socket: Socket) {
        this.id = randomUUIDv7();
        this.socket = socket;
        this.socket.data = {
            id: this.id,
        };
    }

    handleConnect() {
        logger.debug(`${this.id} --- connected`);
    }

    handleData(data: string) {
        logger.debug(`${this.id} <<< ${data}`);
    }

    sendMessage(message: OutboundMessage<unknown>) {
        const data = message.serialize();
        this.socket.write(data + MESSAGE_DELIMITER);
        this.#logger.debug(`${this.id} >>> ${data}`);
    }

    close() {
        this.socket.close();
        this.#logger.debug(`${this.id} !!! closed`);
    }
}
