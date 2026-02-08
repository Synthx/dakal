import { Client } from '../network';
import type { InboundMessageClass } from '../type';
import { logger } from '../util';
import type { InboundMessage } from './inbound-message.ts';

type MessageHandler<T extends Client> = (client: T, message: InboundMessage) => void | Promise<void>;

export class MessageDispatcher<T extends Client> {
    readonly #handlers = new Map<string, MessageHandler<T>[]>();
    readonly #logger = logger.child({ name: MessageDispatcher.name });

    on(message: InboundMessageClass, handler: MessageHandler<T>) {
        const handlers = this.#handlers.get(message.header) ?? [];
        handlers.push(handler);

        this.#handlers.set(message.header, handlers);

        return () => this.off(message, handler);
    }

    off(message: InboundMessageClass, handler: MessageHandler<T>): void {
        const handlers = this.#handlers.get(message.header);
        if (!handlers) {
            return;
        }

        const index = handlers.indexOf(handler);
        if (index === -1) {
            return;
        }

        handlers.splice(index, 1);
    }

    async dispatch(client: T, message: InboundMessage): Promise<void> {
        const id = (message.constructor as unknown as InboundMessageClass).header;

        const handlers = this.#handlers.get(id);
        if (!handlers || handlers.length === 0) {
            this.#logger.warn(`No handlers for message ${id}`);
            return;
        }

        const promises = handlers.map(async (handler) => {
            await handler(client, message);
        });

        await Promise.all(promises);
    }
}
