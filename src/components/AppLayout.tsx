import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Destinations from './Destinations';
import WorldMap from './WorldMap';
import Social from './Social';
import About from './About';
import Newsletter from './Newsletter';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5e6d3] font-sans">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <WorldMap />
        <Social />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
