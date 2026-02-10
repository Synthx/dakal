import { EMPTY_STRING, OutboundMessage } from 'dakal-core';

export class AccountPermanentBanMessage extends OutboundMessage {
    static override readonly header = 'AlEb';

    override serialize(): string {
        return EMPTY_STRING;
    }
}
