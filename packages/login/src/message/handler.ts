import { MessageDispatcher } from 'dakal-core';
import { QueuePositionMessage } from './inbound/queue-position.ts';
import { AccountInvalidMessage } from './outbound/account-invalid.ts';

export const loginMessageDispatcher = new MessageDispatcher();

export const registerLoginHandlers = () => {
    loginMessageDispatcher.on(QueuePositionMessage, (client) => {
        client.sendMessage(new AccountInvalidMessage());
        client.kick();
    });
};
