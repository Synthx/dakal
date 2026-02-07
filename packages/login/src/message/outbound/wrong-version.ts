import { OutboundMessage } from 'dakal-core';
import type { Version } from '../../util/version.ts';

export class WrongVersionMessage extends OutboundMessage {
    static override readonly header = 'AlEv';

    constructor(readonly version: Version) {
        super();
    }

    serialize(): string {
        return WrongVersionMessage.header + this.version.toString();
    }
}
