import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import InteractiveStudio from './components/InteractiveStudio';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Calculator from './components/Calculator';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DeploymentGuideModal from './components/DeploymentGuideModal';
import { INITIAL_STORIES } from './data/mockStories';
import { RotateCcw } from 'lucide-react';

export default function App() {
  const [stories, setStories] = useState(() => {
    try {
      const saved = localStorage.getItem('chismeweb_stories');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not read from localStorage", e);
    }
    return INITIAL_STORIES;
  });

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('chismeweb_stories', JSON.stringify(stories));
    } catch (e) {
      console.warn("Could not write to localStorage", e);
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
    if (window.confirm("Reset all stories to default demo data?")) {
      setStories(INITIAL_STORIES);
      try {
        localStorage.removeItem('chismeweb_stories');
      } catch (e) {}
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenDeployGuide={() => setIsDeployModalOpen(true)} />

      {/* Hero with value proposition */}
      <Hero onOpenDeployGuide={() => setIsDeployModalOpen(true)} />

      {/* Before / After: Messy Gmail vs ChismeWeb */}
      <ProblemSolution />

      {/* The Core Interactive Studio (Listener portal + Host Dashboard with Read Aloud & Teleprompter) */}
      <InteractiveStudio
        stories={stories}
        onStorySubmitted={handleStorySubmitted}
        onUpdateStory={handleUpdateStory}
      />

      {/* Reset Data Helper Floating Pill */}
      <div className="max-w-7xl mx-auto px-4 text-center pb-8">
        <button
          onClick={resetToDefaultStories}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-300 transition bg-studio-900 border border-slate-800 rounded-full"
          title="Restore original sample stories"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Stories to Default</span>
        </button>
      </div>

      {/* Core Features Breakdown */}
      <Features />

      {/* How it Works / 3-Step Podcast Production */}
      <HowItWorks />

      {/* Time & Value Calculator */}
      <Calculator />

      {/* Frequently Asked Questions */}
      <FAQ />

      {/* Footer */}
      <Footer onOpenDeployGuide={() => setIsDeployModalOpen(true)} />

      {/* Deployment Modal for Vercel and GitHub Pages */}
      <DeploymentGuideModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </div>
  );
}
