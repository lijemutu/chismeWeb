import React, { useState } from 'react';
import { 
  Send, Sparkles, Image, Check, AlertCircle, ShieldCheck, 
  Crown, HelpCircle, Flame, Eye, Lock, ArrowRight, RefreshCw, UploadCloud
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOPICS } from '../data/mockStories';

export default function SubmissionForm({ onStorySubmitted, onSwitchToHostView }) {
  const [topic, setTopic] = useState('Paranormal');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [spiciness, setSpiciness] = useState(3);
  const [isPatron, setIsPatron] = useState(false);
  const [patronEmail, setPatronEmail] = useState('');
  const [patronTier, setPatronTier] = useState('Ghost Hunter Tier ($10/mo)');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newlyCreatedStory, setNewlyCreatedStory] = useState(null);

  // Compute live word count & reading time
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
          caption: `Listener attachment: ${file.name}`
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
          name: 'text_receipt_evidence.jpg',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
          caption: 'Demo Evidence: Photo receipt / screenshot attached'
        }
      ]);
    } else {
      setAttachments(prev => [
        ...prev,
        {
          id: `att-demo-${Date.now()}`,
          name: 'haunted_attic_photo.jpg',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
          caption: 'Demo Evidence: Unexplained shadow taken in the attic'
        }
      ]);
    }
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const loadSampleDraft = () => {
    setTopic('Workplace Drama');
    setTitle('My boss tried to invoice me for the coffee I drank before quitting');
    setContent(`I worked as a junior designer at an agency where our creative director charged a 50-cent 'brewing fee' out of his personal Venmo for Keurig pods. On my last Friday after handing in my two-week notice, he handed me an itemized invoice for $184.50 spanning 18 months of French Vanilla roasts. When I laughed, he threatened to withhold my final portfolio files. Attached is the actual Venmo request and his insane follow-up Slack message!`);
    setAuthorName('CaffeineRebel');
    setIsAnonymous(false);
    setSpiciness(4);
    setIsPatron(true);
    setPatronTier('VIP Tea Spiller ($15/mo)');
    addDemoAttachment('receipt');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Fallback
    }

    const topicObj = TOPICS.find(t => t.id === topic) || { icon: '✨' };

    const newStory = {
      id: `story-${Date.now()}`,
      title: title.trim(),
      topic,
      topicIcon: topicObj.icon,
      authorName: isAnonymous ? 'Anonymous Listener' : (authorName.trim() || 'Anonymous Listener'),
      isAnonymous,
      isPatron,
      patronTier: isPatron ? patronTier : null,
      createdAt: 'Just now',
      date: new Date().toISOString().split('T')[0],
      spiciness,
      hostRating: 4,
      status: 'Needs Host Review',
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
      {/* Submitter Success Banner */}
      {isSubmitted && newlyCreatedStory ? (
        <div className="p-8 rounded-3xl bg-studio-900 border border-emerald-500/30 text-center shadow-2xl relative overflow-hidden animate-fadeIn">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-500/30">
            <Check className="w-8 h-8" />
          </div>

          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Tale Successfully Submitted!
          </span>

          <h3 className="text-2xl font-bold text-white mt-3 mb-2">
            Your story is in the Host's Inbox!
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
            "{newlyCreatedStory.title}" was instantly packaged with your tags, estimated read time ({newlyCreatedStory.estimatedReadTime}), and attachments.
            {newlyCreatedStory.isPatron && " Your Patreon VIP priority badge was verified!"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onSwitchToHostView(newlyCreatedStory.id)}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 transition"
            >
              <span>See It in Host Studio Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm rounded-xl transition border border-slate-700"
            >
              Submit Another Tale
            </button>
          </div>
        </div>
      ) : (
        /* The Drafting Form */
        <form onSubmit={handleSubmit} className="bg-studio-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                  Zero Login Required
                </span>
                <span className="text-xs text-slate-400">Listener Submission Portal</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Submit Your Tale to the Show
              </h2>
            </div>

            {/* Quick Demo Pre-fill button */}
            <button
              type="button"
              onClick={loadSampleDraft}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 rounded-xl transition"
              title="Click to automatically fill out a sample story for testing"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Fill Sample Story</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* 1. Category / Topic Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Select Topic / Category <span className="text-rose-400">*</span>
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
                    <span className="truncate">{t.name.split('&')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Story Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Story Title / Headline <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-slate-500">Hook the hosts in 1 sentence</span>
              </div>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The night our baby monitor picked up a whispering voice..."
                className="w-full px-4 py-3 bg-studio-850 border border-slate-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl text-white placeholder-slate-500 text-sm transition outline-none"
              />
            </div>

            {/* 3. Story Content & Live Stats */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. The Tale / Chisme <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>{words} words</span>
                  <span>•</span>
                  <span className="text-rose-400 font-medium">~{readTimeMinutes} min on-air read</span>
                </div>
              </div>
              <textarea
                required
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell everything in detail: what happened, how it made you feel, and the shocking conclusion. Hosts love raw, honest details!"
                className="w-full px-4 py-3 bg-studio-850 border border-slate-800 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 rounded-xl text-white placeholder-slate-500 text-sm transition outline-none resize-y leading-relaxed font-sans"
              ></textarea>
            </div>

            {/* 4. Spiciness Slider */}
            <div className="p-4 bg-studio-850/60 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Spiciness / Intensity Rating
                  </span>
                </div>
                <span className="text-xs font-semibold text-orange-400">
                  {'🌶️'.repeat(spiciness)} ({spiciness === 1 ? 'Mild & Wholesome' : spiciness === 3 ? 'Juicy Drama' : 'Full Chaos / Nuclear'})
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={spiciness}
                onChange={(e) => setSpiciness(parseInt(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Mild & Cozy</span>
                <span>Moderate Tea</span>
                <span>Pure Unhinged Chaos</span>
              </div>
            </div>

            {/* 5. Photos & Receipts Attachment Dropzone */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Image className="w-3.5 h-3.5 text-rose-400" />
                  <span>4. Attach Evidence / Photos (Optional)</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addDemoAttachment('photo')}
                    className="text-[11px] text-rose-400 hover:text-rose-300 underline"
                  >
                    + Add Spooky Photo Demo
                  </button>
                  <span className="text-slate-600">|</span>
                  <button
                    type="button"
                    onClick={() => addDemoAttachment('receipt')}
                    className="text-[11px] text-amber-400 hover:text-amber-300 underline"
                  >
                    + Add Text Screenshot Demo
                  </button>
                </div>
              </div>

              {/* Upload box */}
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
                      Click to upload photos, screenshots, or receipts
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      PNG, JPG, WebP up to 10MB each
                    </p>
                  </div>
                </label>

                {/* Previews */}
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
                          title="Remove file"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 6. Submitter Identity & Patron VIP Switch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Alias / Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  5. Your Name or Alias
                </label>
                <input
                  type="text"
                  disabled={isAnonymous}
                  value={isAnonymous ? '' : authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={isAnonymous ? "Kept 100% Anonymous" : "e.g. Maria from Chicago"}
                  className="w-full px-4 py-2.5 bg-studio-850 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm disabled:opacity-50 outline-none focus:border-rose-500"
                />
                <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="accent-rose-500 rounded"
                  />
                  <span>Read my story as 100% Anonymous</span>
                </label>
              </div>

              {/* Patron VIP Login / Verification */}
              <div className={`p-4 rounded-2xl border transition-all ${
                isPatron 
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-950/20' 
                  : 'bg-studio-850/60 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      Patron VIP Supporter?
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPatron}
                      onChange={(e) => setIsPatron(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                <p className="text-[11px] text-slate-400 mb-2">
                  Patron stories are highlighted in gold and bumped to the top of the hosts' recording queue.
                </p>

                {isPatron && (
                  <div className="space-y-2 mt-2 pt-2 border-t border-amber-500/20 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-amber-300 font-medium">Select Tier:</span>
                      <select
                        value={patronTier}
                        onChange={(e) => setPatronTier(e.target.value)}
                        className="bg-slate-900 border border-amber-500/30 text-amber-200 text-xs rounded-lg px-2 py-1 outline-none"
                      >
                        <option value="VIP Superfan ($5/mo)">VIP Superfan ($5/mo)</option>
                        <option value="Ghost Hunter Tier ($10/mo)">Ghost Hunter Tier ($10/mo)</option>
                        <option value="Inner Circle Executive Producer ($25/mo)">Inner Circle ($25/mo)</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Patreon Perk Active</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-rose-950/50 flex items-center justify-center gap-3 transition transform active:scale-[0.99]"
              >
                <Send className="w-5 h-5" />
                <span>Send Tale to Host Studio</span>
              </button>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                🔒 Privacy Guarantee: Your personal contact info is never displayed publicly.
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
