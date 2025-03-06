import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, CheckCircle, AlertTriangle, Cpu, X } from 'lucide-react';
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
    contactEmail: '',
    contactPhone: ''
  });
  
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
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
  
  const removeImage = (index: number) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };
  
  const handleVerification = () => {
    setStep(2);
    // In a real app, this would send the images to an AI verification service
    setTimeout(() => {
      setStep(3);
      // AI suggested price would come from the verification service
      const suggestedPrice = parseInt(productData.askingPrice) * 0.9; // 10% lower as example
      toast({
        title: "AI Verification Complete",
        description: `Based on the condition and market value, we suggest pricing at ₹${suggestedPrice.toLocaleString()}.`,
      });
    }, 3000);
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
      
      // Reset form or redirect
      // window.location.href = '/';
    }, 2000);
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
                Our AI-powered platform helps you list, verify, and price your electronics for the best value.
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
            
            {step === 1 && (
              <Card className="glass p-6">
                <CardContent className="p-0">
                  <form className="space-y-6">
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your product, including its specifications, age, and any defects or issues."
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="askingPrice">Asking Price (₹)</Label>
                      <Input 
                        id="askingPrice"
                        name="askingPrice"
                        value={productData.askingPrice}
                        onChange={handleInputChange}
                        type="number"
                        placeholder="e.g. 45000"
                        required
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Upload Product Images</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-4">
                            Drag and drop your images here, or click to browse
                          </p>
                          <Button type="button" variant="secondary" onClick={() => document.getElementById('image-upload')?.click()}>
                            Browse Files
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
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
                    
                    <div className="flex justify-end pt-4">
                      <Button 
                        type="button" 
                        onClick={handleVerification}
                        disabled={!productData.title || !productData.description || !productData.category || !productData.condition || !productData.askingPrice || uploadedImages.length === 0}
                      >
                        Proceed to Verification
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {step === 2 && (
              <Card className="glass p-6">
                <CardContent className="p-0 flex flex-col items-center justify-center py-12">
                  <div className="w-20 h-20 rounded-full border-4 border-t-accent border-r-accent/30 border-b-accent/10 border-l-accent/50 animate-spin mb-6"></div>
                  <h3 className="text-xl font-medium mb-4">
                    AI Verification in Progress
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    Our AI is analyzing your product images to verify condition and authenticity.
                    This usually takes 15-30 seconds.
                  </p>
                  <div className="w-full max-w-md">
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full animate-pulse w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {step === 3 && (
              <Card className="glass p-6">
                <CardContent className="p-0">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-4 rounded-full bg-green-500/10">
                      <CheckCircle size={24} className="text-green-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium text-center mb-6">
                    Product Verification Complete
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      { name: "Product Authenticity", status: "Verified", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
                      { name: "Condition Assessment", status: productData.condition === 'excellent' ? "Confirmed Excellent" : "Confirmed " + productData.condition, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
                      { name: "Market Value", status: `₹${parseInt(productData.askingPrice).toLocaleString()} - Fair price`, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white/50 rounded-lg p-3">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center">
                          <span className="mr-2">{item.status}</span>
                          <div className={`p-1 rounded-full ${item.bg}`}>
                            <item.icon size={16} className={item.color} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <div className="bg-accent/10 rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Cpu size={18} className="text-accent mr-2" />
                        AI-Suggested Pricing
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Based on your product's condition and current market value, we suggest:
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold">₹{(parseInt(productData.askingPrice) * 0.9).toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-2">Recommended</span>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => {
                          setProductData({
                            ...productData,
                            askingPrice: (parseInt(productData.askingPrice) * 0.9).toString()
                          });
                        }}>
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="finalPrice">Final Listing Price (₹)</Label>
                        <Input 
                          id="finalPrice"
                          name="askingPrice"
                          value={productData.askingPrice}
                          onChange={handleInputChange}
                          type="number"
                          required
                        />
                      </div>
                      
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
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Listing Product..." : "List My Product"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sell;
