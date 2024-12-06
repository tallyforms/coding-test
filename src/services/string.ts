import crypto from 'node:crypto';

export const randomString = (length: number) => {
  return crypto.randomBytes(length / 2).toString('hex');
};
