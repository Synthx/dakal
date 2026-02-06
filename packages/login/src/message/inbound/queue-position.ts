import { InboundMessage } from 'dakal-core';

export class QueuePositionMessage extends InboundMessage {
    override readonly header = 'Af';

    override parse(data: string): QueuePositionMessage {
        console.log(data);

        return new QueuePositionMessage();
    }
}
