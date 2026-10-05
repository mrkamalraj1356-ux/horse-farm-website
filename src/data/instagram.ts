export interface InstagramPost {
  id: string;
  type: 'image' | 'reel';
  mediaUrl: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  caption: string;
  date: string;
  horseTag?: string;
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    type: 'reel',
    mediaUrl: '/horses/sultan/sultan-1.jpg',
    videoUrl: '/horses/sultan/sultan-1.mp4',
    likes: 2480,
    comments: 119,
    caption: 'Sultan showing off his majestic trot at golden hour. The curved ears of the Marwari never fail to mesmerize. 👑🐎 #MarwariHorse #RoyalMarwar #Sultan #EquestrianLife',
    date: '2 hours ago',
    horseTag: 'Sultan'
  },
  {
    id: 'post-2',
    type: 'image',
    mediaUrl: '/horses/noor/noor-1.jpg',
    likes: 3120,
    comments: 142,
    caption: 'Pure grace in silver white. Noor basking in the morning breeze of the Rajasthan sanctuary. ✨ #Noor #EquineBeauty #WhiteMare #Equestrian',
    date: '1 day ago',
    horseTag: 'Noor'
  },
  {
    id: 'post-3',
    type: 'reel',
    mediaUrl: '/horses/rajveer/rajveer-1.jpg',
    videoUrl: '/horses/rajveer/rajveer-1.mp4',
    likes: 1890,
    comments: 87,
    caption: 'Speed, stamina, and desert heart. Rajveer in full action across our sand track. 🏜️⚡ #Kathiawari #Rajveer #DesertSteed',
    date: '3 days ago',
    horseTag: 'Rajveer'
  },
  {
    id: 'post-4',
    type: 'image',
    mediaUrl: '/farm/stables.jpg',
    likes: 2750,
    comments: 94,
    caption: 'Behind the scenes: Night routine in our climate-regulated mahogany stables. Quiet moments before rest. 🌙 #StableLife #HorseCare #LuxuryFarm',
    date: '4 days ago'
  },
  {
    id: 'post-5',
    type: 'reel',
    mediaUrl: '/horses/chetak/chetak-1.jpg',
    videoUrl: '/horses/chetak/chetak-1.mp4',
    likes: 4210,
    comments: 205,
    caption: 'A stallion worthy of kings. Chetak demonstrating power and courage during morning exercise. 🛡️🐎 #Chetak #HeritageBreeding #WarriorLineage',
    date: '5 days ago',
    horseTag: 'Chetak'
  },
  {
    id: 'post-6',
    type: 'image',
    mediaUrl: '/farm/riding.jpg',
    likes: 1980,
    comments: 63,
    caption: 'Riding is an art of soft whispers and unspoken trust. Classical dressage training session. 🌿 #ClassicalDressage #Equitation #Harmony',
    date: '1 week ago'
  }
];
