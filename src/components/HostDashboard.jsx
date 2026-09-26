import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Flame, Star, Sparkles, Volume2, Mic, 
  Crown, Paperclip, Clock, Copy, Check, MessageSquare, 
  SlidersHorizontal, ChevronRight, Eye, ThumbsUp, Trash2,
  Calendar
} from 'lucide-react';
import { TOPICS, HOST_STATUSES } from '../data/mockStories';
import ReadAloudPlayer from './ReadAloudPlayer';

export default function HostDashboard({ 
  stories, 
  onUpdateStory, 
  onOpenTeleprompter, 
  selectedStoryId, 
  onSelectStory 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [patronOnlyFilter, setPatronOnlyFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rank'); // 'rank', 'spiciness', 'newest', 'readTime'
  const [copiedId, setCopiedId] = useState(null);
  const [activeImageModal, setActiveImageModal] = useState(null);

  const activeStory = useMemo(() => {
    return stories.find(s => s.id === selectedStoryId) || stories[0] || null;
  }, [stories, selectedStoryId]);

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesSearch = 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.authorName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTopic = selectedTopic === 'all' || story.topic === selectedTopic;
      const matchesPatron = !patronOnlyFilter || story.isPatron;
      const matchesStatus = statusFilter === 'all' || story.status === statusFilter;

      return matchesSearch && matchesTopic && matchesPatron && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'rank') {
        return (b.hostRating * 10 + b.upvotes) - (a.hostRating * 10 + a.upvotes);
      }
      if (sortBy === 'spiciness') {
        return b.spiciness - a.spiciness;
      }
      if (sortBy === 'newest') {
        return new Date(b.date || 0) - new Date(a.date || 0);
      }
      if (sortBy === 'readTime') {
        return (a.wordCount || 0) - (b.wordCount || 0);
      }
      return 0;
    });
  }, [stories, searchQuery, selectedTopic, patronOnlyFilter, statusFilter, sortBy]);

  const handleRatingChange = (storyId, newRating) => {
    onUpdateStory(storyId, { hostRating: newRating });
  };

  const handleStatusChange = (storyId, newStatus) => {
    onUpdateStory(storyId, { status: newStatus });
  };

  const handleUpvote = (storyId, currentVotes) => {
    onUpdateStory(storyId, { upvotes: currentVotes + 1 });
  };

  const handleNotesChange = (storyId, notes) => {
    onUpdateStory(storyId, { hostNotes: notes });
  };

  const copyStoryScript = (story) => {
    const textToCopy = `🎙️ [HISTORIA PARA EPISODIO: ${story.title}]\nTema: ${story.topic}\nEnviada por: ${story.authorName} ${story.isPatron ? '(Patrón VIP)' : ''}\n\n"${story.content}"\n\n[Notas de Cabina: ${story.hostNotes || 'Ninguna'}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(story.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const totalStories = stories.length;
  const patronCount = stories.filter(s => s.isPatron).length;
  const queuedCount = stories.filter(s => s.status.includes('Seleccionada')).length;

  return (
    <div className="space-y-6">
      {/* Barra de métricas de cabina */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-studio-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Total en Bandeja
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{totalStories}</span>
            <span className="text-xs text-emerald-400 font-medium">historias listas</span>
          </div>
        </div>

        <div className="bg-studio-900 border border-amber-500/20 p-4 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-2 -bottom-2 opacity-10">
            <Crown className="w-16 h-16 text-amber-400" />
          </div>
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
            Historias de Patrons VIP
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-300">{patronCount}</span>
            <span className="text-xs text-amber-400/80 font-medium">prioridad</span>
          </div>
        </div>

        <div className="bg-studio-900 border border-emerald-500/20 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
            Listas para Grabar
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-300">{queuedCount}</span>
            <span className="text-xs text-emerald-400/80 font-medium">en escaleta</span>
          </div>
        </div>

        <div className="bg-studio-900 border border-rose-500/20 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mb-1">
            Modo Cabina en Vivo
          </span>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => activeStory && onOpenTeleprompter(activeStory)}
              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-rose-950/40"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Abrir al Aire</span>
            </button>
          </div>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-studio-900 border border-slate-800 p-4 rounded-2xl space-y-3.5 shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar anécdotas por título, palabras clave (bruja, jefe, boda, tinder)..."
              className="w-full pl-10 pr-4 py-2 bg-studio-850 border border-slate-800 focus:border-rose-500 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setPatronOnlyFilter(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition shrink-0 ${
                patronOnlyFilter
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                  : 'bg-studio-850 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Solo Patrons VIP</span>
            </button>

            <div className="flex items-center gap-1.5 bg-studio-850 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-200 outline-none cursor-pointer"
              >
                <option value="rank" className="bg-studio-900">Mejor Calificadas</option>
                <option value="spiciness" className="bg-studio-900">Más Picantes 🌶️</option>
                <option value="newest" className="bg-studio-900">Más Recientes</option>
                <option value="readTime" className="bg-studio-900">Lectura Rápida</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categorías */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {TOPICS.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 shrink-0 border ${
                selectedTopic === t.id
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm'
                  : 'bg-studio-850/60 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Vista dividida */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Lista de historias */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>{filteredStories.length} relatos encontrados</span>
            <span>Selecciona uno para revisar o reproducir voz</span>
          </div>

          {filteredStories.length === 0 ? (
            <div className="p-8 text-center bg-studio-900 border border-slate-800 rounded-2xl text-slate-400">
              <p className="font-semibold text-white mb-1">No hay historias con ese filtro</p>
              <p className="text-xs">Intenta limpiar la búsqueda o apagar el filtro de Patrons.</p>
            </div>
          ) : (
            filteredStories.map(story => {
              const isSelected = activeStory && activeStory.id === story.id;
              return (
                <div
                  key={story.id}
                  onClick={() => onSelectStory(story.id)}
                  className={`p-4 rounded-2xl transition border cursor-pointer relative group ${
                    isSelected
                      ? 'bg-studio-850 border-rose-500/60 shadow-lg shadow-rose-950/20'
                      : 'bg-studio-900/90 border-slate-800 hover:border-slate-700 hover:bg-studio-850/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {story.topicIcon} {story.topic}
                      </span>

                      {story.isPatron && (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>{story.patronTier || 'Patrón VIP'}</span>
                        </span>
                      )}

                      {story.attachments && story.attachments.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-slate-800/80 text-rose-300 flex items-center gap-1 border border-slate-700/60">
                          <Paperclip className="w-2.5 h-2.5" />
                          <span>{story.attachments.length}</span>
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-slate-500">{story.createdAt}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition line-clamp-2 mb-1.5">
                    {story.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {story.content}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>De <strong className="text-slate-300">{story.authorName}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {story.estimatedReadTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span title="Picante">
                        {'🌶️'.repeat(story.spiciness)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(story.id, story.upvotes);
                        }}
                        className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] transition"
                        title="Votar por esta historia"
                      >
                        <ThumbsUp className="w-3 h-3 text-rose-400" />
                        <span>{story.upvotes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Columna Derecha: Inspector detallado del Host */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          {activeStory ? (
            <div className="bg-studio-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {activeStory.topicIcon} {activeStory.topic}
                    </span>
                    {activeStory.isPatron && (
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-sm">
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                        <span>{activeStory.patronTier || 'Patrón VIP'}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyStoryScript(activeStory)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition border border-slate-700"
                      title="Copiar texto limpio para escaleta o notas"
                    >
                      {copiedId === activeStory.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copiar Texto</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onOpenTeleprompter(activeStory)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-rose-950/40"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>Leer al Aire</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight leading-snug mt-2">
                  {activeStory.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                  <span>Autor: <strong className="text-rose-400">{activeStory.authorName}</strong></span>
                  <div className="flex items-center gap-3">
                    <span>{activeStory.wordCount} palabras</span>
                    <span>•</span>
                    <span className="text-rose-400 font-semibold">{activeStory.estimatedReadTime} de lectura</span>
                  </div>
                </div>
              </div>

              {/* LECTURA EN VOZ ALTA */}
              <div className="border-t border-b border-slate-800 py-3">
                <ReadAloudPlayer 
                  title={activeStory.title} 
                  text={activeStory.content} 
                  author={activeStory.authorName} 
                />
              </div>

              {/* Calificación y Estado del Episodio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-studio-850/70 border border-slate-800 rounded-2xl">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Calificación de la Cabina (1-5)
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(activeStory.id, star)}
                        className="p-1 hover:scale-110 transition text-amber-400"
                        title={`Calificar con ${star} estrellas`}
                      >
                        <Star 
                          className={`w-5 h-5 ${
                            star <= activeStory.hostRating 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-slate-600'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="text-xs text-slate-400 ml-1 font-mono font-bold">
                      {activeStory.hostRating}/5
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Estatus en la Escaleta
                  </span>
                  <select
                    value={activeStory.status}
                    onChange={(e) => handleStatusChange(activeStory.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-rose-500"
                  >
                    {HOST_STATUSES.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Texto de la historia */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Historia Completa:
                </span>
                <div className="max-h-64 overflow-y-auto pr-2 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-studio-850/40 p-4 rounded-2xl border border-slate-800/80 font-sans">
                  {activeStory.content}
                </div>
              </div>

              {/* Evidencias fotográficas */}
              {activeStory.attachments && activeStory.attachments.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Evidencias y Fotos Adjuntas ({activeStory.attachments.length})
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {activeStory.attachments.map(att => (
                      <div 
                        key={att.id} 
                        onClick={() => setActiveImageModal(att.url)}
                        className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-zoom-in"
                      >
                        <img src={att.url} alt={att.name} className="w-full h-28 object-cover group-hover:scale-105 transition duration-300" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                        {att.caption && (
                          <p className="p-2 text-[10px] text-slate-400 truncate bg-slate-950">
                            {att.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notas de cabina */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Notas Internas de Cabina (Para Co-host / Productor)
                </span>
                <input
                  type="text"
                  value={activeStory.hostNotes || ''}
                  onChange={(e) => handleNotesChange(activeStory.id, e.target.value)}
                  placeholder="Ej. Meter efecto de sonido en el segundo párrafo, dejar que Lalo comente..."
                  className="w-full px-3.5 py-2.5 bg-studio-850 border border-slate-800 focus:border-rose-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition"
                />
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-studio-900 border border-slate-800 rounded-3xl text-slate-400">
              Selecciona una historia para abrir el visor del host.
            </div>
          )}
        </div>
      </div>

      {/* Modal Zoom de Fotos */}
      {activeImageModal && (
        <div 
          onClick={() => setActiveImageModal(null)} 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img 
              src={activeImageModal} 
              alt="Evidencia ampliada" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-slate-700"
            />
            <p className="text-center text-xs text-slate-400 mt-2">Haz clic en cualquier parte para cerrar</p>
          </div>
        </div>
      )}
    </div>
  );
}
