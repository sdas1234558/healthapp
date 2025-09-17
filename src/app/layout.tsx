import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserProvider } from '@/contexts/user-context';
import { SymptomsProvider } from '@/contexts/symptoms-context';
import { PathologyProvider } from '@/contexts/pathology-context';

export const metadata: Metadata = {
  title: 'HealthCheck',
  description: 'Your personal AI health assistant.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <ThemeProvider>
          <UserProvider>
            <SymptomsProvider>
              <PathologyProvider>
                <div className="relative min-h-screen">
                  <div className="absolute right-4 top-4 z-50">
                    <ThemeToggle />
                  </div>
                  {children}
                  <Toaster />
                </div>
              </PathologyProvider>
            </SymptomsProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
