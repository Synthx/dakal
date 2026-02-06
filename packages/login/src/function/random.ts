const CHARS = 'abcdefghijklmnopqrstuvwxyz';
const CHARS_LEN = CHARS.length;

export const generateRandomString = (length: number): string => {
    const result = new Array<string>(length);
    for (let i = 0; i < length; i++) {
        result[i] = CHARS[Math.floor(Math.random() * CHARS_LEN)]!;
    }

    return result.join();
};
