import crypto from 'crypto';

export const encryptSha256 = value => {
    return crypto.createHash('sha256').update(value.replace(/ /gi, '')).digest('hex');
};
