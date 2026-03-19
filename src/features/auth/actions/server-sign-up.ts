'use server';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from '@/components/form/utils/to-action-state';
import { auth } from '@/lib/auth'; // path to your Better Auth server instance
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

   
    const response = await auth.api.signUpEmail({
      body: {
        name: username,
        email,
        password,
      },
      asResponse: true, // returns a response object instead of data
    });

    console.log('SIGN_UP::response', { response });
    toActionState('SUCCESS', 'Sign up successful', formData);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(homePath());
};

export { signUp };
