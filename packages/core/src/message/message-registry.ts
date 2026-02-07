import type { InboundMessageClass } from '../type';
import { logger } from '../util';
import { InboundMessage } from './inbound-message.ts';

class MessageNode {
    children = new Map<string, MessageNode>();
    message?: InboundMessageClass;
}

export class MessageRegistry {
    readonly #messageNode = new MessageNode();
    readonly #logger = logger.child({ name: MessageRegistry.name });
    #count = 0;

    register(message: InboundMessageClass) {
        const header = message.header;
        let current = this.#messageNode;

        for (const char of header) {
            let child = current.children.get(char);
            if (!child) {
                child = new MessageNode();
                current.children.set(char, child);
            }

            current = child;
        }

        if (current.message) {
            throw new Error(`Header ${header} already registered by message ${current.message.name}`);
        }

        current.message = message;
        this.#count++;
        this.#logger.debug(`Message ${message.name}#${header} registered`);
    }

    count() {
        return this.#count;
    }

    parse(packet: string): InboundMessage | undefined {
        let current = this.#messageNode;
        let lastMatch: InboundMessageClass | undefined = undefined;
        let lastMatchLength = 0;
        let depth = 0;

        for (const char of packet) {
            const child = current.children.get(char);
            if (!child) {
                break;
            }

            current = child;
            depth++;

            if (current.message) {
                lastMatch = current.message;
                lastMatchLength = depth;
            }
        }

        if (!lastMatch) {
            return undefined;
        }

        const data = packet.substring(lastMatchLength);

        try {
            return lastMatch.parse(data);
        } catch (error) {
            this.#logger.error(error, `Failed to parse message ${lastMatch.name}`);

            return undefined;
        }
    }
}
