import { InboundMessage } from '../message';

export type InboundMessageClass = {
    readonly header: string;
    parse(raw: string): InboundMessage;
};
