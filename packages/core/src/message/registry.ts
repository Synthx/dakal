import { logger } from '../util';
import type { BaseMessage } from './base-message.ts';

export class MessageNode {
    children = new Map<string, MessageNode>();
    message?: BaseMessage;
}

export class MessageRegistry {
    static #instance?: MessageRegistry;
    #messageNode = new MessageNode();
    #logger = logger.child({ name: MessageRegistry.name });

    static get instance() {
        if (!MessageRegistry.#instance) {
            MessageRegistry.#instance = new MessageRegistry();
        }

        return MessageRegistry.#instance;
    }

    register(message: BaseMessage) {
        let current = this.#messageNode;

        for (const char of message.header) {
            let child = current.children.get(char);
            if (!child) {
                child = new MessageNode();
                current.children.set(char, child);
            }

            current = child;
        }

        if (current.message) {
            throw new Error(`Message ${message.header} already registered`);
        }

        current.message = message;
        this.#logger.debug(`Registered message ${message.header}`);
    }
}
