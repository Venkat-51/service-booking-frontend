
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock, ShieldCheck } from 'lucide-react';
import { Technician } from '@/lib/api';
import Link from 'next/link';

interface TechnicianCardProps {
  technician: Technician;
}

export function TechnicianCard({ technician }: TechnicianCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white">
      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-primary/10 shadow-inner">
          <Image
            src={technician.imageUrl}
            alt={technician.name}
            fill
            className="object-cover"
            data-ai-hint="technician professional"
          />
        </div>
        
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-foreground font-headline">{technician.name}</h3>
            <div className="flex items-center justify-center sm:justify-start gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-lg text-sm font-semibold">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              {technician.rating}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{technician.serviceType}</p>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              {technician.experience} exp
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              Verified
            </div>
          </div>
        </div>

        <div className="w-full sm:w-auto self-center sm:self-center">
          <Link href={`/book/${technician.id}?name=${encodeURIComponent(technician.name)}&type=${encodeURIComponent(technician.serviceType)}`}>
            <Button className="w-full sm:w-auto rounded-xl px-8 py-6 font-semibold shadow-lg shadow-primary/20 hover:bg-accent">
              Book Tech
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
