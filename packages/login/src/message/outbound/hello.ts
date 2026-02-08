import { OutboundMessage } from 'dakal-core';

export class HelloMessage extends OutboundMessage {
    static override readonly header = 'HC';

    constructor(readonly key: string) {
        super();
    }

    override serialize(): string {
        return HelloMessage.header + this.key;
    }
}
