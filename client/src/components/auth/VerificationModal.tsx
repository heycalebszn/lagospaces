import { useState, useRef } from 'react';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: () => void;
}

const VerificationModal = ({ isOpen, onClose, onVerificationComplete }: VerificationModalProps) => {
  const [activeStep, setActiveStep] = useState<'id' | 'face' | 'nin' | 'ownership'>('id');
  const [idImage, setIdImage] = useState<File | null>(null);
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [ninNumber, setNinNumber] = useState('');
  const [ownershipDoc, setOwnershipDoc] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const faceInputRef = useRef<HTMLInputElement | null>(null);
  const ownershipInputRef = useRef<HTMLInputElement | null>(null);
  
  const handleIdCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIdImage(e.target.files[0]);
    }
  };
  
  const handleFaceCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFaceImage(e.target.files[0]);
    }
  };
  
  const handleOwnershipUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setOwnershipDoc(e.target.files[0]);
    }
  };
  
  const goToNextStep = () => {
    if (activeStep === 'id') setActiveStep('face');
    else if (activeStep === 'face') setActiveStep('nin');
    else if (activeStep === 'nin') setActiveStep('ownership');
  };
  
  const goToPreviousStep = () => {
    if (activeStep === 'face') setActiveStep('id');
    else if (activeStep === 'nin') setActiveStep('face');
    else if (activeStep === 'ownership') setActiveStep('nin');
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to verify the user
      // Simulating a verification process with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      onVerificationComplete();
      onClose();
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Verify Your Identity</h2>
          <button onClick={onClose} className="text-[rgb(var(--color-secondary-500))]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">
              {activeStep === 'id' ? 'Step 1 of 4' : 
               activeStep === 'face' ? 'Step 2 of 4' : 
               activeStep === 'nin' ? 'Step 3 of 4' : 'Step 4 of 4'}
            </span>
            <span className="text-sm text-[rgb(var(--color-secondary-600))]">
              {activeStep === 'id' ? 'ID Verification' : 
               activeStep === 'face' ? 'Face Capture' : 
               activeStep === 'nin' ? 'NIN Verification' : 'Property Ownership'}
            </span>
          </div>
          <div className="w-full bg-[rgb(var(--color-secondary-100))] h-2 rounded-full">
            <div 
              className="bg-[rgb(var(--color-primary-600))] h-2 rounded-full transition-all duration-300" 
              style={{ 
                width: activeStep === 'id' ? '25%' : 
                      activeStep === 'face' ? '50%' : 
                      activeStep === 'nin' ? '75%' : '100%' 
              }}
            ></div>
          </div>
        </div>
        
        {/* ID Verification Step */}
        {activeStep === 'id' && (
          <div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Upload Your ID</h3>
              <p className="text-sm text-[rgb(var(--color-secondary-600))] mb-4">
                Please upload a clear photo of your government-issued ID (National ID, Driver's License, or International Passport).
              </p>
              
              <div 
                className="border-2 border-dashed border-[rgb(var(--color-secondary-300))] rounded-lg p-6 text-center cursor-pointer hover:bg-[rgb(var(--color-secondary-50))] transition-colors"
                onClick={() => idInputRef.current?.click()}
              >
                {idImage ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={URL.createObjectURL(idImage)} 
                      alt="ID Preview" 
                      className="max-h-48 mb-2 rounded-lg shadow-md" 
                    />
                    <span className="text-sm text-[rgb(var(--color-secondary-600))]">
                      Click to change image
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-[rgb(var(--color-secondary-400))] mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="font-medium">Upload ID</p>
                    <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                      Click to browse or drag and drop
                    </p>
                  </div>
                )}
                <input 
                  type="file"
                  ref={idInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleIdCapture}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={goToNextStep}
                disabled={!idImage}
                className="px-6 py-2.5 bg-[rgb(var(--color-primary-600))] text-white rounded-lg hover:bg-[rgb(var(--color-primary-700))] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Face Capture Step */}
        {activeStep === 'face' && (
          <div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Take a Selfie</h3>
              <p className="text-sm text-[rgb(var(--color-secondary-600))] mb-4">
                Please take a clear photo of your face to verify that you match your ID.
              </p>
              
              <div 
                className="border-2 border-dashed border-[rgb(var(--color-secondary-300))] rounded-lg p-6 text-center cursor-pointer hover:bg-[rgb(var(--color-secondary-50))] transition-colors"
                onClick={() => faceInputRef.current?.click()}
              >
                {faceImage ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={URL.createObjectURL(faceImage)} 
                      alt="Face Preview" 
                      className="max-h-48 mb-2 rounded-lg shadow-md" 
                    />
                    <span className="text-sm text-[rgb(var(--color-secondary-600))]">
                      Click to change image
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-[rgb(var(--color-secondary-400))] mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <p className="font-medium">Take Selfie</p>
                    <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                      Click to browse or use your camera
                    </p>
                  </div>
                )}
                <input 
                  type="file"
                  ref={faceInputRef}
                  accept="image/*"
                  capture="user"
                  className="hidden"
                  onChange={handleFaceCapture}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                onClick={goToPreviousStep}
                className="px-6 py-2.5 border border-[rgb(var(--color-secondary-300))] rounded-lg hover:bg-[rgb(var(--color-secondary-50))]"
              >
                Back
              </button>
              <button
                onClick={goToNextStep}
                disabled={!faceImage}
                className="px-6 py-2.5 bg-[rgb(var(--color-primary-600))] text-white rounded-lg hover:bg-[rgb(var(--color-primary-700))] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* NIN Verification Step */}
        {activeStep === 'nin' && (
          <div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Verify Your NIN</h3>
              <p className="text-sm text-[rgb(var(--color-secondary-600))] mb-4">
                Please enter your National Identification Number (NIN) for verification.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[rgb(var(--color-secondary-700))] mb-1">
                    NIN Number
                  </label>
                  <input
                    type="text"
                    value={ninNumber}
                    onChange={(e) => setNinNumber(e.target.value)}
                    placeholder="Enter your 11-digit NIN"
                    className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                    maxLength={11}
                    pattern="[0-9]*"
                  />
                </div>
                
                <div className="bg-[rgb(var(--color-secondary-50))] p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[rgb(var(--color-secondary-600))] mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                      Your NIN will be used to verify your identity through the NIMC database. This helps us ensure the security of all users on our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                onClick={goToPreviousStep}
                className="px-6 py-2.5 border border-[rgb(var(--color-secondary-300))] rounded-lg hover:bg-[rgb(var(--color-secondary-50))]"
              >
                Back
              </button>
              <button
                onClick={goToNextStep}
                disabled={ninNumber.length !== 11}
                className="px-6 py-2.5 bg-[rgb(var(--color-primary-600))] text-white rounded-lg hover:bg-[rgb(var(--color-primary-700))] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Property Ownership Step */}
        {activeStep === 'ownership' && (
          <div>
            <div className="mb-4">
              <h3 className="font-medium mb-2">Verify Property Ownership</h3>
              <p className="text-sm text-[rgb(var(--color-secondary-600))] mb-4">
                Please upload a document that proves your ownership of the property (e.g., Certificate of Occupancy, deed of assignment, or land receipt).
              </p>
              
              <div 
                className="border-2 border-dashed border-[rgb(var(--color-secondary-300))] rounded-lg p-6 text-center cursor-pointer hover:bg-[rgb(var(--color-secondary-50))] transition-colors"
                onClick={() => ownershipInputRef.current?.click()}
              >
                {ownershipDoc ? (
                  <div className="flex items-center justify-center gap-3 bg-[rgb(var(--color-secondary-50))] p-4 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[rgb(var(--color-primary-600))]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <div className="text-left">
                      <p className="font-medium">{ownershipDoc.name}</p>
                      <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                        {(ownershipDoc.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-[rgb(var(--color-secondary-400))] mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <p className="font-medium">Upload Document</p>
                    <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                      PDF, DOCX, or image files
                    </p>
                  </div>
                )}
                <input 
                  type="file"
                  ref={ownershipInputRef}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={handleOwnershipUpload}
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                onClick={goToPreviousStep}
                className="px-6 py-2.5 border border-[rgb(var(--color-secondary-300))] rounded-lg hover:bg-[rgb(var(--color-secondary-50))]"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!ownershipDoc || isSubmitting}
                className="px-6 py-2.5 bg-[rgb(var(--color-primary-600))] text-white rounded-lg hover:bg-[rgb(var(--color-primary-700))] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Complete Verification'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationModal; 