import { EMPTY_STRING, OutboundMessage } from 'dakal-core';

export class AcMessage extends OutboundMessage {
    static override readonly header = 'Ac0';

    override serialize(): string {
        return EMPTY_STRING;
    }
}
