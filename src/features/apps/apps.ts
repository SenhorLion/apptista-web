export type AppProduct = {
  slug: string;
  name: string;
  tagline: string;
  previewImage?: string;
};

/** Catalog for the marketing home grid — add or edit entries as apps ship. */
export const apps: AppProduct[] = [
  {
    slug: 'placeholder-one',
    name: 'Firerisk',
    tagline: 'Local wildfire risk, mapped clearly.',
    previewImage: '/apps/firerisk-card.png',
  },
  {
    slug: 'placeholder-two',
    name: 'App Two',
    tagline: 'Small surface area, immersive interaction.',
  },
  {
    slug: 'placeholder-three',
    name: 'App Three',
    tagline: 'Clean visuals and a tight feature set.',
  },
  {
    slug: 'placeholder-four',
    name: 'App Four',
    tagline: 'Built to feel great in daily use.',
  },
];

export function getAppBySlug(slug: string): AppProduct | undefined {
  return apps.find((app) => app.slug === slug);
}
