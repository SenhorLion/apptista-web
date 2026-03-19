'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { toActionState } from '@/components/form/utils/to-action-state';
import { auth } from '@/lib/auth';
import { signInPath } from '@/paths';
import { getAuth } from '../queries/get-auth';

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  const { success } = await auth.api.signOut({
    headers: await headers(),
  });

  if (!success) {
    return toActionState('ERROR', 'Failed to sign out');
  }

  toActionState('SUCCESS', 'Signed out successfully');

  redirect(signInPath());
};
