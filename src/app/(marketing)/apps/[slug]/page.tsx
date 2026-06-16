import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { apps, getAppBySlug } from '@/features/apps/apps';
import { homePath } from '@/paths';

type AppPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({ params }: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    return { title: 'App not found' };
  }

  return {
    title: app.name,
    description: app.tagline,
  };
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  return (
    <section className="flex flex-1 flex-col justify-center py-12 md:py-16">
      <div className="app-container max-w-2xl">
        <p className="app-eyebrow">{app.name}</p>
        <h1 className="mt-4">{app.tagline}</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          App page content goes here — replace this placeholder when the product is ready.
        </p>
        <div className="mt-8">
          <Button variant="outline" asChild>
            <Link href={homePath()}>← Back to Apptista</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
