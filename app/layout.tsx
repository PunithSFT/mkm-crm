import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MKM Customer CRM | Professional Dashboard',
  description: 'Enterprise Customer Data Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-bg text-gray-100 min-h-screen flex flex-col`}>
        
        <Header />   {/* ← Use this instead of old header */}

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        <footer className="bg-dark-surface border-t border-dark-border py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MKM Customer Database. All rights reserved.<br />
            Designed by codemiDesignX
          </div>
        </footer>
      </body>
    </html>
  );
}