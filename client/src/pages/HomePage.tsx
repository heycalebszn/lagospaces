import { useState } from 'react';
import { PropertyCard } from '../components/property';

const MOCK_PROPERTIES = [
  {
    id: '1',
    title: 'Modern Apartment with Ocean View',
    location: 'Victoria Island, Lagos',
    price: 450000,
    currency: '₦',
    images: [
      { id: '101', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80', alt: 'Living room' },
      { id: '102', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80', alt: 'Kitchen' },
      { id: '103', url: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1000&q=80', alt: 'Bedroom' },
    ],
    note: 'Stunning ocean view apartment with modern amenities, perfect for young professionals.',
    isVerified: true,
    isFeatured: true,
    owner: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isVerified: true,
    },
  },
  {
    id: '2',
    title: 'Cozy 2-Bedroom Flat',
    location: 'Lekki Phase 1, Lagos',
    price: 320000,
    currency: '₦',
    images: [
      { id: '201', url: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb', alt: 'Living room' },
      { id: '202', url: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28', alt: 'Kitchen' },
    ],
    note: 'Comfortable flat in a secure compound with 24/7 power and water supply.',
    isVerified: true,
    owner: {
      id: 'user2',
      name: 'David Okafor',
      isVerified: false,
    },
  },
  {
    id: '3',
    title: 'Luxury Penthouse with Pool',
    location: 'Ikoyi, Lagos',
    price: 950000,
    currency: '₦',
    images: [
      { id: '301', url: 'https://images.unsplash.com/photo-1600607687644-a6ed68e3f2ce', alt: 'Living room' },
      { id: '302', url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115', alt: 'Kitchen' },
      { id: '303', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea', alt: 'Bedroom' },
    ],
    note: 'Exquisite penthouse with private pool and breathtaking city views.',
    isFeatured: true,
    owner: {
      id: 'user3',
      name: 'Jennifer Balogun',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      isVerified: true,
    },
  },
  {
    id: '4',
    title: 'Spacious 3-Bedroom Apartment',
    location: 'Ikeja GRA, Lagos',
    price: 550000,
    currency: '₦',
    images: [
      { id: '401', url: 'https://images.unsplash.com/photo-1617104678098-de229db51b21', alt: 'Living room' },
      { id: '402', url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11', alt: 'Kitchen' },
    ],
    note: 'Family-friendly apartment in a quiet neighborhood with excellent amenities.',
    isVerified: true,
    owner: {
      id: 'user4',
      name: 'Michael Adeyemi',
      isVerified: true,
    },
  },
  {
    id: '5',
    title: 'Stylish Studio Apartment',
    location: 'Yaba, Lagos',
    price: 250000,
    currency: '₦',
    images: [
      { id: '501', url: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30', alt: 'Living room' },
      { id: '502', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', alt: 'Kitchen' },
    ],
    note: 'Perfect for students or young professionals, located close to tech hubs.',
    owner: {
      id: 'user5',
      name: 'Tolu Akande',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      isVerified: false,
    },
  },
  {
    id: '6',
    title: 'Waterfront 4-Bedroom Villa',
    location: 'Banana Island, Lagos',
    price: 1200000,
    currency: '₦',
    images: [
      { id: '601', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227', alt: 'Exterior' },
      { id: '602', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', alt: 'Living room' },
      { id: '603', url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4', alt: 'Pool' },
    ],
    note: 'Exclusive waterfront villa with private garden and boat dock.',
    isVerified: true,
    isFeatured: true,
    owner: {
      id: 'user6',
      name: 'Alex Okonkwo',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      isVerified: true,
    },
  },
];

const HomePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'feed'>('grid');
  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-screen max-h-[700px] bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1800&q=80" 
          alt="Luxury waterfront property" 
          className="w-full h-full object-cover object-center scale-105 motion-safe:animate-[pulse_15s_ease-in-out_infinite]"
          loading="eager"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start">
        {/* Main Content */}
        <div className="max-w-3xl">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 animate-fade-in border border-white/10">
            <span className="text-white/90 font-semibold">LAGOSPACES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-white/70 text-sm">Verified Direct Listings</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 animate-fade-in">
            Find Your Home,<br />
            <span className="text-emerald-400">Direct from Owners</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            LAGOSPACES eliminates middlemen by directly connecting you with verified property owners. Find your perfect space in Lagos without agent fees.
          </p>
        </div>
        
        {/* Search Panel */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Search Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Location Filter */}
            <div className="p-4 lg:border-r border-white/10">
              <label htmlFor="location" className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-400">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Location
              </label>
              <select 
                id="location" 
                name="location" 
                className="w-full bg-white/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="" className="bg-slate-800 text-white">All Locations</option>
                <option value="lekki" className="bg-slate-800 text-white">Lekki</option>
                <option value="ikoyi" className="bg-slate-800 text-white">Ikoyi</option>
                <option value="vi" className="bg-slate-800 text-white">Victoria Island</option>
                <option value="ikeja" className="bg-slate-800 text-white">Ikeja</option>
                <option value="yaba" className="bg-slate-800 text-white">Yaba</option>
              </select>
            </div>
            
            {/* Property Type Filter */}
            <div className="p-4 border-t lg:border-t-0 lg:border-r border-white/10">
              <label htmlFor="type" className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-400">
                  <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                  <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
                </svg>
                Property Type
              </label>
              <select 
                id="type" 
                name="type" 
                className="w-full bg-white/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="" className="bg-slate-800 text-white">All Types</option>
                <option value="apartment" className="bg-slate-800 text-white">Apartment</option>
                <option value="house" className="bg-slate-800 text-white">House</option>
                <option value="villa" className="bg-slate-800 text-white">Villa</option>
                <option value="studio" className="bg-slate-800 text-white">Studio</option>
                <option value="land" className="bg-slate-800 text-white">Land</option>
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div className="p-4 border-t lg:border-t-0 border-white/10">
              <label htmlFor="price" className="flex items-center gap-2 text-sm font-medium text-white/90 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-400">
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                </svg>
                Price Range
              </label>
              <select 
                id="price" 
                name="price" 
                className="w-full bg-white/20 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="" className="bg-slate-800 text-white">Any Price</option>
                <option value="0-300000" className="bg-slate-800 text-white">₦0 - ₦300,000</option>
                <option value="300000-500000" className="bg-slate-800 text-white">₦300,000 - ₦500,000</option>
                <option value="500000-800000" className="bg-slate-800 text-white">₦500,000 - ₦800,000</option>
                <option value="800000-" className="bg-slate-800 text-white">₦800,000+</option>
              </select>
            </div>
          </div>
          
          {/* Search Button */}
          <div className="p-4 bg-emerald-500/20 border-t border-white/10">
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              Search Properties
            </button>
          </div>
        </div>
        
        {/* Benefits Badges */}
        <div className="flex flex-wrap gap-3 mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-400">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-sm font-medium">Verified Owners</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            <span className="text-white text-sm font-medium">No Agent Fees</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-white text-sm font-medium">Secure Payments</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white text-sm font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
      
      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 mb-16 mt-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-[rgb(var(--color-secondary-900))]">Explore Properties</h2>
            <p className="text-[rgb(var(--color-secondary-500))]">Direct from verified property owners in Lagos</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg shadow-sm border border-[rgb(var(--color-secondary-100))]">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-[rgb(var(--color-primary-100))] text-[rgb(var(--color-primary-800))]' 
                  : 'hover:bg-[rgb(var(--color-secondary-50))] text-[rgb(var(--color-secondary-600))]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
              Grid
            </button>
            <button
              onClick={() => setViewMode('feed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'feed' 
                  ? 'bg-[rgb(var(--color-primary-100))] text-[rgb(var(--color-primary-800))]' 
                  : 'hover:bg-[rgb(var(--color-secondary-50))] text-[rgb(var(--color-secondary-600))]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>
              Feed
            </button>
          </div>
        </div>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PROPERTIES.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {MOCK_PROPERTIES.map((property) => (
              <div key={property.id} className="max-w-4xl mx-auto">
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <button className="btn-secondary px-6 py-3">
            Load More Properties
          </button>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gradient-to-br from-[rgb(var(--color-accent-600))] to-[rgb(var(--color-accent-700))] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">Are you a Property Owner?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-[rgb(var(--color-accent-100))]">
            List your property on LAGOSPACES and connect directly with verified tenants. No more dealing with agents or payment delays.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-[rgb(var(--color-accent-700))] hover:bg-[rgb(var(--color-accent-50))] px-8 py-3">
              Post Your Property
            </button>
            <button className="btn bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3">
              Learn About Verification
            </button>
          </div>
        </div>
      </section>
      
      {/* New How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-[rgb(var(--color-secondary-900))] mb-4">How LAGOSPACES Works</h2>
          <p className="text-[rgb(var(--color-secondary-500))] max-w-2xl mx-auto">
            Our platform connects verified landlords with serious tenants, eliminating middlemen and reducing costs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-[rgb(var(--color-secondary-100))]">
            <div className="w-12 h-12 bg-[rgb(var(--color-primary-100))] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[rgb(var(--color-primary-600))]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[rgb(var(--color-secondary-900))] mb-2">1. Verified Identities</h3>
            <p className="text-[rgb(var(--color-secondary-600))]">
              Both landlords and tenants undergo ID verification with government-issued documents to ensure security and trust.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-[rgb(var(--color-secondary-100))]">
            <div className="w-12 h-12 bg-[rgb(var(--color-primary-100))] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[rgb(var(--color-primary-600))]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[rgb(var(--color-secondary-900))] mb-2">2. Direct Communication</h3>
            <p className="text-[rgb(var(--color-secondary-600))]">
              Chat directly with property owners, schedule viewings, and negotiate terms without paying agent fees.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-[rgb(var(--color-secondary-100))]">
            <div className="w-12 h-12 bg-[rgb(var(--color-primary-100))] rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[rgb(var(--color-primary-600))]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[rgb(var(--color-secondary-900))] mb-2">3. Secure Payments</h3>
            <p className="text-[rgb(var(--color-secondary-600))]">
              Small refundable booking fees to deter unserious inquiries and escrow system for rent deposits that protect both parties.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 