'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function AuthTabs() {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';

  return (
    <div className="mb-8">
      <div className="flex border-b border-border gap-8">
        <Link
          href="/login"
          className={cn(
            "flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 transition-colors",
            isLogin 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="text-sm font-bold tracking-wide">LOGIN</span>
        </Link>
        <Link
          href="/register"
          className={cn(
            "flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 transition-colors",
            isRegister 
              ? "border-primary text-primary" 
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="text-sm font-bold tracking-wide uppercase">Register</span>
        </Link>
      </div>
    </div>
  );
}
