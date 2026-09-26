import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Mic, Clock, FileText, CheckCircle2 } from 'lucide-react';
import ReadAloudPlayer from './ReadAloudPlayer';

export default function TeleprompterModal({ story, onClose, onMarkAired }) {
  const [fontSize, setFontSize] = useState(24);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex flex-col">
      {/* Barra superior de controles en cabina */}
      <header className="sticky top-0 z-50 bg-[#0d0e14]/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            MODO CABINA • AL AIRE
          </div>
          <span className="text-slate-500 text-sm hidden sm:inline">|</span>
          <span className="text-slate-300 text-sm font-medium truncate max-w-md hidden sm:inline">
            {story.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Ajuste de tamaño de texto */}
          <div className="flex items-center bg-slate-800/80 rounded-xl border border-slate-700/60 p-1">
            <button
              onClick={() => setFontSize(prev => Math.max(16, prev - 2))}
              className="p-1.5 hover:bg-slate-700 text-slate-300 rounded-lg transition"
              title="Reducir tamaño de letra"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono text-slate-300">{fontSize}px</span>
            <button
              onClick={() => setFontSize(prev => Math.min(36, prev + 2))}
              className="p-1.5 hover:bg-slate-700 text-slate-300 rounded-lg transition"
              title="Aumentar tamaño de letra"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Marcar leída al aire */}
          <button
            onClick={() => {
              onMarkAired(story.id);
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-semibold rounded-xl transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Marcar Leída al Aire</span>
          </button>

          {/* Cerrar */}
          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700"
            title="Salir de modo cabina"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Área de lectura del host frente al micro */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="mb-10 pb-8 border-b border-slate-800/80 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {story.topicIcon} {story.topic}
            </span>
            {story.isPatron && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                ⭐ {story.patronTier || 'Patrón VIP'}
              </span>
            )}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{story.estimatedReadTime} de lectura</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>{story.wordCount} palabras</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {story.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <div>
              Anécdota de: <strong className="text-rose-400 font-semibold">{story.authorName}</strong>
            </div>
            <div>
              Nivel de Picante: {'🌶️'.repeat(story.spiciness)}
            </div>
          </div>

          {/* Notas de cabina */}
          {story.hostNotes && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                🎙️ Notas para Cabina / Co-host:
              </span>
              <p className="text-sm text-amber-200/90 italic">
                "{story.hostNotes}"
              </p>
            </div>
          )}

          {/* Reproductor de voz integrado */}
          <div className="pt-2">
            <ReadAloudPlayer title={story.title} text={story.content} author={story.authorName} />
          </div>
        </div>

        {/* Texto en letra grande para leer en atril o monitor */}
        <div 
          className="text-slate-100 font-serif leading-relaxed whitespace-pre-line tracking-wide select-none"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
        >
          {story.content}
        </div>

        {/* Evidencias fotográficas */}
        {story.attachments && story.attachments.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-800">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              📸 Evidencias y Capturas Adjuntas ({story.attachments.length})
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
