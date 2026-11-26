import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Battery scheduling',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
