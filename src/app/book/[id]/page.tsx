
"use client";

import { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, MapPinIcon, UserIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/supabase/provider';
import { supabase } from '@/supabase/client';

export default function BookingPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const techName = searchParams.get('name') || 'Technician';
  const serviceType = searchParams.get('type') || 'Service';

  const [formData, setFormData] = useState({
    userName: user?.user_metadata?.full_name || '',
    address: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userName || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to complete your booking.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to make a booking.",
        variant: "destructive"
      });
      router.push(`/login?redirect=/book/${id}`);
      return;
    }

    setLoading(true);
    
    try {
      const bookingData = {
        technicianId: id as string,
        technicianName: techName,
        serviceType: serviceType,
        userId: user.id,
        ...formData,
      };

      const { error } = await supabase.from('bookings').insert(bookingData);
      
      if (error) throw error;
      
      router.push(`/success?tech=${encodeURIComponent(techName)}&eta=${encodeURIComponent('30 mins')}`);
    } catch (error: any) {
      toast({
        title: "Booking Error",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl pb-24 md:pb-12">
      <Link href="javascript:history.back()" className="inline-flex items-center text-sm text-primary font-medium hover:underline mb-6">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Technicians
      </Link>

      <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
        <CardHeader className="bg-primary text-primary-foreground p-8">
          <CardTitle className="text-2xl font-bold font-headline">Book {techName}</CardTitle>
          <CardDescription className="text-primary-foreground/80 font-medium">
            Service: {serviceType}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userName" className="flex items-center gap-2 text-sm font-semibold">
                <UserIcon className="h-4 w-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="userName"
                placeholder="Enter your full name"
                className="rounded-xl h-12"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2 text-sm font-semibold">
                <MapPinIcon className="h-4 w-4 text-primary" />
                Service Address
              </Label>
              <Input
                id="address"
                placeholder="Where should the professional come?"
                className="rounded-xl h-12"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold">
                <CalendarIcon className="h-4 w-4 text-primary" />
                Preferred Date
              </Label>
              <Input
                id="date"
                type="date"
                className="rounded-xl h-12"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:bg-accent transition-all"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </Button>
              {!user && (
                <p className="text-center text-xs text-destructive font-bold mt-4">
                  Note: You must be signed in to confirm.
                </p>
              )}
              <p className="text-center text-xs text-muted-foreground mt-4">
                By clicking confirm, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
