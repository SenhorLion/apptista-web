// Better Auh
import { betterAuth } from 'better-auth';
// import { magicLink } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { Pool } from 'pg';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.POSTGRES_DATABASE_URL,
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  //   plugins: [
  //     magicLink({
  //       sendMagicLink: async ({ email, token, url }, ctx) => {
  //         // send email to user
  //       },
  //     }),
  //   ],
  plugins: [nextCookies()], // make sure this is the last plugin in the array
  // TODO: Add google authentication
});
