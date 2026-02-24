import React, { useState } from 'react';
import { Zap, Play, Download, Settings2, Sparkles, LogOut, Mic, Type, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceSelector from './components/VoiceSelector';
import ModeTabs from './components/ModeTabs';
import Header from './components/Header';

export default function App() {
  const [mode, setMode] = useState<'tts' | 'voice' | 'dub'>('tts');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generateVoice = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceName: 'hi-IN-Neural2-A' }),
      });
      const data = await response.json();
      setAudioUrl(`data:audio/mp3;base64,${data.audio}`);
    } catch (err) {
      console.error("Error generating voice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      <Header credits={1250} email="user@voxai.studio" />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center mb-12">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h1 className="text-5xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent mb-4">
              Create Magic with Voice
            </h1>
            <p className="text-gray-400 text-center">AI-powered narration for your stories and content.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <ModeTabs active={mode} onChange={setMode} />
            
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {mode === 'tts' ? (
                <textarea 
                  className="w-full h-72 bg-transparent border-none focus:ring-0 text-xl resize-none placeholder:text-white/10 relative z-10"
                  placeholder="Apni kahani yahan likhein..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              ) : (
                <div className="h-72 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                  <Mic size={48} className="text-white/20 mb-4" />
                  <p className="text-white/40">Drop your audio file here (Max 50MB)</p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 relative z-10">
                <div className="flex gap-4">
                   <span className="text-xs text-white/30 px-3 py-1 bg-white/5 rounded-full tracking-tighter">
                    {text.length} / 5000 CHARS
                   </span>
                </div>
                <button 
                  onClick={generateVoice}
                  disabled={loading || !text}
                  className="bg-white text-black px-10 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-purple-400 hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                >
                  {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" /> : <><Zap size={18} fill="currentColor" /> Generate</>}
                </button>
              </div>
            </div>

            {audioUrl && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-6">
                <button className="bg-white text-black p-4 rounded-full hover:bg-purple-400 transition-colors">
                  <Play size={24} fill="currentColor" />
                </button>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-xs text-white/40">
                    <span>Preview Audio</span>
                    <span>1.0x Speed</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                  </div>
                </div>
                <a href={audioUrl} download="vox-ai-audio.mp3" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <Download size={20} />
                </a>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <VoiceSelector />
          </div>
        </div>
      </main>
    </div>
  );
}
