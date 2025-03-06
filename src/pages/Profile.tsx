
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, MapPin, Edit, LogOut, Package, Heart, Settings, ShoppingBag, Camera } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: ''
  });
  
  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    
    if (!userInfo) {
      // Redirect to login if not logged in
      toast({
        title: "Authentication Required",
        description: "Please log in to view your profile",
      });
      navigate('/login');
      return;
    }
    
    // Load user data
    const parsedUser = JSON.parse(userInfo);
    
    setUserData({
      name: parsedUser.name || 'User',
      email: parsedUser.email || 'user@example.com',
      phone: parsedUser.phone || '',
      address: parsedUser.address || '',
      avatar: parsedUser.avatar || 'https://i.pravatar.cc/300'
    });
  }, [navigate, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    
    navigate('/');
  };
  
  const handleSaveProfile = () => {
    // Update local storage with new user data
    localStorage.setItem('userInfo', JSON.stringify(userData));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
    
    setIsEditing(false);
  };
  
  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="glass rounded-xl p-6 border border-accent/10">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                      <img 
                        src={userData.avatar || 'https://i.pravatar.cc/300'} 
                        alt={userData.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-accent text-white shadow-md">
                      <Camera size={16} />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
                
                <nav className="space-y-1">
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === 'profile' 
                        ? 'bg-accent/10 text-accent'
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                  
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === 'purchases' 
                        ? 'bg-accent/10 text-accent'
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setActiveTab('purchases')}
                  >
                    <ShoppingBag size={18} />
                    <span>Purchase History</span>
                  </button>
                  
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === 'selling' 
                        ? 'bg-accent/10 text-accent'
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setActiveTab('selling')}
                  >
                    <Package size={18} />
                    <span>My Listings</span>
                  </button>
                  
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === 'wishlist' 
                        ? 'bg-accent/10 text-accent'
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </button>
                  
                  <button 
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === 'settings' 
                        ? 'bg-accent/10 text-accent'
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                  
                  <button 
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-500 hover:bg-red-50 transition-all"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3 glass rounded-xl p-6 border border-accent/10">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit size={16} className="mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        ) : (
                          <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
                            <User size={18} className="text-muted-foreground mr-3" />
                            <span>{userData.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        ) : (
                          <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
                            <Mail size={18} className="text-muted-foreground mr-3" />
                            <span>{userData.email}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter your phone number"
                          />
                        ) : (
                          <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
                            <Phone size={18} className="text-muted-foreground mr-3" />
                            <span>{userData.phone || 'Not provided'}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Address</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter your address"
                          />
                        ) : (
                          <div className="flex items-center p-3 bg-secondary/50 rounded-lg">
                            <MapPin size={18} className="text-muted-foreground mr-3" />
                            <span>{userData.address || 'Not provided'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="pt-4">
                        <Button className="mr-3" onClick={handleSaveProfile}>
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'purchases' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Purchase History</h2>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingBag size={64} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No purchases yet</h3>
                    <p className="text-muted-foreground mb-6">You haven't made any purchases on AITronics yet.</p>
                    <Button onClick={() => navigate('/shop')}>Browse Products</Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'selling' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Listings</h2>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package size={64} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No listings yet</h3>
                    <p className="text-muted-foreground mb-6">You haven't listed any products for sale yet.</p>
                    <Button onClick={() => navigate('/sell')}>List Your First Product</Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Heart size={64} className="text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-muted-foreground mb-6">Add items to your wishlist for easy access later.</p>
                    <Button onClick={() => navigate('/shop')}>Browse Products</Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Privacy Settings</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                          <span>Email Notifications</span>
                          <div className="relative inline-block w-10 h-6 rounded-full bg-accent/20">
                            <input type="checkbox" id="toggle-email" className="sr-only" />
                            <span className="absolute inset-y-1 left-1 w-4 h-4 rounded-full bg-white transition-all"></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                          <span>SMS Notifications</span>
                          <div className="relative inline-block w-10 h-6 rounded-full bg-accent/20">
                            <input type="checkbox" id="toggle-sms" className="sr-only" />
                            <span className="absolute inset-y-1 left-1 w-4 h-4 rounded-full bg-white transition-all"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Security</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Two-Factor Authentication
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Danger Zone</h3>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
