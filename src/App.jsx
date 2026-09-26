import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import InteractiveStudio from './components/InteractiveStudio';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { INITIAL_STORIES } from './data/mockStories';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem('chismeweb_stories_es');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("No se pudo leer de localStorage", e);
    }
    return INITIAL_STORIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('chismeweb_stories_es', JSON.stringify(stories));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage", e);
    }
  }, [stories]);

  const handleStorySubmitted = (newStory) => {
    setStories(prev => [newStory, ...prev]);
  };

  const handleUpdateStory = (storyId, updates) => {
    setStories(prev => prev.map(s => {
      if (s.id === storyId) {
        return { ...s, ...updates };
      }
      return s;
    }));
  };

  const resetToDefaultStories = () => {
    if (window.confirm("¿Deseas restablecer todas las historias a los ejemplos iniciales en español?")) {
      setStories(INITIAL_STORIES);
      try {
        localStorage.removeItem('chismeweb_stories_es');
      } catch (e) {}
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Barra de navegación */}
      <Navbar />

      {/* Portada y propuesta de valor */}
      <Hero />

      {/* Comparativa: Caos actual vs Buzón inteligente */}
      <ProblemSolution />

      {/* Estudio interactivo en vivo (Portal de escucha + Bandeja de cabina con voz y teleprompter) */}
      <InteractiveStudio
        stories={stories}
        onStorySubmitted={handleStorySubmitted}
        onUpdateStory={handleUpdateStory}
      />

      {/* Botón flotante para restablecer historias de prueba */}
      <div className="max-w-7xl mx-auto px-4 text-center pb-8">
        <button
          onClick={resetToDefaultStories}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition bg-studio-900 border border-slate-800 rounded-full"
          title="Recargar anécdotas demo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer historias de ejemplo en español</span>
        </button>
      </div>

      {/* Características y posibilidades */}
      <Features />

      {/* Preguntas frecuentes */}
      <FAQ />

      {/* Pie de página */}
      <Footer />
    </div>
  );
}
