export interface Horse {
  id: string;
  name: string;
  breed: 'Marwari' | 'Kathiawari' | 'Thoroughbred';
  age: number;
  ageDisplay: string;
  gender: 'Male' | 'Female';
  genderRole: 'Stallion' | 'Mare' | 'Colt' | 'Filly';
  height: string;
  color: string;
  price: string;
  rawPrice: number;
  availability: 'Available' | 'Booked' | 'In Training';
  training: string;
  temperament: string;
  experience: string;
  lineage: string;
  health: string;
  passportId: string;
  description: string;
  detailedStory: string;
  featured: boolean;
  images: string[];
  videos: {
    id: string;
    title: string;
    src: string;
    duration: string;
    description: string;
  }[];
  specs: {
    label: string;
    value: string;
  }[];
}

export const HORSES_DATA: Horse[] = [
  {
    id: 'sultan',
    name: 'Sultan',
    breed: 'Marwari',
    age: 6,
    ageDisplay: '6 Years',
    gender: 'Male',
    genderRole: 'Stallion',
    height: '16.2 hands',
    color: 'Jet Black with White Star Blaze',
    price: '₹2,50,000',
    rawPrice: 250000,
    availability: 'Available',
    training: 'Classical Dressage & Royal Procession Trained',
    temperament: 'Calm, Spirited, Loyal & Highly Responsive',
    experience: 'State Equestrian Champion, 4 Years Under Saddle',
    lineage: 'Veer Bahadur x Chandni Lineage (Rajasthan Royal Stud)',
    health: '100% Sound, Fully Vaccinated, Clean X-Rays, Coggins Negative',
    passportId: 'IND-EQ-2020-0982',
    description: 'A magnificent 6-year-old purebred Marwari stallion exhibiting the signature lyrical inward-curving ears, supreme royal carriage, and an unflinching, fearless temperament.',
    detailedStory: 'Sultan represents the pinnacle of indigenous Marwari heritage breeding. Sired by the renowned champion stallion Veer Bahadur, Sultan has been nurtured with precision classical groundwork since age two. He moves with breathtaking cadence, possessing high-set neck carriage, expressive eyes, and a deep chest built for endurance. Perfectly trained for ceremonial displays, royal processions, and high-level saddle riding.',
    featured: true,
    images: [
      '/horses/sultan/sultan-1.jpg',
      '/horses/sultan/sultan-2.jpg',
      '/horses/sultan/sultan-3.jpg'
    ],
    videos: [
      {
        id: 'sultan-v1',
        title: 'Sultan Free Canter & Trot Display',
        src: 'https://youtu.be/2VpAUWy4MXA',
        duration: '0:45',
        description: 'Demonstrating natural floating trot and responsive gaits in the main training arena.'
      }
    ],
    specs: [
      { label: 'Breed', value: 'Purebred Marwari' },
      { label: 'Age', value: '6 Years' },
      { label: 'Gender', value: 'Male (Stallion)' },
      { label: 'Height', value: '16.2 Hands' },
      { label: 'Coat Color', value: 'Jet Black / Star Blaze' },
      { label: 'Ear Structure', value: 'Signature Lyre-curved inward' },
      { label: 'Microchip ID', value: '985141002349018' },
      { label: 'Registration', value: 'Marwari Horse Society of India' }
    ]
  },
  {
    id: 'rajveer',
    name: 'Rajveer',
    breed: 'Kathiawari',
    age: 5,
    ageDisplay: '5 Years',
    gender: 'Male',
    genderRole: 'Stallion',
    height: '15.1 hands',
    color: 'Rich Golden Bay with Dark Points',
    price: '₹3,20,000',
    rawPrice: 320000,
    availability: 'Available',
    training: 'Endurance Trail & Arena Performance',
    temperament: 'Vibrant, Intrepid, Swift & Affectionate',
    experience: '35km Endurance Trail Finisher, Arena Jumping Ready',
    lineage: 'Saurashtra Desert Dynasty x Kesari Line',
    health: 'Excellent Hoof Quality, Dewormed, Up-to-date Dental',
    passportId: 'IND-EQ-2021-0412',
    description: 'An athletic and exceptionally hardy 5-year-old Kathiawari stallion. Known for supernatural stamina, agile footing, and distinctive refined desert conformation.',
    detailedStory: 'Bred in the traditions of Saurashtra, Rajveer possesses the dense bone, hard hooves, and desert resilience famous in pure Kathiawari stock. His golden coat gleams in the sunlight, complemented by inward curved ears that touch at the tips. He is spirited yet remarkably gentle to handle from the ground, with swift transitions and natural reining ability.',
    featured: true,
    images: [
      '/horses/rajveer/rajveer-1.jpg',
      '/horses/rajveer/rajveer-2.jpg',
      '/horses/rajveer/rajveer-3.jpg'
    ],
    videos: [
      {
        id: 'rajveer-v1',
        title: 'Rajveer Agility & Arena Work',
        src: 'https://www.youtube.com/shorts/6O9T3mQDLNE?t=2&feature=share',
        duration: '0:52',
        description: 'Kathiawari agility showcase including tight turns, quick halts, and spirited gallop.'
      }
    ],
    specs: [
      { label: 'Breed', value: 'Kathiawari' },
      { label: 'Age', value: '5 Years' },
      { label: 'Gender', value: 'Male (Stallion)' },
      { label: 'Height', value: '15.1 Hands' },
      { label: 'Coat Color', value: 'Golden Bay' },
      { label: 'Stamina Index', value: 'Elite Desert Endurance Class' },
      { label: 'Microchip ID', value: '985141002349077' },
      { label: 'Registration', value: 'Indigenous Horse Breeders Guild' }
    ]
  },
  {
    id: 'noor',
    name: 'Noor',
    breed: 'Marwari',
    age: 4,
    ageDisplay: '4 Years',
    gender: 'Female',
    genderRole: 'Mare',
    height: '15.3 hands',
    color: 'Ethereal Silver White / Dapple Grey',
    price: '₹2,10,000',
    rawPrice: 210000,
    availability: 'Available',
    training: 'Foundational Dressage & Gentle Pleasure Riding',
    temperament: 'Gentle, Highly Sensitive, Graceful & Quiet',
    experience: '2 Years Professional Stride Development',
    lineage: 'Shekhawati Royal Stud x Roopmati',
    health: 'Prime Breeding & Riding Soundness, Microchipped',
    passportId: 'IND-EQ-2022-1109',
    description: 'A breathtaking 4-year-old silver-white Marwari mare. Noor is the embodiment of grace, gentleness, and refined historic beauty.',
    detailedStory: 'Noor carries the poise of the royal desert mares. Her silver-white dapple coat, arched neck, and soft intelligent eyes make her an absolute standout in any stable. She has been ridden by junior and adult riders with ease, showing a soft mouth and willing attitude. Her bloodlines make her an invaluable addition both as a pleasure saddle mare and future broodmare.',
    featured: true,
    images: [
      '/horses/noor/noor-1.jpg',
      '/horses/noor/noor-2.jpg',
      '/horses/noor/noor-3.jpg'
    ],
    videos: [
      {
        id: 'noor-v1',
        title: 'Noor Graceful Paddock Trot & Free Movement',
        src: 'https://www.youtube.com/shorts/YzdXcLFdsHQ?t=2&feature=share',
        duration: '0:40',
        description: 'Observation of gentle gait, harmonious strides, and peaceful pasture behavior.'
      }
    ],
    specs: [
      { label: 'Breed', value: 'Marwari Mare' },
      { label: 'Age', value: '4 Years' },
      { label: 'Gender', value: 'Female (Mare)' },
      { label: 'Height', value: '15.3 Hands' },
      { label: 'Coat Color', value: 'Silver Dapple White' },
      { label: 'Suitability', value: 'Pleasure Riding & Premium Breeding' },
      { label: 'Microchip ID', value: '985141002349312' },
      { label: 'Registration', value: 'Marwari Horse Registry' }
    ]
  },
  {
    id: 'badal',
    name: 'Badal',
    breed: 'Kathiawari',
    age: 7,
    ageDisplay: '7 Years',
    gender: 'Male',
    genderRole: 'Stallion',
    height: '15.0 hands',
    color: 'Deep Chocolate Brown',
    price: '₹3,80,000',
    rawPrice: 380000,
    availability: 'Booked',
    training: 'Master Level Reining & Obstacle Navigation',
    temperament: 'Bold, Focused, Steadfast & Courageous',
    experience: 'Multiple Regional Breed Champion & Exhibition Star',
    lineage: 'Rana Pride x Marugandh line',
    health: 'Peak Athletic Fitness, Complete Veterinary Clearance',
    passportId: 'IND-EQ-2019-0205',
    description: 'A champion 7-year-old Kathiawari stallion with unmatched power and presence. Currently reserved / booked by a prestigious private collector.',
    detailedStory: 'Badal is widely celebrated for his muscular build, deep chest, and bold carriage. Having secured top honors across national breed shows, Badal has proven himself as a sire of distinction and a premier saddle partner. Although currently booked, private viewings can be arranged by special request through our concierge.',
    featured: true,
    images: [
      '/horses/badal/badal-1.jpg',
      '/horses/badal/badal-2.jpg',
      '/horses/badal/badal-3.jpg'
    ],
    videos: [
      {
        id: 'badal-v1',
        title: 'Badal Masterclass Performance',
        src: 'https://www.youtube.com/shorts/Tr9rS9eGu64?t=2&feature=share',
        duration: '0:48',
        description: 'Exhibition of precision turns, sliding stops, and regal standing posture.'
      }
    ],
    specs: [
      { label: 'Breed', value: 'Kathiawari' },
      { label: 'Age', value: '7 Years' },
      { label: 'Gender', value: 'Male (Stallion)' },
      { label: 'Height', value: '15.0 Hands' },
      { label: 'Coat Color', value: 'Deep Chocolate Brown' },
      { label: 'Status', value: 'Currently Booked' },
      { label: 'Microchip ID', value: '985141002348821' },
      { label: 'Registration', value: 'All India Kathiawari Stud Book' }
    ]
  },
  {
    id: 'chetak',
    name: 'Chetak',
    breed: 'Kathiawari',
    age: 6,
    ageDisplay: '6 Years',
    gender: 'Male',
    genderRole: 'Stallion',
    height: '15.2 hands',
    color: 'Classic Dapple Grey Warhorse Line',
    price: '₹4,50,000',
    rawPrice: 450000,
    availability: 'Available',
    training: 'Historic Martial Equestrian Arts & Open Country Gallop',
    temperament: 'Fearless, Intensely Loyal, High Energy & Attentive',
    experience: 'Trained under traditional Indian cavalry reins',
    lineage: 'Historic Haldighati Bloodline Preservation',
    health: 'Superb Stamina, Clean Veterinary Certificate',
    passportId: 'IND-EQ-2020-0771',
    description: 'Named after the legendary warrior steed, Chetak is an extraordinary 6-year-old stallion with electrifying presence and aristocratic nobility.',
    detailedStory: 'Possessing remarkable speed, balance, and quick reflexes, Chetak has been conditioned across rugged terrains and sand dunes. He bonds deeply with his rider, responding to the slightest shift in weight. His striking dapple-grey coat and high tail carriage evoke the grand pages of Mewar history.',
    featured: true,
    images: [
      '/horses/chetak/chetak-1.jpg',
      '/horses/chetak/chetak-2.jpg',
      '/horses/chetak/chetak-3.jpg'
    ],
    videos: [
      {
        id: 'chetak-v1',
        title: 'Chetak Desert Gallop & Traditional Stride',
        src: 'https://www.youtube.com/shorts/kG45qQbUOow?t=1&feature=share',
        duration: '0:55',
        description: 'Open ground demonstration highlighting speed, rhythm, and fearless temperament.'
      }
    ],
    specs: [
      { label: 'Breed', value: 'Kathiawari Royal Line' },
      { label: 'Age', value: '6 Years' },
      { label: 'Gender', value: 'Male (Stallion)' },
      { label: 'Height', value: '15.2 Hands' },
      { label: 'Coat Color', value: 'Dapple Grey' },
      { label: 'Specialty', value: 'Endurance & Heritage Exhibition' },
      { label: 'Microchip ID', value: '985141002349889' },
      { label: 'Registration', value: 'Kathiawari Horse Association' }
    ]
  },
  {
    id: 'tara',
    name: 'Tara',
    breed: 'Marwari',
    age: 3,
    ageDisplay: '3 Years',
    gender: 'Female',
    genderRole: 'Filly',
    height: '15.0 hands',
    color: 'Warm Golden Chestnut with Flaxen Mane',
    price: '₹2,80,000',
    rawPrice: 280000,
    availability: 'In Training',
    training: 'Ground Schooling, Lungeing & Early Saddle Backing',
    temperament: 'Curious, Gentle, Inquisitive & Fast Learner',
    experience: 'Under Professional Academy Program',
    lineage: 'Udaipur Royal Stables Foundation Stock',
    health: 'Growing strongly, flawless legs, complete vaccination schedule',
    passportId: 'IND-EQ-2023-0144',
    description: 'A promising 3-year-old young Marwari filly. Tara displays exceptional conformation and an eager, willing heart, presently completing her young horse foundation.',
    detailedStory: 'Tara is our stable’s rising star. With curved lyre ears that accentuate her delicate facial contours, she commands admiration from every visitor. She is currently undergoing respectful, positive-reinforcement training in our indoor arena and will be ready for full saddle work soon. Pre-booking enquiries are welcome.',
    featured: false,
    images: [
      '/horses/tara/tara-1.jpg',
      '/horses/tara/tara-2.jpg',
      '/horses/tara/tara-3.jpg'
    ],
    // Tara has no video yet to fulfill requirement 29: "Video coming soon" placeholder!
    videos: [],
    specs: [
      { label: 'Breed', value: 'Marwari' },
      { label: 'Age', value: '3 Years' },
      { label: 'Gender', value: 'Female (Filly)' },
      { label: 'Height', value: '15.0 Hands (Growing)' },
      { label: 'Coat Color', value: 'Golden Chestnut' },
      { label: 'Program', value: 'Young Horse Academy Program' },
      { label: 'Microchip ID', value: '985141002350102' },
      { label: 'Registration', value: 'Marwari Horse Society' }
    ]
  }
];

// Helper functions ensuring centralized access
export function getHorseById(id: string): Horse | undefined {
  return HORSES_DATA.find((h) => h.id.toLowerCase() === id.toLowerCase());
}

export function getFeaturedHorses(): Horse[] {
  return HORSES_DATA.filter((h) => h.featured);
}

export function getSimilarHorses(currentId: string, limit: number = 3): Horse[] {
  return HORSES_DATA.filter((h) => h.id !== currentId).slice(0, limit);
}
