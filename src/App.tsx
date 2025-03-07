
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Compare from "./pages/Compare";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Sell from "./pages/Sell";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import AIVerification from "./pages/AIVerification";
import SmartPricing from "./pages/SmartPricing";
import InstantComparison from "./pages/InstantComparison";
import SwapTrade from "./pages/SwapTrade";
import Wishlist from "./pages/Wishlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/ai-verification" element={<AIVerification />} />
          <Route path="/smart-pricing" element={<SmartPricing />} />
          <Route path="/instant-comparison" element={<InstantComparison />} />
          <Route path="/swap-trade" element={<SwapTrade />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
