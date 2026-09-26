import React, { useState } from 'react';
import { Mic, Radio, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-studio-950/85 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logotipo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 p-0.5 shadow-lg shadow-rose-950/40">
            <div className="w-full h-full bg-studio-950 rounded-[14px] flex items-center justify-center">
              <Mic className="w-5 h-5 text-rose-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-white tracking-tight">Chisme<span className="text-rose-500">Web</span></span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                PRO DEMO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Buzón de Anécdotas para Podcasts</p>
          </div>
        </div>

        {/* Enlaces de escritorio */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
          <button onClick={() => scrollTo('demo-interactivo')} className="hover:text-rose-400 transition flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-rose-400" />
            <span>Demo Interactivo</span>
          </button>
          <button onClick={() => scrollTo('caracteristicas')} className="hover:text-rose-400 transition">
            Características
          </button>
          <button onClick={() => scrollTo('faq')} className="hover:text-rose-400 transition">
            Preguntas Frecuentes
          </button>
        </div>

        {/* Botón CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => scrollTo('demo-interactivo')}
            className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-950/40 transition transform active:scale-95"
          >
            Probar Demo en Vivo
          </button>
        </div>

        {/* Botón menú móvil */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-2 pb-6 bg-studio-900 border-b border-slate-800 space-y-3">
          <button
            onClick={() => scrollTo('demo-interactivo')}
            className="w-full text-left py-2 text-sm text-slate-200 font-semibold"
          >
            🎙️ Demo Interactivo
          </button>
          <button
            onClick={() => scrollTo('caracteristicas')}
            className="w-full text-left py-2 text-sm text-slate-200 font-semibold"
          >
            ✨ Características
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="w-full text-left py-2 text-sm text-slate-200 font-semibold"
          >
            ❓ Preguntas Frecuentes
          </button>
        </div>
      )}
    </nav>
  );
}
