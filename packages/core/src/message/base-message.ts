export abstract class BaseMessage<Payload = unknown> {
    abstract readonly header: string;
    readonly payload: Payload;

    constructor(payload: Payload) {
        this.payload = payload;
    }
}
