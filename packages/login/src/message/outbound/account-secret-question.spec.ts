import { describe, expect, it } from 'bun:test';
import { AccountSecretQuestionMessage } from './account-secret-question.ts';

describe('AccountSecretQuestionMessage', () => {
    it('should have the correct header', () => {
        expect(AccountSecretQuestionMessage.header).toBe('AQ');
    });

    describe('serialize', () => {
        it('should replace a single space with a plus character', () => {
            const message = new AccountSecretQuestionMessage('My question');
            expect(message.serialize()).toBe('My+question');
        });

        it('should replace all spaces with plus characters', () => {
            const message = new AccountSecretQuestionMessage('What is your favorite color?');
            expect(message.serialize()).toBe('What+is+your+favorite+color?');
        });

        it('should return the same string if there are no spaces', () => {
            const message = new AccountSecretQuestionMessage('FavoriteColor?');
            expect(message.serialize()).toBe('FavoriteColor?');
        });

        it('should handle multiple consecutive spaces', () => {
            const message = new AccountSecretQuestionMessage('What  is   it?');
            expect(message.serialize()).toBe('What++is+++it?');
        });
    });
});
