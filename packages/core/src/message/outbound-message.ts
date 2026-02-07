import { BaseMessage } from './base-message.ts';

export abstract class OutboundMessage extends BaseMessage {
    abstract serialize(): string;
}
