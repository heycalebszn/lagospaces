import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data - would come from API in real app
const PROPERTIES = [
  {
    id: '1',
    title: 'Modern Apartment with Ocean View',
    location: 'Victoria Island, Lagos',
    price: 450000,
    currency: '₦',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    bedrooms: 2,
    bathrooms: 2,
    size: '120 sqm',
    isVerified: true,
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
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80',
    bedrooms: 2,
    bathrooms: 1,
    size: '85 sqm',
    isVerified: true,
    owner: {
      id: 'user2',
      name: 'David Okafor',
      avatar: '',
      isVerified: false,
    },
  },
  {
    id: '3',
    title: 'Luxury Penthouse with Pool',
    location: 'Ikoyi, Lagos',
    price: 950000,
    currency: '₦',
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-a6ed68e3f2ce?auto=format&fit=crop&w=1000&q=80',
    bedrooms: 4,
    bathrooms: 3,
    size: '250 sqm',
    isVerified: true,
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
    imageUrl: 'https://images.unsplash.com/photo-1617104678098-de229db51b21?auto=format&fit=crop&w=1000&q=80',
    bedrooms: 3,
    bathrooms: 2,
    size: '140 sqm',
    isVerified: true,
    owner: {
      id: 'user4',
      name: 'Michael Adeyemi',
      avatar: '',
      isVerified: true,
    },
  },
  {
    id: '5',
    title: 'Stylish Studio Apartment',
    location: 'Yaba, Lagos',
    price: 250000,
    currency: '₦',
    imageUrl: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?auto=format&fit=crop&w=1000&q=80',
    bedrooms: 1,
    bathrooms: 1,
    size: '60 sqm',
    isVerified: false,
    owner: {
      id: 'user5',
      name: 'Tolu Akande',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      isVerified: false,
    },
  },
];

// Location options
const LOCATIONS = [
  'Victoria Island',
  'Lekki Phase 1',
  'Ikoyi',
  'Ikeja GRA',
  'Yaba',
  'Surulere',
  'Ajah',
  'Gbagada',
  'Maryland',
  'Magodo',
];

// Price ranges
const PRICE_RANGES = [
  { min: 0, max: 200000, label: 'Under ₦200,000' },
  { min: 200000, max: 350000, label: '₦200,000 - ₦350,000' },
  { min: 350000, max: 500000, label: '₦350,000 - ₦500,000' },
  { min: 500000, max: 750000, label: '₦500,000 - ₦750,000' },
  { min: 750000, max: 1000000, label: '₦750,000 - ₦1,000,000' },
  { min: 1000000, max: Infinity, label: 'Above ₦1,000,000' },
];

// Property types
const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Studio',
  'Duplex',
  'Bungalow',
  'Penthouse',
  'Terrace',
];

console.log(PROPERTY_TYPES)

const formatPrice = (amount: number, currency: string): string => {
  return currency + new Intl.NumberFormat('en-NG', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter properties based on criteria
  const filteredProperties = PROPERTIES.filter(property => {
    // Filter by search query
    if (
      searchQuery && 
      !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by location
    if (selectedLocations.length > 0 && !selectedLocations.some(loc => property.location.includes(loc))) {
      return false;
    }
    
    // Filter by price range
    if (selectedPriceRange !== null) {
      const priceRange = PRICE_RANGES[selectedPriceRange];
      if (property.price < priceRange.min || property.price > priceRange.max) {
        return false;
      }
    }
    
    // Filter by bedrooms
    if (selectedBedrooms !== null && property.bedrooms !== selectedBedrooms) {
      return false;
    }
    
    // Filter by property type (would need property type in the data model)
    // This is a placeholder for now
    
    // Filter by verification status
    if (verifiedOnly && !property.isVerified) {
      return false;
    }
    
    return true;
  });
  
  // Toggle location selection
  const toggleLocation = (location: string) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(loc => loc !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };
  
  // Toggle property type selection
  const togglePropertyType = (type: string) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  console.log(togglePropertyType)
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLocations([]);
    setSelectedPriceRange(null);
    setSelectedBedrooms(null);
    setSelectedPropertyTypes([]);
    setVerifiedOnly(false);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-secondary-50))]">
      {/* Search Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1 relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[rgb(var(--color-secondary-500))] absolute left-3 top-1/2 -translate-y-1/2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search for properties, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 border border-[rgb(var(--color-secondary-300))] rounded-lg bg-white hover:bg-[rgb(var(--color-secondary-50))] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
              <span className="font-medium">{showFilters ? 'Hide Filters' : 'Filters'}</span>
              {(selectedLocations.length > 0 || selectedPriceRange !== null || 
                selectedBedrooms !== null || verifiedOnly || selectedPropertyTypes.length > 0) && (
                <span className="w-5 h-5 bg-[rgb(var(--color-primary-600))] text-white text-xs flex items-center justify-center rounded-full">
                  {selectedLocations.length + (selectedPriceRange !== null ? 1 : 0) + 
                   (selectedBedrooms !== null ? 1 : 0) + (verifiedOnly ? 1 : 0) + 
                   selectedPropertyTypes.length}
                </span>
              )}
            </button>
          </div>
          
          {/* Filter Section */}
          {showFilters && (
            <div className="mt-4 pb-4 border-t border-[rgb(var(--color-secondary-200))] pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Locations</h3>
                  <div className="flex flex-wrap gap-2">
                    {LOCATIONS.map(location => (
                      <button
                        key={location}
                        onClick={() => toggleLocation(location)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                          selectedLocations.includes(location)
                            ? 'bg-[rgb(var(--color-primary-600))] text-white'
                            : 'bg-[rgb(var(--color-secondary-100))] text-[rgb(var(--color-secondary-800))]'
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="space-y-2">
                    {PRICE_RANGES.map((range, index) => (
                      <label key={index} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={selectedPriceRange === index}
                          onChange={() => setSelectedPriceRange(index)}
                          className="w-4 h-4 text-[rgb(var(--color-primary-600))]"
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Bedrooms</h3>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(num => (
                        <button
                          key={num}
                          onClick={() => setSelectedBedrooms(selectedBedrooms === num ? null : num)}
                          className={`w-10 h-10 rounded-lg ${
                            selectedBedrooms === num
                              ? 'bg-[rgb(var(--color-primary-600))] text-white'
                              : 'bg-[rgb(var(--color-secondary-100))] text-[rgb(var(--color-secondary-800))]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                      <button
                        onClick={() => setSelectedBedrooms(selectedBedrooms === 6 ? null : 6)}
                        className={`px-3 h-10 rounded-lg ${
                          selectedBedrooms === 6
                            ? 'bg-[rgb(var(--color-primary-600))] text-white'
                            : 'bg-[rgb(var(--color-secondary-100))] text-[rgb(var(--color-secondary-800))]'
                        }`}
                      >
                        6+
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={() => setVerifiedOnly(!verifiedOnly)}
                        className="w-4 h-4 text-[rgb(var(--color-primary-600))]"
                      />
                      <span>Verified Properties Only</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 border border-[rgb(var(--color-secondary-300))] rounded-lg hover:bg-[rgb(var(--color-secondary-100))] transition-colors"
                >
                  Reset All
                </button>
                
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-[rgb(var(--color-primary-600))] text-white rounded-lg hover:bg-[rgb(var(--color-primary-700))] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Search Results */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">{filteredProperties.length} Properties Found</h1>
          <div className="flex items-center gap-2">
            <span className="text-[rgb(var(--color-secondary-600))]">Sort by:</span>
            <select className="border border-[rgb(var(--color-secondary-300))] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]">
              <option value="relevant">Most Relevant</option>
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <Link key={property.id} to={`/property/${property.id}`} className="block">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={property.imageUrl} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.isVerified && (
                    <div className="absolute top-2 right-2 bg-[rgb(var(--color-success))]/90 text-white text-xs py-1 px-2 rounded-lg backdrop-blur-sm flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between mb-1">
                    <h2 className="font-medium truncate">{property.title}</h2>
                    <div className="font-semibold text-[rgb(var(--color-primary-600))]">
                      {formatPrice(property.price, property.currency)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[rgb(var(--color-secondary-600))] text-sm mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {property.location}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-[rgb(var(--color-secondary-100))]">
                    <div className="flex gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[rgb(var(--color-secondary-500))]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span>{property.bedrooms} BD</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[rgb(var(--color-secondary-500))]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{property.bathrooms} BA</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[rgb(var(--color-secondary-500))]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        <span>{property.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[rgb(var(--color-secondary-50))] p-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[rgb(var(--color-secondary-300))] flex items-center justify-center">
                    {property.owner.avatar ? (
                      <img src={property.owner.avatar} alt={property.owner.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-medium">{property.owner.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="text-sm flex items-center gap-1">
                    <span>{property.owner.name}</span>
                    {property.owner.isVerified && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[rgb(var(--color-primary-500))]">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="text-xl font-semibold mb-2">No properties found</h2>
            <p className="text-[rgb(var(--color-secondary-600))] mb-6">
              Try adjusting your search criteria or filters to find more results.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-[rgb(var(--color-primary-600))] text-white rounded-lg hover:bg-[rgb(var(--color-primary-700))] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage; 