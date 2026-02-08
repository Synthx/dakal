import { MessageDispatcher } from 'dakal-core';
import type { LoginClient } from '../network/client.ts';
import { authService } from '../service/auth-service.ts';
import { QueuePositionMessage } from './inbound/queue-position.ts';

export const loginMessageDispatcher = new MessageDispatcher<LoginClient>();

export const registerLoginHandlers = () => {
    loginMessageDispatcher.on(QueuePositionMessage, async (client) => {
        await authService.verify(client);
    });
};
