import { OutboundMessage } from 'dakal-core';

export class ChooseNicknameMessage extends OutboundMessage {
    static override readonly header = 'AlEr';

    override serialize(): string {
        return ChooseNicknameMessage.header;
    }
}
