import { OutboundMessage } from 'dakal-core';
import type { Server } from '../../model/server.ts';

export class ServerCharacterListMessage extends OutboundMessage {
    static override readonly header = 'AxK';

    constructor(readonly characters: Record<Server['id'], number>) {
        super();
    }

    override serialize(): string {
        const list = Object.entries(this.characters)
            .map(([serverId, characterCount]) => `${serverId},${characterCount}`)
            .join('|');

        return `0|${list}`;
    }
}
