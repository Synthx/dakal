import { Version } from '../util/version.ts';

export class Config {
    static #instance?: Config;

    readonly version: Version;

    constructor() {
        this.version = Version.from(process.env.CLIENT_VERSION);
    }

    static get instance(): Config {
        if (!Config.#instance) {
            Config.#instance = new Config();
        }

        return Config.#instance;
    }
}
