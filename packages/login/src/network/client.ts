import { Client } from 'dakal-core';
import { loginMessageDispatcher, loginMessageRegistry } from '../message';
import { HelloMessage } from '../message/outbound/hello.ts';
import type { LoginClientState } from '../type/client.ts';
import type { Credentials } from '../type/credentials.ts';

export class LoginClient extends Client {
    #state: LoginClientState = 'READY';
    #version?: string;
    #credentials?: Credentials;

    override handleData(data: string): void {
        super.handleData(data);

        switch (this.#state) {
            case 'WAITING_VERSION':
                this.#version = data;
                this.#state = 'WAITING_CREDENTIALS';
                break;
            case 'WAITING_CREDENTIALS': {
                const [username, encodedPassword] = data.split('\n#');
                this.#credentials = {
                    username,
                    encodedPassword,
                };
                this.#state = 'READY';
                break;
            }
            case 'READY': {
                const message = loginMessageRegistry.parse(data);
                if (!message) {
                    return;
                }

                void loginMessageDispatcher.dispatch(this, message);
                break;
            }
        }
    }

    override handleConnect(): void {
        super.handleConnect();

        this.sendMessage(new HelloMessage());
        this.#state = 'WAITING_VERSION';
    }
}
