import { OutboundMessage } from 'dakal-core';
import { generateRandomString } from '../../function/random.ts';

const KEY_LENGTH = 32;

export class HelloMessage extends OutboundMessage<string> {
    override readonly header = 'HC';

    constructor() {
        super(generateRandomString(KEY_LENGTH));
    }

    override serialize(): string {
        return this.header + this.payload;
    }
}
