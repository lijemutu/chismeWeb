import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Mic, Volume2, Clock, FileText, CheckCircle2 } from 'lucide-react';
import ReadAloudPlayer from './ReadAloudPlayer';

export default function TeleprompterModal({ story, onClose, onMarkAired }) {
  const [fontSize, setFontSize] = useState(24); // px
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);

  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        window.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, scrollSpeed]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex flex-col">
      {/* Top Teleprompter Controls Bar */}
      <header className="sticky top-0 z-50 bg-[#0d0e14]/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            ON-AIR TELEPROMPTER MODE
          </div>
          <span className="text-slate-400 text-sm hidden sm:inline">|</span>
          <span className="text-slate-300 text-sm font-medium truncate max-w-md hidden sm:inline">
            {story.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Font resizing */}
          <div className="flex items-center bg-slate-800/80 rounded-xl border border-slate-700/60 p-1">
            <button
              onClick={() => setFontSize(prev => Math.max(16, prev - 2))}
              className="p-1.5 hover:bg-slate-700 text-slate-300 rounded-lg transition"
              title="Decrease Font Size"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono text-slate-300">{fontSize}px</span>
            <button
              onClick={() => setFontSize(prev => Math.min(36, prev + 2))}
              className="p-1.5 hover:bg-slate-700 text-slate-300 rounded-lg transition"
              title="Increase Font Size"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Mark as aired button */}
          <button
            onClick={() => {
              onMarkAired(story.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-semibold rounded-xl transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Mark as Read On-Air</span>
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Reading Canvas */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        {/* Story Metadata Header */}
        <div className="mb-10 pb-8 border-b border-slate-800/80 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {story.topicIcon} {story.topic}
            </span>
            {story.isPatron && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                ⭐ {story.patronTier || 'Patron VIP'}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{story.estimatedReadTime} read</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>{story.wordCount} words</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {story.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <div>
              Submitted by: <strong className="text-rose-400 font-semibold">{story.authorName}</strong>
            </div>
            <div>
              Spiciness Level: {'🌶️'.repeat(story.spiciness)}
            </div>
          </div>

          {/* Host Notes callout */}
          {story.hostNotes && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                🎙️ Host Broadcast Notes:
              </span>
              <p className="text-sm text-amber-200/90 italic">
                "{story.hostNotes}"
              </p>
            </div>
          )}

          {/* TTS Player in Prompter */}
          <div className="pt-2">
            <ReadAloudPlayer title={story.title} text={story.content} author={story.authorName} />
          </div>
        </div>

        {/* Big Teleprompter Story Body */}
        <div 
          className="text-slate-100 font-serif leading-relaxed whitespace-pre-line tracking-wide select-none"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
        >
          {story.content}
        </div>

        {/* Attachments within teleprompter */}
        {story.attachments && story.attachments.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              📸 Evidence / Attachments ({story.attachments.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {story.attachments.map(att => (
                <div key={att.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  <img src={att.url} alt={att.name} className="w-full h-64 object-cover" />
                  {att.caption && (
                    <p className="p-3 text-xs text-slate-400 bg-slate-950/80">
                      {att.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
