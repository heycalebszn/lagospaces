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
      <section className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-r from-[rgb(var(--color-primary-900))] to-[rgb(var(--color-primary-700))] mb-8 md:mb-16 overflow-hidden">
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>
    <img 
      src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1800&q=80" 
      alt="Luxury waterfront property" 
      className="w-full h-full object-cover object-center scale-105 motion-safe:animate-[pulse_15s_ease-in-out_infinite]"
      loading="eager"
    />
  </div>
  
  <div className="relative z-20 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-6 animate-fade-in max-w-4xl">
      Connect Directly with Verified Property Owners
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-6 md:mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      LAGOSPACES eliminates middlemen by directly linking verified landlords with serious tenants. Find your perfect space in Lagos without agent fees.
    </p>
    
    <div className="w-full max-w-4xl glass-panel rounded-xl md:rounded-2xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-white/10">
        <div className="p-3 md:p-4">
          <label htmlFor="location" className="block text-xs md:text-sm font-medium text-white/80 mb-1 md:mb-2">
            Location
          </label>
          <select 
            id="location" 
            name="location" 
            className="input bg-white/80 text-[rgb(var(--color-secondary-900))] font-medium text-sm md:text-base w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="lekki">Lekki</option>
            <option value="ikoyi">Ikoyi</option>
            <option value="vi">Victoria Island</option>
            <option value="ikeja">Ikeja</option>
            <option value="yaba">Yaba</option>
          </select>
        </div>
        
        <div className="p-3 md:p-4 border-t md:border-t-0 border-white/10">
          <label htmlFor="type" className="block text-xs md:text-sm font-medium text-white/80 mb-1 md:mb-2">
            Property Type
          </label>
          <select 
            id="type" 
            name="type" 
            className="input bg-white/80 text-[rgb(var(--color-secondary-900))] font-medium text-sm md:text-base w-full"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
            <option value="land">Land</option>
          </select>
        </div>
        
        <div className="p-3 md:p-4 border-t md:border-t-0 border-white/10">
          <label htmlFor="price" className="block text-xs md:text-sm font-medium text-white/80 mb-1 md:mb-2">
            Price Range
          </label>
          <select 
            id="price" 
            name="price" 
            className="input bg-white/80 text-[rgb(var(--color-secondary-900))] font-medium text-sm md:text-base w-full"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Any Price</option>
            <option value="0-300000">₦0 - ₦300,000</option>
            <option value="300000-500000">₦300,000 - ₦500,000</option>
            <option value="500000-800000">₦500,000 - ₦800,000</option>
            <option value="800000-">₦800,000+</option>
          </select>
        </div>
      </div>
      
      <div className="px-3 md:px-4 py-3 md:py-4 bg-white/10">
        <button className="btn-accent w-full py-2.5 md:py-3 px-6 md:px-8 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-sm md:text-base">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          Search Properties
        </button>
      </div>
    </div>
    
    {/* Verification Badges */}
    <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[rgb(var(--color-primary-400))]">
          <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
        <span className="text-white text-sm font-medium">Verified Owners</span>
      </div>
      <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[rgb(var(--color-accent-400))]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
        <span className="text-white text-sm font-medium">No Agent Fees</span>
      </div>
      <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[rgb(var(--color-primary-400))]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
        <span className="text-white text-sm font-medium">Secure Payments</span>
      </div>
    </div>
  </div>
</section>
      
      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
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