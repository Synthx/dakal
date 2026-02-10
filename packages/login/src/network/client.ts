import { Client, logger } from 'dakal-core';
import { generateRandomString } from '../function/random.ts';
import { AccountNicknameMessage } from '../message/exchange/account-nickname.ts';
import { loginMessageDispatcher } from '../message/handler.ts';
import { HelloMessage } from '../message/outbound/hello.ts';
import { loginMessageRegistry } from '../message/registry.ts';
import type { Account } from '../model/account.ts';
import type { LoginClientState } from '../type/client.ts';
import type { Credentials } from '../type/credentials.ts';
import { Version } from '../util/version.ts';

const KEY_LENGTH = 32;

export class LoginClient extends Client {
    readonly #logger = logger.child({ name: LoginClient.name });

    readonly #key = generateRandomString(KEY_LENGTH);
    #state: LoginClientState = 'READY';
    #version?: Version;
    #credentials?: Credentials;
    #account?: Account;

    get key() {
        return this.#key;
    }

    get version() {
        return this.#version;
    }

    get credentials() {
        return this.#credentials;
    }

    set account(account: Account) {
        this.#account = account;
    }

    get account(): Account | undefined {
        return this.#account;
    }

    set state(state: LoginClientState) {
        this.#state = state;
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
                    const [username, encodedPassword] = data.split('\n#1');
                    this.#credentials = {
                        username,
                        encodedPassword,
                    };
                    this.#state = 'READY';
                    break;
                }
                case 'WAITING_NICKNAME': {
                    this.#state = 'READY';

                    void loginMessageDispatcher.dispatch(this, new AccountNicknameMessage(data));
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

        this.sendMessage(new HelloMessage(this.key));
        this.#state = 'WAITING_VERSION';
    }
}
