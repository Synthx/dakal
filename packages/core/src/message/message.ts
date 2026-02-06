import type { BaseMessage } from './base-message.ts';
import { MessageRegistry } from './registry.ts';

export const Message = <T extends BaseMessage>(target: T) => {
    MessageRegistry.instance.register(target);

    return target;
};
