import { Client, logger } from 'dakal-core';
import { loginMessageDispatcher } from '../message/handler.ts';
import { HelloMessage } from '../message/outbound/hello.ts';
import { loginMessageRegistry } from '../message/registry.ts';
import type { LoginClientState } from '../type/client.ts';
import type { Credentials } from '../type/credentials.ts';
import { Version } from '../util/version.ts';

export class LoginClient extends Client {
    readonly #logger = logger.child({ name: LoginClient.name });

    #state: LoginClientState = 'READY';
    #version?: Version;
    #credentials?: Credentials;

    get version() {
        return this.#version;
    }

    get credentials() {
        return this.#credentials;
    }

    override handleData(data: string): void {
        super.handleData(data);

        try {
            switch (this.#state) {
                case 'WAITING_VERSION':
                    this.#version = Version.from(data);
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
                        this.#logger.warn(`Unknown or malformed message: ${data}`);
                        return;
                    }

                    void loginMessageDispatcher.dispatch(this, message);
                    break;
                }
            }
        } catch (error) {
            this.#logger.error(error, `Protocol error from ${this.id}`);
            this.kick();
        }
    }

    override handleConnect(): void {
        super.handleConnect();

        this.sendMessage(new HelloMessage());
        this.#state = 'WAITING_VERSION';
    }
}
