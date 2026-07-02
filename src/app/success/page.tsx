
"use client";

import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Home, MapPin, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const techName = searchParams.get('tech') || 'Our Professional';
  const eta = searchParams.get('eta') || 'Soon';

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg pb-24 md:pb-12">
      <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white text-center">
        <div className="bg-green-500 py-12 px-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 scale-150" />
            <CheckCircle2 className="h-24 w-24 text-white relative z-10" />
          </div>
        </div>
        
        <CardContent className="p-8 md:p-12 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-foreground font-headline">Booking Confirmed!</h1>
            <p className="text-muted-foreground text-lg">Your request has been successfully placed.</p>
          </div>

          <div className="bg-primary/5 rounded-2xl p-6 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider">Estimated Arrival</p>
                <p className="text-lg font-bold text-foreground">{eta}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t pt-4">
              <div className="bg-accent/10 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs font-bold text-accent uppercase tracking-wider">Your Professional</p>
                <p className="text-lg font-bold text-foreground">{techName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Link href="/">
              <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-semibold text-muted-foreground">
              View Booking Details
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-center text-muted-foreground text-sm mt-8 px-4">
        Need to change your booking? Call us at <span className="font-bold text-primary">1-800-HANDY-HUB</span>
      </p>
    </div>
  );
}
