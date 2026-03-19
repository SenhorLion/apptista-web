'use client';

import { cloneElement, useActionState, useState } from 'react';
import { Form } from '../form/form';
import { SubmitFormButton } from '../form/submit-button';
import { ActionState, EMPTY_ACTION_STATE } from '../form/utils/to-action-state';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { AlertDialogAction } from '../ui/alert-dialog';

type UseConfirmDialogProps = {
  action: () => Promise<ActionState>;
  trigger: React.ReactElement | ((isPending: boolean) => React.ReactElement);
  title?: string;
  description?: string;
  onSuccess?: (actionState: ActionState) => void;
};

export const useConfirmDialog = ({
  action,
  trigger,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  onSuccess,
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [actionState, formAction, isPending] = useActionState(action, EMPTY_ACTION_STATE);

  const dialogTrigger = cloneElement(typeof trigger === 'function' ? trigger(isPending) : trigger, {
    onClick: () => setIsOpen(state => !state),
  } as React.HTMLAttributes<HTMLButtonElement>);

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess?.(actionState);
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form action={formAction} actionState={actionState} onSuccess={handleSuccess}>
              <SubmitFormButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};
