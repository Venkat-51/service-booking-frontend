import type { StaticImageData } from 'next/image';
import electricianImage from '@/assets/images/electrician.jpg';
import plumberImage from '@/assets/images/Plumber.jpg';
import acRepairImage from '@/assets/images/acrepair.jpg';
import cleaningImage from '@/assets/images/cleaning1.jpg';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string | StaticImageData;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = [
  {
    id: 'electrician',
    description: 'Professional electrician working on a panel',
    imageUrl: electricianImage,
    imageHint: 'electrician worker',
  },
  {
    id: 'plumber',
    description: 'Plumber fixing a kitchen sink',
    imageUrl: plumberImage,
    imageHint: 'plumber tools',
  },
  {
    id: 'ac-repair',
    description: 'Technician repairing an air conditioning unit',
    imageUrl: acRepairImage,
    imageHint: 'ac repair',
  },
  {
    id: 'home-cleaning',
    description: 'Professional cleaner mopping a bright wooden floor',
    imageUrl: cleaningImage,
    imageHint: 'home cleaning',
  },
  {
    id: 'tech1',
    description: 'Friendly service technician portrait',
    imageUrl: 'https://picsum.photos/seed/tech-portrait-1/400/400',
    imageHint: 'man portrait',
  },
  {
    id: 'tech2',
    description: 'Service professional smiling',
    imageUrl: 'https://picsum.photos/seed/tech-portrait-2/400/400',
    imageHint: 'woman portrait',
  },
  {
    id: 'hero-banner',
    description: 'Modern home interior with service professionals',
    imageUrl: 'https://picsum.photos/seed/handyhub-hero-v2/1200/600',
    imageHint: 'home service',
  },
];
