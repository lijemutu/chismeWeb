import React from 'react';
import { Mic } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-studio-950 border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-extrabold text-white tracking-tight">Chisme<span className="text-rose-500">Web</span></span>
              <p className="text-[11px] text-slate-500">Buzón de anécdotas e historias para podcasts</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#demo-interactivo"
              className="text-slate-300 hover:text-white transition"
            >
              Demo en Vivo
            </a>
            <span>•</span>
            <a
              href="#caracteristicas"
              className="text-slate-300 hover:text-white transition"
            >
              Herramientas
            </a>
            <span>•</span>
            <a
              href="#faq"
              className="text-slate-300 hover:text-white transition"
            >
              Preguntas Frecuentes
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-500">
            © 2026 ChismeWeb. Diseñado para creadores de contenido y podcasters de comedia, misterio y entretenimiento.
          </p>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Versión demo interactiva estática</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
