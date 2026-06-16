import Link from 'next/link';
import { appPath } from '@/paths';
import type { AppProduct } from '../apps';

type AppProductCardProps = {
  app: AppProduct;
};

export function AppProductCard({ app }: AppProductCardProps) {
  return (
    <Link
      href={appPath(app.slug)}
      className="app-product-card group focus-visible:ring-ring relative block min-h-40 overflow-hidden rounded-lg p-6 transition-all focus-visible:ring-[3px] focus-visible:outline-none"
    >
      <span className="app-product-card__mark" aria-hidden="true" />
      <h3 className="text-foreground font-display text-xl font-bold tracking-normal">
        {app.name}
      </h3>
      <p className="text-muted-foreground mt-3 text-base leading-relaxed">{app.tagline}</p>
      <span className="text-primary mt-6 inline-flex text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        View app
      </span>
    </Link>
  );
}
