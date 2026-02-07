import { OutboundMessage } from 'dakal-core';
import { generateRandomString } from '../../function/random.ts';

const KEY_LENGTH = 32;

export class HelloMessage extends OutboundMessage {
    static override readonly header = 'HC';

    readonly key = generateRandomString(KEY_LENGTH);

    override serialize(): string {
        return HelloMessage.header + this.key;
    }
}
