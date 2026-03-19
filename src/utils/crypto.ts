import { generateRandomString, RandomReader } from '@oslojs/crypto/random';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';

export const generateRandomToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};

export const hashToken = (token: string) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
};

const random: RandomReader = {
  read(bytes: Uint8Array): void {
    crypto.getRandomValues(bytes);
  },
};

// 10-characters long string consisting of upper case letters
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
export const generateRandomCode = () => generateRandomString(random, alphabet, 6);
