import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Wait for {delay} util
 * useful to simulate "real" network latency
 * @param delay
 * @returns
 */
export const waitFor = async (delay = 1000) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};
