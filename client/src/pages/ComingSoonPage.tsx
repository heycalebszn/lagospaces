import { Link, useParams, useLocation } from 'react-router-dom';

const ComingSoonPage = () => {
  const { feature } = useParams();
  const location = useLocation();
  
  // Extract the feature name from the path if not provided as a param
  const featureName = feature || location.pathname.split('/').pop() || 'This feature';
  
  // Format the feature name for display
  const formattedFeatureName = featureName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[rgb(var(--color-primary-50))] to-[rgb(var(--color-accent-50))] p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-[rgb(var(--color-primary-100))] rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-[rgb(var(--color-primary-500))] text-white rounded-full w-full h-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-[rgb(var(--color-secondary-900))] mb-3">
          Coming Soon!
        </h1>
        
        <p className="text-xl font-medium text-[rgb(var(--color-primary-600))] mb-4">
          {formattedFeatureName}
        </p>
        
        <p className="text-[rgb(var(--color-secondary-600))] mb-8">
          We're working hard to bring you this exciting feature. Check back soon for updates!
        </p>
        
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-xl transition-colors"
          >
            Back to Home
          </Link>
          
          <Link
            to="/feed"
            className="px-6 py-3 border border-[rgb(var(--color-primary-600))] text-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-50))] font-medium rounded-xl transition-colors"
          >
            Explore Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage; 