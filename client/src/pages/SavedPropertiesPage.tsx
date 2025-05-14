import { useState } from 'react';
import { Link } from 'react-router-dom';

// Mock saved properties data - would come from API in real app
const SAVED_PROPERTIES = [
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
    savedAt: '2023-09-15T10:30:00',
    owner: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      isVerified: true,
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
    savedAt: '2023-09-10T15:45:00',
    owner: {
      id: 'user3',
      name: 'Jennifer Balogun',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
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
    savedAt: '2023-09-05T09:20:00',
    owner: {
      id: 'user5',
      name: 'Tolu Akande',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      isVerified: false,
    },
  },
];

const formatPrice = (amount: number, currency: string): string => {
  return currency + new Intl.NumberFormat('en-NG', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const SavedPropertiesPage = () => {
  const [savedProperties, setSavedProperties] = useState(SAVED_PROPERTIES);
  
  // Remove a property from saved list
  const removeProperty = (id: string) => {
    setSavedProperties(savedProperties.filter(property => property.id !== id));
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-secondary-50))]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-display font-bold">Saved Properties</h1>
          {savedProperties.length > 0 && (
            <span className="text-[rgb(var(--color-secondary-600))]">
              {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'}
            </span>
          )}
        </div>
        
        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map(property => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="relative">
                  <Link to={`/property/${property.id}`}>
                    <img 
                      src={property.imageUrl} 
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => removeProperty(property.id)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center backdrop-blur-sm transition-colors"
                    aria-label="Remove from saved"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                      <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded-md backdrop-blur-sm">
                    Saved on {formatDate(property.savedAt)}
                  </div>
                </div>
                
                <div className="p-4">
                  <Link to={`/property/${property.id}`}>
                    <div className="flex justify-between mb-1">
                      <h2 className="font-medium truncate">{property.title}</h2>
                    </div>
                    <div className="font-semibold text-[rgb(var(--color-primary-600))] mb-1">
                      {formatPrice(property.price, property.currency)}
                    </div>
                    
                    <div className="flex items-center gap-1 text-[rgb(var(--color-secondary-600))] text-sm mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {property.location}
                    </div>
                  </Link>
                  
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
                    
                    <Link 
                      to={`/property/${property.id}`}
                      className="text-[rgb(var(--color-primary-600))] hover:text-[rgb(var(--color-primary-700))] font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                
                <div className="bg-[rgb(var(--color-secondary-50))] p-3 flex items-center gap-2">
                  <Link to={`/profile/${property.owner.id}`} className="flex items-center gap-2">
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
                  </Link>
                  
                  <div className="ml-auto">
                    <Link 
                      to={`/messages?user=${property.owner.id}`}
                      className="text-sm text-[rgb(var(--color-primary-600))] hover:text-[rgb(var(--color-primary-700))] font-medium"
                    >
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-5xl mb-4">📌</div>
            <h2 className="text-xl font-semibold mb-2">No saved properties yet</h2>
            <p className="text-[rgb(var(--color-secondary-600))] mb-6 max-w-md mx-auto">
              When you find properties you like, save them here to easily keep track of your favorites.
            </p>
            <Link
              to="/feed"
              className="px-6 py-2.5 bg-[rgb(var(--color-primary-600))] text-white rounded-lg hover:bg-[rgb(var(--color-primary-700))] transition-colors inline-block"
            >
              Explore Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPropertiesPage; 