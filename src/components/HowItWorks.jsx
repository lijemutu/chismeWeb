import React from 'react';
import { Share2, PenSquare, Mic2, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Share2,
      color: "from-rose-500 to-rose-600",
      title: "Share Your Link On-Air",
      desc: "Drop your custom listener link in your Spotify show notes, YouTube description, or Instagram bio. No app downloads required."
    },
    {
      num: "02",
      icon: PenSquare,
      color: "from-amber-500 to-orange-600",
      title: "Listeners Draft With 0 Friction",
      desc: "Fans pick a topic, write their chisme, and attach photos or receipts. Regular listeners don't have to log in; Patrons verify with 1 click."
    },
    {
      num: "03",
      icon: Mic2,
      color: "from-purple-500 to-indigo-600",
      title: "Triage & Record Your Episode",
      desc: "Use browser Read Aloud to listen hands-free, rate stories 1-5 stars, and open our high-contrast Teleprompter when the 'ON AIR' light turns red."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Streamlined Production
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
            From Listener’s Brain to <span className="text-rose-400">Microphone</span> in 3 Steps
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Cut your episode prep time in half while delivering stories that keep your audience on the edge of their seats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-studio-900 border border-slate-800 rounded-3xl p-8 relative flex flex-col justify-between group hover:border-slate-700 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black font-mono text-slate-700 group-hover:text-rose-500/40 transition">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center text-xs text-rose-400 font-semibold">
                  <span>Fast & automated</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
