import Link from 'next/link';
import type { CSSProperties } from 'react';
import { appPath } from '@/paths';
import type { AppProduct } from '../apps';
import { AppStatusBadges } from './app-status-badges';

type AppProductCardProps = {
  app: AppProduct;
};

export function AppProductCard({ app }: AppProductCardProps) {
  const cardStyle = app.previewImage
    ? ({
        '--app-card-image': `url(${app.previewImage})`,
      } as CSSProperties)
    : undefined;

  const isExternalLink = !app.comingSoon && Boolean(app.link);
  const link = isExternalLink ? app.link! : appPath(app.slug);

  return (
    <Link
      href={link}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
      className={`app-product-card group focus-visible:ring-ring relative block min-h-40 overflow-hidden rounded-lg p-6 transition-all focus-visible:ring-[3px] focus-visible:outline-none${
        app.previewImage ? ' app-product-card--image' : ''
      }`}
      style={cardStyle}
    >
      {/* <span className="app-product-card__mark" aria-hidden="true" /> */}
      <div className="relative z-10 flex flex-wrap items-center gap-2">
        <h3 className="text-foreground font-display text-xl font-bold tracking-normal">
          {app.name}
        </h3>
        <AppStatusBadges app={app} />
      </div>
      <p className="text-muted-foreground relative z-10 mt-3 text-base leading-relaxed">
        {app.tagline}
      </p>
      <span className="app-product-card__cta text-foreground relative z-10 mt-6 inline-flex text-sm font-semibold">
        {app.comingSoon ? (
          'Learn more'
        ) : (
          <>
            <span aria-hidden="true">→</span>
            View app
            {isExternalLink ? <span className="sr-only"> (opens in new tab)</span> : null}
          </>
        )}
      </span>
    </Link>
  );
}
