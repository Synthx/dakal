const HASH = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';

export const cryptPassword = (key: string, password: string): string => {
    if (key.length < password.length) {
        throw new Error('Key must be at least as long as password');
    }

    const result = new Array<string>(password.length * 2);
    for (let i = 0; i < password.length; i++) {
        const pPass = password.charCodeAt(i);
        const pKey = key.charCodeAt(i);

        const aPass = pPass >> 4;
        const aKey = pPass & 0x0f;

        const idx1 = (aPass + pKey) % HASH.length;
        const idx2 = (aKey + pKey) % HASH.length;

        result.push(HASH[idx1]!, HASH[idx2]!);
    }

    return result.join('');
};
