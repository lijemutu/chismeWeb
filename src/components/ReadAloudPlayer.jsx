import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, Gauge, AlertCircle } from 'lucide-react';

export default function ReadAloudPlayer({ title, text, author }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.15); // Velocidad ligeramente ágil para cabina
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const fullTextToRead = `Título de la historia: ${title}. Enviada por ${author}. ${text}`;

  const startSpeaking = () => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(fullTextToRead);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Buscar la mejor voz en español (priorizando México o Latinoamérica)
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang === 'es-MX') ||
      voices.find(v => v.lang.startsWith('es-419')) ||
      voices.find(v => v.lang.startsWith('es')) ||
      voices[0];

    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn("Error o cancelación en síntesis de voz:", e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const cycleRate = () => {
    const nextRates = [1.0, 1.25, 1.5, 1.75];
    const currentIndex = nextRates.indexOf(rate);
    const newRate = nextRates[(currentIndex + 1) % nextRates.length];
    setRate(newRate);

    if (isPlaying && !isPaused) {
      startSpeaking();
    }
  };

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>Tu navegador no tiene activada la síntesis de voz nativa.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-studio-900/90 border border-slate-800 rounded-2xl shadow-inner">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
          isPlaying && !isPaused 
            ? 'bg-rose-500/20 text-rose-400 ring-2 ring-rose-500/40' 
            : 'bg-slate-800 text-slate-300'
        }`}>
          <Volume2 className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Lectura en Voz Alta
            </span>
            {isPlaying && !isPaused && (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-1 bg-rose-500 rounded-full wave-bar"></span>
                <span className="w-1 bg-rose-500 rounded-full wave-bar"></span>
                <span className="w-1 bg-rose-500 rounded-full wave-bar"></span>
                <span className="w-1 bg-rose-500 rounded-full wave-bar"></span>
                <span className="w-1 bg-rose-500 rounded-full wave-bar"></span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {isPlaying 
              ? (isPaused ? 'Lectura en pausa' : 'Reproduciendo para revisión del host...')
              : 'Escucha sin leer mientras afinas micrófonos'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Selector de velocidad */}
        <button
          onClick={cycleRate}
          title="Cambiar velocidad de lectura"
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700/50"
        >
          <Gauge className="w-3.5 h-3.5 text-rose-400" />
          <span>{rate}x</span>
        </button>

        {!isPlaying ? (
          <button
            onClick={startSpeaking}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium text-xs rounded-xl shadow-lg shadow-rose-900/30 transition transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Escuchar</span>
          </button>
        ) : (
          <>
            {isPaused ? (
              <button
                onClick={handleResume}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium rounded-xl transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Reanudar</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pausar</span>
              </button>
            )}
            <button
              onClick={handleStop}
              title="Detener lectura"
              className="p-1.5 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-xl border border-slate-700 transition"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
