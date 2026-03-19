import './globals.css';
import type { Metadata } from 'next';
// import localFont from 'next/font/local';
// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from './_providers/react-query';
import { geist, inter, jetbrainsMono } from './fonts';

export const metadata: Metadata = {
  title: 'Apptista',
  description: 'Apptista application ...',
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
                <main className="bg-secondary/20 flex min-h-screen flex-1 flex-col overflow-x-hidden overflow-y-auto px-8 py-24 pl-[78px] duration-200 peer-hover:pl-[240px]">
                  {children}
                </main>
              </div>
              <Toaster position="top-center" expand />
            </ReactQueryProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
