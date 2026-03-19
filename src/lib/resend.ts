import { Resend } from 'resend';

// {
//     from: "noreply@resend.quintadamor.com",
//     apiKey: process.env.RESEND_API_KEY,
//     name: "Email",
//   }

const resend = new Resend(process.env.RESEND_API_KEY);

export { resend };
