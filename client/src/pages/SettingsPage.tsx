import { useState } from 'react';

// Mock user data
const USER = {
  id: 'user1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '08012345678',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  isVerified: true,
  role: 'landlord',
  notificationPreferences: {
    email: true,
    sms: false,
    app: true,
  },
  privacySettings: {
    showPhone: false,
    showEmail: false,
    allowMessaging: true,
  },
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'verification' | 'notifications' | 'privacy'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: USER.name,
    email: USER.email,
    phone: USER.phone,
    avatar: USER.avatar,
    notificationPreferences: { ...USER.notificationPreferences },
    privacySettings: { ...USER.privacySettings },
  });
  
  // Update form field
  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Toggle notification preference
  const toggleNotification = (type: 'email' | 'sms' | 'app') => {
    setFormData(prev => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type],
      }
    }));
  };
  
  // Toggle privacy setting
  const togglePrivacySetting = (setting: 'showPhone' | 'showEmail' | 'allowMessaging') => {
    setFormData(prev => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [setting]: !prev.privacySettings[setting],
      }
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send the updated data to the server
    console.log('Updated settings:', formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-secondary-50))]">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold mb-6">Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-sm p-4 h-fit">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-2.5 rounded-lg ${
                  activeTab === 'profile' 
                    ? 'bg-[rgb(var(--color-primary-50))] text-[rgb(var(--color-primary-700))]' 
                    : 'hover:bg-[rgb(var(--color-secondary-50))]'
                }`}
              >
                Profile Information
              </button>
              
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-2.5 rounded-lg ${
                  activeTab === 'account' 
                    ? 'bg-[rgb(var(--color-primary-50))] text-[rgb(var(--color-primary-700))]' 
                    : 'hover:bg-[rgb(var(--color-secondary-50))]'
                }`}
              >
                Account Security
              </button>
              
              <button
                onClick={() => setActiveTab('verification')}
                className={`w-full text-left px-4 py-2.5 rounded-lg ${
                  activeTab === 'verification' 
                    ? 'bg-[rgb(var(--color-primary-50))] text-[rgb(var(--color-primary-700))]' 
                    : 'hover:bg-[rgb(var(--color-secondary-50))]'
                }`}
              >
                Verification
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-2.5 rounded-lg ${
                  activeTab === 'notifications' 
                    ? 'bg-[rgb(var(--color-primary-50))] text-[rgb(var(--color-primary-700))]' 
                    : 'hover:bg-[rgb(var(--color-secondary-50))]'
                }`}
              >
                Notifications
              </button>
              
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left px-4 py-2.5 rounded-lg ${
                  activeTab === 'privacy' 
                    ? 'bg-[rgb(var(--color-primary-50))] text-[rgb(var(--color-primary-700))]' 
                    : 'hover:bg-[rgb(var(--color-secondary-50))]'
                }`}
              >
                Privacy
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-[rgb(var(--color-secondary-200))]">
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50">
                Delete Account
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Profile Information */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-[rgb(var(--color-primary-600))] font-medium"
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" />
                        </div>
                        {isEditing && (
                          <button
                            type="button"
                            className="px-3 py-1.5 border border-[rgb(var(--color-secondary-300))] rounded-lg text-sm"
                          >
                            Change Photo
                          </button>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            className="w-full px-4 py-2 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                          />
                        ) : (
                          <div className="px-4 py-2 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                            {formData.name}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className="w-full px-4 py-2 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                          />
                        ) : (
                          <div className="px-4 py-2 bg-[rgb(var(--color-secondary-50))] rounded-lg flex items-center justify-between">
                            <span>{formData.email}</span>
                            {USER.isVerified && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Verified</span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-[rgb(var(--color-secondary-700))] font-medium mb-1">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className="w-full px-4 py-2 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                          />
                        ) : (
                          <div className="px-4 py-2 bg-[rgb(var(--color-secondary-50))] rounded-lg flex items-center justify-between">
                            <span>{formData.phone}</span>
                            {USER.isVerified && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Verified</span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {isEditing && (
                        <div className="pt-4">
                          <button
                            type="submit"
                            className="px-6 py-2.5 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-lg"
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              )}
              
              {/* Account Security */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Account Security</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Change Password</h3>
                      <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg space-y-4">
                        <div>
                          <label className="block text-[rgb(var(--color-secondary-700))] text-sm mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[rgb(var(--color-secondary-700))] text-sm mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[rgb(var(--color-secondary-700))] text-sm mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-[rgb(var(--color-secondary-300))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary-500))]"
                          />
                        </div>
                        
                        <button
                          type="button"
                          className="px-4 py-2 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-lg"
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                      <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[rgb(var(--color-secondary-700))]">
                              Add an extra layer of security to your account
                            </p>
                            <p className="text-sm text-[rgb(var(--color-secondary-500))] mt-1">
                              Receive a verification code via SMS when signing in
                            </p>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 border border-[rgb(var(--color-secondary-300))] rounded-lg bg-white"
                          >
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Sessions</h3>
                      <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-[rgb(var(--color-secondary-500))]">
                              Lagos, Nigeria • Chrome on Mac OS X
                            </p>
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                        
                        <button
                          type="button"
                          className="mt-2 text-sm text-red-500 hover:text-red-600"
                        >
                          Sign out of all other sessions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Verification */}
              {activeTab === 'verification' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Verification</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <div>
                        <h3 className="font-medium">ID Verification</h3>
                        <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                          Verify your identity with a government-issued ID
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <div>
                        <h3 className="font-medium">Phone Number</h3>
                        <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                          {USER.phone}
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <div>
                        <h3 className="font-medium">Email Address</h3>
                        <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                          {USER.email}
                        </p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    
                    {USER.role === 'landlord' && (
                      <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                        <div>
                          <h3 className="font-medium">Property Ownership</h3>
                          <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                            Verify your ownership of listed properties
                          </p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Notifications */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Notification Preferences</h2>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-lg text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                            Receive updates via email
                          </p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={formData.notificationPreferences.email}
                            onChange={() => toggleNotification('email')}
                          />
                          <div className={`block w-14 h-8 rounded-full ${
                            formData.notificationPreferences.email 
                              ? 'bg-[rgb(var(--color-primary-600))]'
                              : 'bg-[rgb(var(--color-secondary-300))]'
                          }`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                            formData.notificationPreferences.email ? 'transform translate-x-6' : ''
                          }`}></div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h3 className="font-medium">SMS Notifications</h3>
                          <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                            Receive updates via text message
                          </p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={formData.notificationPreferences.sms}
                            onChange={() => toggleNotification('sms')}
                          />
                          <div className={`block w-14 h-8 rounded-full ${
                            formData.notificationPreferences.sms 
                              ? 'bg-[rgb(var(--color-primary-600))]'
                              : 'bg-[rgb(var(--color-secondary-300))]'
                          }`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                            formData.notificationPreferences.sms ? 'transform translate-x-6' : ''
                          }`}></div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h3 className="font-medium">In-App Notifications</h3>
                          <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                            Receive notifications within the app
                          </p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={formData.notificationPreferences.app}
                            onChange={() => toggleNotification('app')}
                          />
                          <div className={`block w-14 h-8 rounded-full ${
                            formData.notificationPreferences.app 
                              ? 'bg-[rgb(var(--color-primary-600))]'
                              : 'bg-[rgb(var(--color-secondary-300))]'
                          }`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                            formData.notificationPreferences.app ? 'transform translate-x-6' : ''
                          }`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Privacy */}
              {activeTab === 'privacy' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Privacy Settings</h2>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-[rgb(var(--color-primary-600))] hover:bg-[rgb(var(--color-primary-700))] text-white font-medium rounded-lg text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h3 className="font-medium">Show Phone Number</h3>
                          <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                            Allow others to see your phone number
                          </p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={formData.privacySettings.showPhone}
                            onChange={() => togglePrivacySetting('showPhone')}
                          />
                          <div className={`block w-14 h-8 rounded-full ${
                            formData.privacySettings.showPhone 
                              ? 'bg-[rgb(var(--color-primary-600))]'
                              : 'bg-[rgb(var(--color-secondary-300))]'
                          }`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                            formData.privacySettings.showPhone ? 'transform translate-x-6' : ''
                          }`}></div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h3 className="font-medium">Show Email Address</h3>
                          <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                            Allow others to see your email address
                          </p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={formData.privacySettings.showEmail}
                            onChange={() => togglePrivacySetting('showEmail')}
                          />
                          <div className={`block w-14 h-8 rounded-full ${
                            formData.privacySettings.showEmail 
                              ? 'bg-[rgb(var(--color-primary-600))]'
                              : 'bg-[rgb(var(--color-secondary-300))]'
                          }`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                            formData.privacySettings.showEmail ? 'transform translate-x-6' : ''
                          }`}></div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="p-4 bg-[rgb(var(--color-secondary-50))] rounded-lg">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div>
                          <h3 className="font-medium">Allow Messaging</h3>
                          <p className="text-sm text-[rgb(var(--color-secondary-600))]">
                            Allow others to send you messages
                          </p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={formData.privacySettings.allowMessaging}
                            onChange={() => togglePrivacySetting('allowMessaging')}
                          />
                          <div className={`block w-14 h-8 rounded-full ${
                            formData.privacySettings.allowMessaging 
                              ? 'bg-[rgb(var(--color-primary-600))]'
                              : 'bg-[rgb(var(--color-secondary-300))]'
                          }`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                            formData.privacySettings.allowMessaging ? 'transform translate-x-6' : ''
                          }`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 