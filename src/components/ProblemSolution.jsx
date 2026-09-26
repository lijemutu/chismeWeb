import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section className="py-20 bg-studio-950/80 border-t border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            El Problema de Preparar el Show
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            ¿Por qué recibir anécdotas por correo o Instagram es un caos?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Tu comunidad tiene historias increíbles. Pero buscarlas entre cientos de correos o mensajes directos 20 minutos antes de grabar es frustrante y desorganizado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* El Método Tradicional */}
          <div className="p-8 rounded-3xl bg-studio-900/50 border border-red-500/20 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-500/10">
              <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Como se hace hoy</h3>
                <p className="text-xs text-slate-400">Gmail saturado y capturas perdidas en DMs</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Evidencias extraviadas:</strong> Las capturas de WhatsApp o fotos de los sucesos se pierden entre carpetas o caducan en los mensajes directos.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Sin tiempo al aire calculado:</strong> Empiezas a leer una anécdota frente al micro y a la mitad te das cuenta de que dura 15 minutos o no tiene remate.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Cansancio visual:</strong> Tienes que leerte 40 correos enteros para encontrar solo 3 que valgan la pena para el episodio.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Patrons olvidados:</strong> Los escuchas que pagan membresía mensual se pierden entre el spam de marcas y correos de oyentes casuales.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Cero coordinación con el co-host:</strong> "¿Viste la historia que mandó Juan?" "A ver pásamela por WhatsApp, ¿en cuál hilo estaba?"</span>
              </li>
            </ul>
          </div>

          {/* Con ChismeWeb */}
          <div className="p-8 rounded-3xl bg-studio-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-500/10">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Con este Portal</h3>
                <p className="text-xs text-emerald-400 font-medium">Historias listas para grabar en cabina</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Envío sin fricción:</strong> Tu audiencia abre tu link desde YouTube o Spotify y redacta en 1 minuto sin crear contraseñas.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Lectura en voz alta con un clic:</strong> Dale reproducir y escucha la historia leída por voz sintetizada mientras preparas el café.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Insignias VIP para Patrons:</strong> Las historias de tus suscriptores de paga brillan en dorado y van al inicio de tu fila.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Filtros por categoría:</strong> Encuentra al instante 5 historias de brujas para octubre o 5 chismes de oficina para un especial.</span>
              </li>

              <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Modo Cabina para leer al aire:</strong> Vista en pantalla completa con letra grande y contraste oscuro para leer directo al micrófono.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
