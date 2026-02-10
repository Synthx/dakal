import { ExchangeMessage } from 'dakal-core';

export class QueuePositionMessage extends ExchangeMessage {
    static override readonly header = 'Af';

    static override parse(): QueuePositionMessage {
        return new QueuePositionMessage();
    }

    constructor() {
        super();
    }

    override serialize(): string {
        return '0|0|0|1|-1';
    }
}
