'use server';

import { fromErrorToActionState, toActionState } from '@/components/form/utils/to-action-state';
import { sendEmailVerify } from '../emails/send-email-verify';
import { getAuthOrRedirect } from '../queries/get-auth-or-redirect';
import { generateVerificationCode } from '../utils/generate-verification-code';

export const emailVerifyResend = async () => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const verificationCode = await generateVerificationCode(user.id, user.email);

    // Send user a verification code
    const result = await sendEmailVerify(user.username, user.email, verificationCode);

    if (result.error) {
      return toActionState('ERROR', 'Failed to resend verification code');
    }
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState('SUCCESS', 'Verification code resent');
};
