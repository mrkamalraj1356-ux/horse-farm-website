import fs from 'fs';
import path from 'path';
import {
  Horse,
  User,
  Enquiry,
  Booking,
  SellerSubmission,
  FarmhousePackage,
  HorseExperience,
  NotificationItem,
  WishlistItem,
  PaymentOrder,
  AuditLog
} from './types';

interface DatabaseSchema {
  horses: Horse[];
  users: User[];
  enquiries: Enquiry[];
  bookings: Booking[];
  sellerSubmissions: SellerSubmission[];
  farmhousePackages: FarmhousePackage[];
  experiences: HorseExperience[];
  notifications: NotificationItem[];
  wishlists: WishlistItem[];
  paymentOrders: PaymentOrder[];
  auditLogs: AuditLog[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const INITIAL_HORSES: Horse[] = [
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
    ],
    status: 'approved',
    viewsCount: 1420,
    likesCount: 89,
    enquiriesCount: 24,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
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
    ],
    status: 'approved',
    viewsCount: 1180,
    likesCount: 72,
    enquiriesCount: 18,
    createdAt: '2024-02-10T10:00:00.000Z',
    updatedAt: '2024-02-10T10:00:00.000Z'
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
    ],
    status: 'approved',
    viewsCount: 960,
    likesCount: 65,
    enquiriesCount: 15,
    createdAt: '2024-03-01T10:00:00.000Z',
    updatedAt: '2024-03-01T10:00:00.000Z'
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
    ],
    status: 'approved',
    viewsCount: 840,
    likesCount: 54,
    enquiriesCount: 11,
    createdAt: '2024-03-15T10:00:00.000Z',
    updatedAt: '2024-03-15T10:00:00.000Z'
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
    ],
    status: 'approved',
    viewsCount: 1350,
    likesCount: 94,
    enquiriesCount: 29,
    createdAt: '2024-04-01T10:00:00.000Z',
    updatedAt: '2024-04-01T10:00:00.000Z'
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
    ],
    status: 'approved',
    viewsCount: 520,
    likesCount: 38,
    enquiriesCount: 7,
    createdAt: '2024-04-15T10:00:00.000Z',
    updatedAt: '2024-04-15T10:00:00.000Z'
  }
];

const INITIAL_USERS: User[] = [
  {
    id: 'user-admin-1',
    name: 'Horse County Chief Director',
    phone: '+919829012345',
    email: 'admin@horsecounty.com',
    role: 'admin',
    city: 'Jodhpur, Rajasthan',
    status: 'active',
    passwordHash: 'HorseCounty@2025',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'user-seller-1',
    name: 'Thakur Ranveer Singh (Heritage Stud)',
    phone: '+919876543210',
    email: 'ranveer@studfarm.in',
    role: 'seller',
    city: 'Udaipur, Rajasthan',
    status: 'active',
    passwordHash: 'Seller@2025',
    createdAt: '2024-01-10T00:00:00.000Z'
  },
  {
    id: 'user-customer-1',
    name: 'Vikramaditya Rathore',
    phone: '+919988776655',
    email: 'vikram@estate.in',
    role: 'customer',
    city: 'Jaipur, Rajasthan',
    status: 'active',
    passwordHash: 'Buyer@2025',
    createdAt: '2024-02-01T00:00:00.000Z'
  }
];

const INITIAL_FARMHOUSE_PACKAGES: FarmhousePackage[] = [
  {
    id: 'pkg-day-retreat',
    name: 'Royal Sanctuary Day Pass & Stable Tour',
    tag: 'Day Experience',
    duration: '6 Hours (10:00 AM - 04:00 PM)',
    guestCapacity: 'Up to 10 Guests',
    price: '₹15,000',
    rawPrice: 15000,
    features: [
      'Private guided tour of Mahogany Stables',
      'Interaction with Marwari & Kathiawari Stallions',
      'Arena riding demonstration by Master Trainers',
      'Traditional Rajasthani high-tea and refreshments',
      'Complimentary estate photography session'
    ],
    description: 'Immerse yourself and your guests in the daily royal rhythm of Yog Maya Range. Experience horse grooming, breeding heritage explanations, and peaceful sanctuary hospitality.',
    image: '/farm/stables.jpg',
    popular: false
  },
  {
    id: 'pkg-royal-photoshoot',
    name: 'Heritage Pre-Wedding & Film Photoshoot',
    tag: 'Creative Production',
    duration: 'Full Day (06:00 AM - 07:00 PM)',
    guestCapacity: 'Crew & Guests (Up to 25)',
    price: '₹45,000',
    rawPrice: 45000,
    features: [
      'Exclusive access to 2 Champion Horses with handlers',
      'Desert trail & sand dune backdrop locations',
      'Heritage arena and stable courtyard access',
      'Air-conditioned VIP makeup & dressing villa',
      'Dedicated equine safety and positioning handlers'
    ],
    description: 'The definitive cinematic equestrian backdrop in Rajasthan. Capture breathtaking moments alongside purebred warhorse stallions under soft desert lighting.',
    image: '/farm/hero-bg.jpg',
    popular: true
  },
  {
    id: 'pkg-private-event',
    name: 'Yog Maya Range Private Event & Celebration',
    tag: 'Exclusive Estate',
    duration: 'Evening / Full Day',
    guestCapacity: '50 - 250 Guests',
    price: '₹1,20,000',
    rawPrice: 120000,
    features: [
      'Full private buyout of outdoor amphitheater lawn',
      'Royal horse procession welcome for guests',
      'Classical music & traditional Rajasthani ambiance setup',
      'Valet parking & 24/7 security concierge',
      'Catering coordination and guest lounge facilities'
    ],
    description: 'Host unforgettable private anniversaries, birthday celebrations, corporate retreats, and royal equestrian banquets at Yog Maya Range.',
    image: '/farm/heritage.jpg',
    popular: false
  }
];

const INITIAL_EXPERIENCES: HorseExperience[] = [
  {
    id: 'exp-dressage',
    title: 'Classical Dressage & Riding Masterclass',
    category: 'Equestrian Schooling',
    duration: '90 Minutes',
    price: '₹5,000 / rider',
    rawPrice: 5000,
    description: 'Private 1-on-1 instruction under certified classical masters on trained Marwari steeds in our silica sand arena.',
    inclusions: ['Equestrian helmet & safety gear', 'Arena schooling & seat balance analysis', 'Grooming & bonding introduction'],
    image: '/farm/arena.jpg',
    available: true
  },
  {
    id: 'exp-trail-ride',
    title: 'Sunset Desert Dune Trail Ride',
    category: 'Heritage Trail',
    duration: '2 Hours',
    price: '₹7,500 / rider',
    rawPrice: 7500,
    description: 'Guided cross-country trek traversing pristine golden sand dunes and indigenous wildlife trails at twilight.',
    inclusions: ['High-end leather saddle & bridle', 'Lead ranger & horse concierge escort', 'Sunset tea break at dune pavilion'],
    image: '/farm/riding.jpg',
    available: true
  },
  {
    id: 'exp-pedigree-consult',
    title: 'Stud Breeding & Pedigree Evaluation',
    category: 'Breeding Advisory',
    duration: '2 Hours',
    price: '₹10,000',
    rawPrice: 10000,
    description: 'In-depth consultation with our Chief Stud Director regarding mare selection, semen collection, and Marwari registry validation.',
    inclusions: ['Detailed 4-generation pedigree chart review', 'Veterinary soundness & genetic analysis', 'Private viewing of active breeding stallions'],
    image: '/horses/sultan/sultan-1.jpg',
    available: true
  }
];

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readDb(): DatabaseSchema {
  ensureDataDirectory();
  if (!fs.existsSync(DB_FILE)) {
    const initialDb: DatabaseSchema = {
      horses: INITIAL_HORSES,
      users: INITIAL_USERS,
      enquiries: [
        {
          id: 'enq-seed-1',
          refNumber: 'HC-ENQ-81920',
          horseId: 'sultan',
          horseName: 'Sultan',
          customerName: 'Yuvraj Digvijay Singh',
          mobileNumber: '+919829099887',
          whatsappNumber: '+919829099887',
          email: 'digvijay@rajasthanstud.in',
          city: 'Jaipur, Rajasthan',
          contactPreference: 'WhatsApp',
          experienceLevel: 'Experienced Rider',
          message: 'Interested in acquiring Sultan for royal procession and breeding program. Please share recent veterinary radiographs and schedule private trial.',
          status: 'In Discussion',
          notes: ['Called customer on Jan 18. Trial scheduled for next weekend.'],
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
        }
      ],
      bookings: [
        {
          id: 'bk-seed-1',
          bookingCode: 'HC-BK-40912',
          type: 'horse',
          targetId: 'rajveer',
          targetName: 'Rajveer',
          customerName: 'Kavita Singhania',
          mobileNumber: '+919920011223',
          whatsappNumber: '+919920011223',
          email: 'kavita@singhaniagroup.com',
          preferredDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
          timeSlot: 'Morning (09:00 AM - 12:00 PM)',
          guestsCount: 2,
          bookingPurpose: 'Private Viewing & Trial',
          paymentStatus: 'unpaid',
          status: 'confirmed',
          notes: ['Confirmed morning slot with stable master.'],
          createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      sellerSubmissions: [
        {
          id: 'sub-seed-1',
          refId: 'SELL-EQ-93810',
          sellerName: 'Rawat Gajendra Singh',
          mobileNumber: '+919829144332',
          email: 'gajendra@heritagefarms.in',
          city: 'Bikaner, Rajasthan',
          horseName: 'Kesari',
          breed: 'Marwari',
          age: 4,
          gender: 'Male',
          height: '15.3 hands',
          expectedPrice: '₹3,50,000',
          description: 'Purebred 4-year-old Marwari stallion with inward curved ears and gentle saddle training.',
          images: ['/horses/sultan/sultan-1.jpg'],
          status: 'pending',
          adminNotes: 'Awaiting on-site veterinary inspection before approval.',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
        }
      ],
      farmhousePackages: INITIAL_FARMHOUSE_PACKAGES,
      experiences: INITIAL_EXPERIENCES,
      notifications: [
        {
          id: 'notif-1',
          recipientRole: 'admin',
          title: 'New Horse Acquisition Enquiry',
          message: 'Yuvraj Digvijay Singh submitted an enquiry for Sultan.',
          type: 'enquiry',
          read: false,
          link: '/admin',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
        },
        {
          id: 'notif-2',
          recipientRole: 'admin',
          title: 'New Seller Consignment Submission',
          message: 'Rawat Gajendra Singh submitted horse "Kesari" for evaluation.',
          type: 'submission',
          read: false,
          link: '/admin',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        }
      ],
      wishlists: [],
      paymentOrders: [],
      auditLogs: [
        {
          id: 'audit-1',
          adminId: 'user-admin-1',
          adminEmail: 'admin@horsecounty.com',
          action: 'SYSTEM_INITIALIZED',
          targetType: 'SYSTEM',
          targetId: 'INIT',
          details: 'Horse County database initialized with certified horse stock and Yog Maya Range configurations.',
          createdAt: new Date().toISOString()
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Error reading database file, resetting to fallback:', err);
    return {
      horses: INITIAL_HORSES,
      users: INITIAL_USERS,
      enquiries: [],
      bookings: [],
      sellerSubmissions: [],
      farmhousePackages: INITIAL_FARMHOUSE_PACKAGES,
      experiences: INITIAL_EXPERIENCES,
      notifications: [],
      wishlists: [],
      paymentOrders: [],
      auditLogs: []
    };
  }
}

function writeDb(data: DatabaseSchema): void {
  ensureDataDirectory();
  const tmpFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmpFile, DB_FILE);
}

// ==========================================
// HORSE OPERATIONS
// ==========================================

export async function getHorses(filter?: {
  breed?: string;
  gender?: string;
  availability?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  status?: string;
  search?: string;
}): Promise<Horse[]> {
  const db = readDb();
  let list = db.horses;

  // Default to approved listings for public access unless specified
  if (filter?.status) {
    if (filter.status !== 'all') {
      list = list.filter((h) => h.status === filter.status);
    }
  } else {
    list = list.filter((h) => h.status === 'approved');
  }

  if (filter?.breed && filter.breed !== 'All') {
    list = list.filter((h) => h.breed.toLowerCase() === filter.breed?.toLowerCase());
  }

  if (filter?.gender && filter.gender !== 'All') {
    list = list.filter((h) => h.gender.toLowerCase() === filter.gender?.toLowerCase());
  }

  if (filter?.availability && filter.availability !== 'All') {
    list = list.filter((h) => h.availability === filter.availability);
  }

  if (filter?.featured !== undefined) {
    list = list.filter((h) => h.featured === filter.featured);
  }

  if (filter?.minPrice !== undefined) {
    list = list.filter((h) => h.rawPrice >= (filter.minPrice || 0));
  }

  if (filter?.maxPrice !== undefined && filter.maxPrice > 0) {
    list = list.filter((h) => h.rawPrice <= (filter.maxPrice || Infinity));
  }

  if (filter?.search && filter.search.trim() !== '') {
    const q = filter.search.toLowerCase().trim();
    list = list.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.breed.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.color.toLowerCase().includes(q) ||
        h.lineage.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getHorseById(id: string): Promise<Horse | null> {
  const db = readDb();
  const horse = db.horses.find((h) => h.id.toLowerCase() === id.toLowerCase());
  return horse || null;
}

export async function recordHorseView(id: string): Promise<number> {
  const db = readDb();
  const horseIndex = db.horses.findIndex((h) => h.id.toLowerCase() === id.toLowerCase());
  if (horseIndex !== -1) {
    db.horses[horseIndex].viewsCount = (db.horses[horseIndex].viewsCount || 0) + 1;
    writeDb(db);
    return db.horses[horseIndex].viewsCount;
  }
  return 0;
}

export async function toggleHorseLike(horseId: string, userId: string = 'guest'): Promise<{ liked: boolean; count: number }> {
  const db = readDb();
  const horseIndex = db.horses.findIndex((h) => h.id.toLowerCase() === horseId.toLowerCase());
  if (horseIndex === -1) return { liked: false, count: 0 };

  const existingWishlistIdx = db.wishlists.findIndex(
    (w) => w.horseId.toLowerCase() === horseId.toLowerCase() && w.userId === userId
  );

  let liked = false;
  if (existingWishlistIdx !== -1) {
    // Remove
    db.wishlists.splice(existingWishlistIdx, 1);
    db.horses[horseIndex].likesCount = Math.max(0, (db.horses[horseIndex].likesCount || 1) - 1);
    liked = false;
  } else {
    // Add
    db.wishlists.push({
      id: `wsh-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId,
      horseId,
      createdAt: new Date().toISOString()
    });
    db.horses[horseIndex].likesCount = (db.horses[horseIndex].likesCount || 0) + 1;
    liked = true;
  }

  writeDb(db);
  return { liked, count: db.horses[horseIndex].likesCount };
}

export async function isHorseLikedByUser(horseId: string, userId: string = 'guest'): Promise<boolean> {
  const db = readDb();
  return db.wishlists.some((w) => w.horseId.toLowerCase() === horseId.toLowerCase() && w.userId === userId);
}

export async function createHorse(data: Omit<Horse, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'likesCount' | 'enquiriesCount'> & { id?: string }): Promise<Horse> {
  const db = readDb();
  const id = data.id || data.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(1000 + Math.random() * 9000);
  const newHorse: Horse = {
    ...data,
    id,
    viewsCount: 0,
    likesCount: 0,
    enquiriesCount: 0,
    status: data.status || 'approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.horses.push(newHorse);
  writeDb(db);
  return newHorse;
}

export async function updateHorse(id: string, updates: Partial<Horse>): Promise<Horse | null> {
  const db = readDb();
  const index = db.horses.findIndex((h) => h.id.toLowerCase() === id.toLowerCase());
  if (index === -1) return null;

  db.horses[index] = {
    ...db.horses[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  writeDb(db);
  return db.horses[index];
}

export async function deleteHorse(id: string): Promise<boolean> {
  const db = readDb();
  const initialLen = db.horses.length;
  db.horses = db.horses.filter((h) => h.id.toLowerCase() !== id.toLowerCase());
  if (db.horses.length !== initialLen) {
    writeDb(db);
    return true;
  }
  return false;
}

// ==========================================
// ENQUIRY OPERATIONS
// ==========================================

export async function createEnquiry(data: Omit<Enquiry, 'id' | 'refNumber' | 'status' | 'notes' | 'createdAt' | 'updatedAt'>): Promise<Enquiry> {
  const db = readDb();
  const refNumber = `HC-ENQ-${Math.floor(10000 + Math.random() * 90000)}`;
  const newEnquiry: Enquiry = {
    ...data,
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    refNumber,
    status: 'New',
    notes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.enquiries.unshift(newEnquiry);

  // Increment horse enquiry counter if horse is selected
  if (data.horseId) {
    const hIdx = db.horses.findIndex((h) => h.id.toLowerCase() === data.horseId?.toLowerCase());
    if (hIdx !== -1) {
      db.horses[hIdx].enquiriesCount = (db.horses[hIdx].enquiriesCount || 0) + 1;
    }
  }

  // Create admin notification
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    recipientRole: 'admin',
    title: 'New Horse Acquisition Enquiry',
    message: `${data.customerName} submitted an enquiry (${refNumber}) for ${data.horseName || 'General Collection'}.`,
    type: 'enquiry',
    read: false,
    link: '/admin',
    createdAt: new Date().toISOString()
  });

  writeDb(db);
  return newEnquiry;
}

export async function getEnquiries(filter?: { status?: string; horseId?: string; search?: string }): Promise<Enquiry[]> {
  const db = readDb();
  let list = db.enquiries;

  if (filter?.status && filter.status !== 'All') {
    list = list.filter((e) => e.status.toLowerCase() === filter.status?.toLowerCase());
  }

  if (filter?.horseId) {
    list = list.filter((e) => e.horseId?.toLowerCase() === filter.horseId?.toLowerCase());
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.customerName.toLowerCase().includes(q) ||
        e.mobileNumber.includes(q) ||
        e.refNumber.toLowerCase().includes(q) ||
        (e.horseName && e.horseName.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status'], note?: string): Promise<Enquiry | null> {
  const db = readDb();
  const index = db.enquiries.findIndex((e) => e.id === id || e.refNumber === id);
  if (index === -1) return null;

  db.enquiries[index].status = status;
  db.enquiries[index].updatedAt = new Date().toISOString();
  if (note) {
    db.enquiries[index].notes.push(`[${new Date().toLocaleDateString()}] ${note}`);
  }

  writeDb(db);
  return db.enquiries[index];
}

// ==========================================
// BOOKING OPERATIONS
// ==========================================

export async function createBooking(data: Omit<Booking, 'id' | 'bookingCode' | 'status' | 'notes' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
  const db = readDb();
  const bookingCode = `HC-BK-${Math.floor(100000 + Math.random() * 900000)}`;
  const newBooking: Booking = {
    ...data,
    id: `bk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    bookingCode,
    status: 'pending',
    notes: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.bookings.unshift(newBooking);

  // Notification for admin
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    recipientRole: 'admin',
    title: `New Booking Request (${bookingCode})`,
    message: `${data.customerName} requested a booking for ${data.targetName} on ${data.preferredDate}.`,
    type: 'booking',
    read: false,
    link: '/admin',
    createdAt: new Date().toISOString()
  });

  writeDb(db);
  return newBooking;
}

export async function getBookings(filter?: { type?: string; status?: string; search?: string }): Promise<Booking[]> {
  const db = readDb();
  let list = db.bookings;

  if (filter?.type && filter.type !== 'All') {
    list = list.filter((b) => b.type === filter.type);
  }

  if (filter?.status && filter.status !== 'All') {
    list = list.filter((b) => b.status === filter.status);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (b) =>
        b.customerName.toLowerCase().includes(q) ||
        b.mobileNumber.includes(q) ||
        b.bookingCode.toLowerCase().includes(q) ||
        b.targetName.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function updateBookingStatus(
  id: string,
  status: Booking['status'],
  paymentStatus?: Booking['paymentStatus'],
  note?: string
): Promise<Booking | null> {
  const db = readDb();
  const index = db.bookings.findIndex((b) => b.id === id || b.bookingCode === id);
  if (index === -1) return null;

  db.bookings[index].status = status;
  if (paymentStatus) {
    db.bookings[index].paymentStatus = paymentStatus;
  }
  if (note) {
    db.bookings[index].notes.push(`[${new Date().toLocaleDateString()}] ${note}`);
  }
  db.bookings[index].updatedAt = new Date().toISOString();

  writeDb(db);
  return db.bookings[index];
}

// ==========================================
// SELLER SUBMISSIONS OPERATIONS
// ==========================================

export async function createSellerSubmission(data: Omit<SellerSubmission, 'id' | 'refId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<SellerSubmission> {
  const db = readDb();
  const refId = `SELL-EQ-${Math.floor(10000 + Math.random() * 90000)}`;
  const newSub: SellerSubmission = {
    ...data,
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    refId,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.sellerSubmissions.unshift(newSub);

  // Admin Notification
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    recipientRole: 'admin',
    title: 'New Horse Consignment For Review',
    message: `${data.sellerName} submitted "${data.horseName}" (${refId}) for sale valuation.`,
    type: 'submission',
    read: false,
    link: '/admin',
    createdAt: new Date().toISOString()
  });

  writeDb(db);
  return newSub;
}

export async function getSellerSubmissions(filter?: { status?: string; sellerId?: string }): Promise<SellerSubmission[]> {
  const db = readDb();
  let list = db.sellerSubmissions;

  if (filter?.status && filter.status !== 'All') {
    list = list.filter((s) => s.status === filter.status);
  }

  if (filter?.sellerId) {
    list = list.filter((s) => s.sellerId === filter.sellerId);
  }

  return list;
}

export async function reviewSellerSubmission(
  id: string,
  status: 'approved' | 'rejected',
  adminNotes?: string,
  adminId: string = 'user-admin-1'
): Promise<SellerSubmission | null> {
  const db = readDb();
  const index = db.sellerSubmissions.findIndex((s) => s.id === id || s.refId === id);
  if (index === -1) return null;

  db.sellerSubmissions[index].status = status;
  db.sellerSubmissions[index].adminNotes = adminNotes || db.sellerSubmissions[index].adminNotes;
  db.sellerSubmissions[index].reviewedBy = adminId;
  db.sellerSubmissions[index].reviewedAt = new Date().toISOString();
  db.sellerSubmissions[index].updatedAt = new Date().toISOString();

  // If approved, automatically convert to active horse listing
  if (status === 'approved') {
    const sub = db.sellerSubmissions[index];
    const horseId = sub.horseName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(100 + Math.random() * 900);

    const newHorse: Horse = {
      id: horseId,
      name: sub.horseName,
      breed: sub.breed,
      age: sub.age,
      ageDisplay: `${sub.age} Years`,
      gender: sub.gender,
      genderRole: sub.gender === 'Male' ? 'Stallion' : 'Mare',
      height: sub.height || '15.2 hands',
      color: 'Indigenous Standard',
      price: sub.expectedPrice,
      rawPrice: parseInt(sub.expectedPrice.replace(/[^0-9]/g, '')) || 300000,
      availability: 'Available',
      training: 'Verified by Stud Evaluation Board',
      temperament: 'Calm & Responsive',
      experience: 'Private Stud Consignment',
      lineage: 'Indigenous Certified Bloodline',
      health: 'Veterinary Clearance Passed',
      passportId: `IND-EQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      description: sub.description,
      detailedStory: sub.description,
      featured: false,
      images: sub.images && sub.images.length > 0 ? sub.images : ['/horses/sultan/sultan-1.jpg'],
      videos: sub.videoUrl
        ? [{ id: `${horseId}-v1`, title: `${sub.horseName} Showcase`, src: sub.videoUrl, duration: '1:00' }]
        : [],
      specs: [
        { label: 'Breed', value: sub.breed },
        { label: 'Age', value: `${sub.age} Years` },
        { label: 'Gender', value: sub.gender },
        { label: 'Height', value: sub.height }
      ],
      sellerId: sub.sellerId,
      sellerName: sub.sellerName,
      status: 'approved',
      viewsCount: 0,
      likesCount: 0,
      enquiriesCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.horses.push(newHorse);
  }

  writeDb(db);
  return db.sellerSubmissions[index];
}

// ==========================================
// USER & AUTH OPERATIONS
// ==========================================

export async function getUsers(): Promise<User[]> {
  const db = readDb();
  return db.users;
}

export async function getUserById(id: string): Promise<User | null> {
  const db = readDb();
  return db.users.find((u) => u.id === id) || null;
}

export async function getUserByEmailOrPhone(identifier: string): Promise<User | null> {
  const db = readDb();
  const clean = identifier.trim().toLowerCase();
  const user = db.users.find(
    (u) =>
      u.email.toLowerCase() === clean ||
      u.phone.replace(/[^0-9]/g, '') === identifier.replace(/[^0-9]/g, '')
  );
  return user || null;
}

export async function createUser(data: Omit<User, 'id' | 'status' | 'createdAt'>): Promise<User> {
  const db = readDb();
  const newUser: User = {
    ...data,
    id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: 'active',
    createdAt: new Date().toISOString()
  };
  db.users.push(newUser);
  writeDb(db);
  return newUser;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const db = readDb();
  const index = db.users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  db.users[index] = {
    ...db.users[index],
    ...updates
  };

  writeDb(db);
  return db.users[index];
}

// ==========================================
// PACKAGES & EXPERIENCES
// ==========================================

export async function getFarmhousePackages(): Promise<FarmhousePackage[]> {
  const db = readDb();
  return db.farmhousePackages;
}

export async function getExperiences(): Promise<HorseExperience[]> {
  const db = readDb();
  return db.experiences;
}

// ==========================================
// NOTIFICATIONS & AUDIT
// ==========================================

export async function getNotifications(role?: string): Promise<NotificationItem[]> {
  const db = readDb();
  if (role) {
    return db.notifications.filter((n) => !n.recipientRole || n.recipientRole === role);
  }
  return db.notifications;
}

export async function markNotificationRead(id: string): Promise<boolean> {
  const db = readDb();
  const index = db.notifications.findIndex((n) => n.id === id);
  if (index !== -1) {
    db.notifications[index].read = true;
    writeDb(db);
    return true;
  }
  return false;
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  const db = readDb();
  return db.auditLogs;
}

export async function logAdminAction(adminEmail: string, action: string, targetType: string, targetId: string, details: string): Promise<void> {
  const db = readDb();
  db.auditLogs.unshift({
    id: `audit-${Date.now()}`,
    adminId: 'admin',
    adminEmail,
    action,
    targetType,
    targetId,
    details,
    createdAt: new Date().toISOString()
  });
  writeDb(db);
}

// ==========================================
// ADMIN DASHBOARD STATS
// ==========================================

export async function getAdminStats() {
  const db = readDb();
  const activeHorses = db.horses.filter((h) => h.status === 'approved').length;
  const pendingSubmissions = db.sellerSubmissions.filter((s) => s.status === 'pending').length;
  const totalEnquiries = db.enquiries.length;
  const newEnquiries = db.enquiries.filter((e) => e.status === 'New').length;
  const totalBookings = db.bookings.length;
  const pendingBookings = db.bookings.filter((b) => b.status === 'pending').length;
  const totalUsers = db.users.length;
  const totalViews = db.horses.reduce((acc, h) => acc + (h.viewsCount || 0), 0);
  const totalLikes = db.horses.reduce((acc, h) => acc + (h.likesCount || 0), 0);

  return {
    activeHorses,
    pendingSubmissions,
    totalEnquiries,
    newEnquiries,
    totalBookings,
    pendingBookings,
    totalUsers,
    totalViews,
    totalLikes
  };
}
