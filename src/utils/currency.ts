import { MyBig } from '@/lib/big';

export const toCent = (value: number) => {
  return new MyBig(value).mul(100).round(2).toNumber();
};

export const fromCent = (value: number) => {
  return new MyBig(value).div(100).round(2).toNumber();
};

/**
 * Convert a value in cents to a currency string
 * @param value - The value in cents
 * @returns The currency string
 *
 * TODO: Add support for other currencies and locales
 */
export const toCurrencyFromCent = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(fromCent(value));
};
