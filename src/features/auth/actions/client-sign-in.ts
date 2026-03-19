'use client';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { authClient } from '@/lib/auth-client';
import { homePath } from '@/paths';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').max(191).email(),
  password: z.string().min(6).max(191),
});

const signIn = async (actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(Object.fromEntries(formData));

    console.log('SIGN_IN::email', { email });
    console.log('SIGN_IN::password', { password });

    await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: homePath(),
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      },
      {
        onRequest: ctx => {
          //show loading
          console.log('SIGN_IN::onRequest', { ctx });
        },
        onSuccess: async ctx => {
          //redirect to the dashboard or sign in page
          // await inngest.send({
          //   name: SIGN_UP_EVENT,
          //   data: {
          //     userId: user.id,
          //     username,
          //     email,
          //   },
          // });
          console.log('SIGN_IN::onSuccess', { ctx });
          toActionState('SUCCESS', 'Sign up successful', formData);

          redirect(homePath());
        },
        onError: ctx => {
          // display the error message
          alert(ctx.error.message);
          console.log('SIGN_IN::onError', { ctx });
          // return fromErrorToActionState(error, formData);
          throw new Error(ctx.error.message);
        },
      }
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
};

export { signIn };
