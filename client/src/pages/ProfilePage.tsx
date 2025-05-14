import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Mock user data - would come from API in real app
const USER = {
  id: 'user1',
  name: 'Sarah Johnson',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  isVerified: true,
  bio: 'Property owner with multiple apartments in Lagos. I ensure all my properties are well-maintained and provide the best service to my tenants.',
  location: 'Victoria Island, Lagos',
  memberSince: 'January 2023',
  responseRate: '98%',
  responseTime: 'within 2 hours',
  totalListings: 5,
  verificationBadges: [
    { id: 'id', name: 'ID Verified', status: 'verified' },
    { id: 'phone', name: 'Phone Verified', status: 'verified' },
    { id: 'email', name: 'Email Verified', status: 'verified' },
    { id: 'property', name: 'Property Ownership', status: 'verified' },
  ],
  role: 'landlord', // or 'tenant'
  properties: [
    {
      id: '1',
      title: 'Modern Apartment with Ocean View',
      location: 'Victoria Island, Lagos',
      price: 450000,
      currency: '₦',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      status: 'available',
    },
    {
      id: '2',
      title: 'Cozy 2-Bedroom Flat',
      location: 'Lekki Phase 1, Lagos',
      price: 320000,
      currency: '₦',
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80',
      status: 'available',
    },
    {
      id: '3',
      title: 'Luxury Penthouse with Pool',
      location: 'Ikoyi, Lagos',
      price: 950000,
      currency: '₦',
      imageUrl: 'https://images.unsplash.com/photo-1600607687644-a6ed68e3f2ce?auto=format&fit=crop&w=1000&q=80',
      status: 'rented',
    },
  ],
  reviews: [
    {
      id: '1',
      reviewer: {
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      rating: 5,
      date: '2023-05-10',
      text: 'Sarah is an excellent landlord. The property was exactly as described and she was very responsive throughout the entire process.',
    },
    {
      id: '2',
      reviewer: {
        name: 'Mary Smith',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      rating: 4,
      date: '2023-03-22',
      text: 'Great experience overall. The property was clean and well-maintained. Would rent from Sarah again.',
    },
  ],
};

const formatPrice = (amount: number, currency: string): string => {
  return currency + new Intl.NumberFormat('en-NG', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
};

const ProfilePage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'properties' | 'reviews'>('properties');
  const [showContactModal, setShowContactModal] = useState(false);
  console.log(id)
  
  // In a real app, we would fetch the user based on the id
  const user = USER;

  return (
    <div className="min-h-screen bg-[rgb(var(--color-secondary-50))]">
      {/* Profile Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-[rgb(var(--color-primary-100))]">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-bold">{user.name}</h1>
                {user.isVerified && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[rgb(var(--color-primary-500))]">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-[rgb(var(--color-secondary-600))] text-sm my-1">
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  Member since {user.memberSince}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 my-2">
                <div className="text-sm font-medium bg-[rgb(var(--color-primary-100))] text-[rgb(var(--color-primary-700))] rounded-lg px-3 py-1">
                  {user.role === 'landlord' ? 'Property Owner' : 'Tenant'}
                </div>
                <div className="text-sm font-medium bg-[rgb(var(--color-secondary-100))] text-[rgb(var(--color-secondary-700))] rounded-lg px-3 py-1">
                  {user.responseRate} response rate
                </div>
                <div className="text-sm font-medium bg-[rgb(var(--color-secondary-100))] text-[rgb(var(--color-secondary-700))] rounded-lg px-3 py-1">
                  Responds {user.responseTime}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setShowContactModal(true)}
              className="bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-semibold py-2.5 px-5 rounded-xl shadow-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
      
      {/* Profile Body */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-3">About</h2>
              <p className="text-[rgb(var(--color-secondary-700))] mb-4">{user.bio}</p>
              
              <h3 className="text-md font-semibold mb-2">Verification</h3>
              <ul className="space-y-2">
                {user.verificationBadges.map(badge => (
                  <li key={badge.id} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[rgb(var(--color-success))]">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                    <span>{badge.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-3">Statistics</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--color-secondary-600))]">Total Listings</span>
                    <span className="font-medium">{user.totalListings}</span>
                  </div>
                  <div className="w-full bg-[rgb(var(--color-secondary-100))] h-2 rounded-full mt-1">
                    <div 
                      className="bg-[rgb(var(--color-primary-500))] h-2 rounded-full" 
                      style={{ width: `${(user.totalListings / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--color-secondary-600))]">Response Rate</span>
                    <span className="font-medium">{user.responseRate}</span>
                  </div>
                  <div className="w-full bg-[rgb(var(--color-secondary-100))] h-2 rounded-full mt-1">
                    <div 
                      className="bg-[rgb(var(--color-primary-500))] h-2 rounded-full" 
                      style={{ width: `${parseInt(user.responseRate)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(var(--color-secondary-600))]">Rating</span>
                    <span className="font-medium">4.5/5</span>
                  </div>
                  <div className="w-full bg-[rgb(var(--color-secondary-100))] h-2 rounded-full mt-1">
                    <div 
                      className="bg-[rgb(var(--color-primary-500))] h-2 rounded-full" 
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="border-b border-[rgb(var(--color-secondary-200))] pb-3 mb-6">
                <div className="flex gap-6">
                  <button
                    onClick={() => setActiveTab('properties')}
                    className={`pb-3 font-medium ${
                      activeTab === 'properties' 
                        ? 'text-[rgb(var(--color-primary-600))] border-b-2 border-[rgb(var(--color-primary-600))]' 
                        : 'text-[rgb(var(--color-secondary-600))]'
                    }`}
                  >
                    Properties ({user.properties.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-3 font-medium ${
                      activeTab === 'reviews' 
                        ? 'text-[rgb(var(--color-primary-600))] border-b-2 border-[rgb(var(--color-primary-600))]' 
                        : 'text-[rgb(var(--color-secondary-600))]'
                    }`}
                  >
                    Reviews ({user.reviews.length})
                  </button>
                </div>
              </div>
              
              {activeTab === 'properties' && (
                <div className="space-y-4">
                  {user.properties.map(property => (
                    <Link key={property.id} to={`/property/${property.id}`} className="block">
                      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl hover:bg-[rgb(var(--color-secondary-50))] transition-colors">
                        <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden">
                          <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{property.title}</h3>
                            <div className="text-[rgb(var(--color-primary-600))] font-semibold">
                              {formatPrice(property.price, property.currency)}
                            </div>
                          </div>
                          <p className="text-[rgb(var(--color-secondary-600))] text-sm">{property.location}</p>
                          <div className="mt-2">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              property.status === 'available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {property.status === 'available' ? 'Available' : 'Rented'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {user.reviews.map(review => (
                    <div key={review.id} className="border-b border-[rgb(var(--color-secondary-100))] pb-4 last:border-0">
                      <div className="flex gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img src={review.reviewer.avatar} alt={review.reviewer.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium">{review.reviewer.name}</div>
                          <div className="text-xs text-[rgb(var(--color-secondary-500))]">{review.date}</div>
                        </div>
                      </div>
                      
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-[rgb(var(--color-secondary-300))]'}`}
                          >
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-[rgb(var(--color-secondary-700))]">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Contact {user.name}</h2>
              <button onClick={() => setShowContactModal(false)} className="text-[rgb(var(--color-secondary-500))]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <Link 
                to={`/messages?user=${user.id}`}
                className="flex items-center gap-3 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-semibold py-3 px-4 rounded-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Send Message
              </Link>
              
              <div className="bg-[rgb(var(--color-secondary-50))] p-4 rounded-lg">
                <p className="text-sm text-[rgb(var(--color-secondary-600))] mb-1">
                  For security reasons, we only share contact information once a booking request has been made.
                </p>
                <p className="text-sm font-medium">
                  <Link to="/help" className="text-[rgb(var(--color-primary-600))]">Learn more about our privacy policy</Link>
                </p>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="text-[rgb(var(--color-secondary-600))] font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 