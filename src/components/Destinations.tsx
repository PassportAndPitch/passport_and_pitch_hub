import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, ArrowRight, Plane } from 'lucide-react';

interface Destination {
  id: number;
  city: string;
  country: string;
  stadium: string;
  category: 'North America' | 'Europe' | 'Upcoming';
  date: string;
  image: string;
  excerpt: string;
  status: 'visited' | 'upcoming';
}

const DESTINATIONS: Destination[] = [
  {
    id: 1,
    city: 'Columbus, Ohio',
    country: 'USA',
    stadium: "Scott's Miracle-Gro Field — Columbus Crew",
    category: 'North America',
    date: '2026',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80',
    excerpt: 'Where the journey started in 2026. My hometown, my first club, and the heartbeat of the trip — the Columbus Crew.',
    status: 'visited',
  },
  {
    id: 2,
    city: 'Dortmund',
    country: 'Germany',
    stadium: 'Signal Iduna Park — Borussia Dortmund',
    category: 'Europe',
    date: '2026',
    image: 'https://d64gsuwffb70l.cloudfront.net/6a092cc4f8419a3382e07244_1779129593472_015e16d7.png',
    excerpt: 'The Yellow Wall in full voice. BVB at home is a bucket-list experience for any football fan — pure noise, pure passion.',
    status: 'visited',
  },
  {
    id: 3,
    city: 'Madrid',
    country: 'Spain',
    stadium: 'Santiago Bernabéu — Real Madrid',
    category: 'Upcoming',
    date: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80',
    excerpt: 'Next stop on the journey. Real Madrid at the Bernabéu — the cathedral of European football awaits.',
    status: 'upcoming',
  },
];


const CATEGORIES = ['All', 'North America', 'Europe', 'Upcoming'] as const;

const Destinations: React.FC = () => {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All');

  const filtered = useMemo(
    () => (filter === 'All' ? DESTINATIONS : DESTINATIONS.filter((d) => d.category === filter)),
    [filter]
  );

  return (
    <section id="destinations" className="relative py-24 bg-[#F4F1EA]">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#13294B] tracking-[0.4em] text-xs font-black">THE JOURNEY</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="font-display text-[#13294B] text-5xl md:text-7xl tracking-wide mb-4">
            FEATURED <span className="text-[#D4AF37]">DESTINATIONS</span>
          </h2>
          <p className="text-[#13294B]/70 max-w-2xl mx-auto">
            Every stamp tells a story. From my home pitch in Columbus to the Yellow Wall in Dortmund — and the next adventure on the horizon.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 md:px-5 py-2 rounded-full font-heading font-semibold tracking-wider text-xs uppercase transition-all border-2 ${
                filter === cat
                  ? 'bg-[#13294B] text-[#F4F1EA] border-[#13294B] shadow-lg scale-105'
                  : 'bg-transparent text-[#13294B] border-[#13294B]/30 hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((d) => {
            const isUpcoming = d.status === 'upcoming';
            return (
              <article
                key={d.id}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 ${
                  isUpcoming ? 'border-[#D4AF37]' : 'border-[#13294B]/10'
                }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={d.image}
                    alt={`${d.stadium} in ${d.city}`}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                      isUpcoming ? 'grayscale-[40%]' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13294B]/90 via-[#13294B]/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 text-[#13294B] text-[10px] font-black tracking-widest uppercase rounded-full"
                      style={{ backgroundColor: isUpcoming ? '#D4AF37' : '#2E5E4E', color: isUpcoming ? '#13294B' : '#F4F1EA' }}
                    >
                      {isUpcoming ? 'Next Trip' : d.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#F4F1EA] text-[#13294B] px-2 py-1 rounded text-[10px] font-black tracking-widest flex items-center gap-1 -rotate-3">
                    {isUpcoming ? <Plane className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                    {d.date}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-[#F4F1EA]/90 text-xs font-bold tracking-wider mb-1">
                      <MapPin className="w-3 h-3" />
                      {d.country.toUpperCase()}
                    </div>
                    <h3 className="text-[#F4F1EA] font-display text-3xl tracking-wide leading-tight">{d.city}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[#2E5E4E] font-heading font-semibold tracking-widest text-xs uppercase mb-2">{d.stadium}</div>
                  <p className="text-[#13294B]/80 text-sm leading-relaxed mb-4">{d.excerpt}</p>
                  <button
                    onClick={() =>
                      alert(
                        isUpcoming
                          ? `Follow along for the ${d.city} trip — coming soon!`
                          : `Read more about ${d.city} — full story coming soon!`
                      )
                    }
                    className="inline-flex items-center gap-2 text-[#13294B] font-heading font-semibold tracking-wider text-xs uppercase hover:gap-3 hover:text-[#D4AF37] transition-all group/btn"
                  >
                    {isUpcoming ? 'Follow The Journey' : 'Read Story'}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#13294B]/60">No destinations match this filter yet — stay tuned.</div>
        )}
      </div>
    </section>
  );
};

export default Destinations;
