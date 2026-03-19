import EmailVerify from '@/emails/auth/email-verfiy';
import { resend } from '@/lib/resend';

export const sendEmailVerify = async (username: string, email: string, code: string) => {
  return await resend.emails.send({
    from: 'noreply@resend.quintadamor.com',
    to: email,
    subject: 'Email verification code for TicketBounty!',
    react: <EmailVerify toName={username} code={code} />,
  });
};
