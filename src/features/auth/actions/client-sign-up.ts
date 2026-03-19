'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { authClient } from '@/lib/auth-client';
import { homePath } from '@/paths';

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(value => !value.includes(' '), 'Username cannot contain spaces'),
    email: z.string().min(1, 'Email is required').max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

const signUp = async (actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(Object.fromEntries(formData));

    // const { data, error } = await authClient.signUp.email(
    await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name: username, // user display name
        callbackURL: '/dashboard', // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: ctx => {
          //show loading
          console.log('SIGN_UP::onRequest', { ctx });
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
          console.log('SIGN_UP::onSuccess', { ctx });
          toActionState('SUCCESS', 'Sign up successful', formData);

          redirect(homePath());
        },
        onError: ctx => {
          // display the error message
          alert(ctx.error.message);
          console.log('SIGN_UP::onError', { ctx });
          // return fromErrorToActionState(error, formData);
          throw new Error(ctx.error.message);
        },
      }
    );
  } catch (error) {
    console.log('SIGN_UP::catch_error', { error });
    return fromErrorToActionState(error, formData);
  }
};

export { signUp };
