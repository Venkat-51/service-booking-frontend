
"use client";

import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search, MapPin, ThumbsUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Home() {
  const categories = [
    { id: 'electrician', title: 'Electrician', hint: 'electrician worker' },
    { id: 'plumber', title: 'Plumber', hint: 'plumber tools' },
    { id: 'ac-repair', title: 'AC Repair', hint: 'ac repair' },
    { id: 'home-cleaning', title: 'Home Cleaning', hint: 'home cleaning' },
  ];

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner')?.imageUrl || '';

  return (
    <div className="flex flex-col gap-12 pb-24 md:pb-12">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt="BookMyService"
          fill
          className="object-cover brightness-[0.6]"
          priority
          data-ai-hint="home service"
        />
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md font-headline leading-tight">
            Expert Home Services, <br/><span className="text-accent">Just a Click Away.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-sm">
            Trusted professionals for cleaning, plumbing, electrical, and more.
          </p>
          
          <div className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r">
              <MapPin className="h-5 w-5 text-primary mr-2 shrink-0" />
              <Input 
                placeholder="Enter your location..." 
                className="border-none focus-visible:ring-0 text-foreground text-base h-12"
              />
            </div>
            <div className="flex-1 flex items-center px-4">
              <Search className="h-5 w-5 text-primary mr-2 shrink-0" />
              <Input 
                placeholder="What service do you need?" 
                className="border-none focus-visible:ring-0 text-foreground text-base h-12"
              />
            </div>
            <Button size="lg" className="rounded-xl px-8 h-12 text-base font-semibold">
              Find Service
            </Button>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section id="services" className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-headline">Popular Categories</h2>
            <p className="text-muted-foreground mt-1">Select a service to see available experts</p>
          </div>
          <Button variant="ghost" className="text-primary font-semibold hidden md:flex">
            View All Categories
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const imgData = PlaceHolderImages.find(i => i.id === cat.id);
            return (
              <ServiceCard
                key={cat.id}
                id={cat.id}
                title={cat.title}
                imageUrl={imgData?.imageUrl || ''}
                imageHint={imgData?.imageHint || cat.hint}
              />
            );
          })}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-white shadow-sm space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg font-headline">Verified Experts</h3>
              <p className="text-sm text-muted-foreground">Every professional undergoes a rigorous background check and skill test.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm space-y-3">
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <ClockIcon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold text-lg font-headline">Fast Response</h3>
              <p className="text-sm text-muted-foreground">Average arrival time of just 30-45 minutes for emergency repairs.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-sm space-y-3">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <ThumbsUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg font-headline">Satisfaction Guaranteed</h3>
              <p className="text-sm text-muted-foreground">Not happy with the service? We'll make it right at no extra cost.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Inline icons for the Trust Badges to ensure they are available
function ShieldCheck(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  );
}
