'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { cn } from '@/lib/utils';
import { accountPasswordPath, accountProfilePath } from '@/paths';

export const AccountTabs = () => {
  const pathname = usePathname();

  //   const isProfile = pathname === accountProfilePath();
  //   const isPassword = pathname === accountPasswordPath();

  return (
    <Tabs defaultValue="account" className="w-[400px]" value={pathname.split('/').at(-1)}>
      <TabsList>
        <TabsTrigger
          value="profile"
          asChild
          //   className={cn(isProfile && 'bg-primary text-primary-foreground')}
        >
          <Link href={accountProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger
          value="password"
          asChild
          //   className={cn(isPassword && 'bg-primary text-primary-foreground')}
        >
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
