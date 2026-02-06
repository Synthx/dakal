import { OutboundMessage } from 'dakal-core';

export class WrongCredentialsMessage extends OutboundMessage {
    override readonly header = 'AlEf';

    override serialize(): string {
        return this.header;
    }
}
