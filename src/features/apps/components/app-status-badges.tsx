import { Badge } from '@/components/ui/badge';
import type { AppProduct } from '../apps';

type AppStatusBadgesProps = {
  app: AppProduct;
};

export function AppStatusBadges({ app }: AppStatusBadgesProps) {
  return (
    <>
      {app.comingSoon ? <Badge variant="secondary">Coming soon</Badge> : null}
      {app.beta ? <Badge variant="outline">Beta</Badge> : null}
    </>
  );
}
