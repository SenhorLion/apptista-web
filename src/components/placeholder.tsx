import { LucideMessageSquareWarning } from 'lucide-react';
import { cloneElement } from 'react';
import { cn } from '@/lib/utils';

type PlaceholderProps = {
  label: string;
  className?: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<{ className?: string }>;
};

export const Placeholder = ({
  label,
  className,
  icon = <LucideMessageSquareWarning />,
  button = <div />,
}: PlaceholderProps) => {
  return (
    <div
      className={cn(
        'flex-1 flex flex-col items-center justify-center gap-y-4 text-lg text-muted-foreground',
        className
      )}
    >
      {cloneElement(icon, { className: 'w-16 h-16' })}
      {label}
      {cloneElement(button, { className: 'h-10' })}
    </div>
  );
};
