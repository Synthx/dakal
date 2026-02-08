import { describe, expect, it } from 'bun:test';
import { cryptPassword } from './crypt.ts';

describe('cryptPassword', () => {
    const key = 'pjcrtdnpjfdmveytltuqsvibrqimsqrq';

    it('should generate a random string', () => {
        const result = cryptPassword(key, 'bambou');

        expect(result).toBe('2YWRPW406dRP');
    });

    it('should only contain alphanumeric characters', () => {
        const result = cryptPassword(key, 'bambou');

        expect(result).toMatch(/^[A-Za-z0-9]+$/);
    });
});
