'use client';

import { LucideArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export const ButtonBack = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" onClick={() => router.back()}>
      <span className="text-sm font-bold flex items-center gap-x-1">
        <LucideArrowLeft /> Back
      </span>
    </Button>
  );
};
