import { useState } from 'react';
import { format } from 'date-fns';

interface BookingPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  ownerName: string;
  selectedDate?: Date;
  selectedTime?: string;
}

const BOOKING_FEE = 5000; // ₦5,000 fee

const BookingPaymentModal = ({
  isOpen,
  onClose,
  onPaymentComplete,
  propertyId,
  propertyTitle,
  propertyImage,
  ownerName,
  selectedDate,
  selectedTime,
}: BookingPaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'ussd'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  console.log(propertyId)
  
  // Format card expiry date (MM/YY)
  const formatCardExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  // Handle card number change
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(formatCardNumber(value));
  };
  
  // Handle card expiry change
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 5) {
      setCardExpiry(formatCardExpiry(value));
    }
  };
  
  // Process payment
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // In a real app, this would be an API call to process the payment
      // Simulating a payment process with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show the booking agreement after successful payment
      setShowAgreement(true);
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Confirm agreement and complete booking
  const handleConfirmAgreement = async () => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would save the agreement and finalize the booking
      await new Promise(resolve => setTimeout(resolve, 1000));
      onPaymentComplete();
      onClose();
    } catch (error) {
      console.error('Agreement confirmation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {showAgreement ? 'Booking Agreement' : 'Book a Visit'}
          </h2>
          <button onClick={onClose} className="text-[rgb(var(--color-secondary-500))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {!showAgreement ? (
          <>
            {/* Property Summary */}
            <div className="flex gap-3 items-center p-3 bg-[rgb(var(--color-secondary-50))] rounded-lg mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={propertyImage} alt={propertyTitle} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-medium text-[rgb(var(--color-secondary-900))]">{propertyTitle}</h3>
                <p className="text-sm text-[rgb(var(--color-secondary-600))]">Owner: {ownerName}</p>
                {selectedDate && (
                  <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                    Visit: {format(selectedDate, 'MMM d, yyyy')} {selectedTime}
                  </p>
                )}
              </div>
            </div>
            
            {/* Booking Fee Information */}
            <div className="bg-[rgb(var(--color-primary-50))] p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-1">Booking Fee: ₦{BOOKING_FEE.toLocaleString()}</h3>
              <p className="text-sm text-[rgb(var(--color-secondary-700))]">
                This fee is refundable. You'll get your money back if you visit the property 
                within 7 days or if the owner fails to accommodate your visit.
              </p>
              <div className="mt-3 border-t border-[rgb(var(--color-primary-200))] pt-3 text-sm text-[rgb(var(--color-secondary-600))]">
                <p>• Full refund if you visit within 7 days</p>
                <p>• Full refund if owner fails to accommodate the visit</p>
                <p>• Fee is split between the platform and owner if you don't show up</p>
              </div>
            </div>
            
            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Select Payment Method</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg text-center ${
                    paymentMethod === 'card'
                      ? 'bg-[rgb(var(--color-primary-100))] text-[rgb(var(--color-primary-700))] border border-[rgb(var(--color-primary-300))]'
                      : 'bg-[rgb(var(--color-secondary-50))] border border-[rgb(var(--color-secondary-200))]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span className="text-sm">Card</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-lg text-center ${
                    paymentMethod === 'bank'
                      ? 'bg-[rgb(var(--color-primary-100))] text-[rgb(var(--color-primary-700))] border border-[rgb(var(--color-primary-300))]'
                      : 'bg-[rgb(var(--color-secondary-50))] border border-[rgb(var(--color-secondary-200))]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                  <span className="text-sm">Bank</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ussd')}
                  className={`p-3 rounded-lg text-center ${
                    paymentMethod === 'ussd'
                      ? 'bg-[rgb(var(--color-primary-100))] text-[rgb(var(--color-primary-700))] border border-[rgb(var(--color-primary-300))]'
                      : 'bg-[rgb(var(--color-secondary-50))] border border-[rgb(var(--color-secondary-200))]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto mb-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                  <span className="text-sm">USSD</span>
                </button>
              </div>
            </div>
            
            {/* Payment Form */}
            <form onSubmit={handlePayment}>
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--color-secondary-700))] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--color-secondary-700))] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={handleCardExpiryChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                        maxLength={5}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[rgb(var(--color-secondary-700))] mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--color-secondary-700))] mb-1">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                      required
                    />
                  </div>
                </div>
              )}
              
              {paymentMethod === 'bank' && (
                <div className="bg-[rgb(var(--color-secondary-50))] p-4 rounded-lg">
                  <p className="text-center text-[rgb(var(--color-secondary-700))]">
                    You'll be redirected to your bank's secure payment page to complete the transaction.
                  </p>
                </div>
              )}
              
              {paymentMethod === 'ussd' && (
                <div className="bg-[rgb(var(--color-secondary-50))] p-4 rounded-lg text-center">
                  <p className="text-[rgb(var(--color-secondary-700))] mb-2">
                    Select your bank to generate a USSD code.
                  </p>
                  <select className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]">
                    <option value="">Select your bank</option>
                    <option value="gtb">GTBank</option>
                    <option value="firstbank">First Bank</option>
                    <option value="uba">UBA</option>
                    <option value="zenith">Zenith Bank</option>
                    <option value="access">Access Bank</option>
                  </select>
                </div>
              )}
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-6 py-3 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    `Pay ₦${BOOKING_FEE.toLocaleString()}`
                  )}
                </button>
              </div>
              
              <div className="mt-4 text-center text-xs text-[rgb(var(--color-secondary-500))]">
                <p>Secured by Paystack</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span>Your payment information is secure</span>
                </div>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* Booking Agreement */}
            <div className="bg-[rgb(var(--color-success))]/10 p-4 rounded-lg mb-6 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[rgb(var(--color-success))]">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-medium">Payment Successful!</h3>
                <p className="text-sm">Your booking fee of ₦{BOOKING_FEE.toLocaleString()} has been received.</p>
              </div>
            </div>
            
            <div className="bg-white border border-[rgb(var(--color-secondary-200))] rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-3 text-center">Booking Agreement</h3>
              
              <div className="space-y-3 text-sm">
                <p className="font-medium">Property: {propertyTitle}</p>
                <p><strong>Owner:</strong> {ownerName}</p>
                {selectedDate && (
                  <p><strong>Visit Date:</strong> {format(selectedDate, 'MMMM d, yyyy')} {selectedTime}</p>
                )}
                <p><strong>Booking Fee:</strong> ₦{BOOKING_FEE.toLocaleString()} (Refundable)</p>
                
                <div className="border-t border-[rgb(var(--color-secondary-200))] pt-3 mt-3">
                  <p className="mb-2"><strong>Terms & Conditions:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>This fee is fully refundable if you visit the property within 7 days.</li>
                    <li>If the owner fails to accommodate your visit, you will receive a full refund.</li>
                    <li>If you fail to visit the property within 7 days, the fee will be split between LAGOSPACES and the property owner.</li>
                    <li>Upon visiting the property, please ask the owner to confirm your visit through the platform.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleConfirmAgreement}
                disabled={isProcessing}
                className="w-full px-6 py-3 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'I Accept & Confirm Booking'
                )}
              </button>
              <p className="text-center text-sm text-[rgb(var(--color-secondary-600))] mt-3">
                A copy of this agreement will be sent to your email
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPaymentModal; 