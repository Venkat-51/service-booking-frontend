
"use client";

import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, User, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useMemo } from 'react';

export default function BookingsPage() {
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();

  const bookingsQuery = useMemo(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [db, user]);

  const { data: bookings, loading: dataLoading } = useCollection(bookingsQuery);

  if (authLoading || (user && dataLoading)) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 font-headline">My Bookings</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 font-headline">Please Sign In</h1>
        <p className="text-muted-foreground mb-8">You need to be logged in to view your bookings.</p>
        <Link href="/login" className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl pb-24 md:pb-12">
      <h1 className="text-3xl font-bold mb-8 font-headline">My Bookings</h1>
      
      <div className="space-y-4">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking: any) => (
            <Card key={booking.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="bg-primary/5 p-6 flex flex-col justify-center items-center sm:w-48 text-center border-b sm:border-b-0 sm:border-r">
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <p className="font-bold text-lg">{new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{new Date(booking.date).getFullYear()}</p>
                  </div>
                  
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-foreground font-headline">{booking.technicianName}</h3>
                        <p className="text-sm text-primary font-semibold uppercase tracking-wider">{booking.serviceType}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Confirmed</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span className="truncate">{booking.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-primary" />
                        <span>Booked for: {booking.userName}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex items-center justify-center sm:border-l">
                    <Link href={`/bookings/${booking.id}`} className="text-primary hover:text-accent transition-colors">
                      <ChevronRight className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground text-lg">No bookings found yet.</p>
            <Link href="/" className="text-primary font-bold hover:underline mt-2 inline-block">Explore services</Link>
          </div>
        )}
      </div>
    </div>
  );
}
