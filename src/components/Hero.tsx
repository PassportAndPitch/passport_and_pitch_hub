import React from 'react';
import { ChevronDown, MapPin } from 'lucide-react';

const LOGO = 'https://d64gsuwffb70l.cloudfront.net/6a0922e24259d85049268cea_1778986175148_cc5266b7.png';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(135deg, rgba(13,41,75,0.94) 0%, rgba(13,41,75,0.88) 50%, rgba(13,13,13,0.82) 100%), url(https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Stamp accents */}
      <div className="absolute top-28 left-8 hidden md:block opacity-30 -rotate-12">
        <div className="border-4 border-[#D4AF37] px-6 py-2 text-[#D4AF37] font-black tracking-[0.3em] text-xs">
          EST. 2026
        </div>
      </div>
      <div className="absolute bottom-32 right-8 hidden md:block opacity-30 rotate-12">
        <div className="border-4 border-[#D4AF37] px-6 py-2 text-[#D4AF37] font-black tracking-[0.3em] text-xs">
          WORLDWIDE
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Spinning logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#D4AF37]/25 blur-3xl scale-110 animate-pulse" />
            <img
              src={LOGO}
              alt="Passport & Pitch"
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl ring-4 ring-[#D4AF37]/40 hover:rotate-[360deg] transition-transform duration-[3000ms]"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] tracking-[0.4em] text-xs font-bold">SINCE 2026</span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </div>

        <h1 className="font-display text-[#F4F1EA] text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] tracking-wide leading-none mb-6 break-words">
          PASSPORT
          <span className="text-[#D4AF37] mx-2 md:mx-4">&amp;</span>
          PITCH
        </h1>

        <p className="text-[#F4F1EA]/90 text-sm sm:text-lg md:text-2xl font-heading font-semibold tracking-[0.2em] sm:tracking-[0.3em] mb-4 px-2">
          FOOTBALL · CULTURE · ADVENTURE
        </p>


        <p className="text-[#F4F1EA]/80 max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed">
          Chasing matches, cultures and stories across every continent. Join the journey through the world's most iconic stadiums and the cities that breathe football.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('#destinations')}
            className="px-8 py-4 bg-[#D4AF37] hover:bg-[#c19f2e] text-[#13294B] font-heading font-bold tracking-wider uppercase rounded-full transition-all hover:scale-105 shadow-2xl flex items-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            Explore Destinations
          </button>
          <button
            onClick={() => scrollTo('#social')}
            className="px-8 py-4 bg-transparent border-2 border-[#F4F1EA] text-[#F4F1EA] hover:bg-[#F4F1EA] hover:text-[#13294B] font-heading font-bold tracking-wider uppercase rounded-full transition-all"
          >
            Follow The Journey
          </button>
        </div>

        <button
          onClick={() => scrollTo('#destinations')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#F4F1EA]/70 hover:text-[#D4AF37] animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
