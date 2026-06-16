import type { Metadata } from 'next';
import { AppProductGrid } from '@/features/apps/components/app-product-grid';

export const metadata: Metadata = {
  title: 'Apptista',
  description: 'Small apps. Immersive play. Clean, focused experiences people love to use.',
};

const HomePage = () => {
  return (
    <section className="home-shell flex flex-1 flex-col justify-center py-10 md:py-14">
      <div className="app-container grid items-center gap-10 lg:grid-cols-3 lg:gap-14 xl:gap-20">
        <header className="relative lg:col-span-1">
          <div className="brand-rule mb-8" aria-hidden="true" />
          <p
            className="font-display text-foreground text-6xl leading-none tracking-normal sm:text-7xl"
            aria-label="apptista"
          >
            <span className="font-black">app</span>
            <span className="font-medium">tista</span>
          </p>
          <p className="text-muted-foreground mt-3 max-w-sm text-xl leading-relaxed">
            Small apps, beautifully made.
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
