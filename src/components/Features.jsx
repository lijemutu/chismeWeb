import React from 'react';
import { 
  Volume2, Crown, Image, Layers, Flame, Star, 
  Sparkles, Check, ArrowRight, ShieldCheck, Clock, FileText 
} from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: Volume2,
      color: "from-rose-500 to-rose-600",
      title: "Built-In Read Aloud Audio",
      badge: "Speech Synthesis",
      description: "Stop reading 20-paragraph emails with tired eyes. Hit Play and let the browser's speech engine read the story aloud at 1.25x speed while you multitask."
    },
    {
      icon: Crown,
      color: "from-amber-500 to-amber-600",
      title: "Patron VIP Flags & Priority Queue",
      badge: "Monetization Perk",
      description: "Reward paying supporters. Patrons get golden cards, tier callouts, and jump to the top of your review dashboard so you never miss a member's story."
    },
    {
      icon: Image,
      color: "from-purple-500 to-indigo-600",
      title: "Photo Receipts & Attachments",
      badge: "Visual Proof",
      description: "Listeners can drop evidence photos directly into their draft: haunted attic shots, unhinged text screenshots, or restaurant receipts. View and zoom in 1 click."
    },
    {
      icon: Layers,
      color: "from-blue-500 to-cyan-600",
      title: "Smart Topic & Genre Sorting",
      badge: "Curated Channels",
      description: "Planning a spooky Halloween special or a workplace confession marathon? Filter stories by topic tags in seconds without keyword hacking."
    },
    {
      icon: Star,
      color: "from-emerald-500 to-teal-600",
      title: "Host Ranking & Episode Triage",
      badge: "Editorial Control",
      description: "Give stories a 1-5 star score, upvote favorite moments with your co-hosts, and tag them directly as 'Queued for Episode #42' or 'Read On Air'."
    },
    {
      icon: Flame,
      color: "from-orange-500 to-red-600",
      title: "Spiciness & Timing Meters",
      badge: "Pacing Insights",
      description: "Know the intensity level (Mild to Nuclear) and see on-air reading time estimates before you queue a story, keeping your show pacing crisp."
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Engineered For Creators
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
            Everything You Need to Run <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Story-Driven Shows</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Designed specifically around the workflow of comedy, true crime, paranormal, and drama podcast hosts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-studio-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-3xl transition duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-studio-850 px-2.5 py-1 rounded-xl border border-slate-800">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-300 transition">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-medium text-rose-400 group-hover:text-rose-300">
                  <span>Included in static release</span>
                  <Check className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
