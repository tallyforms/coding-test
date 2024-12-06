import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGORITHM = 'aes-256-cbc';

export const encrypt = <T = string>(secret: string, data: T) => {
  const iv = randomBytes(16);
  const key = Buffer.alloc(32);
  Buffer.from(secret).copy(key, 0, 0, Math.min(secret.length, 32));

  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(data), 'utf8'), cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = <T = string>(secret: string, data: string): T => {
  const [ivHex, encryptedHex] = data.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  const key = Buffer.alloc(32);
  Buffer.from(secret).copy(key, 0, 0, Math.min(secret.length, 32));

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return JSON.parse(decrypted.toString('utf8')) as T;
};
