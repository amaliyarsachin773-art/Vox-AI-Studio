import React from 'react';
import { Sparkles, LogOut, User } from 'lucide-react';

export default function Header({ credits, email }: { credits: number, email: string }) {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">Vox AI Studio</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full flex items-center gap-2">
            <Zap size={14} className="text-purple-400" fill="currentColor" />
            <span className="text-sm font-semibold text-purple-400">{credits} Credits</span>
          </div>
          
          <div className="flex items-center gap-3 border-l border-white/10 pl-6">
            <div className="text-right">
              <p className="text-xs text-white/40 font-medium uppercase tracking-widest">{email}</p>
              <p className="text-[10px] text-purple-400 font-bold">PREMIUM MEMBER</p>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <LogOut size={18} className="text-white/40" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
