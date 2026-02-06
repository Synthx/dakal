import { describe, expect, it } from 'bun:test';
import { generateRandomString } from './random.ts';

describe('generateRandomString', () => {
    it(
        'should generate a random string',
        () => {
            const result = generateRandomString(10);

            expect(result).toHaveLength(10);
        },
        { repeats: 20 },
    );

    it('should only contain alpha characters', () => {
        const result = generateRandomString(10);

        expect(result).toMatch(/^[a-z]+$/);
    });
});
