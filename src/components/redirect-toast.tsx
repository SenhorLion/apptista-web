'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { consumeCookieByKey } from '@/actions/cookies';

const RedirectToast = () => {
  // NOTE: Using pathname here to make sure the useEffect is called
  // as expected is a work around due to a known nextjs Template bug:
  // https://github.com/vercel/next.js/issues/60032
  // https://github.com/vercel/next.js/issues/60633
  const pathname = usePathname();
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookieByKey('toast');

      if (message) {
        toast.success(message);
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
