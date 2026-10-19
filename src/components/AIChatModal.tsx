import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Search,
  MapPin,
  ExternalLink,
  RotateCcw,
  Copy,
  Check,
  Zap,
  Cpu,
  Globe,
  Loader2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { AudioTranscriberButton } from './AudioTranscriberButton';
import { COMPANY_CONFIG } from '../config/company';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
  searchSources?: Array<{ title: string; url: string }>;
  mapSources?: Array<{ title: string; url: string; address?: string }>;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToEnquiryForm?: (summary: string) => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  onSendToEnquiryForm,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text:
        'Welcome! I am the Chief Engineering & Property Advisory AI for People and Co Construction Firm (PACCF) in Eku, Delta State.\n\n' +
        'How can I assist you today? I can provide:\n' +
        '• Preliminary structural & civil engineering guidance\n' +
        '• Bill of Quantities (BOQ) cost estimates in Naira (₦)\n' +
        '• Up-to-date building material prices in Nigeria via Google Search\n' +
        '• Local site topography & landmark locations via Google Maps\n' +
        '• Turnkey construction milestone schedules',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.8-flash',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskComplexity, setTaskComplexity] = useState<'general' | 'fast' | 'complex'>('general');
  const [toolMode, setToolMode] = useState<'none' | 'search' | 'maps'>('none');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, text: m.text })),
          taskComplexity,
          toolMode,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: data.modelUsed,
          searchSources: data.searchSources,
          mapSources: data.mapSources,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `bot-err-${Date.now()}`,
          role: 'model',
          text: data.error || 'Sorry, I encountered an issue processing your engineering inquiry. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      const networkErrorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        text: 'Network error communicating with the AI service. Please verify your internet connection or call our office directly at ' + COMPANY_CONFIG.contact.phoneDisplay,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, networkErrorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (confirm('Clear chat history?')) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'model',
          text: 'Conversation reset. How can our engineering and real estate team assist you now?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'gemini-3.8-flash',
        },
      ]);
    }
  };

  const quickPrompts = [
    'Estimate BOQ for 4-Bedroom Duplex in Delta State',
    'What are current building materials price trends in Nigeria?',
    'Find building supply stores and town planning near Eku',
    'What civil drainage design is best for flood-prone terrain?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2545] text-white flex items-center justify-between border-b border-[#07172B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00B4D8] to-sky-400 text-[#0B2545] flex items-center justify-center font-extrabold shadow-sm">
              <Bot className="w-6 h-6 text-[#0B2545]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base font-['Plus_Jakarta_Sans'] text-white">
                  PACCF Engineering & Real Estate AI
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-[#00B4D8]">
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Official Virtual Consultant · People and Co Construction Firm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar: Model Selector & Grounding Tools */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Model Selection Tabs */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
              Mode:
            </span>
            <button
              onClick={() => setTaskComplexity('general')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                taskComplexity === 'general'
                  ? 'bg-white text-[#0B2545] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Balanced general advice using gemini-3.8-flash"
            >
              General (Flash)
            </button>
            <button
              onClick={() => setTaskComplexity('fast')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                taskComplexity === 'fast'
                  ? 'bg-white text-[#0B2545] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Low-latency fast Q&A using gemini-3.1-flash-lite"
            >
              Fast (Lite)
            </button>
            <button
              onClick={() => setTaskComplexity('complex')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                taskComplexity === 'complex'
                  ? 'bg-white text-[#0B2545] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="In-depth structural calculations & reasoning"
            >
              Deep Reasoning
            </button>
          </div>

          {/* Grounding Tools Toggles */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
              Live Data:
            </span>
            
            {/* Search Grounding Button */}
            <button
              onClick={() => setToolMode((prev) => (prev === 'search' ? 'none' : 'search'))}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                toolMode === 'search'
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle real-time web search grounding via gemini-3.8-flash (googleSearch)"
            >
              <Search className="w-3.5 h-3.5 text-[#00B4D8]" />
              <span>Google Search</span>
            </button>

            {/* Maps Grounding Button */}
            <button
              onClick={() => setToolMode((prev) => (prev === 'maps' ? 'none' : 'maps'))}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                toolMode === 'maps'
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Google Maps geographical grounding for Delta State / Nigerian landmarks (googleMaps)"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Google Maps</span>
            </button>
          </div>

        </div>

        {/* Scrollable Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                msg.role === 'user' ? 'ml-auto justify-end' : 'mr-auto justify-start'
              }`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-[#00B4D8] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`rounded-2xl p-4.5 text-xs sm:text-sm leading-relaxed transition-all shadow-xs ${
                  msg.role === 'user'
                    ? 'bg-[#0B2545] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Search Grounding Sources Cards */}
                {msg.searchSources && msg.searchSources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-[#00B4D8]" />
                      <span>Verified Google Search Sources:</span>
                    </div>
                    <div className="space-y-1.5">
                      {msg.searchSources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-[#0B2545] border border-slate-200 transition-colors"
                        >
                          <span className="truncate font-medium">{source.title}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Maps Grounding Locations Cards */}
                {msg.mapSources && msg.mapSources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                    <div className="text-[11px] font-bold text-[#0B2545] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>Google Maps Grounding Locations:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.mapSources.map((mapLoc, idx) => (
                        <a
                          key={idx}
                          href={mapLoc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200 text-amber-950 transition-colors block"
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span className="truncate">{mapLoc.title}</span>
                            <ExternalLink className="w-3 h-3 text-amber-600 shrink-0" />
                          </div>
                          {mapLoc.address && (
                            <div className="text-[11px] text-amber-800 mt-0.5 truncate">
                              {mapLoc.address}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer Metadata */}
                <div
                  className={`mt-2.5 pt-1.5 flex items-center justify-between text-[10px] ${
                    msg.role === 'user' ? 'text-slate-300' : 'text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    {msg.modelUsed && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{msg.modelUsed}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-slate-600 transition-colors p-0.5"
                      title="Copy text"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {msg.role === 'model' && onSendToEnquiryForm && (
                      <button
                        onClick={() => {
                          onSendToEnquiryForm(msg.text);
                          onClose();
                        }}
                        className="hover:text-[#00B4D8] transition-colors font-medium flex items-center gap-1"
                        title="Transfer this advice to your consultation form"
                      >
                        <span>Send to Enquiry</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 max-w-xl mr-auto">
              <div className="w-8 h-8 rounded-lg bg-[#0B2545] text-[#00B4D8] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 rounded-tl-none shadow-xs text-xs text-slate-500 flex items-center gap-2.5">
                <Loader2 className="w-4 h-4 animate-spin text-[#00B4D8]" />
                <span>
                  Consulting engineering database
                  {toolMode === 'search' && ' & live Google Search'}
                  {toolMode === 'maps' && ' & Google Maps geography'}...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">Suggested:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={loading}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:text-[#0B2545] hover:border-[#00B4D8] whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Audio Voice Input via gemini-3.5-transcribe */}
            <AudioTranscriberButton
              buttonText="Speak"
              onTranscribed={(transcribedText) => {
                setInputText((prev) => (prev ? `${prev} ${transcribedText}` : transcribedText));
              }}
            />

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about BOQ costs, structural calculations, Delta State site logistics..."
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#07172B] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5 text-[#F59E0B]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
