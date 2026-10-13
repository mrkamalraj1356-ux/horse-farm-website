export type BreedType = 'Marwari' | 'Kathiawari' | 'Thoroughbred' | 'Indigenous Other';
export type GenderType = 'Male' | 'Female';
export type GenderRoleType = 'Stallion' | 'Mare' | 'Colt' | 'Filly' | 'Gelding';
export type HorseAvailability = 'Available' | 'Booked' | 'In Training' | 'Sold';
export type ListingStatus = 'approved' | 'pending' | 'rejected' | 'archived';

export interface HorseVideo {
  id: string;
  title: string;
  src: string;
  duration?: string;
  description?: string;
}

export interface HorseSpec {
  label: string;
  value: string;
}

export interface Horse {
  id: string;
  name: string;
  breed: BreedType;
  age: number;
  ageDisplay: string;
  gender: GenderType;
  genderRole: GenderRoleType;
  height: string;
  color: string;
  price: string;
  rawPrice: number;
  availability: HorseAvailability;
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
  videos: HorseVideo[];
  specs: HorseSpec[];
  sellerId?: string;
  sellerName?: string;
  status: ListingStatus;
  viewsCount: number;
  likesCount: number;
  enquiriesCount: number;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'customer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  city?: string;
  status: 'active' | 'suspended';
  passwordHash?: string;
  createdAt: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'In Discussion' | 'Confirmed' | 'Closed' | 'Cancelled';

export interface Enquiry {
  id: string;
  refNumber: string;
  horseId?: string;
  horseName?: string;
  customerName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  email: string;
  city: string;
  contactPreference: 'WhatsApp' | 'Phone Call' | 'Email';
  experienceLevel?: string;
  message: string;
  status: EnquiryStatus;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

export type BookingType = 'horse' | 'farmhouse' | 'experience' | 'event';
export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'refunded';

export interface Booking {
  id: string;
  bookingCode: string;
  type: BookingType;
  targetId?: string;
  targetName: string;
  customerName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  email: string;
  preferredDate: string;
  timeSlot: string;
  guestsCount?: number;
  bookingPurpose: string;
  packageId?: string;
  packageName?: string;
  totalAmount?: number;
  advanceAmount?: number;
  paymentStatus: PaymentStatus;
  paymentRef?: string;
  message?: string;
  status: BookingStatus;
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SellerSubmission {
  id: string;
  refId: string;
  sellerId?: string;
  sellerName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  email: string;
  city: string;
  horseName: string;
  breed: BreedType;
  age: number;
  gender: GenderType;
  height: string;
  expectedPrice: string;
  description: string;
  images: string[];
  videoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FarmhousePackage {
  id: string;
  name: string;
  tag: string;
  duration: string;
  guestCapacity: string;
  price: string;
  rawPrice: number;
  features: string[];
  description: string;
  image: string;
  popular?: boolean;
}

export interface HorseExperience {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  rawPrice: number;
  description: string;
  inclusions: string[];
  image: string;
  available: boolean;
}

export interface NotificationItem {
  id: string;
  recipientRole?: UserRole;
  recipientUserId?: string;
  title: string;
  message: string;
  type: 'enquiry' | 'booking' | 'submission' | 'approval' | 'system';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  horseId: string;
  createdAt: string;
}

export interface PaymentOrder {
  id: string;
  orderId: string;
  bookingId?: string;
  enquiryId?: string;
  amount: number;
  currency: string;
  status: 'created' | 'attempted' | 'paid' | 'failed';
  provider: 'razorpay' | 'stripe' | 'manual';
  paymentId?: string;
  signature?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  createdAt: string;
}
