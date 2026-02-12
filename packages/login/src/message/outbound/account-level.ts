import { OutboundMessage } from 'dakal-core';
import type { AccountLevel } from '../../db/type/account.ts';

export class AccountLevelMessage extends OutboundMessage {
    static override readonly header = 'AlK';

    constructor(readonly level: AccountLevel) {
        super();
    }

    override serialize(): string {
        return this.level.toString();
    }
}
