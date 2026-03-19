'use server';

import { headers } from 'next/headers';
import { cache } from 'react';
import { auth } from '@/lib/auth';

export const getAuth = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      user: null,
      session: null,
    };
  }
  return session;
});
