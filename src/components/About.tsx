import React from 'react';
import { Plane, Globe, Trophy, Users } from 'lucide-react';

const LOGO = 'https://d64gsuwffb70l.cloudfront.net/6a0922e24259d85049268cea_1778986175148_cc5266b7.png';

const stats = [
  { icon: Globe, value: '2', label: 'Countries' },
  { icon: Trophy, value: '2', label: 'Stadiums' },
  { icon: Plane, value: '1', label: 'Trip Booked' },
  { icon: Users, value: 'Day 1', label: 'Just Getting Started' },
];

const timeline = [
  { year: '2026', title: 'Home Pitch', text: "It all starts in Columbus, Ohio — repping the Crew at Scott's Miracle-Gro Field." },
  { year: '2026', title: 'First Stamp Abroad', text: 'Dortmund, Germany. Standing in front of the Yellow Wall for a BVB matchday.' },
  { year: 'NEXT', title: 'Madrid Awaits', text: 'Real Madrid at the Bernabéu — the next chapter of the journey.' },
  { year: 'SOON', title: 'The Open Road', text: 'More cities, more clubs, more chants. Follow along as the passport fills up.' },
];



const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div className="relative">
            <div className="absolute -inset-6 bg-[#D4AF37]/20 rounded-full blur-3xl" />
            <img src={LOGO} alt="Passport & Pitch" className="relative w-full max-w-md mx-auto rounded-full shadow-2xl" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#13294B] tracking-[0.4em] text-xs font-black">OUR STORY</span>
            </div>
            <h2 className="font-display text-[#13294B] text-5xl md:text-6xl tracking-wide mb-6 leading-none">
              ONE PASSPORT.<br />
              <span className="text-[#D4AF37]">EVERY PITCH.</span>
            </h2>
            <p className="text-[#13294B]/80 text-lg leading-relaxed mb-4">
              Passport &amp; Pitch is a love letter to the beautiful game and the cultures that wrap around it. We travel the world chasing matches that move us — and the food, music and people that come with them.
            </p>
            <p className="text-[#13294B]/80 text-lg leading-relaxed mb-6">
              From a sun-baked terrace in Naples to a freezing Kop on Merseyside, our mission is simple: tell the human stories that football tells better than anything else.
            </p>
            <div className="inline-block border-l-4 border-[#D4AF37] pl-5 font-serif italic text-[#13294B] text-xl">
              "Football is the world's most spoken language. We just translate the stories."
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-[#13294B] rounded-2xl p-6 text-center shadow-xl border-4 border-[#13294B] hover:border-[#D4AF37] transition-colors">
                <Icon className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                <div className="text-[#F4F1EA] font-display text-4xl md:text-5xl tracking-wide">{s.value}</div>
                <div className="text-[#F4F1EA]/70 text-xs font-bold tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div>
          <h3 className="font-display text-[#13294B] text-4xl md:text-5xl text-center mb-10 tracking-wide">THE JOURNEY SO FAR</h3>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#13294B]/20 -translate-y-1/2" />
            <div className="grid md:grid-cols-4 gap-6 md:gap-4 relative">
              {timeline.map((t, i) => (
                <div key={i} className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-[#13294B]/10 hover:border-[#D4AF37] transition-colors">
                  <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#D4AF37] ring-4 ring-[#F4F1EA]" />
                  <div className="text-[#2E5E4E] font-display text-3xl tracking-wide mb-1">{t.year}</div>
                  <div className="font-heading font-semibold text-[#13294B] tracking-wider text-sm uppercase mb-2">{t.title}</div>
                  <p className="text-[#13294B]/70 text-sm leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
