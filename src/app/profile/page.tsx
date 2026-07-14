
"use client";

import { useUser } from '@/supabase/provider';
import { supabase } from '@/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, LogOut, Settings, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 font-headline">Profile</h1>
        <p className="text-muted-foreground mb-8">Please sign in to view your profile.</p>
        <Link href="/login" className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl pb-24 md:pb-12">
      <div className="space-y-6">
        <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
          <div className="h-32 bg-gradient-to-r from-primary to-accent" />
          <CardContent className="p-8 -mt-16 text-center">
            <Avatar className="h-32 w-32 mx-auto border-4 border-white shadow-xl">
              <AvatarImage src={user.user_metadata?.avatar_url || ''} />
              <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                {user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4">
              <h1 className="text-2xl font-bold font-headline">{user.user_metadata?.full_name || 'BookMyService User'}</h1>
              <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" className="rounded-xl px-6">
                Edit Profile
              </Button>
              <Button variant="destructive" onClick={handleSignOut} className="rounded-xl px-6">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-none shadow-sm rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Account Security</h3>
                <p className="text-xs text-muted-foreground">Passwords & Authentication</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold">Saved Experts</h3>
                <p className="text-xs text-muted-foreground">Manage your favorites</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm rounded-2xl">
          <CardContent className="p-0">
            <div className="divide-y">
              <Link href="/bookings" className="flex items-center justify-between p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Booking History</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center justify-between p-6 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">App Settings</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  );
}
