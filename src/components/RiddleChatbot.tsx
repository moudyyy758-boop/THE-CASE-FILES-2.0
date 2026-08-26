import React, { useState, useEffect, useRef } from 'react';
import { MysteryCase, Hint } from '../types';

interface RiddleChatbotProps {
  currentCase?: MysteryCase;
  allCases: MysteryCase[];
  isOpen: boolean;
  onClose: () => void;
  onUnlockHint?: (caseId: string, hintId: number) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isRiddle?: boolean;
  isSolvedNotification?: boolean;
  unlockedHint?: string;
}

export const RiddleChatbot: React.FC<RiddleChatbotProps> = ({
  currentCase,
  allCases,
  isOpen,
  onClose,
  onUnlockHint
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    currentCase?.id || allCases[0]?.id || 'the-last-toast'
  );

  const activeCase = allCases.find((c) => c.id === selectedCaseId) || currentCase || allCases[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: `Greetings, Investigator. I am Agent Cipher, the Bureau Cryptographer. I hold top-secret case hints for "${activeCase?.title || 'this case'}". Solve my riddles, and the truth shall be revealed to you!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 'm-2',
      sender: 'bot',
      text: 'Here is your first riddle challenge:\n\n"I have no voice, yet I speak to many. I have no text, yet I tell a story of crime. I am left behind in dust and blood. What am I?"',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRiddle: true,
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeRiddle, setActiveRiddle] = useState<string>(
    'I have no voice, yet I speak to many. I have no text, yet I tell a story of crime. I am left behind in dust and blood. What am I?'
  );
  const [unlockedHints, setUnlockedHints] = useState<string[]>([]);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentCase) {
      setSelectedCaseId(currentCase.id);
    }
  }, [currentCase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/riddle-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          caseTitle: activeCase?.title,
          casePremise: activeCase?.premise,
          hints: activeCase?.hints?.map((h: Hint) => h.text) || [],
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
          activeRiddle,
          solvedRiddlesCount: solvedCount,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        const botMsg: Message = {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSolvedNotification: data.isSolved,
          unlockedHint: data.unlockedHint,
        };

        setMessages((prev) => [...prev, botMsg]);

        if (data.isSolved) {
          setSolvedCount((prev) => prev + 1);
          if (data.unlockedHint) {
            setUnlockedHints((prev) => [...prev, data.unlockedHint]);
            if (onUnlockHint && activeCase) {
              onUnlockHint(activeCase.id, solvedCount + 1);
            }
          }
        }

        if (data.nextRiddle) {
          setActiveRiddle(data.nextRiddle);
        }
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      console.error('Riddle bot error:', err);
      // Fallback in-character response if API fails or offline
      const isEvidenceAnswer = text.toLowerCase().includes('fingerprint') || text.toLowerCase().includes('clue') || text.toLowerCase().includes('evidence');
      
      if (isEvidenceAnswer) {
        const fallbackHint = activeCase?.hints?.[solvedCount]?.text || "Pay close attention to who had direct access to laboratory shipment records.";
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: `A sharp mind! "Fingerprint" or "Evidence" is correct! As promised, here is an official Bureau Hint for "${activeCase?.title}":\n\n🔍 UNLOCKED HINT: ${fallbackHint}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSolvedNotification: true,
            unlockedHint: fallbackHint,
          },
        ]);
        setUnlockedHints((prev) => [...prev, fallbackHint]);
        setSolvedCount((prev) => prev + 1);
        setActiveRiddle('I run without legs, I cut without knives, I end with a flash, and take away lives. What am I? (Answer: Time / Poison)');
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: `Close, but the shadows still hide the truth! Try again, or ask me for a hint about the riddle itself.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestNewRiddle = () => {
    handleSendMessage('Give me a new riddle challenge!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md sm:max-w-lg bg-[#fdfae8] border-2 border-black shadow-2xl rounded-none overflow-hidden font-sans text-black flex flex-col h-[600px] max-h-[85vh]">
      {/* Clip decoration */}
      <div className="bg-[#4a1c1c] text-white px-4 py-3 border-b-2 border-black flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-[#ffdea5]">psychology</span>
          <div>
            <h3 className="font-serif font-bold text-sm text-[#ffdea5] tracking-wide flex items-center gap-2">
              Agent Cipher | AI Riddle Hint Bot
            </h3>
            <p className="font-mono text-[10px] text-amber-200/80">
              Bureau Cryptographer & Informant
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="text-amber-200/80 hover:text-white p-1"
            title="Close Chat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      {/* Case Selector Bar */}
      <div className="bg-[#f7f4e2] px-4 py-2 border-b border-black/20 flex items-center justify-between text-xs font-mono">
        <span className="text-neutral-600 font-bold uppercase">Case Target:</span>
        <select
          value={selectedCaseId}
          onChange={(e) => setSelectedCaseId(e.target.value)}
          className="bg-[#fdfae8] border border-black/40 text-black text-xs py-1 px-2 font-mono rounded-none focus:outline-none focus:border-black"
        >
          {allCases.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} ({c.fileNumber})
            </option>
          ))}
        </select>
      </div>

      {/* Stats bar */}
      <div className="bg-[#f2ebd4] px-4 py-1.5 border-b border-black/10 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center space-x-2 text-[#4a1c1c] font-bold">
          <span className="material-symbols-outlined text-sm">workspace_premium</span>
          <span>Riddles Solved: {solvedCount}</span>
        </div>
        <div className="text-neutral-700">
          Unlocked Hints: <span className="font-bold text-[#a17f3b]">{unlockedHints.length}</span>
        </div>
      </div>

      {/* Active Riddle Banner */}
      {activeRiddle && (
        <div className="bg-[#fff9e6] border-b-2 border-amber-800/30 px-4 py-2 text-xs font-serif italic text-amber-950 flex items-start space-x-2">
          <span className="material-symbols-outlined text-amber-700 text-sm mt-0.5">help</span>
          <div className="flex-1">
            <span className="font-bold font-sans not-italic uppercase text-[10px] text-amber-800 block">
              Active Challenge Riddle:
            </span>
            "{activeRiddle}"
          </div>
        </div>
      )}

      {/* Message History */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fdfae8] paper-texture">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2.5 shadow-sm text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-black text-white font-sans rounded-none'
                  : msg.isSolvedNotification
                  ? 'bg-[#e8f5e9] border-2 border-emerald-800 text-emerald-950 font-sans'
                  : 'bg-[#f4efe0] border border-black/30 text-neutral-900 font-sans'
              }`}
            >
              {msg.isSolvedNotification && (
                <div className="flex items-center space-x-1.5 text-emerald-800 font-bold mb-1 border-b border-emerald-800/30 pb-1 font-mono text-[11px]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>RIDDLE SOLVED! HINT UNLOCKED</span>
                </div>
              )}

              <div className="whitespace-pre-wrap">{msg.text}</div>

              {msg.unlockedHint && (
                <div className="mt-2 p-2 bg-white/80 border border-emerald-700 text-emerald-900 font-mono text-[11px] rounded-none">
                  <span className="font-bold text-emerald-950 block mb-0.5">🔓 UNLOCKED CASE HINT:</span>
                  {msg.unlockedHint}
                </div>
              )}

              <span
                className={`block text-[9px] font-mono mt-1 ${
                  msg.sender === 'user' ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-neutral-600 font-mono text-xs p-2">
            <span className="material-symbols-outlined animate-spin text-sm">autorenew</span>
            <span>Agent Cipher is evaluating the riddle answer...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Unlocked Hints Drawer */}
      {unlockedHints.length > 0 && (
        <details className="bg-[#f2ebd4] border-t border-black/20 px-4 py-2 text-xs font-mono">
          <summary className="cursor-pointer font-bold text-black hover:text-[#a17f3b] flex justify-between items-center select-none">
            <span>View Unlocked Hints ({unlockedHints.length})</span>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </summary>
          <ul className="mt-2 space-y-1.5 pl-2 max-h-24 overflow-y-auto">
            {unlockedHints.map((hint, idx) => (
              <li key={idx} className="text-[11px] text-neutral-800 list-disc italic">
                {hint}
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Quick Action Chips */}
      <div className="bg-[#f7f4e2] px-3 py-2 border-t border-black/20 flex gap-2 overflow-x-auto text-[11px] font-mono">
        <button
          onClick={handleRequestNewRiddle}
          disabled={isLoading}
          className="whitespace-nowrap px-2.5 py-1 bg-[#4a1c1c] text-white hover:bg-black transition-colors"
        >
          🎲 New Riddle
        </button>
        <button
          onClick={() => handleSendMessage("Give me a hint for the active riddle!")}
          disabled={isLoading}
          className="whitespace-nowrap px-2.5 py-1 bg-[#a17f3b] text-white hover:bg-amber-900 transition-colors"
        >
          💡 Hint for Riddle
        </button>
        <button
          onClick={() => handleSendMessage("Fingerprint")}
          disabled={isLoading}
          className="whitespace-nowrap px-2.5 py-1 bg-neutral-200 text-black border border-black/30 hover:bg-neutral-300 transition-colors"
        >
          Try "Fingerprint"
        </button>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="bg-[#fdfae8] p-3 border-t-2 border-black flex items-center space-x-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your answer to the riddle..."
          disabled={isLoading}
          className="flex-1 bg-[#f7f4e2] border border-black/40 px-3 py-2 text-xs font-sans text-black placeholder:text-neutral-500 focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="bg-black text-white px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#4a1c1c] transition-colors disabled:opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
