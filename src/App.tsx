
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import NetworkStatus from "./components/NetworkStatus";
import { Suspense, lazy, useEffect } from "react";
import { useRoutePreloader } from "./hooks/usePrefetch";
// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const ServicesPage = lazy(() => import("./pages/Services"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorks"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const BookingsDashboardPage = lazy(() => import("./pages/BookingsDashboardPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useRoutePreloader();
  
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch(() => console.log('SW registration failed'));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <NetworkStatus />
          <BrowserRouter>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
                <div className="text-center space-y-4">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/bookings-dashboard" element={<BookingsDashboardPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
