import React, { useState } from 'react';
import { Calculator as CalcIcon, Clock, DollarSign, Sparkles, TrendingUp, Check } from 'lucide-react';

export default function Calculator() {
  const [weeklySubmissions, setWeeklySubmissions] = useState(25);
  const [patronConversionRate, setPatronConversionRate] = useState(8); // %

  // Formulas
  // Average minutes to read, file, check attachments manually via email: ~8 mins per submission
  // With ChismeWeb (TTS + filters + ready cards): ~2 mins per submission
  const minutesSavedPerStory = 6;
  const hoursSavedPerMonth = Math.round((weeklySubmissions * 4 * minutesSavedPerStory) / 60);

  // Patreon boost: having a dedicated VIP flag encourages active listeners to subscribe
  const potentialNewPatrons = Math.round(weeklySubmissions * 4 * (patronConversionRate / 100));
  const estimatedPatreonMonthlyGrowth = potentialNewPatrons * 8; // Avg $8/mo tier

  return (
    <section className="py-20 bg-studio-950/60 border-t border-b border-slate-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Show ROI Calculator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            How Much Time Will ChismeWeb Save Your Podcast?
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Calculate your time saved and see how Patron VIP flags convert listeners into monthly supporters.
          </p>
        </div>

        <div className="bg-studio-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Stories Received Per Week:
                  </label>
                  <span className="text-lg font-black text-rose-400 font-mono">
                    {weeklySubmissions} tales/wk
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={weeklySubmissions}
                  onChange={(e) => setWeeklySubmissions(parseInt(e.target.value))}
                  className="w-full accent-rose-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>5 (Indie Show)</span>
                  <span>50 (Growing Show)</span>
                  <span>150+ (Network Top 10)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Listeners Who Want Patron Priority:
                  </label>
                  <span className="text-sm font-bold text-amber-400 font-mono">
                    {patronConversionRate}% conversion
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={patronConversionRate}
                  onChange={(e) => setPatronConversionRate(parseInt(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Giving patrons a guaranteed reading queue drives up monthly memberships.
                </p>
              </div>

              <div className="p-4 bg-studio-850 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>No Backend Required</span>
                </div>
                <p className="text-[11px]">
                  Deployable in 2 minutes onto GitHub Pages or Vercel. Works completely static or connects to any headless CMS or webhook.
                </p>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-studio-850 to-studio-900 border border-rose-500/30 p-6 rounded-2xl flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                    Time Saved
                  </span>
                  <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                    ~{hoursSavedPerMonth} hrs
                  </div>
                  <span className="text-xs text-slate-400">per month on story triage</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-studio-850 to-studio-900 border border-amber-500/30 p-6 rounded-2xl flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    Patreon Value
                  </span>
                  <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                    +${estimatedPatreonMonthlyGrowth}
                  </div>
                  <span className="text-xs text-slate-400">potential extra monthly revenue</span>
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 bg-studio-850 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Host Burnout Reduction</span>
                  <span className="text-sm font-bold text-emerald-400">
                    Eliminate inbox fatigue entirely
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3.5x Faster Show Prep</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
