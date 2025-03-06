
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, User, Lock, Mail, Phone, ArrowRight, Camera, MapPin, Bell, CreditCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // For multi-step signup
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    profilePicture: null,
    paymentMethod: 'card',
    notifications: {
      email: true,
      sms: false,
      whatsapp: false
    }
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notifications.')) {
      const notificationType = name.split('.')[1];
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [notificationType]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0]
      });
    }
  };
  
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate login/signup
    if (isLogin) {
      // Normally would validate and send to server
      // For demo, just simulate a successful login
      localStorage.setItem('userInfo', JSON.stringify({
        name: 'Demo User',
        email: formData.email,
        isLoggedIn: true
      }));
      
      toast({
        title: "Login Successful",
        description: "Welcome back to AITronics!"
      });
      
      navigate('/profile');
    } else {
      if (step < 3) {
        handleNextStep();
        return;
      }
      
      // Complete signup flow
      localStorage.setItem('userInfo', JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        notifications: formData.notifications,
        isLoggedIn: true
      }));
      
      toast({
        title: "Account Created",
        description: "Your account has been successfully created"
      });
      
      navigate('/profile');
    }
  };
  
  const handleSkip = () => {
    toast({
      title: "Continuing as Guest",
      description: "You can sign in later from your profile"
    });
    navigate('/');
  };
  
  const renderProgressBar = () => {
    if (!isLogin) {
      return (
        <div className="w-full mb-6">
          <div className="w-full h-2 bg-secondary rounded-full mb-2">
            <div 
              className="h-2 bg-accent rounded-full transition-all" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className={step >= 1 ? 'text-accent' : ''}>Basic Info</span>
            <span className={step >= 2 ? 'text-accent' : ''}>Profile Details</span>
            <span className={step >= 3 ? 'text-accent' : ''}>Preferences</span>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto glass rounded-2xl p-8 border border-accent/10 shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">
              {isLogin ? 'Login to Your Account' : 'Create an Account'}
            </h1>
            
            {renderProgressBar()}
            
            <div className="flex justify-center mb-6">
              <div className="bg-secondary rounded-full p-1 grid grid-cols-2 gap-1 w-full max-w-xs">
                <button 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isLogin ? 'bg-accent text-white shadow-sm' : ''
                  }`}
                  onClick={() => {
                    setIsLogin(true);
                    setStep(1);
                  }}
                >
                  Login
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !isLogin ? 'bg-accent text-white shadow-sm' : ''
                  }`}
                  onClick={() => {
                    setIsLogin(false);
                    setStep(1);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {isLogin ? (
                // Login Form
                <>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                </>
              ) : (
                // Signup Form with Steps
                <>
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Phone size={18} />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                        />
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <Lock size={18} />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-10 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="profilePicture">Profile Picture</Label>
                        <div className="flex items-center space-x-4">
                          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-accent/20">
                            {formData.profilePicture ? (
                              <img 
                                src={URL.createObjectURL(formData.profilePicture)} 
                                alt="Profile Preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Camera size={24} className="text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <Input
                              id="profilePicture"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                            <Button 
                              type="button" 
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('profilePicture')?.click()}
                            >
                              Choose Image
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address & Location</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <MapPin size={18} />
                          </div>
                          <textarea
                            id="address"
                            name="address"
                            placeholder="Your full address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={3}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <CreditCard size={18} />
                          </div>
                          <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent appearance-none"
                          >
                            <option value="card">Credit/Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="netbanking">Net Banking</option>
                            <option value="wallet">Digital Wallet</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Contact Preferences</Label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="notifications.email"
                              name="notifications.email"
                              checked={formData.notifications.email}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <Label htmlFor="notifications.email" className="text-sm cursor-pointer">
                              Email Notifications
                            </Label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="notifications.sms"
                              name="notifications.sms"
                              checked={formData.notifications.sms}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <Label htmlFor="notifications.sms" className="text-sm cursor-pointer">
                              SMS Notifications
                            </Label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="notifications.whatsapp"
                              name="notifications.whatsapp"
                              checked={formData.notifications.whatsapp}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <Label htmlFor="notifications.whatsapp" className="text-sm cursor-pointer">
                              WhatsApp Notifications
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              <div className="flex flex-col-reverse sm:flex-row justify-between pt-4 space-y-2 sm:space-y-0 space-y-reverse">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSkip}
                  className="mt-2 sm:mt-0"
                >
                  Skip for Now
                </Button>
                
                <div className="space-x-2">
                  {!isLogin && step > 1 && (
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                  )}
                  
                  <Button type="submit">
                    {isLogin ? 'Login' : step < 3 ? 'Next' : 'Create Account'}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Google
                </Button>
                
                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2" />
                    <path d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.79.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.196-2.238-.196c-2.285 0-3.777 1.385-3.777 3.89V12h-2.54v2.89h2.54v6.988C10.925 21.954 11.45 22 12 22s1.075-.046 1.602-.121v-6.989h2.291z" fill="white" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
