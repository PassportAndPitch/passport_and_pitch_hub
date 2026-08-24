import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Plane } from 'lucide-react';

const LOGO = 'https://d64gsuwffb70l.cloudfront.net/6a0922e24259d85049268cea_1778986175148_cc5266b7.png';

const TikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24z"/>
  </svg>
);

const navLinks = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Stories', href: '#stories' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];


const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#13294B]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => handleNav('#hero')} className="flex items-center gap-3 group">
            <img src={LOGO} alt="Passport & Pitch" className="h-14 w-14 rounded-full ring-2 ring-[#D4AF37] group-hover:ring-[#F4F1EA] transition" />
            <div className="hidden sm:block text-left">
              <div className="text-[#F4F1EA] font-heading font-bold tracking-wider text-xl leading-tight">PASSPORT &amp; PITCH</div>
              <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] font-bold">FOOTBALL · CULTURE · ADVENTURE</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-[#F4F1EA] hover:text-[#D4AF37] font-heading font-medium tracking-wider text-sm uppercase transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://instagram.com/passport_and_pitch"

              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#F4F1EA] hover:text-[#D4AF37] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://tiktok.com/@passport.and.pitch"

              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#F4F1EA] hover:text-[#D4AF37] transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>
            <button
              onClick={() => handleNav('#newsletter')}
              className="ml-1 px-4 py-2.5 border border-[#F4F1EA]/40 hover:border-[#D4AF37] text-[#F4F1EA] hover:text-[#D4AF37] font-heading font-bold tracking-wider text-sm uppercase rounded-full transition-all flex items-center gap-2"
            >
              <Plane className="w-4 h-4" />
              Plan Your Trip
            </button>

          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#F4F1EA]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t border-[#F4F1EA]/20 bg-[#13294B]/95 -mx-4 sm:-mx-6 px-4 sm:px-6">
            <nav className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-[#F4F1EA] hover:text-[#D4AF37] font-heading font-medium tracking-wider uppercase"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-4 pt-2">

                <a href="https://instagram.com/passport_and_pitch" target="_blank" rel="noopener noreferrer" className="text-[#F4F1EA]">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://tiktok.com/@passport.and.pitch" target="_blank" rel="noopener noreferrer" className="text-[#F4F1EA]">
                  <TikTokIcon className="w-6 h-6" />
                </a>
              </div>

              <button
                onClick={() => handleNav('#newsletter')}
                className="px-5 py-3 border border-[#F4F1EA]/40 text-[#F4F1EA] font-heading font-bold tracking-wider uppercase rounded-full"
              >
                Plan Your Trip
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
