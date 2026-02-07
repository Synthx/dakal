import { InboundMessage } from 'dakal-core';

export class QueuePositionMessage extends InboundMessage {
    static override readonly header = 'Af';

    static override parse(): QueuePositionMessage {
        return new QueuePositionMessage();
    }
}
