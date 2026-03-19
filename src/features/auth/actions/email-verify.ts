'use server';

import { redirect } from 'next/navigation';
import z from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';
import { getAuthOrRedirect } from '../queries/get-auth-or-redirect';
import { createUserSession } from '../utils/session-cookie';
import { validateEmailVerificationCode } from '../utils/validate-email-verification-code';

const emailVerifySchema = z.object({
  code: z.string().length(6),
});

export const emailVerify = async (actionState: ActionState, formData: FormData) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const { code } = emailVerifySchema.parse(Object.fromEntries(formData));

    const validCode = await validateEmailVerificationCode(code, user.id, user.email);

    if (!validCode) {
      return toActionState('ERROR', 'Invalid code');
    }

    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // update user email
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    await createUserSession(user.id);
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookieByKey('toast', 'Email verified');

  redirect(ticketsPath());
};
