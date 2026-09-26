import React from 'react';
import { XCircle, CheckCircle2, Mail, MessageSquare, Clock, Zap, Crown, Flame, AlertTriangle } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section className="py-20 bg-studio-950/80 border-t border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            The Content Creator Dilemma
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Why Gmail & Instagram DMs are Killing Your Show Prep
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Your listeners have incredible stories. But hunting through dozens of unformatted emails 30 minutes before hitting record is stressful and chaotic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Old Way: Gmail / Instagram */}
          <div className="p-8 rounded-3xl bg-studio-900/50 border border-red-500/20 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-500/10">
              <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The Old Way</h3>
                <p className="text-xs text-slate-400">Messy Gmail inbox & Instagram DMs</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Buried Attachments:</strong> Listener photos and screenshots get lost in Google Drive links or expire in Instagram disappearing DMs.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>No Word Count / Time Estimate:</strong> You start reading a tale on air, only to realize midway it's a 15-minute essay or has zero punchline.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Reading Fatigue:</strong> Hosts must read every single 1,000-word email manually just to see if it's worth airing.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Forgotten Patrons:</strong> VIP paying supporters get drowned out among hundreds of spam and promo emails.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Co-host Disorganization:</strong> "Hey, did you read that ghost story from Maria?" "Wait, which thread was that?"</span>
              </li>
            </ul>
          </div>

          {/* The New Way: ChismeWeb */}
          <div className="p-8 rounded-3xl bg-studio-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-500/10">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">With ChismeWeb</h3>
                <p className="text-xs text-emerald-400 font-medium">Episode-ready stories in 1 click</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Zero-Login Drafts:</strong> Listeners click your link from your YouTube/Spotify description and submit in 60 seconds.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>One-Click Read Aloud:</strong> Click Play to hear Web Speech narrate the submission while you prep coffee or gear.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Patreon Priority Badges:</strong> Glowing VIP cards ensure paying members get prioritized airtime and recognition.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Categorized Channels:</strong> Filter instantly by Paranormal, Petty Revenge, Workplace Tea, or Dating Disasters.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Studio Teleprompter:</strong> Full-screen high-contrast live mode formatted for reading into the mic.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
