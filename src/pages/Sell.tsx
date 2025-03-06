
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, CheckCircle, AlertTriangle, Cpu, X, Camera, Volume2, Smartphone, Tag, Calendar, Box, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const productCategories = [
  "Smartphones",
  "Laptops", 
  "Tablets",
  "Headphones",
  "Cameras",
  "Gaming Consoles",
  "Smartwatches",
  "Speakers",
  "Drones",
  "Accessories"
];

const productConditions = [
  "New",
  "Like New",
  "Excellent",
  "Good",
  "Fair",
  "Poor"
];

const Sell = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    askingPrice: '',
    purchaseDate: '',
    usageDuration: '',
    accessories: '',
    contactEmail: '',
    contactPhone: ''
  });
  
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'verified' | 'failed'>('pending');
  const [verificationResults, setVerificationResults] = useState({
    authenticity: 0,
    condition: '',
    issuesDetected: [],
    suggestedPrice: 0
  });
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProductData({
      ...productData,
      [name]: value
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedImages([...uploadedImages, ...newFiles]);
    }
  };
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedVideos([...uploadedVideos, ...newFiles]);
    }
  };
  
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const audioChunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], 'sound-check.webm', { type: 'audio/webm' });
        setUploadedAudio(audioFile);
      };
      
      recorder.start();
      setIsRecording(true);
      
      setTimeout(() => {
        if (recorder.state === 'recording') {
          stopAudioRecording();
        }
      }, 10000); // Automatically stop after 10 seconds
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Access Failed",
        description: "Please allow microphone access to record audio",
        variant: "destructive",
      });
    }
  };
  
  const stopAudioRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
    }
  };
  
  const removeImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };
  
  const removeVideo = (index: number) => {
    const updatedVideos = [...uploadedVideos];
    updatedVideos.splice(index, 1);
    setUploadedVideos(updatedVideos);
  };
  
  const removeAudio = () => {
    setUploadedAudio(null);
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      // Validate product details
      if (!productData.title || !productData.category || !productData.condition) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      // Validate media uploads
      if (uploadedImages.length === 0) {
        toast({
          title: "Images Required",
          description: "Please upload at least one image of your product",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep(step + 1);
    
    // Simulate AI verification when reaching step 3
    if (step === 2) {
      runAIVerification();
    }
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const runAIVerification = () => {
    setVerificationStatus('verifying');
    
    // Simulate AI verification process
    setTimeout(() => {
      // Generate realistic verification results
      const authenticity = Math.random() * 30 + 70; // 70-100% authenticity score
      
      let conditionRating;
      let issues = [];
      
      // Determine condition based on user's input but with slight AI adjustment
      switch (productData.condition.toLowerCase()) {
        case 'new':
        case 'like new':
          conditionRating = Math.random() > 0.8 ? 'Like New' : 'Excellent';
          if (Math.random() > 0.9) issues.push('Minor scratches detected');
          break;
        case 'excellent':
          conditionRating = Math.random() > 0.7 ? 'Excellent' : 'Good';
          if (Math.random() > 0.7) issues.push('Light wear on edges');
          break;
        case 'good':
          conditionRating = Math.random() > 0.6 ? 'Good' : 'Fair';
          issues.push('Normal signs of use');
          if (Math.random() > 0.6) issues.push('Visible scratches on screen');
          break;
        case 'fair':
        case 'poor':
          conditionRating = Math.random() > 0.4 ? 'Fair' : 'Poor';
          issues.push('Significant wear and tear');
          issues.push('Screen damage detected');
          if (Math.random() > 0.5) issues.push('Battery health below 80%');
          break;
        default:
          conditionRating = 'Good';
          issues.push('Unable to fully verify condition');
      }
      
      // Audio check results
      if (uploadedAudio) {
        if (Math.random() > 0.8) {
          issues.push('Speaker distortion detected');
        }
      }
      
      // Calculate suggested price
      const basePrice = parseFloat(productData.askingPrice) || 50000;
      let suggestedPrice;
      
      if (conditionRating === 'Like New') {
        suggestedPrice = basePrice * (0.9 + Math.random() * 0.1); // 90-100% of asking
      } else if (conditionRating === 'Excellent') {
        suggestedPrice = basePrice * (0.8 + Math.random() * 0.1); // 80-90% of asking
      } else if (conditionRating === 'Good') {
        suggestedPrice = basePrice * (0.7 + Math.random() * 0.1); // 70-80% of asking
      } else if (conditionRating === 'Fair') {
        suggestedPrice = basePrice * (0.5 + Math.random() * 0.1); // 50-60% of asking
      } else {
        suggestedPrice = basePrice * (0.3 + Math.random() * 0.1); // 30-40% of asking
      }
      
      setVerificationResults({
        authenticity: Math.round(authenticity),
        condition: conditionRating,
        issuesDetected: issues,
        suggestedPrice: Math.round(suggestedPrice)
      });
      
      setVerificationStatus('verified');
      
      toast({
        title: "AI Verification Complete",
        description: `Your product has been verified as ${conditionRating} condition.`,
      });
    }, 3000);
  };
  
  const acceptSuggestedPrice = () => {
    setProductData({
      ...productData,
      askingPrice: verificationResults.suggestedPrice.toString()
    });
    
    toast({
      title: "Price Updated",
      description: "You've accepted the AI-suggested price"
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Product Listed Successfully",
        description: "Your product has been listed on AITronics marketplace.",
        variant: "default",
      });
      
      // Reset or redirect
      // window.location.href = '/profile';
    }, 2000);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">1. Product Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input 
                  id="title"
                  name="title"
                  value={productData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. iPhone 13 Pro Max - 256GB - Space Gray"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('category', value)}
                    value={productData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('condition', value)}
                    value={productData.condition}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {productConditions.map((condition) => (
                        <SelectItem key={condition} value={condition.toLowerCase()}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Calendar size={18} />
                    </div>
                    <Input 
                      id="purchaseDate"
                      name="purchaseDate"
                      type="date"
                      value={productData.purchaseDate}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="usageDuration">Usage Duration</Label>
                  <div className="relative">
                    <Input 
                      id="usageDuration"
                      name="usageDuration"
                      value={productData.usageDuration}
                      onChange={handleInputChange}
                      placeholder="e.g. 1 year, 6 months"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accessories">Included Accessories</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Box size={18} />
                  </div>
                  <Input 
                    id="accessories"
                    name="accessories"
                    value={productData.accessories}
                    onChange={handleInputChange}
                    placeholder="e.g. Charger, Original Box, Screen Protector"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your product, including its specifications, features, and any defects or issues."
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="askingPrice">Initial Asking Price (₹)</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Tag size={18} />
                  </div>
                  <Input 
                    id="askingPrice"
                    name="askingPrice"
                    value={productData.askingPrice}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="e.g. 45000"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Don't worry, our AI will help you set the optimal price later
                </p>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">2. AI Verification Materials</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center text-base">
                  <Camera className="mr-2 text-accent" size={18} />
                  Upload Product Images
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Please upload clear images of your product from multiple angles (front, back, sides)
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Drag and drop images here, or click to browse
                    </p>
                    <Button type="button" variant="secondary" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                      Select Images
                    </Button>
                    <input 
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden h-24">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Product image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                          onClick={() => removeImage(index)}
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center text-base">
                  <Smartphone className="mr-2 text-accent" size={18} />
                  Upload Product Videos
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Upload videos showing the product's functionality (screen, buttons, features)
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Drag and drop videos here, or click to browse
                    </p>
                    <Button type="button" variant="secondary" size="sm" onClick={() => document.getElementById('video-upload')?.click()}>
                      Select Videos
                    </Button>
                    <input 
                      id="video-upload"
                      type="file"
                      multiple
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                  </div>
                </div>
                
                {uploadedVideos.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {uploadedVideos.map((video, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden">
                        <video 
                          src={URL.createObjectURL(video)} 
                          className="w-full h-24 object-cover"
                          controls
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
                          onClick={() => removeVideo(index)}
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center text-base">
                  <Volume2 className="mr-2 text-accent" size={18} />
                  Sound Check
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Record a sound sample to verify speakers and microphone functionality
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex flex-col items-center justify-center">
                    {!uploadedAudio ? (
                      <>
                        {isRecording ? (
                          <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center animate-pulse mb-2">
                              <VolumeX size={24} className="text-white" />
                            </div>
                            <p className="text-sm font-medium mb-3">Recording... {mediaRecorder ? Math.round((10 - mediaRecorder.state === 'recording' ? 0 : 10)) : 0}s</p>
                            <Button type="button" variant="destructive" size="sm" onClick={stopAudioRecording}>
                              Stop Recording
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Volume2 className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-3">
                              Click to record a sound sample for verification
                            </p>
                            <Button type="button" variant="secondary" size="sm" onClick={startAudioRecording}>
                              Start Recording
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full flex flex-col items-center">
                        <p className="text-sm font-medium mb-2">Audio Recorded</p>
                        <audio 
                          src={URL.createObjectURL(uploadedAudio)} 
                          controls
                          className="w-full max-w-xs mb-2"
                        />
                        <Button type="button" variant="outline" size="sm" onClick={removeAudio}>
                          Remove Audio
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">3. AI Verification Results</h2>
            
            {verificationStatus === 'verifying' ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 rounded-full border-4 border-t-accent border-r-accent/30 border-b-accent/10 border-l-accent/50 animate-spin mb-4"></div>
                <h3 className="text-lg font-medium mb-2">
                  AI Verification in Progress
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Our AI is analyzing your product images, videos, and audio to verify condition and authenticity.
                  This usually takes 15-30 seconds.
                </p>
              </div>
            ) : verificationStatus === 'verified' ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-2 rounded-full bg-green-500/10">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                </div>
                
                <h3 className="text-center text-green-500 font-medium">
                  Product Successfully Verified!
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="overflow-hidden">
                    <div className="bg-accent/10 p-3 flex items-center">
                      <Cpu size={18} className="text-accent mr-2" />
                      <h4 className="font-medium">Authenticity Check</h4>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Authenticity Score:</span>
                        <span className="font-bold">{verificationResults.authenticity}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            verificationResults.authenticity > 90 ? 'bg-green-500' : 
                            verificationResults.authenticity > 80 ? 'bg-green-400' : 
                            verificationResults.authenticity > 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${verificationResults.authenticity}%` }}
                        ></div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm">
                          {verificationResults.authenticity > 90 ? 'Authentic product verified' : 
                          verificationResults.authenticity > 80 ? 'Product appears authentic' : 
                          verificationResults.authenticity > 70 ? 'Likely authentic with some concerns' : 
                          'Authentication concerns detected'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden">
                    <div className="bg-accent/10 p-3 flex items-center">
                      <Smartphone size={18} className="text-accent mr-2" />
                      <h4 className="font-medium">Condition Assessment</h4>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm">AI-Verified Condition:</span>
                        <span className={`font-bold ${
                          verificationResults.condition === 'Like New' ? 'text-green-500' :
                          verificationResults.condition === 'Excellent' ? 'text-green-400' :
                          verificationResults.condition === 'Good' ? 'text-yellow-500' :
                          verificationResults.condition === 'Fair' ? 'text-orange-500' : 'text-red-500'
                        }`}>
                          {verificationResults.condition}
                        </span>
                      </div>
                      
                      {verificationResults.issuesDetected.length > 0 && (
                        <div>
                          <p className="text-sm mb-2">Issues Detected:</p>
                          <ul className="text-xs space-y-1">
                            {verificationResults.issuesDetected.map((issue, idx) => (
                              <li key={idx} className="flex items-start">
                                <AlertTriangle size={12} className="text-yellow-500 mr-1 mt-0.5" />
                                <span>{issue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="overflow-hidden">
                  <div className="bg-accent/10 p-3 flex items-center">
                    <Tag size={18} className="text-accent mr-2" />
                    <h4 className="font-medium">AI-Suggested Pricing</h4>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm mb-1">Your Initial Price:</p>
                          <p className="text-lg font-bold">₹{parseInt(productData.askingPrice).toLocaleString()}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm mb-1">AI-Suggested Price:</p>
                          <p className="text-lg font-bold text-accent">₹{verificationResults.suggestedPrice.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="h-4 flex-grow rounded-full bg-secondary overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-accent"></div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Based on your product's verified condition and current market value, our AI suggests this optimal price for faster selling.
                      </p>
                      
                      <div className="flex justify-end">
                        <Button 
                          type="button" 
                          onClick={acceptSuggestedPrice} 
                          variant="outline"
                          className="text-accent border-accent hover:bg-accent/10"
                        >
                          Accept Suggested Price
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input 
                        id="contactEmail"
                        name="contactEmail"
                        value={productData.contactEmail}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input 
                        id="contactPhone"
                        name="contactPhone"
                        value={productData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <AlertTriangle size={32} className="text-yellow-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Verification Not Started
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Please return to the previous step and ensure you've uploaded all required media.
                </p>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Sell Your Electronics with AI</h1>
              <p className="text-muted-foreground">
                Our AI-powered platform helps you verify, price, and list your electronics for the best value.
              </p>
            </div>
            
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div 
                    key={stepNum} 
                    className={`flex flex-col items-center ${stepNum <= step ? 'text-accent' : 'text-muted-foreground'}`}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                        stepNum < step 
                          ? 'bg-accent text-white' 
                          : stepNum === step 
                            ? 'border-2 border-accent text-accent' 
                            : 'border-2 border-muted-foreground/30'
                      }`}
                    >
                      {stepNum < step ? <CheckCircle size={16} /> : stepNum}
                    </div>
                    <span className="text-xs">
                      {stepNum === 1 ? 'Details' : 
                       stepNum === 2 ? 'Verification' : 
                       stepNum === 3 ? 'Pricing' : 'Complete'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="glass p-6">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit}>
                  {renderStep()}
                  
                  <div className="flex justify-between mt-8">
                    {step > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevStep}
                      >
                        Previous
                      </Button>
                    )}
                    
                    <div className="ml-auto">
                      {step < 3 ? (
                        <Button 
                          type="button" 
                          onClick={handleNextStep}
                        >
                          {step === 2 ? 'Verify with AI' : 'Next'}
                        </Button>
                      ) : (
                        <Button 
                          type="submit" 
                          disabled={isSubmitting || verificationStatus !== 'verified'}
                        >
                          {isSubmitting ? "Listing Product..." : "List My Product"}
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sell;
