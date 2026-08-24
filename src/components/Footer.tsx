import React, { useState } from 'react';
import { Instagram, Mail, MapPin, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';


const LOGO = 'https://d64gsuwffb70l.cloudfront.net/6a0922e24259d85049268cea_1778986175148_cc5266b7.png';

const TikTokIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24z" />
  </svg>
);

const Footer: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    try {
      // Add to CRM list
      await fetch('/api/crm/6a092cc4f8419a3382e07244/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.name, message: form.message, source: 'footer-contact', tags: ['contact-form'] }),
      });

      // Send notification email to Jeremy via Resend
      const { error: notifyError } = await supabase.functions.invoke('notify-newsletter-signup', {
        body: { email: form.email, name: form.name, source: `footer-contact${form.message ? ` — Message: ${form.message}` : ''}` },
      });
      if (notifyError) {
        console.error('Notification email failed:', notifyError);
      }
    } catch (err) {
      // still show success UI to user
    }
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };


  return (
    <footer id="contact" className="relative bg-[#0A1A2E] text-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={LOGO} alt="Passport & Pitch" className="w-20 h-20 rounded-full mb-4 ring-2 ring-[#D4AF37]/40" />
            <div className="font-heading font-bold text-2xl tracking-wide mb-2">PASSPORT &amp; PITCH</div>
            <div className="text-[#D4AF37] text-[10px] tracking-[0.3em] font-bold mb-4">FOOTBALL · CULTURE · ADVENTURE</div>
            <p className="text-[#F4F1EA]/60 text-sm leading-relaxed">
              Telling the world's football stories one stadium at a time.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://instagram.com/passport_and_pitch" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#feda75] via-[#fa7e1e] to-[#d62976] flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="https://tiktok.com/@passport.and.pitch" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform">
                <TikTokIcon className="w-5 h-5 text-[#F4F1EA]" />
              </a>

              <a href="mailto:hello@passportandpitch.com" aria-label="Email"
                className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-[#13294B]" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading font-semibold tracking-widest text-sm uppercase mb-4 text-[#D4AF37]">Explore</h4>
            <ul className="space-y-2 text-sm">
              {['Destinations', 'Stories', 'Stadiums', 'Travel Guides', 'Match Reviews'].map((l) => (
                <li key={l}>
                  <a href="#destinations" className="text-[#F4F1EA]/70 hover:text-[#D4AF37] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner */}
          <div>
            <h4 className="font-heading font-semibold tracking-widest text-sm uppercase mb-4 text-[#D4AF37]">Work With Us</h4>
            <ul className="space-y-2 text-sm">
              {['Partnerships', 'Collaborations', 'Press', 'Group Trips', 'Speaking'].map((l) => (
                <li key={l}>
                  <a href="#contact" className="text-[#F4F1EA]/70 hover:text-[#D4AF37] transition-colors">{l}</a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-2 text-sm text-[#F4F1EA]/70">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span>Currently broadcasting from: wherever the next match is.</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold tracking-widest text-sm uppercase mb-4 text-[#D4AF37]">Get In Touch</h4>
            {sent ? (
              <div className="p-4 rounded-lg bg-[#2E5E4E]/20 border border-[#2E5E4E] text-sm">
                Thanks! We'll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-[#F4F1EA]/20 rounded text-sm placeholder-[#F4F1EA]/40 focus:outline-none focus:border-[#D4AF37]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-[#F4F1EA]/20 rounded text-sm placeholder-[#F4F1EA]/40 focus:outline-none focus:border-[#D4AF37]"
                />
                <textarea
                  placeholder="Message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-[#F4F1EA]/20 rounded text-sm placeholder-[#F4F1EA]/40 focus:outline-none focus:border-[#D4AF37] resize-none"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#D4AF37] hover:bg-[#c19f2e] text-[#13294B] font-heading font-bold tracking-wider text-xs uppercase rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3 h-3" />
                  Send
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-[#F4F1EA]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F4F1EA]/50">
          <div>© {new Date().getFullYear()} Passport &amp; Pitch. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D4AF37]">Privacy</a>
            <a href="#" className="hover:text-[#D4AF37]">Terms</a>
            <a href="#contact" className="hover:text-[#D4AF37]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
