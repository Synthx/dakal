import { MESSAGE_DELIMITER } from '../config';
import { OutboundMessage } from '../message';
import type { Socket } from '../type';
import { generateIdFromIp, logger } from '../util';

export abstract class Client {
    readonly #logger = logger.child({ name: Client.name });

    readonly id: string;
    protected readonly socket: Socket;

    constructor(socket: Socket) {
        this.id = generateIdFromIp(socket.remoteAddress);

        this.socket = socket;
        this.socket.data = {
            id: this.id,
        };
    }

    handleConnect() {
        this.#logger.debug(`#${this.id} --- connected`);
    }

    handleData(data: string) {
        this.#logger.debug(`#${this.id} <<< ${data}`);
    }

    sendMessage(message: OutboundMessage) {
        const data = message.serialize();
        this.socket.write(data + MESSAGE_DELIMITER);
        this.#logger.debug(`#${this.id} >>> ${data}`);
    }

    kick() {
        this.socket.close();
        this.#logger.debug(`#${this.id} !!! closed`);
    }
}
