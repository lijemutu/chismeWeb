import React, { useState } from 'react';
import { 
  Send, Sparkles, Image, Check, Crown, ArrowRight, 
  UploadCloud, ShieldCheck, LogIn, LogOut, X, Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOPICS } from '../data/mockStories';

export default function SubmissionForm({ onStorySubmitted, onSwitchToHostView }) {
  const [topic, setTopic] = useState('Paranormal');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Estado VIP: solo accesible mediante login
  const [isPatronLoggedIn, setIsPatronLoggedIn] = useState(false);
  const [patronEmail, setPatronEmail] = useState('');
  const [patronTier, setPatronTier] = useState('Patrón Nivel Leyenda ($150 MXN/mes)');
  const [showVipLoginModal, setShowVipLoginModal] = useState(false);

  const [attachments, setAttachments] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newlyCreatedStory, setNewlyCreatedStory] = useState(null);

  // Conteo de palabras y tiempo estimado en cabina
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 130));

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const newAtt = {
          id: `att-${Date.now()}-${Math.random()}`,
          name: file.name,
          type: 'image',
          url: uploadEvent.target.result,
          caption: `Evidencia enviada: ${file.name}`
        };
        setAttachments(prev => [...prev, newAtt]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addDemoAttachment = (type) => {
    if (type === 'receipt') {
      setAttachments(prev => [
        ...prev,
        {
          id: `att-demo-${Date.now()}`,
          name: 'ticket_cuenta_tres.jpg',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
          caption: 'Evidencia demo: Foto del ticket o captura de WhatsApp'
        }
      ]);
    } else {
      setAttachments(prev => [
        ...prev,
        {
          id: `att-demo-${Date.now()}`,
          name: 'foto_lugar_hechos.jpg',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
          caption: 'Evidencia demo: Fotografía del lugar o sombra sospechosa'
        }
      ]);
    }
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const loadSampleDraft = () => {
    setTopic('Chisme Godín');
    setTitle('Me descontaron del finiquito las cápsulas de café que me tomé en dos años');
    setContent(`Trabajé como diseñadora en una agencia de publicidad en la colonia Roma. El director administrativo cobraba 15 pesos por cápsula de café con alcancía en la cocina. El día que entregué mi renuncia voluntaria, me entregó una hoja engrapada con una lista que decía: 'Consumo no liquidado de café y galletas 2024-2025: $1,420 MXN'. Me amenazó con no firmarme la carta de recomendación si no se lo pagaba en efectivo en ese instante. ¡Les adjunto la foto de la nota en servilleta que me dio!`);
    setAuthorName('GodínEnLibertad');
    setIsAnonymous(false);
    setIsPatronLoggedIn(true);
    setPatronTier('Patrón Nivel Leyenda ($150 MXN/mes)');
    addDemoAttachment('receipt');
  };

  const handleVipLogin = (e) => {
    e.preventDefault();
    setIsPatronLoggedIn(true);
    setShowVipLoginModal(false);
  };

  const handleVipLogout = () => {
    setIsPatronLoggedIn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    const topicObj = TOPICS.find(t => t.id === topic) || { icon: '✨' };

    const newStory = {
      id: `story-${Date.now()}`,
      title: title.trim(),
      topic,
      topicIcon: topicObj.icon,
      authorName: isAnonymous ? 'Escucha Anónimo' : (authorName.trim() || 'Escucha Anónimo'),
      isAnonymous,
      isPatron: isPatronLoggedIn,
      patronTier: isPatronLoggedIn ? patronTier : null,
      createdAt: 'Hace un momento',
      date: new Date().toISOString().split('T')[0],
      hostRating: 4,
      status: 'Por Revisar',
      upvotes: 1,
      estimatedReadTime: `${readTimeMinutes} min`,
      wordCount: words,
      hostNotes: '',
      attachments,
      content: content.trim()
    };

    setNewlyCreatedStory(newStory);
    setIsSubmitted(true);
    onStorySubmitted(newStory);
  };

  const handleResetForm = () => {
    setTitle('');
    setContent('');
    setAuthorName('');
    setIsAnonymous(false);
    setAttachments([]);
    setIsSubmitted(false);
    setNewlyCreatedStory(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {isSubmitted && newlyCreatedStory ? (
        <div className="p-8 rounded-3xl bg-studio-900 border border-emerald-500/30 text-center shadow-2xl relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
            <Check className="w-8 h-8" />
          </div>

          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            ¡Historia Recibida con Éxito!
          </span>

          <h3 className="text-2xl font-bold text-white mt-3 mb-2">
            Tu anécdota ya está en la bandeja del podcast
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
            "{newlyCreatedStory.title}" fue organizada con sus etiquetas, tiempo estimado al aire ({newlyCreatedStory.estimatedReadTime}) y evidencias fotográficas.
            {newlyCreatedStory.isPatron && " Cuenta con insignia dorada verificada de Patrón VIP."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onSwitchToHostView(newlyCreatedStory.id)}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-rose-950/30 flex items-center justify-center gap-2 transition"
            >
              <span>Ver en la Bandeja del Host</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-xl transition border border-slate-700"
            >
              Mandar Otra Historia
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-studio-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          {/* Encabezado */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                  Sin Registro Requerido
                </span>
                <span className="text-xs text-slate-400">Portal para la Comunidad</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Manda tu Anécdota o Relato al Programa
              </h2>
            </div>

            <button
              type="button"
              onClick={loadSampleDraft}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 rounded-xl transition"
              title="Llenar con una historia simulada para probar"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Cargar Ejemplo</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* 1. Categoría */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Selecciona la Categoría <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TOPICS.filter(t => t.id !== 'all').map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTopic(t.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold transition border text-left ${
                      topic === t.id
                        ? 'bg-rose-500/15 border-rose-500/60 text-white shadow-md shadow-rose-950/40'
                        : 'bg-studio-850/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-lg">{t.icon}</span>
                    <span className="truncate">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Título */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Título de la Anécdota <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-slate-500">Un título llamativo para abrir el tema</span>
              </div>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. La noche que el monitor de mi bebé grabó una voz extraña..."
                className="w-full px-4 py-3 bg-studio-850 border border-slate-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl text-white placeholder-slate-500 text-sm transition outline-none"
              />
            </div>

            {/* 3. Contenido y estadísticas */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. El Chisme o Relato Completo <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>{words} palabras</span>
                  <span>•</span>
                  <span className="text-rose-400 font-medium">~{readTimeMinutes} min al aire</span>
                </div>
              </div>
              <textarea
                required
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Cuéntanos todo con pelos y señales: qué pasó, en qué ciudad, cómo reaccionaron y el desenlace. ¡Entre más detalles honestos, mejor se escucha en vivo!"
                className="w-full px-4 py-3 bg-studio-850 border border-slate-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl text-white placeholder-slate-500 text-sm transition outline-none resize-y leading-relaxed font-sans"
              ></textarea>
            </div>

            {/* 4. Fotos y Evidencias */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5 text-rose-400" />
                  <span>4. Fotos o Capturas de Evidencia (Opcional)</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addDemoAttachment('photo')}
                    className="text-[11px] text-rose-400 hover:text-rose-300 underline"
                  >
                    + Foto misteriosa demo
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    type="button"
                    onClick={() => addDemoAttachment('receipt')}
                    className="text-[11px] text-amber-400 hover:text-amber-300 underline"
                  >
                    + Captura WhatsApp demo
                  </button>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-studio-850/40 rounded-2xl p-5 text-center transition">
                <input
                  type="file"
                  id="attachment-upload"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="attachment-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <div className="p-3 bg-slate-800 rounded-full text-slate-300 hover:text-white transition">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-rose-400 hover:underline">
                      Sube fotos, capturas de pantalla o tickets
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      JPG, PNG o WebP
                    </p>
                  </div>
                </label>

                {attachments.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800 text-left">
                    {attachments.map(att => (
                      <div key={att.id} className="relative group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-1.5">
                        <img src={att.url} alt={att.name} className="w-full h-24 object-cover rounded-lg" />
                        <p className="text-[10px] text-slate-300 truncate mt-1 px-1 font-medium">{att.name}</p>
                        <button
                          type="button"
                          onClick={() => removeAttachment(att.id)}
                          className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white rounded-md p-1 text-xs opacity-90 transition"
                          title="Eliminar archivo"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 5. Identidad y Sección de Miembro VIP con Login */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  5. Tu Nombre o Apodo
                </label>
                <input
                  type="text"
                  disabled={isAnonymous}
                  value={isAnonymous ? '' : authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={isAnonymous ? "100% Anónimo al aire" : "Ej. Valeria de Guadalajara"}
                  className="w-full px-4 py-2.5 bg-studio-850 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm disabled:opacity-50 outline-none focus:border-rose-500"
                />
                <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="accent-rose-500 rounded"
                  />
                  <span>Leer mi relato como 100% Anónimo</span>
                </label>
              </div>

              {/* Sección VIP protegida por Login */}
              <div className={`p-4 rounded-2xl border transition-all ${
                isPatronLoggedIn 
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-950/20' 
                  : 'bg-studio-850/60 border-slate-800'
              }`}>
                {isPatronLoggedIn ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Crown className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                          Patrón VIP Verificado
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleVipLogout}
                        className="text-[11px] text-slate-400 hover:text-red-400 flex items-center gap-1 transition"
                        title="Cerrar sesión VIP"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Salir</span>
                      </button>
                    </div>

                    <div className="p-2.5 bg-slate-900/80 rounded-xl border border-amber-500/30 text-xs text-amber-200 mb-2">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{patronTier}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Tu historia se enviará con insignia dorada y prioridad para la cabina.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                        ¿Eres Patrón o Miembro del Show?
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                      Solo los miembros activos pueden destacar su historia con insignia dorada y prioridad al aire.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowVipLoginModal(true)}
                      className="w-full py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <LogIn className="w-3.5 h-3.5 text-amber-400" />
                      <span>Iniciar Sesión como Patrón VIP</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Botón de Envío */}
            <div className="pt-4 border-t border-slate-800">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-rose-950/50 flex items-center justify-center gap-3 transition transform active:scale-[0.99]"
              >
                <Send className="w-5 h-5" />
                <span>Mandar Historia al Programa</span>
              </button>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                🔒 Tus datos están protegidos y nunca se revelarán correos o información privada.
              </p>
            </div>
          </div>
        </form>
      )}

      {/* Modal de Inicio de Sesión VIP */}
      {showVipLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-studio-900 border border-amber-500/40 w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setShowVipLoginModal(false)}
              className="absolute top-4 right-4 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-2xl">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Acceso Exclusivo Patrón VIP</h3>
                <p className="text-xs text-slate-400">Verifica tu membresía activa</p>
              </div>
            </div>

            <form onSubmit={handleVipLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Correo registrado en Patreon o YouTube
                </label>
                <input
                  type="email"
                  required
                  value={patronEmail}
                  onChange={(e) => setPatronEmail(e.target.value)}
                  placeholder="ejemplo@patreon.com"
                  className="w-full px-3.5 py-2.5 bg-studio-850 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nivel de Membresía
                </label>
                <select
                  value={patronTier}
                  onChange={(e) => setPatronTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-studio-850 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-amber-500"
                >
                  <option value="Miembro VIP ($50 MXN/mes)">Miembro VIP ($50 MXN/mes)</option>
                  <option value="Patrón Nivel Leyenda ($150 MXN/mes)">Patrón Nivel Leyenda ($150 MXN/mes)</option>
                  <option value="Productor Ejecutivo VIP ($250 MXN/mes)">Productor Ejecutivo ($250 MXN/mes)</option>
                </select>
              </div>

              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-[11px] text-amber-300/90 flex items-start gap-2">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                <span>Solo las cuentas validadas obtienen la insignia dorada para destacar ante el host.</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-950/40 transition"
                >
                  Verificar y Activar Insignia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
