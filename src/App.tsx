/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PricingSection from './components/PricingSection';
import LogoMarquee from './components/LogoMarquee';
import ImageSection from './components/ImageSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import BackToTopButton from './components/BackToTopButton';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div
        className="bg-black min-h-screen font-sans text-white relative"
        style={{
          opacity: loading ? 0 : 1,
          transition: loading ? 'opacity 0.5s ease-out' : 'opacity 0.5s ease-out 0.6s',
        }}
      >
        <Header />
        <HeroSection />
        <AboutSection />
        <PricingSection />
        <LogoMarquee />
        <ImageSection />
        <Footer />
        <BackToTopButton />
      </div>
    </>
  );
}
