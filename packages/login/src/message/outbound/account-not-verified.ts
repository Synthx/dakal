import { OutboundMessage } from 'dakal-core';

export class AccountNotVerifiedMessage extends OutboundMessage {
    static override readonly header = 'AlEm';

    override serialize(): string {
        return AccountNotVerifiedMessage.header;
    }
}
