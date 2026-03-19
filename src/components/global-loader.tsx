import { LucideLoaderCircle } from 'lucide-react';

const GlobalLoader = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-y-4 text-lg text-muted-foreground">
      <LucideLoaderCircle className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default GlobalLoader;
