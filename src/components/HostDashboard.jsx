import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Flame, Star, Sparkles, Volume2, Mic, 
  Crown, Paperclip, Clock, Copy, Check, MessageSquare, 
  SlidersHorizontal, ChevronRight, Eye, ThumbsUp, Trash2,
  ExternalLink, Calendar
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

  // Active story for detailed inspection
  const activeStory = useMemo(() => {
    return stories.find(s => s.id === selectedStoryId) || stories[0] || null;
  }, [stories, selectedStoryId]);

  // Filtered and sorted stories
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      // Search
      const matchesSearch = 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.authorName.toLowerCase().includes(searchQuery.toLowerCase());

      // Topic
      const matchesTopic = selectedTopic === 'all' || story.topic === selectedTopic;

      // Patron
      const matchesPatron = !patronOnlyFilter || story.isPatron;

      // Status
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
    const textToCopy = `🎙️ [EPISODE SCRIPT: ${story.title}]\nTopic: ${story.topic}\nSubmitted by: ${story.authorName} ${story.isPatron ? '(Patron Supporter)' : ''}\n\n"${story.content}"\n\n[Host Notes: ${story.hostNotes || 'None'}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(story.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Quick stats
  const totalStories = stories.length;
  const patronCount = stories.filter(s => s.isPatron).length;
  const queuedCount = stories.filter(s => s.status.includes('Queued')).length;

  return (
    <div className="space-y-6">
      {/* Studio Header & Stats Quickbar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-studio-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Total Submissions
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{totalStories}</span>
            <span className="text-xs text-emerald-400 font-medium">Inbox active</span>
          </div>
        </div>

        <div className="bg-studio-900 border border-amber-500/20 p-4 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-2 -bottom-2 opacity-10">
            <Crown className="w-16 h-16 text-amber-400" />
          </div>
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
            Patron VIP Stories
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-300">{patronCount}</span>
            <span className="text-xs text-amber-400/80 font-medium">Priority queue</span>
          </div>
        </div>

        <div className="bg-studio-900 border border-emerald-500/20 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
            Queued for Airing
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-300">{queuedCount}</span>
            <span className="text-xs text-emerald-400/80 font-medium">Next episode</span>
          </div>
        </div>

        <div className="bg-studio-900 border border-rose-500/20 p-4 rounded-2xl">
          <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mb-1">
            Studio Teleprompter
          </span>
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() => activeStory && onOpenTeleprompter(activeStory)}
              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-rose-950/40"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Launch Mic Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-studio-900 border border-slate-800 p-4 rounded-2xl space-y-3.5 shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tales, keywords (e.g. ghost, boss, wedding, date)..."
              className="w-full pl-10 pr-4 py-2 bg-studio-850 border border-slate-800 focus:border-rose-500 rounded-xl text-white text-xs placeholder-slate-500 outline-none transition"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {/* Patron Filter Toggle */}
            <button
              onClick={() => setPatronOnlyFilter(prev => !prev)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition shrink-0 ${
                patronOnlyFilter
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                  : 'bg-studio-850 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Patron VIP Only</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-studio-850 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-200 outline-none cursor-pointer"
              >
                <option value="rank" className="bg-studio-900">Highest Ranked</option>
                <option value="spiciness" className="bg-studio-900">Spiciest Drama 🌶️</option>
                <option value="newest" className="bg-studio-900">Newest Submissions</option>
                <option value="readTime" className="bg-studio-900">Shortest Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Topic Pills */}
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

      {/* Main Split View: Left List, Right Active Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Story Cards List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredStories.length} listener tales</span>
            <span>Click any tale to review or play audio</span>
          </div>

          {filteredStories.length === 0 ? (
            <div className="p-8 text-center bg-studio-900 border border-slate-800 rounded-2xl text-slate-400">
              <p className="font-semibold text-white mb-1">No tales match your filter</p>
              <p className="text-xs">Try clearing search terms or toggling off the Patron filter.</p>
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
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {story.topicIcon} {story.topic}
                      </span>

                      {story.isPatron && (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>{story.patronTier || 'Patron VIP'}</span>
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

                  {/* Title */}
                  <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition line-clamp-2 mb-1.5">
                    {story.title}
                  </h4>

                  {/* Preview excerpt */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {story.content}
                  </p>

                  {/* Footer Meta & Quick Actions */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>By <strong className="text-slate-300">{story.authorName}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {story.estimatedReadTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span title="Spiciness">
                        {'🌶️'.repeat(story.spiciness)}
                      </span>
                      {/* Upvotes button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(story.id, story.upvotes);
                        }}
                        className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] transition"
                        title="Upvote story priority"
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

        {/* Right Column: Full Inspector & Host Triage Station */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          {activeStory ? (
            <div className="bg-studio-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              {/* Header Info */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {activeStory.topicIcon} {activeStory.topic}
                    </span>
                    {activeStory.isPatron && (
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-sm">
                        <Crown className="w-3.5 h-3.5 text-amber-400" />
                        <span>{activeStory.patronTier || 'Patron VIP'}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Copy clean text button */}
                    <button
                      onClick={() => copyStoryScript(activeStory)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition border border-slate-700"
                      title="Copy clean script for podcast notes or teleprompter"
                    >
                      {copiedId === activeStory.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>

                    {/* Launch Teleprompter button */}
                    <button
                      onClick={() => onOpenTeleprompter(activeStory)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold transition shadow-md shadow-rose-950/40"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      <span>On-Air Mode</span>
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight leading-snug mt-2">
                  {activeStory.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                  <span>Author: <strong className="text-rose-400">{activeStory.authorName}</strong></span>
                  <div className="flex items-center gap-3">
                    <span>{activeStory.wordCount} words</span>
                    <span>•</span>
                    <span className="text-rose-400 font-semibold">{activeStory.estimatedReadTime} read</span>
                  </div>
                </div>
              </div>

              {/* READ ALOUD COMPONENT: Built-in Speech Synthesis! */}
              <div className="border-t border-b border-slate-800 py-3">
                <ReadAloudPlayer 
                  title={activeStory.title} 
                  text={activeStory.content} 
                  author={activeStory.authorName} 
                />
              </div>

              {/* Ranking & Status Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-studio-850/70 border border-slate-800 rounded-2xl">
                {/* Host Star Rating */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Host Quality Score (1-5)
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(activeStory.id, star)}
                        className="p-1 hover:scale-110 transition text-amber-400"
                        title={`Rate ${star} stars`}
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

                {/* Episode Status Selector */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Episode Broadcast Status
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

              {/* Full Content Body */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Full Story Transcript:
                </span>
                <div className="max-h-64 overflow-y-auto pr-2 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-studio-850/40 p-4 rounded-2xl border border-slate-800/80 font-sans">
                  {activeStory.content}
                </div>
              </div>

              {/* Attachments / Photos */}
              {activeStory.attachments && activeStory.attachments.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Evidence & Photos ({activeStory.attachments.length})
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

              {/* Host Notes Section */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Host Co-Host Notes (Internal Only)
                </span>
                <input
                  type="text"
                  value={activeStory.hostNotes || ''}
                  onChange={(e) => handleNotesChange(activeStory.id, e.target.value)}
                  placeholder="e.g. Carlos reads dialogue, play creepy synth track at 01:15..."
                  className="w-full px-3.5 py-2.5 bg-studio-850 border border-slate-800 focus:border-rose-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none transition"
                />
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-studio-900 border border-slate-800 rounded-3xl text-slate-400">
              Select a story to open the Host Studio Inspector.
            </div>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      {activeImageModal && (
        <div 
          onClick={() => setActiveImageModal(null)} 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img 
              src={activeImageModal} 
              alt="Zoomed evidence" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-slate-700"
            />
            <p className="text-center text-xs text-slate-400 mt-2">Click anywhere to close zoom</p>
          </div>
        </div>
      )}
    </div>
  );
}
