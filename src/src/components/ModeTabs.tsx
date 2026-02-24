import React from 'react';
import { Type, Mic, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ModeTabs({ active, onChange }: any) {
  const tabs = [
    { id: 'tts', label: 'Text to Speech', icon: Type },
    { id: 'voice', label: 'Voice Changer', icon: Mic },
    { id: 'dub', label: 'AI Dubbing', icon: Languages },
  ];

  return (
    <div className="flex p-1 bg-[#0f0f0f] border border-white/10 rounded-2xl w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors ${
            active === tab.id ? 'text-white' : 'text-white/40 hover:text-white/60'
          }`}
        >
          {active === tab.id && (
            <motion.div layoutId="activeTab" className="absolute inset-0 bg-white/5 rounded-xl border border-white/10" />
          )}
          <tab.icon size={16} className="relative z-10" />
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
