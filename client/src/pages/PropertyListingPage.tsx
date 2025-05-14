import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingPaymentModal from '../components/payment/BookingPaymentModal';

// Mock property data - in a real app, this would come from an API
const PROPERTY = {
  id: '1',
  title: 'Modern Apartment with Ocean View',
  description: 'Stunning ocean view apartment with modern amenities, perfect for young professionals.',
  location: 'Victoria Island, Lagos',
  price: 450000,
  currency: '₦',
  imageUrls: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600607687644-a6ed68e3f2ce?auto=format&fit=crop&w=1000&q=80',
  ],
  videoUrl: 'https://example.com/video1.mp4',
  features: ['2 Bedrooms', '2 Bathrooms', 'Fully Furnished', '24/7 Security', 'Swimming Pool', 'Gym'],
  amenities: ['Water', 'Electricity', 'Internet', 'Parking Space', 'CCTV'],
  likes: 245,
  comments: 32,
  owner: {
    id: 'user1',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isVerified: true,
    phone: '+2348012345678',
    email: 'sarah@example.com',
  },
  verificationStatus: 'Verified',
  availableFrom: '2023-10-01',
  leaseTerm: '1 year',
};

const formatPrice = (amount: number, currency: string): string => {
  return currency + new Intl.NumberFormat('en-NG', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
};

const PropertyListingPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showBookingPayment, setShowBookingPayment] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [note, setNote] = useState('');
  console.log(note)
  console.log(id);
  
  // In a real app, we would fetch the property based on the id
  const property = PROPERTY;

  const handleBookVisit = () => {
    setShowBookingForm(true);
  };

  const handleBookingFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBookingForm(false);
    setShowBookingPayment(true);
  };

  const handlePaymentComplete = () => {
    // Here we would handle the post-payment actions
    // Such as creating a booking record in the database
    console.log('Payment completed for property visit');
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-secondary-50))]">
      {/* Property Hero Section */}
      <div className="h-[40vh] md:h-[60vh] relative">
        <div className="absolute inset-0 bg-[rgb(var(--color-secondary-900))]">
          <img
            src={property.imageUrls[currentImageIndex]}
            alt={property.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-secondary-900))]/80 via-transparent to-transparent" />
        </div>
        
        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {property.imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2.5 h-2.5 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Back Button */}
        <Link
          to="/feed"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
      </div>
      
      {/* Property Details */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-[rgb(var(--color-secondary-900))]">
                {property.title}
              </h1>
              <p className="flex items-center gap-1 text-[rgb(var(--color-secondary-600))]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {property.location}
              </p>
            </div>
            <div className="text-2xl md:text-3xl font-display font-bold text-[rgb(var(--color-primary-600))]">
              {formatPrice(property.price, property.currency)}
              <span className="text-sm font-normal text-[rgb(var(--color-secondary-500))]">/month</span>
            </div>
          </div>
          
          {/* Verification Badge */}
          <div className="mb-6 flex items-center">
            <div className="bg-[rgb(var(--color-success))]/10 text-[rgb(var(--color-success))] py-1 px-3 rounded-lg flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              {property.verificationStatus}
            </div>
            <div className="text-sm text-[rgb(var(--color-secondary-500))] ml-2">
              Available from: {property.availableFrom} • {property.leaseTerm} lease
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-[rgb(var(--color-secondary-700))]">{property.description}</p>
          </div>
          
          {/* Features and Amenities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[rgb(var(--color-primary-500))]">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <ul className="grid grid-cols-2 gap-2">
                {property.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[rgb(var(--color-primary-500))]">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Owner Info */}
          <div className="border-t border-[rgb(var(--color-secondary-200))] pt-6">
            <h2 className="text-xl font-semibold mb-3">Property Owner</h2>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[rgb(var(--color-secondary-200))]">
                <img src={property.owner.avatar} alt={property.owner.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-semibold text-lg flex items-center gap-1">
                  {property.owner.name}
                  {property.owner.isVerified && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[rgb(var(--color-primary-500))]">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="text-[rgb(var(--color-secondary-500))]">Joined: January 2023</div>
                <button 
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className="text-[rgb(var(--color-primary-600))] font-medium mt-1"
                >
                  {showContactInfo ? 'Hide contact info' : 'Show contact info'}
                </button>
              </div>
            </div>
            
            {showContactInfo && (
              <div className="mt-4 bg-[rgb(var(--color-secondary-50))] p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[rgb(var(--color-secondary-600))]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{property.owner.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[rgb(var(--color-secondary-600))]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>{property.owner.email}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={handleBookVisit} 
            className="bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-semibold py-3 px-4 rounded-xl shadow-lg"
          >
            Book Visit (₦5,000)
          </button>
          <Link 
            to={`/messages?user=${property.owner.id}`}
            className="bg-white border border-[rgb(var(--color-primary-600))] text-[rgb(var(--color-primary-600))] font-semibold py-3 px-4 rounded-xl shadow-lg text-center"
          >
            Message Owner
          </Link>
        </div>
      </div>
      
      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Book a Visit</h2>
              <button onClick={() => setShowBookingForm(false)} className="text-[rgb(var(--color-secondary-500))]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="bg-[rgb(var(--color-secondary-50))] p-4 rounded-lg mb-4">
              <h3 className="font-medium">Booking Fee: ₦5,000</h3>
              <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                This is a refundable fee. Your fee will be refunded if you visit the property 
                within 7 days or if the owner fails to accommodate your visit.
              </p>
            </div>
            
            <form className="space-y-4" onSubmit={handleBookingFormSubmit}>
              <div>
                <label className="block text-[rgb(var(--color-secondary-700))] mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-[rgb(var(--color-secondary-700))] mb-1">Preferred Time</label>
                <select 
                  className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">Select a time</option>
                  <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                  <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                  <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[rgb(var(--color-secondary-700))] mb-1">Note to Owner (Optional)</label>
                <textarea 
                  className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))] h-24"
                  placeholder="Any special requirements or questions about the property..."
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-semibold py-3 px-4 rounded-xl shadow-lg"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Payment Modal */}
      <BookingPaymentModal
        isOpen={showBookingPayment}
        onClose={() => setShowBookingPayment(false)}
        onPaymentComplete={handlePaymentComplete}
        propertyId={property.id}
        propertyTitle={property.title}
        propertyImage={property.imageUrls[0]}
        ownerName={property.owner.name}
        selectedDate={selectedDate || undefined}
        selectedTime={selectedTime}
      />
    </div>
  );
};

export default PropertyListingPage; 