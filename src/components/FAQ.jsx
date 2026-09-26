import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Why don't regular listeners have to log in?",
      a: "Requiring an account or login causes a massive 70%+ drop-off in listener submissions. People listening in their car or on the subway want to open a link and immediately type their story without remembering a password. Only Patrons have the option to authenticate to claim their VIP priority flags."
    },
    {
      q: "How does the 'Read Aloud' feature work without a costly AI bill?",
      a: "ChismeWeb utilizes the native Web Speech API built into all modern web browsers (Chrome, Safari, Edge, Firefox). This means the browser itself synthesizes and speaks the text aloud with zero latency, zero cloud API bills, and complete privacy."
    },
    {
      q: "Can I deploy this completely static on GitHub Pages or Vercel?",
      a: "Yes! The entire demo and frontend are built as a static Single Page Application (SPA). There are no Node servers or databases to maintain. You can host it for $0/mo on Vercel or GitHub Pages, and it loads instantaneously for listeners."
    },
    {
      q: "How do photo attachments work?",
      a: "Listeners can drop photos directly onto the page (e.g. screenshots of wild text conversations, receipts, or photos of haunted basements). In this static demo, images are previewed locally with zero data loss. For production setups, this can connect to free services like Cloudinary, Imgur API, or AWS S3."
    },
    {
      q: "How do co-hosts collaborate on episode story curation?",
      a: "Hosts can star-rate stories 1-5, upvote their favorite segments, leave internal broadcast notes (e.g., 'Carlos reads Brenda's quote'), and tag stories as 'Queued for Episode #42'. When ready, one click launches the full-screen Studio Teleprompter mode."
    }
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Everything You Need to Know
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Got questions about implementing ChismeWeb for your podcast?
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-studio-900 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-studio-850/50 transition"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-rose-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
