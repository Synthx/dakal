import { EMPTY_STRING, OutboundMessage } from 'dakal-core';

export class AlreadyLoggedMessage extends OutboundMessage {
    static override readonly header = 'AlEa';

    override serialize(): string {
        return EMPTY_STRING;
    }
}
