import { Separator } from './ui/separator';

type HeadingProps = {
  title: string;
  description?: string;
  tabs?: React.ReactNode; // TODO: Add tabs component
  actions?: React.ReactNode; // TODO: Add actions component
};

export const Heading = ({ title, description, tabs, actions }: HeadingProps) => {
  return (
    <>
      {tabs && <div className="px-8">{tabs}</div>}
      <div className="flex items-center justify-between px-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-x-2">{actions}</div>}
      </div>
      <Separator />
    </>
  );
};
