import { cookies } from 'next/headers';
import { createSession } from '@/lib/lucia';
import { generateRandomToken } from '@/utils/crypto';

export const SESSION_COOKIE_NAME = 'session';

export const setSessionCookie = async (sessionToken: string, expiresAt: Date) => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    attributes: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: expiresAt,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

export const deleteSessionCookie = async () => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: '',
    attributes: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

/**
 * Creates a new session and sets the session cookie for a user
 * This function can be reused across different authentication flows
 */
export const createUserSession = async (userId: string) => {
  const sessionToken = generateRandomToken();
  const session = await createSession(sessionToken, userId);
  await setSessionCookie(sessionToken, session.expiresAt);
  return session;
};
