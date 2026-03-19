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

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').max(191).email(),
  password: z.string().min(6).max(191),
});

const signIn = async (actionState: ActionState, formData: FormData) => {
  try {
    const { email, password } = signInSchema.parse(Object.fromEntries(formData));

    console.log('SIGN_IN::email', { email });
    console.log('SIGN_IN::password', { password });

    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      asResponse: true, // returns a response object instead of data
    });

    console.log('SIGN_IN::response', { response });

    if(!response.ok){
      throw new Error('Failed to sign in');
    }
    toActionState('SUCCESS', 'Sign in successful', formData);
  } catch (error) {
    console.log('SIGN_IN::error', { error });
    return fromErrorToActionState(error, formData);
  }

  redirect(homePath());
};

export { signIn };
