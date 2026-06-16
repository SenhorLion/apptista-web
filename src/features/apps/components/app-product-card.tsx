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
      className="group border-border bg-card hover:border-primary/50 focus-visible:ring-ring block rounded-lg border p-5 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
    >
      <h3 className="text-foreground font-display text-lg font-semibold tracking-tight">
        {app.name}
      </h3>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{app.tagline}</p>
      <span className="text-primary mt-4 inline-block text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        View app →
      </span>
    </Link>
  );
}
