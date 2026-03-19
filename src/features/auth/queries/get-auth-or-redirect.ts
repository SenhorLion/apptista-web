import { redirect } from 'next/navigation';
import { signInPath } from '@/paths';
import { getAuth } from './get-auth';

export const getAuthOrRedirect = async () => {
  const { session, user } = await getAuth();
  console.log('SESSION', session, user);

  if (!user) {
    redirect(signInPath());
  }

  return { session, user };
};
