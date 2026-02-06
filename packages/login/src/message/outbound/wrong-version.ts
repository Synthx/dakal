import { OutboundMessage } from 'dakal-core';
import type { Version } from '../../util/version.ts';

export class WrongVersionMessage extends OutboundMessage<Version> {
    override readonly header = 'AlEv';

    serialize(): string {
        return this.header + this.payload.toString();
    }
}
