import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Studio',
  'Duplex',
  'Bungalow',
  'Penthouse',
  'Terrace',
];

const AMENITIES = [
  'Water',
  'Electricity',
  'Internet',
  'Air Conditioning',
  'Furnished',
  'Parking Space',
  'Security',
  'Swimming Pool',
  'Gym',
  'CCTV',
];

const PostPropertyPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    price: '',
    location: '',
    amenities: [] as string[],
    images: [] as File[],
    proofOfOwnership: null as File | null,
  });
  
  // Update form field
  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    if (formData.amenities.includes(amenity)) {
      updateField('amenities', formData.amenities.filter(a => a !== amenity));
    } else {
      updateField('amenities', [...formData.amenities, amenity]);
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      updateField('images', [...formData.images, ...newImages]);
    }
  };
  
  // Remove uploaded image
  const removeImage = (index: number) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    updateField('images', updatedImages);
  };
  
  // Handle document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      updateField('proofOfOwnership', e.target.files[0]);
    }
  };
  
  // Next step
  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };
  
  // Previous step
  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, we would send the form data to the server
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/post-success');
    } catch (error) {
      console.error('Error submitting property listing:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-secondary-50))]">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-display font-bold mb-2">List Your Property</h1>
          <p className="text-[rgb(var(--color-secondary-600))] mb-6">
            Fill in the details below to list your property on LAGOSPACES.
          </p>
          
          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Step {currentStep} of 3</span>
              <span className="text-[rgb(var(--color-secondary-600))]">
                {currentStep === 1 ? 'Basic Information' : 
                 currentStep === 2 ? 'Property Details' : 'Verification & Upload'}
              </span>
            </div>
            <div className="w-full bg-[rgb(var(--color-secondary-100))] h-2 rounded-full">
              <div 
                className="bg-[rgb(var(--color-primary-600))] h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                      Property Title*
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                      placeholder="e.g. Modern 2-Bedroom Apartment in Lekki"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                      Description*
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))] h-32"
                      placeholder="Describe your property in detail..."
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                      Property Type*
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => updateField('propertyType', e.target.value)}
                      className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                      required
                    >
                      <option value="">Select property type</option>
                      {PROPERTY_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                      Location*
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                      placeholder="e.g. Lekki Phase 1, Lagos"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="px-6 py-3 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-lg"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Property Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                        Bedrooms*
                      </label>
                      <select
                        value={formData.bedrooms}
                        onChange={(e) => updateField('bedrooms', e.target.value)}
                        className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                        required
                      >
                        <option value="">Select</option>
                        {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                        <option value="7+">7+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                        Bathrooms*
                      </label>
                      <select
                        value={formData.bathrooms}
                        onChange={(e) => updateField('bathrooms', e.target.value)}
                        className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                        required
                      >
                        <option value="">Select</option>
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                        <option value="6+">6+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                        Size (sqm)
                      </label>
                      <input
                        type="text"
                        value={formData.size}
                        onChange={(e) => updateField('size', e.target.value)}
                        className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                        placeholder="e.g. 120"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                      Monthly Rent (₦)*
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateField('price', e.target.value)}
                      className="w-full px-4 py-3 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                      placeholder="e.g. 450000"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-3">
                      Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {AMENITIES.map((amenity) => (
                        <label 
                          key={amenity} 
                          className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer ${
                            formData.amenities.includes(amenity)
                              ? 'border-[rgb(var(--color-primary-600))] bg-[rgb(var(--color-primary-50))]'
                              : 'border-[rgb(var(--color-secondary-300))]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => toggleAmenity(amenity)}
                            className="w-4 h-4 text-[rgb(var(--color-primary-600))]"
                          />
                          <span>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="px-6 py-3 border border-[rgb(var(--color-secondary-300))] text-[rgb(var(--color-secondary-700))] font-medium rounded-lg hover:bg-[rgb(var(--color-secondary-50))]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStep}
                      className="px-6 py-3 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-lg"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Verification & Upload */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                      Upload Property Images*
                    </label>
                    <div className="border-2 border-dashed border-[rgb(var(--color-secondary-300))] rounded-lg p-4">
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto text-[rgb(var(--color-secondary-400))]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p className="mt-2 text-[rgb(var(--color-secondary-600))]">
                          Drag and drop images here, or click to browse
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('image-upload')?.click()}
                          className="mt-2 px-4 py-2 bg-[rgb(var(--color-secondary-100))] hover:bg-[rgb(var(--color-secondary-200))] text-[rgb(var(--color-secondary-700))] rounded-lg inline-block"
                        >
                          Browse Files
                        </button>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                    </div>
                    
                    {formData.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Property ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center hover:bg-white"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                      Proof of Ownership*
                    </label>
                    <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <p className="text-sm text-[rgb(var(--color-secondary-600))] mb-4">
                        Please upload a document that proves your ownership of the property 
                        (e.g., Certificate of Occupancy, deed of assignment, or land receipt).
                      </p>
                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleDocumentUpload}
                          className="hidden"
                          id="document-upload"
                          required={!formData.proofOfOwnership}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('document-upload')?.click()}
                          className="px-4 py-2 bg-white border border-[rgb(var(--color-secondary-300))] text-[rgb(var(--color-secondary-700))] rounded-lg hover:bg-[rgb(var(--color-secondary-100))]"
                        >
                          Upload Document
                        </button>
                        {formData.proofOfOwnership && (
                          <div className="flex-1 flex items-center gap-2 p-2 bg-white rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[rgb(var(--color-success))]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <span className="text-sm truncate">{formData.proofOfOwnership.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-[rgb(var(--color-warning))]/10 rounded-lg">
                    <div className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[rgb(var(--color-warning))]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <div>
                        <h4 className="font-medium">Important Notice</h4>
                        <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                          By submitting this listing, you confirm that all information provided is accurate and 
                          that you have the legal authority to rent out this property. False information may result 
                          in the removal of your listing and suspension of your account.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="px-6 py-3 border border-[rgb(var(--color-secondary-300))] text-[rgb(var(--color-secondary-700))] font-medium rounded-lg hover:bg-[rgb(var(--color-secondary-50))]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Listing'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPropertyPage; 