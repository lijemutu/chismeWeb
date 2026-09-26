import React, { useState } from 'react';
import { Headphones, PenTool, Sparkles, Radio } from 'lucide-react';
import SubmissionForm from './SubmissionForm';
import HostDashboard from './HostDashboard';
import TeleprompterModal from './TeleprompterModal';

export default function InteractiveStudio({ stories, onStorySubmitted, onUpdateStory }) {
  const [activeTab, setActiveTab] = useState('host'); // 'listener' or 'host'
  const [teleprompterStory, setTeleprompterStory] = useState(null);
  const [selectedStoryId, setSelectedStoryId] = useState(stories[0]?.id || null);

  const handleOpenTeleprompter = (story) => {
    setTeleprompterStory(story);
  };

  const handleMarkAired = (storyId) => {
    onUpdateStory(storyId, { status: "Read on Air! 🎙️" });
  };

  const handleSwitchToHostView = (newStoryId) => {
    setActiveTab('host');
    if (newStoryId) {
      setSelectedStoryId(newStoryId);
    }
  };

  return (
    <section id="interactive-demo" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-rose-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Live Interactive Demo</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Experience Both Sides of the <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">Podcast Studio</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Test how seamless it is for a listener to draft their story with zero logins, then switch tabs to see how hosts triage, rate, and listen aloud.
          </p>

          {/* Interactive Switcher Pill */}
          <div className="mt-8 inline-flex p-1.5 bg-studio-900 border border-slate-800 rounded-2xl shadow-xl">
            <button
              onClick={() => setActiveTab('host')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'host'
                  ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Host Studio Dashboard</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-mono">
                {stories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('listener')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition ${
                activeTab === 'listener'
                  ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Listener Submission Flow</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Zero Login
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="transition-all duration-300">
          {activeTab === 'host' ? (
            <HostDashboard
              stories={stories}
              onUpdateStory={onUpdateStory}
              onOpenTeleprompter={handleOpenTeleprompter}
              selectedStoryId={selectedStoryId}
              onSelectStory={setSelectedStoryId}
            />
          ) : (
            <SubmissionForm
              onStorySubmitted={onStorySubmitted}
              onSwitchToHostView={handleSwitchToHostView}
            />
          )}
        </div>
      </div>

      {/* Teleprompter Fullscreen Mode */}
      {teleprompterStory && (
        <TeleprompterModal
          story={teleprompterStory}
          onClose={() => setTeleprompterStory(null)}
          onMarkAired={handleMarkAired}
        />
      )}
    </section>
  );
}
