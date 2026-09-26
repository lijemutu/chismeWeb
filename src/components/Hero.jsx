import React from 'react';
import { 
  Sparkles, ArrowRight, Play, Volume2, ShieldCheck, 
  Crown, Flame, CheckCircle, Zap, Radio, Mic 
} from 'lucide-react';

export default function Hero({ onOpenDeployGuide }) {
  const scrollToDemo = () => {
    const el = document.getElementById('interactive-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Dynamic Background Gradients & Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-rose-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Pill Alert */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-studio-900 border border-rose-500/30 shadow-lg shadow-rose-950/20 mb-8 animate-float">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-xs font-semibold text-rose-300">
              Built Specifically for Story & Chisme Podcasts
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              Static Demo Ready
            </span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Stop digging through <span className="underline decoration-rose-500/50 decoration-wavy">messy Gmail</span> & Instagram DMs for listener tales.
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            A frictionless, zero-login submission portal for your listeners to submit ghost stories, workplace drama, and wild confessions — complete with <strong className="text-white font-semibold">Web Speech Read-Aloud</strong>, photo attachments, host ranking, and <strong className="text-amber-400 font-semibold">Patreon VIP flags</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={scrollToDemo}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-rose-950/60 flex items-center justify-center gap-2.5 transition transform active:scale-95 group"
            >
              <span>Try Live Interactive Studio</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenDeployGuide}
              className="w-full sm:w-auto px-7 py-4 bg-studio-900/90 hover:bg-studio-850 text-slate-200 hover:text-white font-semibold text-base rounded-2xl border border-slate-700/80 transition flex items-center justify-center gap-2.5 shadow-lg"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Deploy to Vercel / GitHub Pages</span>
            </button>
          </div>

          {/* Key Value Proposition Mini Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-studio-900/60 border border-slate-800/80 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Read Aloud TTS</span>
                <span className="text-[11px] text-slate-400">Hands-free preview</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-studio-900/60 border border-slate-800/80 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Patron VIP Sync</span>
                <span className="text-[11px] text-slate-400">Gold badges & priority</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-studio-900/60 border border-slate-800/80 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Zero Login Friction</span>
                <span className="text-[11px] text-slate-400">Listeners draft instantly</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-studio-900/60 border border-slate-800/80 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Spiciness & Ranking</span>
                <span className="text-[11px] text-slate-400">Triage stories fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
