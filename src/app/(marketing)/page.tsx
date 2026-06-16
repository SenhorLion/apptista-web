import type { Metadata } from 'next';
import { AppProductGrid } from '@/features/apps/components/app-product-grid';

export const metadata: Metadata = {
  title: 'Apptista',
  description: 'Small apps. Immersive play. Clean, focused experiences people love to use.',
};

const HomePage = () => {
  return (
    <section className="flex flex-1 flex-col justify-center py-10 md:py-14">
      <div className="app-container grid items-center gap-10 lg:grid-cols-3 lg:gap-12 xl:gap-16">
        <header className="lg:col-span-1">
          <p className="font-display text-foreground text-5xl font-bold tracking-tight sm:text-6xl">
            Apptista
          </p>
          <p className="app-eyebrow mt-3">Apps people love to use.</p>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Clean, focused experiences that look great and do what they do well.
          </p>
        </header>

        <div className="lg:col-span-2">
          <AppProductGrid />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
