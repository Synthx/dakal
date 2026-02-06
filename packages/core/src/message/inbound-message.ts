import { BaseMessage } from './base-message.ts';

export abstract class InboundMessage<Payload = void> extends BaseMessage<Payload> {
    abstract parse(data: string): InboundMessage;
}
