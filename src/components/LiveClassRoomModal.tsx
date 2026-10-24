import React, { useState, useEffect } from 'react';
import { LiveClass } from '../types';
import { LIVE_CLASSES_DATA } from '../data/liveClassesData';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Radio, 
  Users, 
  Hand, 
  Send, 
  MessageSquare, 
  Download, 
  Clock, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  CheckCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface LiveClassRoomModalProps {
  onClose: () => void;
  initialClassId?: string;
}

interface ChatMessage {
  id: string;
  sender: string;
  role: 'instructor' | 'student' | 'you';
  text: string;
  time: string;
}

export const LiveClassRoomModal: React.FC<LiveClassRoomModalProps> = ({
  onClose,
  initialClassId
}) => {
  const { user } = useAuth();
  const [selectedClassId, setSelectedClassId] = useState<string>(
    initialClassId || LIVE_CLASSES_DATA[0].id
  );

  const activeClass = LIVE_CLASSES_DATA.find((c) => c.id === selectedClassId) || LIVE_CLASSES_DATA[0];

  const [handRaised, setHandRaised] = useState(false);
  const [handAcknowledged, setHandAcknowledged] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [videoActive, setVideoActive] = useState(false);

  // Live Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'c1',
      sender: 'Sudharshan Reddy K R',
      role: 'instructor',
      text: 'Welcome students to today’s session! Please open your reference sheet and feel free to raise hands for doubts.',
      time: '6:31 PM'
    },
    {
      id: 'c2',
      sender: 'Dr. Nikhil Rao',
      role: 'student',
      text: 'Good evening Sir! Audio and video are crystal clear.',
      time: '6:32 PM'
    },
    {
      id: 'c3',
      sender: 'Meera Patel',
      role: 'student',
      text: 'Sir, will we also cover the asynchronous connection pool limits in production?',
      time: '6:33 PM'
    }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // In-class notes
  const [studentNotes, setStudentNotes] = useState(
    `# REDDY ONLINE EDUCATION - LIVE CLASS NOTES\nDate: ${new Date().toLocaleDateString()}\nTopic: ${activeClass.topic}\nFaculty: ${activeClass.instructor}\n\nKey Observations:\n- Async event loop utilizes single thread with non-blocking syscalls.\n- Keep database session pooled to prevent connection thrashing.`
  );

  // In-class Quick Poll
  const [pollVoted, setPollVoted] = useState(false);
  const [pollSelected, setPollSelected] = useState<number | null>(null);

  const pollQuestion = {
    question: "Quick Check: What is the optimal concurrency model for high-throughput I/O bound systems?",
    options: [
      { text: "Async Non-blocking Event Loop", votes: 84 },
      { text: "Synchronous Multi-threaded Blocking", votes: 12 },
      { text: "Pure Single-Threaded Polling", votes: 4 }
    ]
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: user?.name || 'You',
      role: 'you',
      text: newChatText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setNewChatText('');

    // Simulated instructor acknowledgement after 2 seconds
    setTimeout(() => {
      const responseMsg: ChatMessage = {
        id: 'reply-' + Date.now(),
        sender: 'Sudharshan Reddy K R',
        role: 'instructor',
        text: `Great query ${user?.name || 'student'}, let me demonstrate this on screen right now!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, responseMsg]);
    }, 2500);
  };

  const handleRaiseHand = () => {
    setHandRaised(true);
    setTimeout(() => {
      setHandAcknowledged(true);
    }, 2000);
  };

  const handleDownloadNotes = () => {
    const blob = new Blob([studentNotes], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Reddy_LiveNotes_${activeClass.courseId}_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      
      <div className="relative bg-slate-900 text-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col h-[94vh]">
        
        {/* Live Bar Header */}
        <div className="bg-slate-950 px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white text-[11px] font-extrabold rounded-md shadow-sm">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              LIVE CLASSROOM
            </span>
            <div className="hidden sm:block">
              <h2 className="text-sm font-bold text-white line-clamp-1">
                {activeClass.topic}
              </h2>
              <div className="text-[11px] text-slate-400">
                {activeClass.courseTitle} · Mentor: <strong>{activeClass.instructor}</strong>
              </div>
            </div>
          </div>

          {/* Session Switcher & Close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-white tabular-nums">{activeClass.attendeesCount}</span> attending
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Stage Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
          
          {/* Main Visual Stream & Stage (8 cols) */}
          <div className="lg:col-span-8 flex flex-col bg-slate-950 overflow-y-auto p-4 space-y-4">
            
            {/* Live Video Canvas */}
            <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-slate-900 to-black border border-slate-800 overflow-hidden flex flex-col justify-between p-5 shadow-2xl">
              
              {/* Stream Top Watermark */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-white">REDDY ONLINE EDUCATION · BROADCAST</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                  <span>ROOM: {activeClass.meetingRoomId}</span>
                  <span>· 1080p 60fps</span>
                </div>
              </div>

              {/* Central Visual: Interactive Instructor Blackboard & Diagram Simulation */}
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-xl">
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex flex-col items-center justify-center text-center p-1">
                    <span className="text-xl font-black text-amber-400">SR</span>
                    <span className="text-[9px] text-slate-400 font-bold">CEO</span>
                  </div>
                </div>

                <div className="space-y-1 max-w-lg">
                  <div className="text-base sm:text-lg font-extrabold text-white">
                    {activeClass.topic}
                  </div>
                  <div className="text-xs text-slate-300">
                    Live Instruction by {activeClass.instructor}
                  </div>
                  <div className="text-[11px] text-amber-400/90 font-mono pt-1">
                    [ Interactive Screenshare & Real-Time Whiteboard Active ]
                  </div>
                </div>
              </div>

              {/* Hand Raise Alert Feedback */}
              {handRaised && (
                <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 animate-bounce">
                  <Hand className="w-4 h-4" />
                  {handAcknowledged
                    ? "Instructor acknowledged your raised hand!"
                    : "Hand Raised · Waiting for Instructor to call on you..."}
                </div>
              )}

              {/* Bottom Interactive Stream Controls */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMicActive(!micActive)}
                    className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                      micActive ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    <span className="hidden sm:inline">{micActive ? 'Mic On' : 'Muted'}</span>
                  </button>

                  <button
                    onClick={() => setVideoActive(!videoActive)}
                    className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                      videoActive ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    <span className="hidden sm:inline">{videoActive ? 'Cam On' : 'Cam Off'}</span>
                  </button>

                  <button
                    onClick={handleRaiseHand}
                    disabled={handRaised}
                    className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                      handRaised ? 'bg-amber-600 text-white' : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                    }`}
                  >
                    <Hand className="w-4 h-4" />
                    <span>{handRaised ? 'Hand Raised' : 'Raise Hand'}</span>
                  </button>
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  Batch: 2026-A Spring
                </div>
              </div>

            </div>

            {/* Agenda & Class Schedule Quick Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Agenda Box */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Today's Session Agenda
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeClass.agenda.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* In-Class Live Poll */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Live Class Poll</span>
                  <span className="text-[10px] text-slate-400">100 responses</span>
                </div>
                <div className="text-xs font-medium text-slate-200">
                  {pollQuestion.question}
                </div>
                <div className="space-y-1.5">
                  {pollQuestion.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => { setPollSelected(i); setPollVoted(true); }}
                      className={`w-full p-2 rounded-xl text-left text-xs transition-colors cursor-pointer border flex items-center justify-between ${
                        pollSelected === i 
                          ? 'bg-red-600/20 border-red-500 text-white font-bold'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {pollVoted && (
                        <span className="font-mono text-[10px] text-slate-400">{opt.votes + (pollSelected === i ? 1 : 0)}%</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live Chat & In-Class Notepad (4 cols) */}
          <div className="lg:col-span-4 border-l border-slate-800 bg-slate-900 flex flex-col min-h-0">
            
            {/* Tabs for Chat vs Notepad */}
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-red-500" />
                Interactive Class Chat
              </span>
              <button
                onClick={handleDownloadNotes}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                title="Download in-class markdown notes"
              >
                <Download className="w-3.5 h-3.5" />
                Save Notes
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`p-3 rounded-2xl text-xs space-y-1 ${
                    msg.role === 'instructor' 
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-100'
                      : msg.role === 'you'
                      ? 'bg-red-600/20 border border-red-500/30 text-slate-100 ml-4'
                      : 'bg-slate-800/80 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-bold text-slate-300 flex items-center gap-1">
                      {msg.sender}
                      {msg.role === 'instructor' && (
                        <span className="bg-amber-500 text-slate-950 font-black text-[9px] px-1 py-0.2 rounded">FACULTY</span>
                      )}
                      {msg.role === 'you' && (
                        <span className="bg-red-500 text-white font-bold text-[9px] px-1 py-0.2 rounded">YOU</span>
                      )}
                    </span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* In-Class Notepad Area */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/60">
              <div className="text-[10px] font-bold text-slate-400 mb-1 flex items-center justify-between">
                <span>Personal Scratchpad Notes</span>
                <span className="text-slate-500">Auto-saved</span>
              </div>
              <textarea
                value={studentNotes}
                onChange={(e) => setStudentNotes(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono resize-none"
              />
            </div>

            {/* Chat Send Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask faculty or discuss with batch..."
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer transition-colors"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
};
