import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from './_providers/react-query';
import { geist, inter, jetbrainsMono } from './fonts';

export const metadata: Metadata = {
  title: {
    default: 'Apptista',
    template: '%s | Apptista',
  },
  description: 'Small apps. Immersive play.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geist.variable} ${jetbrainsMono.variable} antialiased`}>
        <NuqsAdapter>
          <ThemeProvider>
            <ReactQueryProvider>
              <div className="flex h-screen border-collapse overflow-hidden">
                <main className="bg-background text-foreground flex min-h-screen flex-1 flex-col overflow-x-hidden overflow-y-auto">
                  {children}
                </main>
              </div>
              <Toaster position="top-center" expand />
            </ReactQueryProvider>
          </ThemeProvider>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  );
}
