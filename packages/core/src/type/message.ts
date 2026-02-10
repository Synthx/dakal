import { InboundMessage } from '../message';

export type InboundMessageClass<T extends InboundMessage = InboundMessage> = {
    readonly name: string;
    readonly header: string;
    parse(raw: string): T;
};
