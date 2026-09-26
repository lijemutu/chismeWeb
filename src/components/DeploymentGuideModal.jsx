import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Globe, Terminal, Sparkles } from 'lucide-react';

export default function DeploymentGuideModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('vercel');
  const [copiedCode, setCopiedCode] = useState(null);

  if (!isOpen) return null;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const vercelSteps = [
    {
      title: "1. Push this project to your GitHub repository",
      desc: "Initialize git in this directory and push to your GitHub account:",
      cmd: `git init
git add .
git commit -m "feat: initial ChismeWeb podcast listener portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chismeWeb.git
git push -u origin main`
    },
    {
      title: "2. Connect to Vercel (1-Click)",
      desc: "Log into vercel.com, click 'Add New Project', and select your 'chismeWeb' repository.",
      notes: "Vercel automatically detects Vite. Build command: 'npm run build', Output Directory: 'dist'."
    },
    {
      title: "3. Live in 60 seconds",
      desc: "Your portal is live with free HTTPS and instant automatic deploys on every commit!"
    }
  ];

  const githubSteps = [
    {
      title: "1. Relative Base Already Configured",
      desc: "In vite.config.js, base: './' is already preset so assets load properly under any GitHub Pages subpath (e.g. username.github.io/chismeWeb/)."
    },
    {
      title: "2. Build Static Dist Bundle",
      desc: "Run the Vite build command locally or in GitHub Actions:",
      cmd: "npm run build"
    },
    {
      title: "3. Deploy via GitHub Pages Branch or Actions",
      desc: "Go to Repository Settings -> Pages -> Source: select 'GitHub Actions' (or deploy the 'dist' folder to the gh-pages branch)."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-studio-900 border border-slate-700 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Deploy to Vercel or GitHub Pages
            </h3>
            <p className="text-xs text-slate-400">
              Zero backend required. 100% static, fast, and free to host.
            </p>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex gap-2 p-1.5 bg-studio-850 rounded-2xl border border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('vercel')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'vercel'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ▲ Deploy to Vercel (Recommended)
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === 'github'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🐙 Deploy to GitHub Pages
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'vercel' ? (
          <div className="space-y-4">
            {vercelSteps.map((step, idx) => (
              <div key={idx} className="p-4 bg-studio-850/70 border border-slate-800 rounded-2xl">
                <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                <p className="text-xs text-slate-400 mb-2">{step.desc}</p>
                {step.cmd && (
                  <div className="relative">
                    <pre className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-rose-300 overflow-x-auto">
                      {step.cmd}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(step.cmd, `vercel-${idx}`)}
                      className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                      title="Copy commands"
                    >
                      {copiedCode === `vercel-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
                {step.notes && (
                  <p className="text-[11px] text-emerald-400/90 mt-1 italic">{step.notes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {githubSteps.map((step, idx) => (
              <div key={idx} className="p-4 bg-studio-850/70 border border-slate-800 rounded-2xl">
                <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                <p className="text-xs text-slate-400 mb-2">{step.desc}</p>
                {step.cmd && (
                  <div className="relative">
                    <pre className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-rose-300 overflow-x-auto">
                      {step.cmd}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(step.cmd, `gh-${idx}`)}
                      className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                      title="Copy command"
                    >
                      {copiedCode === `gh-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
