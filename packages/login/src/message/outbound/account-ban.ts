import { OutboundMessage } from 'dakal-core';

export class AccountBanMessage extends OutboundMessage {
    static override readonly header = 'AlEb';

    override serialize(): string {
        return AccountBanMessage.header;
    }
}
