import React from 'react';
import { 
  Volume2, Crown, Image, Layers, Flame, Star, Check 
} from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: Volume2,
      color: "from-rose-500 to-rose-600",
      title: "Lectura con Voz Integrada",
      badge: "Speech Synthesis",
      description: "Olvídate de leer con la vista cansada antes de grabar. Dale Play y escucha la historia narrada en voz alta al ritmo que prefieras (1.25x o 1.5x)."
    },
    {
      icon: Crown,
      color: "from-amber-500 to-amber-600",
      title: "Insignia y Prioridad Patrón VIP",
      badge: "Incentivo de Membresía",
      description: "Consiente a quienes apoyan tu proyecto. Los Patrons pueden identificarse para que sus anécdotas aparezcan destacadas en dorado y con lectura prioritaria."
    },
    {
      icon: Image,
      color: "from-purple-500 to-indigo-600",
      title: "Evidencias, Fotos y Capturas",
      badge: "Soporte Visual",
      description: "Tu audiencia puede adjuntar fotos del lugar, capturas de pantalla de WhatsApp o tickets. Visualízalas en tamaño completo con un clic."
    },
    {
      icon: Layers,
      color: "from-blue-500 to-cyan-600",
      title: "Organización por Temáticas",
      badge: "Filtros Rápidos",
      description: "¿Vas a grabar un especial de Halloween o de citas del terror? Filtra al momento sin tener que buscar palabras clave entre cientos de correos."
    },
    {
      icon: Star,
      color: "from-emerald-500 to-teal-600",
      title: "Sistema de Ranking de Cabina",
      badge: "Curaduría del Show",
      description: "Califica de 1 a 5 estrellas, vota con tu equipo por los relatos favoritos y márcalas como 'Seleccionada para Ep #42' o 'Leída al Aire'."
    },
    {
      icon: Flame,
      color: "from-orange-500 to-red-600",
      title: "Termómetro de Picante y Tiempos",
      badge: "Ritmo del Programa",
      description: "Conoce el nivel de salseo (de Tranqui a Caos Total) y los minutos estimados de lectura al aire para planear bloques de tiempo exactos."
    }
  ];

  return (
    <section id="caracteristicas" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Herramientas para Creadores
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-3">
            Todo lo que necesitas para tu <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Programa de Anécdotas</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Opciones adaptables que podemos ajustar a la medida de la dinámica de tu show y co-hosts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-studio-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-3xl transition duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-studio-850 px-2.5 py-1 rounded-xl border border-slate-800">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-300 transition">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-medium text-rose-400 group-hover:text-rose-300">
                  <span>Disponible para implementar</span>
                  <Check className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
