
"use client";

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { TechnicianCard } from '@/components/TechnicianCard';
import { Technician, fetchTechnicians } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TechnicianListing() {
  const { type } = useParams();
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);

  const serviceName = typeof type === 'string' 
    ? type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
    : 'Services';

  useEffect(() => {
    if (type) {
      fetchTechnicians(type as string).then(data => {
        setTechnicians(data);
        setLoading(false);
      });
    }
  }, [type]);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Link href="/" className="inline-flex items-center text-sm text-primary font-medium hover:underline mb-2">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Categories
          </Link>
          <h1 className="text-3xl font-bold text-foreground font-headline">Available {serviceName}s</h1>
          <p className="text-muted-foreground">{technicians.length} professionals found in your area</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="rounded-xl">
            Sort by: Rating
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
              <div className="flex gap-4 items-center">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          ))
        ) : technicians.length > 0 ? (
          technicians.map((tech) => (
            <TechnicianCard key={tech.id} technician={tech} />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
            <p className="text-muted-foreground text-lg">No technicians found for this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
