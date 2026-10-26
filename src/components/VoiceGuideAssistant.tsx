import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Sparkles, 
  X, 
  Globe, 
  Radio, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  BookOpen, 
  MessageSquareQuote,
  RotateCcw,
  Sliders,
  Check
} from 'lucide-react';
import { 
  FEMALE_VOICE_SCRIPTS, 
  speakWithFemaleVoice, 
  stopFemaleVoice, 
  isFemaleVoiceSpeaking,
  VoiceGuideScript
} from '../utils/speechVoice';

export const VoiceGuideAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'te' | 'en'>('te');
  const [selectedScriptId, setSelectedScriptId] = useState<string>('welcome');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [customText, setCustomText] = useState('');
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [showSettings, setShowSettings] = useState(false);

  // Monitor speaking status
  useEffect(() => {
    const timer = setInterval(() => {
      setIsSpeaking(isFemaleVoiceSpeaking());
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const activeScript = FEMALE_VOICE_SCRIPTS.find(s => s.id === selectedScriptId) || FEMALE_VOICE_SCRIPTS[0];
  const currentTextToSpeak = language === 'te' ? activeScript.textTe : activeScript.textEn;

  const handlePlayScript = (script: VoiceGuideScript) => {
    setSelectedScriptId(script.id);
    const text = language === 'te' ? script.textTe : script.textEn;
    
    stopFemaleVoice();
    setIsSpeaking(true);
    speakWithFemaleVoice(text, language, {
      rate: speechRate,
      pitch: 1.2, // Gentle feminine pitch frequency
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const handleTogglePlayCurrent = () => {
    if (isSpeaking) {
      stopFemaleVoice();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakWithFemaleVoice(currentTextToSpeak, language, {
        rate: speechRate,
        pitch: 1.2,
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false)
      });
    }
  };

  const handleSpeakCustom = () => {
    if (!customText.trim()) return;
    stopFemaleVoice();
    setIsSpeaking(true);
    speakWithFemaleVoice(customText, language, {
      rate: speechRate,
      pitch: 1.2,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const handleStop = () => {
    stopFemaleVoice();
    setIsSpeaking(false);
  };

  return (
    <>
      {/* Floating Trigger Button in Bottom Corner */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen && !isSpeaking) {
              // Automatically greet when opened for immediate delightful feedback
              handlePlayScript(FEMALE_VOICE_SCRIPTS[0]);
            }
          }}
          className={`group flex items-center gap-3 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 border cursor-pointer ${
            isSpeaking 
              ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white border-pink-400 ring-4 ring-pink-500/30 scale-105'
              : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700 hover:scale-102'
          }`}
          title="Talk with Women Sound / మహిళా వాయిస్ గైడ్"
          aria-label="Open Female Voice Audio Guide"
        >
          {/* Animated Avatar / Audio Waves */}
          <div className="relative w-8 h-8 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center shrink-0 overflow-hidden">
            <span className="text-sm">👩‍🏫</span>
            {isSpeaking && (
              <span className="absolute inset-0 rounded-full border-2 border-pink-400 animate-ping opacity-75" />
            )}
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold leading-none">
              <span>రమ్య (Ramya)</span>
              <span className="text-[10px] bg-pink-500/30 text-pink-200 px-1.5 py-0.2 rounded font-semibold uppercase">
                Women Voice
              </span>
            </div>
            <div className="text-[10px] text-slate-300 mt-1 flex items-center gap-1">
              {isSpeaking ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 font-semibold">Speaking Now...</span>
                </>
              ) : (
                <span>Listen in Female Sound (మహిళా స్వరం)</span>
              )}
            </div>
          </div>

          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            {isSpeaking ? <Volume2 className="w-3.5 h-3.5 text-pink-300 animate-pulse" /> : <Play className="w-3.5 h-3.5 text-slate-200" />}
          </div>
        </button>
      </div>

      {/* Slide-out / Modal Audio Guide Panel */}
      {isOpen && (
        <div className="fixed bottom-22 left-4 sm:left-6 z-50 w-[94vw] sm:w-[440px] max-h-[85vh] bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 fade-in duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-rose-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-xl shadow-lg shadow-pink-500/20 border border-pink-400/30">
                👩‍🏫
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-white">
                    రమ్య · Campus Voice Guide
                  </h3>
                  <span className="bg-pink-500/20 text-pink-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-pink-500/30">
                    Female Sound
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  REDDY ONLINE EDUCATION · మహిళా వాయిస్ అసిస్టెంట్
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${showSettings ? 'bg-pink-600/30 text-pink-300' : 'text-slate-400 hover:text-white'}`}
                title="Voice Settings"
              >
                <Sliders className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  stopFemaleVoice();
                  setIsOpen(false);
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel (collapsible) */}
          {showSettings && (
            <div className="p-3 bg-slate-900/90 border-b border-slate-800 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-slate-300 font-medium">
                <span>Speaking Rate (వాయిస్ వేగం):</span>
                <span className="font-mono text-pink-400">{speechRate}x</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.25"
                step="0.05"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>0.75x (నెమ్మదిగా)</span>
                <span>0.95x (సహజమైన స్వరం)</span>
                <span>1.25x (వేగంగా)</span>
              </div>
            </div>
          )}

          {/* Language Switcher Bar */}
          <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between">
            <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-pink-400" />
              <span>భాష ఎంచుకోండి (Language):</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => {
                  setLanguage('te');
                  stopFemaleVoice();
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  language === 'te' 
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                తెలుగు (Telugu)
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  stopFemaleVoice();
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  language === 'en' 
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Active Speaking Player Display */}
          <div className="p-4 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 space-y-3">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider">
                  {activeScript.category}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs font-semibold text-slate-200">
                  {language === 'te' ? activeScript.titleTe : activeScript.titleEn}
                </span>
              </div>

              {/* Animated Audio Equalizer */}
              {isSpeaking ? (
                <div className="flex items-center gap-0.5 h-4">
                  <span className="w-1 bg-pink-500 rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 bg-rose-400 rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 bg-pink-300 rounded-full animate-bounce h-3" style={{ animationDelay: '300ms' }} />
                  <span className="w-1 bg-rose-500 rounded-full animate-bounce h-4" style={{ animationDelay: '450ms' }} />
                  <span className="w-1 bg-pink-400 rounded-full animate-bounce h-2" style={{ animationDelay: '200ms' }} />
                </div>
              ) : (
                <span className="text-[10px] text-slate-500 font-mono">Ready</span>
              )}
            </div>

            {/* Spoken Text Box */}
            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800/90 text-xs text-slate-200 leading-relaxed max-h-28 overflow-y-auto">
              <p className={isSpeaking ? 'text-pink-100 transition-colors' : 'text-slate-300'}>
                "{currentTextToSpeak}"
              </p>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlayCurrent}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isSpeaking 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/30' 
                      : 'bg-pink-600 hover:bg-pink-700 text-white shadow-md shadow-pink-600/30'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <span>Pause Speech</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{language === 'te' ? 'వినండి (Listen)' : 'Listen in Woman Voice'}</span>
                    </>
                  )}
                </button>

                {isSpeaking && (
                  <button
                    onClick={handleStop}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                    title="Stop Audio"
                  >
                    <Square className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                <span>Sound:</span>
                <span className="text-pink-400 font-bold">Women Pitch (1.20)</span>
              </div>
            </div>

          </div>

          {/* Quick Audio Chapters */}
          <div className="p-4 space-y-2 flex-1 overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Select Voice Topic (టాపిక్ ఎంచుకోండి):</span>
            </div>

            <div className="space-y-1.5">
              {FEMALE_VOICE_SCRIPTS.map((script) => {
                const isCurrent = script.id === selectedScriptId;
                return (
                  <button
                    key={script.id}
                    onClick={() => handlePlayScript(script)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-pink-950/40 border-pink-500/50 text-white'
                        : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isCurrent ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {script.id === 'welcome' && <GraduationCap className="w-3.5 h-3.5" />}
                        {script.id === 'campus-tour' && <Building2 className="w-3.5 h-3.5" />}
                        {script.id === 'placements' && <Briefcase className="w-3.5 h-3.5" />}
                        {script.id === 'courses' && <BookOpen className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold line-clamp-1">
                          {language === 'te' ? script.titleTe : script.titleEn}
                        </div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">
                          {script.category}
                        </div>
                      </div>
                    </div>

                    <div className="p-1 rounded-md bg-white/5">
                      {isCurrent && isSpeaking ? (
                        <Volume2 className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                      ) : (
                        <Play className="w-3 h-3 text-slate-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Text-to-Speech Box */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                <MessageSquareQuote className="w-3.5 h-3.5 text-pink-400" />
                <span>Speak Custom Text in Woman Voice (మీ వాక్యాన్ని మహిళా స్వరంలో వినండి):</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder={language === 'te' ? "ఉదాహరణ: సుదర్శన్ రెడ్డి గారి నాయకత్వంలో నడుస్తున్న కళాశాల..." : "Type text to speak in gentle female voice..."}
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSpeakCustom();
                  }}
                />
                <button
                  onClick={handleSpeakCustom}
                  disabled={!customText.trim()}
                  className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                >
                  Speak
                </button>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Voice Guide: <strong>Ramya</strong> (మహిళా స్వరం)</span>
            <span className="text-pink-400 font-medium">Founder: Sudharshan Reddy K R</span>
          </div>

        </div>
      )}
    </>
  );
};
