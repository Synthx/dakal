import { EMPTY_STRING, OutboundMessage } from 'dakal-core';

export class WrongCredentialsMessage extends OutboundMessage {
    static override readonly header = 'AlEf';

    override serialize(): string {
        return EMPTY_STRING;
    }
}
