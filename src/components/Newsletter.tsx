import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email');
      return;
    }
    setStatus('loading');

    setErrorMsg('');

    try {
            // Backup: store subscriber in Supabase database
      const { error: dbError } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email,
          name: name || null,
          source: 'newsletter-postcard',
          tags: ['newsletter', 'postcard'],
        });
      if (dbError && dbError.code !== '23505') {
        // 23505 = unique violation (already subscribed) — that's fine
        console.error('DB backup failed:', dbError);
      }

      // Send notification email to Jeremy via Resend
      const { error: notifyError } = await supabase.functions.invoke('notify-newsletter-signup', {
        body: { email, name, source: 'newsletter-postcard' },
      });
      if (notifyError) {
        console.error('Notification email failed:', notifyError);
      }

      // Send automated welcome email to the new subscriber (fire and don't block)
      supabase.functions
        .invoke('send-welcome-email', { body: { email, name } })
        .then(({ error: welcomeError }) => {
          if (welcomeError) console.error('Welcome email failed:', welcomeError);
        });


      setStatus('success');
      setEmail('');
      setName('');
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong. Try again.');
    }
  };



  return (
    <section id="newsletter" className="relative py-24 bg-[#13294B] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] tracking-[0.4em] text-xs font-black">JOIN THE TRIP</span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="font-display text-[#F4F1EA] text-5xl md:text-6xl tracking-wide">
            POSTCARDS FROM <span className="text-[#D4AF37]">THE PITCH</span>
          </h2>
        </div>

        {/* Postcard */}
        <div className="relative -rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="bg-[#F4F1EA] rounded-lg shadow-2xl p-6 md:p-10 border-2 border-[#13294B]/20 relative overflow-hidden">
            {/* Stamp */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-20 h-24 md:w-24 md:h-28 border-4 border-dashed border-[#D4AF37]/60 rounded flex flex-col items-center justify-center p-1 rotate-6">
              <div className="text-[#13294B] font-black text-[8px] md:text-[10px] tracking-widest text-center">PASSPORT</div>
              <div className="text-[#D4AF37] font-black text-[8px] md:text-[10px] tracking-widest text-center">&amp; PITCH</div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#13294B]/10 my-1 flex items-center justify-center">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#13294B]" />
              </div>
              <div className="text-[#13294B] font-black text-[7px] md:text-[8px] tracking-widest">AIRMAIL</div>
            </div>

            <div className="max-w-xl">
              <h3 className="font-display text-[#13294B] text-3xl md:text-4xl tracking-wide mb-3">
                Get the next destination in your inbox.
              </h3>
              <p className="text-[#13294B]/70 mb-6 text-sm md:text-base">
                Monthly drops: match recaps, hidden food spots, travel hacks and ticket alerts before they go live.
              </p>

              {status === 'success' ? (
                <div className="flex items-center gap-3 p-4 bg-[#2E5E4E]/15 border-2 border-[#2E5E4E] rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[#2E5E4E] flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#F4F1EA]" />
                  </div>
                  <div>
                    <div className="font-black text-[#13294B] tracking-wider text-sm uppercase">You're in!</div>
                    <div className="text-[#13294B]/70 text-xs">Check your inbox — first postcard incoming.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border-2 border-[#13294B]/20 rounded-lg text-[#13294B] placeholder-[#13294B]/40 focus:outline-none focus:border-[#D4AF37] font-medium"
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      required
                      placeholder="you@traveler.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/60 border-2 border-[#13294B]/20 rounded-lg text-[#13294B] placeholder-[#13294B]/40 focus:outline-none focus:border-[#D4AF37] font-medium"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="px-6 py-3 bg-[#D4AF37] hover:bg-[#c19f2e] disabled:opacity-60 text-[#13294B] font-heading font-bold tracking-wider text-sm uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      {status === 'loading' ? 'Sending...' : (<><Send className="w-4 h-4" />Subscribe</>)}
                    </button>
                  </div>
                  {status === 'error' && <p className="text-red-600 text-sm font-bold">{errorMsg}</p>}
                  <p className="text-[#13294B]/50 text-xs">No spam — just stories. Unsubscribe anytime.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
