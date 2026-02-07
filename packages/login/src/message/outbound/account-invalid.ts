import { OutboundMessage } from 'dakal-core';

export class AccountInvalidMessage extends OutboundMessage {
    static override readonly header = 'AlEp';

    override serialize(): string {
        return AccountInvalidMessage.header;
    }
}
