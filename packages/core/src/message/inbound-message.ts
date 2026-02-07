import { BaseMessage } from './base-message.ts';

export abstract class InboundMessage extends BaseMessage {
    static parse(_: string): InboundMessage {
        throw new Error('Not implemented');
    }
}
