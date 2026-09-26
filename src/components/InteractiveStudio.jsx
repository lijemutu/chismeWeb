import React, { useState } from 'react';
import { Headphones, PenTool, Radio } from 'lucide-react';
import SubmissionForm from './SubmissionForm';
import HostDashboard from './HostDashboard';
import TeleprompterModal from './TeleprompterModal';

export default function InteractiveStudio({ stories, onStorySubmitted, onUpdateStory }) {
  const [activeTab, setActiveTab] = useState('host'); // 'host' o 'listener'
  const [teleprompterStory, setTeleprompterStory] = useState(null);
  const [selectedStoryId, setSelectedStoryId] = useState(stories[0]?.id || null);

  const handleOpenTeleprompter = (story) => {
    setTeleprompterStory(story);
  };

  const handleMarkAired = (storyId) => {
    onUpdateStory(storyId, { status: "Leída al Aire 🎙️" });
  };

  const handleSwitchToHostView = (newStoryId) => {
    setActiveTab('host');
    if (newStoryId) {
      setSelectedStoryId(newStoryId);
    }
  };

  return (
    <section id="demo-interactivo" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-rose-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Demo Interactivo en Vivo</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Prueba Ambas Vistas del <span className="bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">Podcast</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Experimenta lo fácil que es para un escucha enviar su relato sin contraseñas, y cómo la cabina filtra, califica y escucha las historias en voz alta.
          </p>

          {/* Selector de pestañas */}
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
              <span>Bandeja del Host (Cabina)</span>
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
              <span>Portal del Escucha (Envío)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Sin Login
              </span>
            </button>
          </div>
        </div>

        {/* Contenido según pestaña */}
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
