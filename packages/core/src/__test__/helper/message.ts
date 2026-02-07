import { InboundMessage } from '../../message';

export class __VersionMessage extends InboundMessage {
    static override readonly header = 'Av';

    constructor(readonly version: number) {
        super();
    }

    static override parse(data: string): __VersionMessage {
        const version = Number(data);
        if (isNaN(version)) {
            throw new Error();
        }

        return new __VersionMessage(version);
    }
}

export class __AckMessage extends InboundMessage {
    static override readonly header = 'Ac'; // Prefix of TM

    static override parse(): __AckMessage {
        return new __AckMessage();
    }
}
