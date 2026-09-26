import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "¿Por qué no pedirle contraseña o cuenta a la audiencia?",
      a: "Pedir registro provoca que más del 70% de las personas abandonen la página sin mandar nada. Los escuchas que vienen de Spotify o YouTube quieren escribir su historia de inmediato en su celular. Quienes sí pueden autenticarse de forma opcional son los Patrons VIP para reclamar su insignia de prioridad."
    },
    {
      q: "¿Cómo funciona la lectura en voz alta sin generar costos extra?",
      a: "El portal utiliza la tecnología de voz integrada en los navegadores web modernos (Chrome, Safari, Edge, Firefox). Lee el texto en voz alta con acento natural en español de forma instantánea, sin requerir servicios de nube de paga ni suscripciones externas."
    },
    {
      q: "¿Se pueden cambiar las categorías según la temática de mi podcast?",
      a: "¡Totalmente! Podemos poner las categorías exactas de tu programa: desde leyendas de terror, relatos paranormales o anécdotas de oficina, hasta chismes de bodas, infidelidades o preguntas de la comunidad."
    },
    {
      q: "¿Cómo se visualizan las fotos y evidencias en cabina?",
      a: "Cuando un escucha sube una foto o captura de pantalla de WhatsApp, aparece en miniatura junto a la historia en el panel del host. Con un clic se abre en pantalla completa para que tú y tu co-host puedan reaccionar a la evidencia en vivo."
    },
    {
      q: "¿Cómo ayuda a incentivar que la gente se suscriba al Patreon?",
      a: "Al ver que las historias de los Patrons tienen insignia dorada y prioridad garantizada al aire, tus escuchas más apasionados tienen un motivo directo para unirse a tu membresía mensual y asegurarse de que lean su anécdota."
    }
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Preguntas Frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Dudas Comunes sobre el Portal
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Respuestas clave para adaptar esta herramienta a tu podcast.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-studio-900 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-studio-850/50 transition"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-rose-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
