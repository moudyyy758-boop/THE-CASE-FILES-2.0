import React, { useState } from 'react';
import { MysteryCase } from '../types';

interface HostMysteryViewProps {
  cases: MysteryCase[];
  onStartSession: (caseId: string, hostName: string) => void;
  onOpenRiddleBot: () => void;
}

export const HostMysteryView: React.FC<HostMysteryViewProps> = ({
  cases,
  onStartSession,
  onOpenRiddleBot,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || 'the-last-toast');
  const [hostName, setHostName] = useState('Lead Detective');
  const [roomCode, setRoomCode] = useState('TOAST-892');

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const handleLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCase) {
      onStartSession(selectedCase.id, hostName);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-12 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="font-mono text-xs uppercase text-[#4a1c1c] font-bold tracking-widest bg-[#ffdea5] px-3 py-1 border border-black/20">
          COMMAND DASHBOARD
        </span>
        <h1 className="font-serif text-4xl font-bold text-black">Host a Mystery Game Room</h1>
        <p className="font-sans text-xs text-neutral-700 max-w-xl mx-auto">
          Create an interactive live room code for your party. Assign character dossiers, reveal evidence, and challenge players with AI riddles!
        </p>
      </div>

      <div className="bg-[#f7f4e2] border-2 border-black p-6 md:p-8 space-y-6 paper-texture">
        <form onSubmit={handleLaunch} className="space-y-6">
          {/* Select Case */}
          <div>
            <label className="block font-mono text-xs uppercase font-bold text-black mb-2">
              1. Select Archival Case File
            </label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="w-full bg-[#fdfae8] border border-black p-3 font-mono text-xs text-black focus:outline-none"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.fileNumber}) - {c.playerCount} • {c.difficulty}
                </option>
              ))}
            </select>
          </div>

          {/* Host Name */}
          <div>
            <label className="block font-mono text-xs uppercase font-bold text-black mb-2">
              2. Host / Lead Investigator Name
            </label>
            <input
              type="text"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full bg-[#fdfae8] border border-black p-3 font-sans text-xs text-black focus:outline-none"
              placeholder="e.g. Detective Holmes"
            />
          </div>

          {/* Room Code display */}
          <div className="bg-[#fdfae8] p-4 border border-black/30 flex justify-between items-center font-mono text-xs">
            <div>
              <span className="text-neutral-500 block text-[10px]">ROOM PASSCODE:</span>
              <span className="font-bold text-lg text-[#4a1c1c]">{roomCode}</span>
            </div>
            <button
              type="button"
              onClick={() => setRoomCode(`ROOM-${Math.floor(100 + Math.random() * 900)}`)}
              className="underline text-black hover:text-[#a17f3b]"
            >
              Generate New Code
            </button>
          </div>

          {/* Case summary preview */}
          {selectedCase && (
            <div className="bg-[#fdfae8] p-4 border border-black/20 text-xs font-sans space-y-2">
              <h4 className="font-serif font-bold text-sm text-black">{selectedCase.title}</h4>
              <p className="text-neutral-700">{selectedCase.premise}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 bg-black text-white font-sans text-xs uppercase tracking-wider font-bold py-4 hover:bg-[#4a1c1c] transition-colors"
            >
              Launch Live Investigation Session
            </button>

            <button
              type="button"
              onClick={onOpenRiddleBot}
              className="bg-[#a17f3b] text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-4 hover:bg-amber-900 transition-colors flex items-center justify-center space-x-2"
            >
              <span className="material-symbols-outlined text-sm">psychology</span>
              <span>Test Riddle Bot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
