
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { StaticImageData } from 'next/image';

interface ServiceCardProps {
  id: string;
  title: string;
  imageUrl: string | StaticImageData;
  imageHint: string;
}

export function ServiceCard({ id, title, imageUrl, imageHint }: ServiceCardProps) {
  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white font-headline">{title}</h3>
          </div>
        </div>
        <div className="p-4">
          <Link href={`/services/${id.toLowerCase().replace(/\s+/g, '-')}`}>
            <Button className="w-full rounded-xl group-hover:bg-accent transition-colors" variant="default">
              Book Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
