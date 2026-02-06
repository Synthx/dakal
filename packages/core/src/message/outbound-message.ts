import { BaseMessage } from './base-message.ts';

export abstract class OutboundMessage<Payload = void> extends BaseMessage<Payload> {
    abstract serialize(): string;
}
