export type AppProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  comingSoon?: boolean;
  previewImage?: string;
  link?: string;
};

/** Catalog for the marketing home grid — add or edit entries as apps ship. */
export const apps: AppProduct[] = [
  {
    slug: 'firerisk-app',
    name: 'Firerisk',
    tagline: 'Portugal Local wildfire risk, mapped clearly.',
    description:
      'Firerisk maps wildfire risk across Portugal so you can see conditions in your area at a glance. Check local risk levels, understand what they mean, and stay informed during fire season.',
    previewImage: '/apps/firerisk-card.png',
    link: 'https://www.firerisk.pt/en/map',
  },
  {
    slug: 'hopdraft-app',
    name: 'HopDraft',
    tagline: 'Beer recipes in under 10 seconds',
    description:
      'HopDraft helps home brewers sketch beer recipes fast. Pick your style, adjust hops and malts, and get a workable recipe in seconds — no spreadsheet required.',
    link: 'https://hopdraft-kl42ljw0b-lions-projects-b0515136.vercel.app/',
  },
  {
    slug: 'receipt-tracker-app',
    name: 'Receipt Tracker',
    tagline: 'Track your receipts with ease.',
    description:
      'Receipt Tracker keeps your purchases organised in one place. Snap or upload receipts, categorise spending, and find what you need when tax time or reimbursements roll around.',
    comingSoon: true,
  },
  {
    slug: 'hiit-timer-app',
    name: 'HIIT Timer',
    tagline: 'HIIT Timer for your workouts.',
    description:
      'HIIT Timer runs interval workouts with clear work and rest cues. Set your rounds, start the clock, and focus on the session — the app handles the timing.',
    comingSoon: true,
  },
];

export function getAppBySlug(slug: string): AppProduct | undefined {
  return apps.find(app => app.slug === slug);
}
