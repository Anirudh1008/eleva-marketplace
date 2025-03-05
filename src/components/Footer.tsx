import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">Eleva</span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              An AI-powered electronics marketplace that transforms how you buy and sell 
              devices with smart verification, pricing insights, and fraud protection.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={18} />, label: "Facebook" },
                { icon: <Twitter size={18} />, label: "Twitter" },
                { icon: <Instagram size={18} />, label: "Instagram" },
                { icon: <Linkedin size={18} />, label: "LinkedIn" },
                { icon: <Github size={18} />, label: "GitHub" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {[
            {
              title: "Products",
              links: ["Smartphones", "Laptops", "Audio", "Wearables", "Gaming", "Accessories"]
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Press", "Partners", "Contact"]
            },
            {
              title: "Resources",
              links: ["Help Center", "Verification Guide", "Seller Tips", "Buyer Protection", "API"]
            }
          ].map((column, idx) => (
            <div key={idx}>
              <h3 className="font-bold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href="#" 
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <hr className="border-primary-foreground/20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Eleva. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-foreground/60">
            <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
