
"use client";

import Link from 'next/link';
import { Home, Search, Calendar, User, Wrench, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useUser } from '@/supabase/provider';

export function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Services', href: '/#services', icon: Search },
    { label: 'Bookings', href: '/bookings', icon: Calendar },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Wrench className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary font-headline">BookMy<span className="text-accent">Service</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/login"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            )}
          </nav>

          <div className="flex md:hidden items-center gap-4 fixed bottom-0 left-0 right-0 bg-background border-t px-6 py-3 justify-between">
             {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            ))}
            {!user && (
              <Link
                href="/login"
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  pathname === '/login' ? "text-primary" : "text-muted-foreground"
                )}
              >
                <LogIn className="h-5 w-5" />
                <span className="text-[10px] font-medium">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
