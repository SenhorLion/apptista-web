import { EventSchemas, Inngest } from 'inngest';
import { SIGN_UP_EVENT } from '@/features/auth/events/constants';
import { SignUpEventArgs } from '@/features/auth/events/types';
import { PASSWORD_RESET_EVENT } from '@/features/password/events/constants';
import { PasswordResetEventArgs } from '@/features/password/events/types';

type Events = {
  [PASSWORD_RESET_EVENT]: PasswordResetEventArgs;
  [SIGN_UP_EVENT]: SignUpEventArgs;
};

const inngest = new Inngest({
  id: 'ticket-bounty',
  schemas: new EventSchemas().fromRecord<Events>(),
});

export { inngest };
