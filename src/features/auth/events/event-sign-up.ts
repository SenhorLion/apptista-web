import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { signInPath } from '@/paths';
import { getBaseUrl } from '@/utils/urls';
import { sendEmailVerify } from '../emails/send-email-verify'; // You may need to create this if not present
import { sendEmailWelcome } from '../emails/send-email-welcome';
import { generateVerificationCode } from '../utils/generate-verification-code';
import { SIGN_UP_EVENT } from './constants';

// Verification email function
export const sendVerificationEmail = inngest.createFunction(
  { id: 'send-verification-email' },
  { event: SIGN_UP_EVENT },
  async ({ event, step }) => {
    await step.run('send-verification-email', async () => {
      const { userId } = event.data;

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

      const verificationCode = await generateVerificationCode(user.id, user.email);
      const result = await sendEmailVerify(user.username, user.email, verificationCode);

      if (result.error) {
        throw new Error(`${result.error.name}: ${result.error.message}`);
      }

      return { event, body: result };
    });
  }
);

// Welcome email function
export const sendWelcomeEmail = inngest.createFunction(
  { id: 'send-welcome-email' },
  { event: SIGN_UP_EVENT },
  async ({ event, step }) => {
    await step.run('send-welcome-email', async () => {
      const { username, email } = event.data;
      const loginUrl = getBaseUrl() + signInPath();

      await sendEmailWelcome(username, email, loginUrl);
    });
  }
);
