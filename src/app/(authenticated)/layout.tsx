import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  await getAuthOrRedirect();

  return (
    <div className="px-6 py-8 sm:px-8 lg:py-12">
      <div className="pb-16">{children}</div>
    </div>
  );
}
