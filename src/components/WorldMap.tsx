import React, { useState } from 'react';
import { MapPin, X, ArrowRight, Calendar, Trophy, Plane } from 'lucide-react';

interface Stadium {
  id: number;
  name: string;
  city: string;
  country: string;
  match: string;
  date: string;
  lat: number;
  lng: number;
  storyUrl: string;
  status: 'visited' | 'upcoming';
  note?: string;
}

const STADIUMS: Stadium[] = [
  {
    id: 1,
    name: "Scott's Miracle-Gro Field",
    city: 'Columbus, Ohio',
    country: 'USA',
    match: 'Columbus Crew (Home Club)',
    date: 'Home Base — 2026',
    lat: 39.9697,
    lng: -83.0202,
    storyUrl: '#destinations',
    status: 'visited',
    note: 'Where it all started — my home city and my first club.',
  },

  {
    id: 2,
    name: 'Signal Iduna Park',
    city: 'Dortmund',
    country: 'Germany',
    match: 'Borussia Dortmund (BVB)',
    date: 'Visited — 2026',
    lat: 51.4926,
    lng: 7.4517,
    storyUrl: '#destinations',
    status: 'visited',
    note: 'The Yellow Wall — 25,000 voices and pure goosebumps.',
  },

  {
    id: 3,
    name: 'Santiago Bernabéu',
    city: 'Madrid',
    country: 'Spain',
    match: 'Real Madrid (Next Trip)',
    date: 'Coming Soon',
    lat: 40.4530,
    lng: -3.6883,
    storyUrl: '#destinations',
    status: 'upcoming',
    note: 'Up next on the journey — the cathedral of European football.',
  },
];

// Equirectangular projection: lat/lng -> percentage on the map image
const project = (lat: number, lng: number) => ({
  x: ((lng + 180) / 360) * 100,
  y: ((90 - lat) / 180) * 100,
});

const WorldMap: React.FC = () => {
  const [selected, setSelected] = useState<Stadium | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleStoryClick = (url: string) => {
    setSelected(null);
    setTimeout(() => {
      document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const visitedCount = STADIUMS.filter((s) => s.status === 'visited').length;
  const upcomingCount = STADIUMS.filter((s) => s.status === 'upcoming').length;

  return (
    <section id="map" className="relative py-24 bg-[#f5e6d3]">
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#13294B] tracking-[0.4em] text-xs font-black">THE ATLAS</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="font-display text-[#13294B] text-5xl md:text-7xl tracking-wide mb-4">
            STADIUMS <span className="text-[#D4AF37]">VISITED</span>
          </h2>
          <p className="text-[#1a3a52]/70 max-w-2xl mx-auto">
            Every pin is a match attended, a city walked and a story told. Tap a pin to dive in.
          </p>
        </div>

        {/* Map container */}
        <div className="relative bg-[#1a3a52] rounded-3xl p-4 md:p-8 shadow-2xl border-4 border-[#1a3a52]">
          <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-[#1a3a52]">
            {/* SVG world map (continents) */}
            <svg
              viewBox="0 0 2000 1000"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
              aria-hidden="true"
            >
              {/* subtle grid lines (longitude/latitude) */}
              <g stroke="#f5e6d3" strokeWidth="0.5" opacity="0.08">
                {[...Array(11)].map((_, i) => (
                  <line key={`v${i}`} x1={(i * 2000) / 10} y1="0" x2={(i * 2000) / 10} y2="1000" />
                ))}
                {[...Array(7)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={(i * 1000) / 6} x2="2000" y2={(i * 1000) / 6} />
                ))}
              </g>

              {/* Simplified continents — stylized blobs (equirectangular-friendly) */}
              <g fill="#f5e6d3" opacity="0.85">
                {/* North America */}
                <path d="M180,180 Q220,140 320,150 L420,170 Q500,180 540,230 L560,310 Q540,360 480,380 L420,400 Q360,410 320,390 L280,380 L240,420 L200,440 L170,420 L150,370 L140,300 L150,240 Z" />
                {/* Central America */}
                <path d="M420,420 L470,440 L510,470 L530,500 L500,510 L460,500 L430,470 Z" />
                {/* South America */}
                <path d="M520,540 Q570,520 610,540 L650,580 L670,650 L660,730 L630,810 L590,860 L550,870 L520,830 L500,770 L490,690 L500,610 Z" />
                {/* Greenland */}
                <path d="M620,80 L700,90 L740,140 L720,180 L660,180 L620,150 Z" />
                {/* Europe */}
                <path d="M900,160 L1000,150 L1080,170 L1120,210 L1100,260 L1040,290 L980,290 L920,270 L890,230 Z" />
                {/* Africa */}
                <path d="M970,330 Q1020,310 1080,330 L1140,360 L1170,420 L1180,500 L1160,580 L1110,650 L1060,680 L1010,670 L970,620 L950,540 L955,440 Z" />
                {/* Middle East */}
                <path d="M1140,290 L1220,280 L1260,310 L1270,360 L1230,390 L1180,380 L1150,350 Z" />
                {/* Asia (main) */}
                <path d="M1200,160 L1380,150 L1520,170 L1620,210 L1680,260 L1700,320 L1660,360 L1580,370 L1480,360 L1380,340 L1300,310 L1240,280 L1200,230 Z" />
                {/* India / South Asia */}
                <path d="M1340,360 L1410,360 L1440,400 L1430,460 L1390,490 L1360,470 L1340,420 Z" />
                {/* Southeast Asia */}
                <path d="M1540,400 L1620,400 L1660,430 L1680,470 L1640,500 L1580,500 L1540,470 Z" />
                {/* Indonesia / archipelago */}
                <path d="M1560,520 L1650,520 L1720,530 L1700,560 L1620,560 L1560,550 Z" />
                {/* Australia */}
                <path d="M1620,640 Q1700,620 1780,640 L1830,680 L1820,730 L1760,760 L1680,760 L1620,730 L1600,690 Z" />
                {/* New Zealand */}
                <path d="M1860,770 L1900,780 L1910,810 L1880,820 L1860,800 Z" />
                {/* Japan */}
                <path d="M1740,270 L1770,280 L1780,310 L1760,330 L1740,310 Z" />
                {/* British Isles */}
                <path d="M870,180 L900,180 L905,220 L880,235 L865,215 Z" />
                {/* Iberia */}
                <path d="M900,260 L950,260 L955,295 L920,300 L895,285 Z" />
                {/* Scandinavia */}
                <path d="M1000,100 L1060,110 L1080,170 L1040,180 L1010,150 Z" />
                {/* Madagascar */}
                <path d="M1180,580 L1200,580 L1210,630 L1195,650 L1180,620 Z" />
              </g>

              {/* Dotted travel routes — Columbus → Dortmund → Madrid */}
              <g stroke="#4a7c2c" strokeWidth="2.5" strokeDasharray="4 6" fill="none" opacity="0.55">
                {/* Columbus (~28.6%, 50%) -> Dortmund (~52.1%, 38.6%) */}
                <path d="M540,500 Q800,380 1042,386" />
              </g>
              <g stroke="#c8a05a" strokeWidth="2.5" strokeDasharray="2 8" fill="none" opacity="0.7">
                {/* Dortmund -> Madrid (~49%, 49.7%) (upcoming - gold dashed) */}
                <path d="M1042,386 Q1000,440 980,497" />
              </g>
            </svg>

            {/* Pins */}
            {STADIUMS.map((s) => {
              const { x, y } = project(s.lat, s.lng);
              const isHovered = hovered === s.id;
              const isSelected = selected?.id === s.id;
              const isUpcoming = s.status === 'upcoming';
              const pinColor = isUpcoming ? '#c8a05a' : '#4a7c2c';
              return (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="absolute -translate-x-1/2 -translate-y-full group focus:outline-none"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  aria-label={`${s.name}, ${s.city}`}
                >
                  {/* Pulse ring */}
                  <span
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1 w-3 h-3 rounded-full opacity-60 animate-ping"
                    style={{ backgroundColor: pinColor }}
                  />
                  {/* Pin */}
                  <span
                    className={`relative inline-flex flex-col items-center transition-transform ${
                      isHovered || isSelected ? 'scale-125' : 'scale-100'
                    }`}
                  >
                    {isUpcoming ? (
                      <Plane
                        className="drop-shadow-lg w-6 h-6 md:w-7 md:h-7"
                        style={{ color: pinColor }}
                        strokeWidth={2.5}
                      />
                    ) : (
                      <MapPin
                        className="drop-shadow-lg w-6 h-6 md:w-7 md:h-7"
                        style={{ color: pinColor }}
                        fill={isSelected || isHovered ? pinColor : '#1a3a52'}
                        strokeWidth={2.5}
                      />
                    )}
                  </span>

                  {/* Tooltip on hover */}
                  {isHovered && !isSelected && (
                    <span className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap px-2 py-1 rounded bg-[#f5e6d3] text-[#1a3a52] text-[10px] font-black tracking-wider uppercase shadow-lg pointer-events-none">
                      {s.city}
                      {isUpcoming && <span className="ml-1 text-[#c8a05a]">• NEXT</span>}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 px-2">
            <div className="flex flex-wrap items-center gap-4 text-[#f5e6d3]/80 text-xs font-bold tracking-widest uppercase">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4a7c2c]" fill="#4a7c2c" />
                {visitedCount} Visited
              </span>
              <span className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#c8a05a]" />
                {upcomingCount} Upcoming
              </span>
            </div>
            <div className="text-[#f5e6d3]/60 text-xs">Click any pin to read the story</div>
          </div>
        </div>
      </div>

      {/* Popup modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-[#f5e6d3] rounded-2xl max-w-md w-full shadow-2xl border-4 border-[#1a3a52] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#1a3a52] hover:bg-[#4a7c2c] text-[#f5e6d3] flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-[#1a3a52] p-6 pb-8 relative">
              <div
                className="absolute top-3 left-3 px-2 py-1 text-[#f5e6d3] text-[9px] font-black tracking-[0.3em] uppercase rounded"
                style={{ backgroundColor: selected.status === 'upcoming' ? '#c8a05a' : '#4a7c2c' }}
              >
                {selected.status === 'upcoming' ? 'Next Trip' : `Stamp #${String(selected.id).padStart(3, '0')}`}
              </div>
              <div className="mt-6 flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: selected.status === 'upcoming' ? '#c8a05a' : '#4a7c2c' }}
                >
                  {selected.status === 'upcoming' ? (
                    <Plane className="w-6 h-6 text-[#f5e6d3]" />
                  ) : (
                    <MapPin className="w-6 h-6 text-[#f5e6d3]" />
                  )}
                </div>
                <div>
                  <div className="text-[#4a7c2c] text-xs font-black tracking-widest uppercase mb-1">
                    {selected.country}
                  </div>
                  <h3 className="text-[#f5e6d3] font-black text-2xl tracking-tight leading-none">
                    {selected.name}
                  </h3>
                  <div className="text-[#f5e6d3]/70 text-sm mt-1">{selected.city}</div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-[#4a7c2c] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#1a3a52]/60 text-[10px] font-black tracking-widest uppercase">Club</div>
                  <div className="text-[#1a3a52] font-bold">{selected.match}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#4a7c2c] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[#1a3a52]/60 text-[10px] font-black tracking-widest uppercase">Status</div>
                  <div className="text-[#1a3a52] font-bold">{selected.date}</div>
                </div>
              </div>
              {selected.note && (
                <p className="text-[#1a3a52]/80 text-sm leading-relaxed italic border-l-2 border-[#4a7c2c] pl-3">
                  {selected.note}
                </p>
              )}

              <button
                onClick={() => handleStoryClick(selected.storyUrl)}
                className="w-full mt-2 px-5 py-3 bg-[#4a7c2c] hover:bg-[#3a6322] text-[#f5e6d3] font-black tracking-wider text-sm uppercase rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {selected.status === 'upcoming' ? 'Follow The Journey' : 'Read The Story'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WorldMap;
