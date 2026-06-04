'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide ADMIN & Logout button on login page
  const isLoginPage = pathname === '/login';

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="bg-dark-surface border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/MKM-Logo-VERTICAL-WHITETEXT-No-Background.png"
                alt="MKM Enterprise Logo"
                width={40}
                height={40}
                className="transition-transform group-hover:scale-110 object-contain"
              />
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                MKM <span className="text-primary font-extrabold">CRM</span>
              </span>
            </Link>
          </div>

          {/* ADMIN + Logout - Only show when NOT on login page */}
          {!isLoginPage && (
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-400">ADMIN</span>
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-rose-400 hover:text-rose-500 transition-colors px-4 py-2 rounded-lg hover:bg-rose-500/10"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}