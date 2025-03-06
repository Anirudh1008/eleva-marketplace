
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, MapPin, Package, Heart, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUserInfo = localStorage.getItem('userInfo');
    
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // Redirect to login if not logged in
      navigate('/login');
      toast({
        title: "Authentication Required",
        description: "Please login to view your profile",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-accent border-r-accent/30 border-b-accent/10 border-l-accent/50 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!userInfo) {
    return null; // This shouldn't happen due to the redirect in useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <Card className="glass sticky top-32">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="w-24 h-24 mb-4">
                        <AvatarFallback className="bg-accent/10 text-accent text-xl">
                          {userInfo.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h2 className="text-xl font-bold mb-1">{userInfo.name}</h2>
                      <p className="text-sm text-muted-foreground mb-6">{userInfo.email}</p>
                      
                      <div className="w-full space-y-1">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <a href="#profile">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </a>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <a href="#orders">
                            <Package className="mr-2 h-4 w-4" />
                            My Orders
                          </a>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <a href="#wishlist">
                            <Heart className="mr-2 h-4 w-4" />
                            Wishlist
                          </a>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <a href="#settings">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </a>
                        </Button>
                      </div>
                      
                      <Button 
                        variant="destructive" 
                        className="w-full mt-6"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:w-2/3">
                <Tabs defaultValue="profile" className="space-y-6">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="listings">My Listings</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile">
                    <Card id="profile" className="glass">
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleSaveProfile} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="profile-name">Full Name</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="profile-name"
                                value={userInfo.name}
                                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="profile-email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="profile-email"
                                type="email"
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="profile-phone">Phone Number</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="profile-phone"
                                value={userInfo.phone}
                                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="profile-address">Address</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="profile-address"
                                value={userInfo.address}
                                onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                                className="pl-10"
                              />
                            </div>
                          </div>
                          
                          <Button type="submit">
                            Save Changes
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="orders">
                    <Card id="orders" className="glass">
                      <CardHeader>
                        <CardTitle>My Orders</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                          <p className="text-muted-foreground mb-4">
                            You haven't placed any orders yet. Start shopping to see your orders here.
                          </p>
                          <Button>Browse Products</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="listings">
                    <Card id="listings" className="glass">
                      <CardHeader>
                        <CardTitle>My Listings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Listings Yet</h3>
                          <p className="text-muted-foreground mb-4">
                            You haven't listed any products for sale yet. List your first product now.
                          </p>
                          <Button>Sell a Product</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings">
                    <Card id="settings" className="glass">
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-3 border-b">
                            <div>
                              <h4 className="font-medium">Email Notifications</h4>
                              <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                            </div>
                            <Button variant="outline" size="sm">Manage</Button>
                          </div>
                          
                          <div className="flex items-center justify-between py-3 border-b">
                            <div>
                              <h4 className="font-medium">Change Password</h4>
                              <p className="text-sm text-muted-foreground">Update your password regularly for security</p>
                            </div>
                            <Button variant="outline" size="sm">Change</Button>
                          </div>
                          
                          <div className="flex items-center justify-between py-3 border-b">
                            <div>
                              <h4 className="font-medium">Delete Account</h4>
                              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                            </div>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
