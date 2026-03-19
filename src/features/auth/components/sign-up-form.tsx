'use client';

import { useActionState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitFormButton } from '@/components/form/submit-button';
import { EMPTY_ACTION_STATE } from '@/components/form/utils/to-action-state';
import { Input } from '@/components/ui/input';
import { PasswordStrengthMeter } from '@/features/password/components/password-strength-meter';
import { signUp } from '../actions/server-sign-up';

export const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="username"
        placeholder="Username"
        defaultValue={actionState.payload?.get('username') as string}
      />
      <FieldError name="username" actionState={actionState} />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get('email') as string}
      />
      <FieldError name="email" actionState={actionState} />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={actionState.payload?.get('password') as string}
      />
      <FieldError name="password" actionState={actionState} />

      <PasswordStrengthMeter password={actionState.payload?.get('password') as string} />

      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        defaultValue={actionState.payload?.get('confirmPassword') as string}
      />
      <FieldError name="confirmPassword" actionState={actionState} />

      <SubmitFormButton label="Sign Up" />
    </Form>
  );
};
