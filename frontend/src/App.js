import React from 'react';
import HeroSection from './components/HeroSection';
import KeyFeatures from './components/KeyFeatures';
import MapPreviewWithGeolocation from './components/GeoLocation';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './components/themecontext';
import { AuthProvider } from './components/authcontext';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app">
          <HeroSection />
          <KeyFeatures />
          <MapPreviewWithGeolocation />
          <HowItWorks />
          <Testimonials />
          <Footer />
          <ThemeToggle />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;