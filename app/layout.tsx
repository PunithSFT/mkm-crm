import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

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
        <header className="bg-dark-surface border-b border-dark-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="flex items-center justify-center">
  <Image
    src="/MKM-Logo-HORIZONTAL-NO-BACKGROUND-WHITETEXT.png"
    alt="MKM Enterprise Logo"
    width={180}
    height={70}
    className="transition-transform group-hover:scale-110 object-contain"
  />
</div>
                  
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-800 border border-dark-border flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">ADMIN</span>
                </div>
              </div>
            </div>
          </div>
        </header>

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
