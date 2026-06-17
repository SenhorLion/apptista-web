export type AppProduct = {
  slug: string;
  name: string;
  tagline: string;
  previewImage?: string;
  link?: string;
};

/** Catalog for the marketing home grid — add or edit entries as apps ship. */
export const apps: AppProduct[] = [
  {
    slug: 'placeholder-one',
    name: 'Firerisk',
    tagline: 'Local wildfire risk, mapped clearly.',
    previewImage: '/apps/firerisk-card.png',
    link: 'https://www.firerisk.pt/en/map',
  },
  {
    slug: 'placeholder-two',
    name: 'HopDraft',
    tagline: 'Beer recipes in under 10 seconds',
  },
  {
    slug: 'placeholder-three',
    name: 'Receipt Tracker',
    tagline: 'Track your receipts with ease.',
  },
  {
    slug: 'placeholder-four',
    name: 'App Four',
    tagline: 'Built to feel great in daily use.',
  },
];

export function getAppBySlug(slug: string): AppProduct | undefined {
  return apps.find(app => app.slug === slug);
}
