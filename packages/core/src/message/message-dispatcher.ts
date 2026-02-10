import { Client } from '../network';
import type { InboundMessageClass } from '../type';
import { logger } from '../util';
import type { InboundMessage } from './inbound-message.ts';

type MessageHandler<T extends Client, M extends InboundMessage = InboundMessage> = (
    client: T,
    message: M,
) => void | Promise<void>;

export class MessageDispatcher<T extends Client> {
    readonly #handlers = new Map<string, MessageHandler<T>[]>();
    readonly #logger = logger.child({ name: MessageDispatcher.name });

    on<M extends InboundMessage>(message: InboundMessageClass<M>, handler: MessageHandler<T, M>) {
        const handlers = this.#handlers.get(message.header) ?? [];
        handlers.push(handler as MessageHandler<T>);

        this.#handlers.set(message.header, handlers);

        return () => this.off(message, handler);
    }

    off<M extends InboundMessage>(message: InboundMessageClass<M>, handler: MessageHandler<T, M>): void {
        const handlers = this.#handlers.get(message.header);
        if (!handlers) {
            return;
        }

        const index = handlers.indexOf(handler as MessageHandler<T, InboundMessage>);
        if (index === -1) {
            return;
        }

        handlers.splice(index, 1);
    }

    async dispatch(client: T, message: InboundMessage): Promise<void> {
        const id = (message.constructor as typeof InboundMessage).header;

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
