import EmailWelcome from '@/emails/auth/email-welcome';
import { resend } from '@/lib/resend';

export const sendEmailWelcome = async (username: string, email: string, loginUrl: string) => {
  // send welcome email with resend
  return await resend.emails.send({
    from: 'noreply@resend.quintadamor.com',
    to: email,
    subject: 'Welcome to TicketBounty!',
    react: <EmailWelcome toName={username} loginUrl={loginUrl} />,
  });
};
