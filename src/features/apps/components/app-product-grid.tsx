import { apps } from '../apps';
import { AppProductCard } from './app-product-card';

export function AppProductGrid() {
  return (
    <ul className="app-product-grid grid gap-5 sm:grid-cols-2">
      {apps.map((app) => (
        <li key={app.slug}>
          <AppProductCard app={app} />
        </li>
      ))}
    </ul>
  );
}
