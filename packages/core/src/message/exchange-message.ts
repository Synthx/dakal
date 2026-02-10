import { InboundMessage } from './inbound-message.ts';
import { type OutboundMessage } from './outbound-message.ts';

export abstract class ExchangeMessage extends InboundMessage implements OutboundMessage {
    abstract serialize(): string;
}
