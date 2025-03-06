
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cpu, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    address: '',
    password: '', 
    confirmPassword: '' 
  });
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };
  
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoggingIn(false);
      
      // Save user info to localStorage
      const userInfo = {
        name: "Demo User",
        email: loginData.email,
        phone: "+91 9876543210",
        address: "123 Demo Street, Delhi, India"
      };
      
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to AITronics!",
      });
      
      navigate('/profile');
    }, 1500);
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsRegistering(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsRegistering(false);
      
      // Save user info to localStorage
      const userInfo = {
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        address: signupData.address
      };
      
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      toast({
        title: "Registration Successful",
        description: "Welcome to AITronics! Your account has been created.",
      });
      
      navigate('/profile');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Cpu size={32} className="text-accent" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome to AITronics</h1>
              <p className="text-muted-foreground">
                Sign in to access your account or create a new one
              </p>
            </div>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-center">Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="login-email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            className="pl-10"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="login-password">Password</Label>
                          <a href="#" className="text-xs text-accent hover:underline">
                            Forgot Password?
                          </a>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="login-password"
                            name="password"
                            type="password"
                            placeholder="Your password"
                            className="pl-10"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoggingIn}>
                        {isLoggingIn ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-name"
                            name="name"
                            placeholder="Your full name"
                            className="pl-10"
                            value={signupData.name}
                            onChange={handleSignupChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            className="pl-10"
                            value={signupData.email}
                            onChange={handleSignupChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-phone"
                            name="phone"
                            placeholder="Your phone number"
                            className="pl-10"
                            value={signupData.phone}
                            onChange={handleSignupChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-address">Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-address"
                            name="address"
                            placeholder="Your address"
                            className="pl-10"
                            value={signupData.address}
                            onChange={handleSignupChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            className="pl-10"
                            value={signupData.password}
                            onChange={handleSignupChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="signup-confirm-password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="pl-10"
                            value={signupData.confirmPassword}
                            onChange={handleSignupChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isRegistering}>
                        {isRegistering ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
