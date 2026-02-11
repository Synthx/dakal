import { OutboundMessage } from 'dakal-core';

export class AccountSecretQuestionMessage extends OutboundMessage {
    static override readonly header = 'AQ';

    constructor(readonly question: string) {
        super();
    }

    override serialize(): string {
        return this.question.replace(/ /g, '+');
    }
}
