export interface GalleryItem {
  id: string;
  title: string;
  category: 'horses' | 'farm' | 'training' | 'riding' | 'events' | 'behind_scenes';
  image: string;
  videoSrc?: string;
  horseId?: string;
  horseName?: string;
  description: string;
  aspect?: 'portrait' | 'landscape';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // HORSES (strictly tagged to their respective horse)
  {
    id: 'gal-sultan-1',
    title: 'Sultan - Purebred Marwari Stallion',
    category: 'horses',
    image: '/horses/sultan/sultan-1.jpg',
    horseId: 'sultan',
    horseName: 'Sultan',
    description: 'Sultan exhibiting signature lyre ears and arched neck carriage.',
    aspect: 'portrait'
  },
  {
    id: 'gal-sultan-2',
    title: 'Sultan in Free Canter',
    category: 'horses',
    image: '/horses/sultan/sultan-2.jpg',
    horseId: 'sultan',
    horseName: 'Sultan',
    description: 'Black Marwari stallion displaying rhythmic movement and high tail carriage.',
    aspect: 'landscape'
  },
  {
    id: 'gal-rajveer-1',
    title: 'Rajveer - Golden Bay Kathiawari',
    category: 'horses',
    image: '/horses/rajveer/rajveer-1.jpg',
    horseId: 'rajveer',
    horseName: 'Rajveer',
    description: 'Kathiawari endurance stallion standing in morning sun.',
    aspect: 'portrait'
  },
  {
    id: 'gal-noor-1',
    title: 'Noor - Silver White Mare',
    category: 'horses',
    image: '/horses/noor/noor-1.jpg',
    horseId: 'noor',
    horseName: 'Noor',
    description: 'Graceful white Marwari mare with gentle expression and refined head.',
    aspect: 'portrait'
  },
  {
    id: 'gal-badal-1',
    title: 'Badal - Champion Kathiawari',
    category: 'horses',
    image: '/horses/badal/badal-2.jpg',
    horseId: 'badal',
    horseName: 'Badal',
    description: 'Deep chocolate stallion with commanding presence and powerful conformation.',
    aspect: 'landscape'
  },
  {
    id: 'gal-chetak-1',
    title: 'Chetak - Dapple Grey Lineage',
    category: 'horses',
    image: '/horses/chetak/chetak-1.jpg',
    horseId: 'chetak',
    horseName: 'Chetak',
    description: 'Aristocratic grey warhorse heritage stallion.',
    aspect: 'portrait'
  },
  {
    id: 'gal-tara-1',
    title: 'Tara - Young Filly',
    category: 'horses',
    image: '/horses/tara/tara-1.jpg',
    horseId: 'tara',
    horseName: 'Tara',
    description: '3-year-old chestnut filly showing gentle intelligence.',
    aspect: 'portrait'
  },

  // FARM
  {
    id: 'gal-farm-1',
    title: 'Sunset Over Royal Marwar Sanctuary',
    category: 'farm',
    image: '/farm/hero-bg.jpg',
    description: 'Our 150-acre equestrian estate nestled in the desert heritage valley.',
    aspect: 'landscape'
  },
  {
    id: 'gal-farm-2',
    title: 'Mahogany & Brass Royal Stables',
    category: 'farm',
    image: '/farm/stables.jpg',
    description: 'Air-cooled, spacious stables engineered with safety and equine comfort.',
    aspect: 'landscape'
  },
  {
    id: 'gal-farm-3',
    title: 'Open Lush Pastures & Paddocks',
    category: 'farm',
    image: '/farm/pasture.jpg',
    description: 'Nutrient-rich turnout paddocks allowing natural herd socialization.',
    aspect: 'landscape'
  },

  // TRAINING
  {
    id: 'gal-train-1',
    title: 'Olympic Sized Training Arena',
    category: 'training',
    image: '/farm/arena.jpg',
    description: 'Silica sand footing with full drainage for year-round classical schooling.',
    aspect: 'landscape'
  },
  {
    id: 'gal-train-2',
    title: 'Groundwork & Cadence Development',
    category: 'training',
    image: '/horses/sultan/sultan-3.jpg',
    horseId: 'sultan',
    horseName: 'Sultan',
    description: 'Developing softness, suppleness and mutual respect on the long line.',
    aspect: 'portrait'
  },

  // RIDING
  {
    id: 'gal-ride-1',
    title: 'Classical Dressage in Motion',
    category: 'riding',
    image: '/farm/riding.jpg',
    description: 'Harmony between horse and rider under international dressage masters.',
    aspect: 'landscape'
  },
  {
    id: 'gal-ride-2',
    title: 'Desert Trail Riding Experience',
    category: 'riding',
    image: '/farm/heritage.jpg',
    description: 'Exploration through golden sand dunes and historic royal trails.',
    aspect: 'landscape'
  },

  // EVENTS
  {
    id: 'gal-event-1',
    title: 'Annual Indigenous Breed Showcase',
    category: 'events',
    image: '/horses/chetak/chetak-2.jpg',
    horseId: 'chetak',
    horseName: 'Chetak',
    description: 'Hosting collectors and connoisseurs from across the globe.',
    aspect: 'portrait'
  },

  // BEHIND THE SCENES
  {
    id: 'gal-bts-1',
    title: 'Daily Equine Care & Grooming Ritual',
    category: 'behind_scenes',
    image: '/farm/grooming.jpg',
    description: 'Meticulous coat brushing, hoof care, and therapeutic massage.',
    aspect: 'landscape'
  }
];
