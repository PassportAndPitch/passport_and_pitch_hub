import React from 'react';
import { Instagram, Heart, MessageCircle, Play, ExternalLink } from 'lucide-react';

const TikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24z" />
  </svg>
);

const INSTAGRAM_HANDLE = 'passport_and_pitch';
const TIKTOK_HANDLE = 'passport.and.pitch';


const igPosts = [
  { img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80', likes: '2.4k', comments: '128', caption: 'Anfield on a Tuesday night. Nothing like it.' },
  { img: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&q=80', likes: '3.1k', comments: '201', caption: 'Buenos Aires — La Bombonera shook today.' },
  { img: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&q=80', likes: '1.8k', comments: '94', caption: 'Camp Nou under the lights.' },
  { img: 'https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?w=600&q=80', likes: '4.2k', comments: '312', caption: 'Match-day rituals in Rio.' },
  { img: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&q=80', likes: '2.9k', comments: '156', caption: 'Tokyo derby vibes.' },
  { img: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80', likes: '5.6k', comments: '478', caption: 'Cairo Derby was unreal.' },
];

const tiktokPosts = [
  { img: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80', views: '124k', likes: '18.2k', caption: 'POV: You walk out of Anfield' },
  { img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', views: '89k', likes: '12.4k', caption: 'J-League food tour' },
  { img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80', views: '210k', likes: '32.1k', caption: 'Maracanã from the cheap seats' },
  { img: 'https://images.unsplash.com/photo-1599982863449-99a31f293f1c?w=600&q=80', views: '67k', likes: '9.3k', caption: 'Allianz Arena turns red' },
  { img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80', views: '341k', likes: '52.8k', caption: 'Istanbul derby pyro show' },
  { img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80', views: '156k', likes: '21.7k', caption: 'Lisbon to Estádio da Luz' },
];

const Social: React.FC = () => {
  return (
    <section id="social" className="relative py-24 bg-[#13294B] overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] tracking-[0.4em] text-xs font-black">FOLLOW ALONG</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="font-display text-[#F4F1EA] text-5xl md:text-7xl tracking-wide mb-4">
            ON THE <span className="text-[#D4AF37]">SOCIALS</span>
          </h2>
          <p className="text-[#F4F1EA]/70 max-w-2xl mx-auto">
            New stadium, new city, new story — every week. Follow us live from the terraces.
          </p>
        </div>

        {/* Instagram */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-[#F4F1EA]/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#feda75] via-[#fa7e1e] to-[#d62976] flex items-center justify-center shadow-lg">
                <Instagram className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-[#F4F1EA] font-heading font-bold text-2xl tracking-tight">@{INSTAGRAM_HANDLE}</h3>
                <p className="text-[#F4F1EA]/60 text-sm">Latest from the grid</p>
              </div>
            </div>
            <a
              href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#D4AF37] text-[#13294B] font-heading font-bold tracking-wider text-xs uppercase rounded-full hover:bg-[#F4F1EA] transition-all flex items-center gap-2"
            >
              Follow on Instagram
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {igPosts.map((post, i) => (
              <a
                key={i}
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <img src={post.img} alt={post.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#13294B]/0 group-hover:bg-[#13294B]/80 transition-all duration-300 flex flex-col items-center justify-center p-3 opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-3 text-[#F4F1EA] font-black text-xs">
                    <span className="flex items-center gap-1"><Heart className="w-4 h-4 fill-current text-[#D4AF37]" />{post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{post.comments}</span>
                  </div>
                  <p className="text-[#F4F1EA]/90 text-[10px] text-center mt-2 line-clamp-2">{post.caption}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* TikTok */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-[#F4F1EA]/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shadow-lg">
                <TikTokIcon className="w-7 h-7 text-[#F4F1EA]" />
              </div>
              <div>
                <h3 className="text-[#F4F1EA] font-heading font-bold text-2xl tracking-tight">@{TIKTOK_HANDLE}</h3>
                <p className="text-[#F4F1EA]/60 text-sm">Match-day madness in 60 seconds</p>
              </div>
            </div>
            <a
              href={`https://tiktok.com/@${TIKTOK_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#D4AF37] text-[#13294B] font-heading font-bold tracking-wider text-xs uppercase rounded-full hover:bg-[#F4F1EA] transition-all flex items-center gap-2"
            >
              Follow on TikTok
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {tiktokPosts.map((post, i) => (
              <a
                key={i}
                href={`https://tiktok.com/@${TIKTOK_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-black"
              >
                <img src={post.img} alt={post.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-[11px] font-bold line-clamp-2 mb-1">{post.caption}</p>
                  <div className="flex items-center gap-2 text-white/90 text-[10px] font-black">
                    <span className="flex items-center gap-1"><Play className="w-3 h-3 fill-current" />{post.views}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3 fill-current" />{post.likes}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Social;
