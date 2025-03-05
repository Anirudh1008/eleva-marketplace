
import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle, AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AIVerification: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [verificationState, setVerificationState] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      simulateVerification();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateVerification();
    }
  };
  
  const simulateVerification = () => {
    setVerificationState('uploading');
    
    setTimeout(() => {
      setVerificationState('processing');
      
      setTimeout(() => {
        // Random success or error state
        setVerificationState(Math.random() > 0.2 ? 'success' : 'error');
      }, 2000);
    }, 1500);
  };
  
  return (
    <section className="section-container bg-gradient-to-br from-accent/5 to-transparent rounded-3xl">
      <div className="flex flex-col md:flex-row items-center md:space-x-12 space-y-10 md:space-y-0">
        <div className="md:w-1/2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 animate-fade-in">
            <Zap size={14} className="mr-1" />
            <span>AI-Powered Verification</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Verify Any Electronic Device with AI
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Our advanced AI technology can detect screen issues, speaker quality, 
            battery health, and other potential problems by analyzing photos and videos 
            of the device.
          </p>
          
          <div className="flex flex-col space-y-4">
            {[
              { title: "Screen Condition Analysis", description: "Detect cracks, dead pixels, and touch issues" },
              { title: "Audio Component Testing", description: "Verify speaker and microphone quality" },
              { title: "Physical Damage Detection", description: "Identify dents, scratches, and wear patterns" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="mt-1 p-1 rounded-full bg-accent/10">
                  <CheckCircle size={16} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2 w-full">
          <div 
            className={`relative rounded-xl glass transition-all duration-300 ${
              isDragging ? 'border-accent bg-accent/5' : 'border-white/40'
            } ${
              verificationState === 'idle' || verificationState === 'uploading' 
                ? 'h-80' 
                : 'h-auto'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {verificationState === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="p-4 rounded-full bg-accent/10 mb-4">
                  <Upload size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Upload Device Images
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Drag and drop your device photos here, or click to browse. We recommend
                  uploading 3-5 photos from different angles.
                </p>
                <Button onClick={() => document.getElementById('file-upload')?.click()}>
                  Browse Files
                </Button>
                <input 
                  id="file-upload"
                  type="file" 
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
            
            {verificationState === 'uploading' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full border-4 border-t-accent border-r-accent/30 border-b-accent/10 border-l-accent/50 animate-spin mb-6"></div>
                <h3 className="text-xl font-medium mb-2">
                  Uploading Images...
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Please wait while we upload your images to our AI system.
                </p>
              </div>
            )}
            
            {verificationState === 'processing' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="p-4 rounded-full bg-yellow-500/10 mb-4">
                  <Zap size={24} className="text-yellow-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  AI Analysis in Progress
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Our AI is analyzing your device for potential issues. This usually 
                  takes 20-30 seconds.
                </p>
                
                <div className="w-full max-w-sm mt-6">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full animate-pulse-light w-3/4"></div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {['Screen', 'Body', 'Camera'].map((item, idx) => (
                      <div key={idx} className="text-center">
                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full animate-pulse-light" 
                            style={{ 
                              width: `${(idx + 1) * 30}%`,
                              animationDelay: `${idx * 0.2}s` 
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {verificationState === 'success' && (
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 rounded-full bg-green-500/10">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                </div>
                
                <h3 className="text-xl font-medium text-center mb-6">
                  Device Verification Complete
                </h3>
                
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Screen Condition", status: "No issues detected", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
                    { name: "Physical Condition", status: "Minor wear detected", icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                    { name: "Camera Quality", status: "Excellent", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
                    { name: "Battery Health", status: "Good - 87%", icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" }
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
                
                <div className="flex justify-center">
                  <Button onClick={() => setVerificationState('idle')}>
                    Verify Another Device
                  </Button>
                </div>
              </div>
            )}
            
            {verificationState === 'error' && (
              <div className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 rounded-full bg-red-500/10">
                    <XCircle size={24} className="text-red-500" />
                  </div>
                </div>
                
                <h3 className="text-xl font-medium text-center mb-4">
                  Verification Issues Detected
                </h3>
                
                <p className="text-center text-muted-foreground mb-6">
                  Our AI has detected some potential issues with the device.
                </p>
                
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Screen Condition", status: "Screen crack detected", icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
                    { name: "Physical Condition", status: "Significant wear", icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                    { name: "Camera Quality", status: "Lens scratches", icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                    { name: "Battery Health", status: "Poor - 72%", icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" }
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
                
                <div className="flex justify-center">
                  <Button onClick={() => setVerificationState('idle')}>
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIVerification;
