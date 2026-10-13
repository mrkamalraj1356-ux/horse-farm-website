'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Horse, Enquiry, Booking, SellerSubmission, User, FarmhousePackage } from '@/lib/types';
import {
  Shield,
  Tag,
  Users,
  MessageSquare,
  Calendar,
  Eye,
  Heart,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Search,
  Building2,
  FileText,
  Upload,
  Award,
  X
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'horses' | 'submissions' | 'enquiries' | 'bookings' | 'users' | 'packages'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [submissions, setSubmissions] = useState<SellerSubmission[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Adding / Editing Horse
  const [horseModalOpen, setHorseModalOpen] = useState(false);
  const [editingHorse, setEditingHorse] = useState<Horse | null>(null);
  const [horseForm, setHorseForm] = useState({
    name: '',
    breed: 'Marwari' as Horse['breed'],
    age: 5,
    gender: 'Male' as Horse['gender'],
    genderRole: 'Stallion' as Horse['genderRole'],
    height: '15.3 hands',
    color: 'Jet Black',
    price: '₹3,00,000',
    rawPrice: 300000,
    availability: 'Available' as Horse['availability'],
    training: 'Classical Dressage & Procession Trained',
    temperament: 'Calm & Spirited',
    experience: '3 Years Professional Stride Development',
    lineage: 'Royal Rajput Stud Stock',
    health: '100% Sound, Clean Radiographs',
    passportId: '',
    description: '',
    detailedStory: '',
    featured: true,
    images: ['/horses/sultan/sultan-1.jpg'],
    videoUrl: ''
  });

  // Review Submissions Modal
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<SellerSubmission | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, horsesRes, subRes, enqRes, bkRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/horses?status=all'),
        fetch('/api/sell'),
        fetch('/api/enquiries'),
        fetch('/api/bookings')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (horsesRes.ok) {
        const d = await horsesRes.json();
        setHorses(d.horses || []);
      }
      if (subRes.ok) {
        const d = await subRes.json();
        setSubmissions(d.submissions || []);
      }
      if (enqRes.ok) {
        const d = await enqRes.json();
        setEnquiries(d.enquiries || []);
      }
      if (bkRes.ok) {
        const d = await bkRes.json();
        setBookings(d.bookings || []);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      loadAllData();
    }
  }, [user]);

  if (authLoading) {
    return <div className="pt-32 text-center text-gray-400">Verifying administrative credentials...</div>;
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="pt-28 pb-24 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full glass-card rounded-3xl p-8 border border-rose-500/40 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/15 border border-rose-500/40 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif mb-2">
            Restricted Admin Area
          </h2>
          <p className="text-xs text-gray-400 mb-6 leading-relaxed">
            This area requires server-side Administrator permissions. Please sign in with the Chief Stud Director credentials.
          </p>
          <Link
            href="/auth/login"
            className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] block"
          >
            Sign In with Admin Account
          </Link>
        </div>
      </div>
    );
  }

  // Horse CRUD handlers
  const handleSaveHorse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...horseForm,
        ageDisplay: `${horseForm.age} Years`,
        specs: [
          { label: 'Breed', value: horseForm.breed },
          { label: 'Age', value: `${horseForm.age} Years` },
          { label: 'Gender', value: horseForm.gender },
          { label: 'Height', value: horseForm.height },
          { label: 'Passport', value: horseForm.passportId || 'IND-EQ-VERIFIED' }
        ],
        videos: horseForm.videoUrl
          ? [{ id: `v-${Date.now()}`, title: `${horseForm.name} Motion`, src: horseForm.videoUrl, duration: '1:00' }]
          : []
      };

      if (editingHorse) {
        // Update
        const res = await fetch(`/api/horses/${editingHorse.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setHorseModalOpen(false);
          setEditingHorse(null);
          loadAllData();
        }
      } else {
        // Create
        const res = await fetch('/api/horses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          setHorseModalOpen(false);
          loadAllData();
        }
      }
    } catch (err) {
      console.error('Error saving horse:', err);
    }
  };

  const handleDeleteHorse = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this horse record?')) return;
    try {
      const res = await fetch(`/api/horses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadAllData();
      }
    } catch (err) {
      console.error('Error deleting horse:', err);
    }
  };

  // Submission review handler
  const handleReviewSubmission = async (status: 'approved' | 'rejected') => {
    if (!selectedSubmission) return;
    try {
      const res = await fetch(`/api/admin/submissions/${selectedSubmission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          adminNotes: adminNotes || `Consignment ${status} by stud evaluation director.`
        })
      });

      if (res.ok) {
        setReviewModalOpen(false);
        setSelectedSubmission(null);
        setAdminNotes('');
        loadAllData();
      }
    } catch (err) {
      console.error('Error reviewing submission:', err);
    }
  };

  // Enquiry status change handler
  const handleUpdateEnquiry = async (id: string, newStatus: Enquiry['status']) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note: `Status updated to ${newStatus}` })
      });
      if (res.ok) {
        loadAllData();
      }
    } catch (err) {
      console.error('Error updating enquiry:', err);
    }
  };

  // Booking status change handler
  const handleUpdateBooking = async (id: string, newStatus: Booking['status'], paymentStatus?: Booking['paymentStatus']) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, paymentStatus, note: `Booking updated to ${newStatus}` })
      });
      if (res.ok) {
        loadAllData();
      }
    } catch (err) {
      console.error('Error updating booking:', err);
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Executive Admin Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
              Horse County & Yog Maya Range Management
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Logged in as {user.name} ({user.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setEditingHorse(null);
                setHorseForm({
                  name: '',
                  breed: 'Marwari',
                  age: 5,
                  gender: 'Male',
                  genderRole: 'Stallion',
                  height: '15.3 hands',
                  color: 'Jet Black',
                  price: '₹3,00,000',
                  rawPrice: 300000,
                  availability: 'Available',
                  training: 'Classical Dressage Trained',
                  temperament: 'Calm & Spirited',
                  experience: '3 Years Under Saddle',
                  lineage: 'Royal Marwar Bloodline',
                  health: '100% Sound, Clean Vet Certificate',
                  passportId: `IND-EQ-${Date.now().toString().slice(-4)}`,
                  description: '',
                  detailedStory: '',
                  featured: true,
                  images: ['/horses/sultan/sultan-1.jpg'],
                  videoUrl: ''
                });
                setHorseModalOpen(true);
              }}
              className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] via-[#d4af37] to-[#aa8222] flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Horse Listing</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-4 border border-white/10 text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Active Horses</span>
            <span className="text-2xl font-black text-white font-serif">{stats?.activeHorses ?? horses.length}</span>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-amber-500/30 text-center">
            <span className="text-[10px] text-amber-300 uppercase tracking-wider block mb-1">Pending Sellers</span>
            <span className="text-2xl font-black text-amber-400 font-serif">{stats?.pendingSubmissions ?? submissions.filter(s => s.status === 'pending').length}</span>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-white/10 text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Total Enquiries</span>
            <span className="text-2xl font-black text-[#d4af37] font-serif">{stats?.totalEnquiries ?? enquiries.length}</span>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-white/10 text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Bookings</span>
            <span className="text-2xl font-black text-white font-serif">{stats?.totalBookings ?? bookings.length}</span>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-white/10 text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Total Views</span>
            <span className="text-2xl font-black text-white font-serif">{stats?.totalViews ?? 0}</span>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-white/10 text-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Registered Users</span>
            <span className="text-2xl font-black text-white font-serif">{stats?.totalUsers ?? 3}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10">
          {[
            { id: 'horses', label: `Horse Listings (${horses.length})`, icon: Award },
            { id: 'submissions', label: `Seller Consignments (${submissions.length})`, icon: Tag },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
            { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#d4af37] text-black font-bold shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: HORSE LISTINGS MANAGEMENT */}
        {activeTab === 'horses' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-serif">
                Horse Catalog Management
              </h3>
              <span className="text-xs text-gray-400">{horses.length} Total Records</span>
            </div>

            <div className="space-y-4">
              {horses.map((horse) => (
                <div
                  key={horse.id}
                  className="p-5 rounded-2xl bg-[#14161c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#d4af37]/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={horse.images?.[0] || `/horses/${horse.id}/${horse.id}-1.jpg`}
                      alt={horse.name}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-white font-serif">
                          {horse.name}
                        </h4>
                        <span className="text-xs text-[#d4af37] font-semibold">({horse.breed})</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          horse.availability === 'Available' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                        }`}>
                          {horse.availability}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 font-mono mt-1">
                        <div>Price: <span className="text-[#f3e5ab] font-bold">{horse.price}</span></div>
                        <div>Age: <span>{horse.ageDisplay || `${horse.age} Yrs`}</span></div>
                        <div>Views: <span>{horse.viewsCount || 0}</span></div>
                        <div>Likes: <span>{horse.likesCount || 0}</span></div>
                        <div>Enquiries: <span>{horse.enquiriesCount || 0}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/horses/${horse.id}`}
                      target="_blank"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white"
                      title="View Live Page"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingHorse(horse);
                        setHorseForm({
                          name: horse.name,
                          breed: horse.breed,
                          age: horse.age,
                          gender: horse.gender,
                          genderRole: horse.genderRole,
                          height: horse.height,
                          color: horse.color,
                          price: horse.price,
                          rawPrice: horse.rawPrice,
                          availability: horse.availability,
                          training: horse.training,
                          temperament: horse.temperament,
                          experience: horse.experience,
                          lineage: horse.lineage,
                          health: horse.health,
                          passportId: horse.passportId,
                          description: horse.description,
                          detailedStory: horse.detailedStory,
                          featured: horse.featured,
                          images: horse.images || ['/horses/sultan/sultan-1.jpg'],
                          videoUrl: horse.videos?.[0]?.src || ''
                        });
                        setHorseModalOpen(true);
                      }}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#d4af37]"
                      title="Edit Horse Details"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteHorse(horse.id)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-950/40 border border-white/10 text-rose-400"
                      title="Delete Horse"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SELLER CONSIGNMENTS REVIEW */}
        {activeTab === 'submissions' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-serif">
                Seller Submissions & Valuation Review
              </h3>
              <span className="text-xs text-gray-400">{submissions.length} Total</span>
            </div>

            <div className="space-y-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-[#14161c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={sub.images?.[0] || '/horses/sultan/sultan-1.jpg'}
                      alt={sub.horseName}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-white font-serif">
                          {sub.horseName}
                        </h4>
                        <span className="text-xs text-gray-400">({sub.breed})</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          sub.status === 'approved' ? 'bg-emerald-950 text-emerald-300' : sub.status === 'rejected' ? 'bg-rose-950 text-rose-300' : 'bg-amber-950 text-amber-300'
                        }`}>
                          {sub.status}
                        </span>
                      </div>

                      <div className="text-xs text-gray-300 font-mono mt-1 space-x-3">
                        <span>Seller: <strong className="text-white">{sub.sellerName}</strong> ({sub.mobileNumber})</span>
                        <span>Expected: <strong className="text-[#f3e5ab]">{sub.expectedPrice}</strong></span>
                      </div>

                      <p className="text-xs text-gray-400 mt-2 line-clamp-1">{sub.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {sub.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSubmission(sub);
                            setReviewModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37] cursor-pointer"
                        >
                          Review & Publish
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRIES MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-serif">
                Acquisition Enquiries
              </h3>
              <span className="text-xs text-gray-400">{enquiries.length} Enquiries</span>
            </div>

            <div className="space-y-4">
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-5 rounded-2xl bg-[#14161c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#d4af37] font-bold">
                        {enq.refNumber}
                      </span>
                      <span className="text-xs text-gray-400">{new Date(enq.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h4 className="text-base font-bold text-white font-serif">
                      {enq.customerName} — {enq.horseName || 'General Stud Enquiry'}
                    </h4>

                    <div className="text-xs text-gray-300 font-mono space-x-3">
                      <span>Phone: {enq.mobileNumber}</span>
                      <span>Email: {enq.email}</span>
                      <span>City: {enq.city}</span>
                    </div>

                    <p className="text-xs text-gray-300 font-light mt-1">{enq.message}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={enq.status}
                      onChange={(e) => handleUpdateEnquiry(enq.id, e.target.value as any)}
                      className="bg-[#0f1116] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Closed">Closed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white font-serif">
                Sanctuary & Farmhouse Bookings
              </h3>
              <span className="text-xs text-gray-400">{bookings.length} Bookings</span>
            </div>

            <div className="space-y-4">
              {bookings.map((bk) => (
                <div
                  key={bk.id}
                  className="p-5 rounded-2xl bg-[#14161c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#d4af37] font-bold">
                        {bk.bookingCode}
                      </span>
                      <span className="text-xs text-gray-400 capitalize">{bk.type} Experience</span>
                    </div>

                    <h4 className="text-base font-bold text-white font-serif">
                      {bk.customerName} — {bk.targetName}
                    </h4>

                    <div className="text-xs text-gray-300 font-mono space-x-3">
                      <span>Date: <strong className="text-[#f3e5ab]">{bk.preferredDate}</strong></span>
                      <span>Slot: {bk.timeSlot}</span>
                      <span>Guests: {bk.guestsCount || 1}</span>
                      <span>Phone: {bk.mobileNumber}</span>
                    </div>

                    <p className="text-xs text-gray-400 font-light">{bk.bookingPurpose} {bk.message ? `• ${bk.message}` : ''}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={bk.status}
                      onChange={(e) => handleUpdateBooking(bk.id, e.target.value as any)}
                      className="bg-[#0f1116] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT HORSE */}
      {horseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="text-xl font-bold text-white font-serif">
                {editingHorse ? `Edit Horse: ${editingHorse.name}` : 'Add New Horse Listing'}
              </h3>
              <button
                type="button"
                onClick={() => setHorseModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHorse} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">Horse Name *</label>
                  <input
                    type="text"
                    required
                    value={horseForm.name}
                    onChange={(e) => setHorseForm({ ...horseForm, name: e.target.value })}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">Breed *</label>
                  <select
                    value={horseForm.breed}
                    onChange={(e) => setHorseForm({ ...horseForm, breed: e.target.value as any })}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Marwari">Purebred Marwari</option>
                    <option value="Kathiawari">Kathiawari</option>
                    <option value="Thoroughbred">Thoroughbred</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">Age (Years) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={horseForm.age}
                    onChange={(e) => setHorseForm({ ...horseForm, age: parseInt(e.target.value) || 4 })}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">Gender *</label>
                  <select
                    value={horseForm.gender}
                    onChange={(e) => setHorseForm({ ...horseForm, gender: e.target.value as any, genderRole: e.target.value === 'Male' ? 'Stallion' : 'Mare' })}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Male">Male (Stallion)</option>
                    <option value="Female">Female (Mare)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">Height *</label>
                  <input
                    type="text"
                    required
                    value={horseForm.height}
                    onChange={(e) => setHorseForm({ ...horseForm, height: e.target.value })}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">Price String *</label>
                  <input
                    type="text"
                    required
                    value={horseForm.price}
                    onChange={(e) => setHorseForm({ ...horseForm, price: e.target.value, rawPrice: parseInt(e.target.value.replace(/[^0-9]/g, '')) || 300000 })}
                    placeholder="₹3,20,000"
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">Availability *</label>
                  <select
                    value={horseForm.availability}
                    onChange={(e) => setHorseForm({ ...horseForm, availability: e.target.value as any })}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="In Training">In Training</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">Lineage & Pedigree</label>
                <input
                  type="text"
                  value={horseForm.lineage}
                  onChange={(e) => setHorseForm({ ...horseForm, lineage: e.target.value })}
                  placeholder="e.g. Veer Bahadur x Chandni Lineage"
                  className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={horseForm.description}
                  onChange={(e) => setHorseForm({ ...horseForm, description: e.target.value })}
                  className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setHorseModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
                >
                  Save Horse Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REVIEW SELLER SUBMISSION */}
      {reviewModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white font-serif mb-2">
              Review Consignment: {selectedSubmission.horseName}
            </h3>
            <p className="text-xs text-gray-300 mb-4">
              Submitted by {selectedSubmission.sellerName} ({selectedSubmission.mobileNumber}) • Expected: {selectedSubmission.expectedPrice}
            </p>

            <div className="mb-4">
              <label className="block text-xs uppercase text-gray-300 font-semibold mb-1">
                Admin Evaluation Notes
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Veterinary clearance verified, approved for public listing..."
                className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-gray-400"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleReviewSubmission('rejected')}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-rose-400 bg-rose-950/40 border border-rose-500/30"
              >
                Reject Consignment
              </button>
              <button
                type="button"
                onClick={() => handleReviewSubmission('approved')}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f3e5ab] to-[#d4af37]"
              >
                Approve & Publish Live
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
