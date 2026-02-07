import { InboundMessage } from '../message';

export type InboundMessageClass = {
    readonly name: string;
    readonly header: string;
    parse(raw: string): InboundMessage;
};
