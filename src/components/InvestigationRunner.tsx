import React, { useState } from 'react';
import { MysteryCase, Character, AccusationSubmission } from '../types';

interface InvestigationRunnerProps {
  mysteryCase: MysteryCase;
  onOpenRiddleBot: () => void;
  onExitSession: () => void;
  onSolveCase?: (caseId: string) => void;
}

export const InvestigationRunner: React.FC<InvestigationRunnerProps> = ({
  mysteryCase,
  onOpenRiddleBot,
  onExitSession,
  onSolveCase,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    mysteryCase.characters[0] || null
  );
  const [activeTab, setActiveTab] = useState<'dossiers' | 'evidence' | 'timeline' | 'notes' | 'accusation'>('dossiers');
  const [notes, setNotes] = useState<string>('');
  const [accusation, setAccusation] = useState<AccusationSubmission>({
    culpritId: '',
    motive: '',
    evidenceIds: [],
    deductionNotes: '',
    submittedAt: '',
  });
  const [isRevealed, setIsRevealed] = useState(false);

  const handleToggleAccusationEvidence = (id: string) => {
    setAccusation((prev) => ({
      ...prev,
      evidenceIds: prev.evidenceIds.includes(id)
        ? prev.evidenceIds.filter((e) => e !== id)
        : [...prev.evidenceIds, id],
    }));
  };

  const handleSubmitAccusation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accusation.culpritId) return;
    setAccusation((prev) => ({
      ...prev,
      submittedAt: new Date().toLocaleTimeString(),
    }));
    setIsRevealed(true);
    if (accusation.culpritId === mysteryCase.solution?.culpritId && onSolveCase) {
      onSolveCase(mysteryCase.id);
    }
  };

  const isCulpritCorrect = accusation.culpritId === mysteryCase.solution?.culpritId;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-8">
      {/* Top Session Header */}
      <div className="bg-[#4a1c1c] text-white p-6 border-2 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 font-mono text-xs text-[#ffdea5] uppercase">
            <span>LIVE INVESTIGATION ROOM</span>
            <span>•</span>
            <span>CODE: TOAST-892</span>
          </div>
          <h1 className="font-serif text-3xl font-bold">{mysteryCase.title}</h1>
          <p className="font-mono text-xs text-amber-100/80">{mysteryCase.fileNumber}</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenRiddleBot}
            className="bg-[#ffdea5] text-black font-sans text-xs uppercase tracking-wider font-bold px-4 py-2.5 hover:bg-white transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">psychology</span>
            <span>Riddle Hint Bot</span>
          </button>

          <button
            onClick={onExitSession}
            className="bg-black/60 text-white font-sans text-xs uppercase tracking-wider font-bold px-4 py-2.5 hover:bg-black transition-colors"
          >
            Exit Room
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="border-b-2 border-black flex flex-wrap gap-2 md:gap-6 font-sans text-xs font-bold uppercase tracking-wider">
        {[
          { id: 'dossiers', label: 'Suspect Files & Secrets' },
          { id: 'evidence', label: 'Evidence Board' },
          { id: 'timeline', label: 'Timeline & Alibis' },
          { id: 'notes', label: 'Investigator Scratchpad' },
          { id: 'accusation', label: 'Final Accusation' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-2 transition-colors ${
              activeTab === tab.id
                ? 'text-black border-b-4 border-black'
                : 'text-neutral-500 hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content views */}
      {/* 1. DOSSIERS & PRIVATE SECRETS */}
      {activeTab === 'dossiers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-serif text-lg font-bold text-black">Select Your Character</h3>
            {mysteryCase.characters.map((char) => (
              <div
                key={char.id}
                onClick={() => setSelectedCharacter(char)}
                className={`p-4 border border-black/30 cursor-pointer transition-all flex items-center space-x-4 ${
                  selectedCharacter?.id === char.id
                    ? 'bg-black text-white border-black'
                    : 'bg-[#f7f4e2] text-black hover:bg-[#ffdea5]'
                }`}
              >
                <img
                  src={char.avatar}
                  alt={char.name}
                  className="w-12 h-12 object-cover border border-current"
                />
                <div>
                  <h4 className="font-serif font-bold text-sm">{char.name}</h4>
                  <p className="font-mono text-xs opacity-80">{char.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-8">
            {selectedCharacter && (
              <div className="bg-[#fdfae8] border-2 border-black p-6 space-y-6 paper-texture">
                <div className="flex items-center space-x-4 border-b border-black/20 pb-4">
                  <img
                    src={selectedCharacter.avatar}
                    alt={selectedCharacter.name}
                    className="w-20 h-20 object-cover border-2 border-black grayscale"
                  />
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-black">
                      {selectedCharacter.name}
                    </h2>
                    <p className="font-mono text-xs text-neutral-600">{selectedCharacter.role}</p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-xs text-neutral-800">
                  <div className="bg-amber-100 border-l-4 border-amber-800 p-4 font-mono text-amber-950">
                    <span className="font-bold uppercase text-[11px] block mb-1">
                      🔒 CONFIDENTIAL PRIVATE SECRETS:
                    </span>
                    <p className="italic">{selectedCharacter.secrets}</p>
                  </div>

                  <div>
                    <h4 className="font-mono uppercase font-bold text-black mb-1">Your Clues</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedCharacter.privateClues.map((clue, idx) => (
                        <li key={idx}>{clue}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono uppercase font-bold text-black mb-1">
                      Personal Objectives
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedCharacter.personalObjectives.map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. EVIDENCE BOARD */}
      {activeTab === 'evidence' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mysteryCase.evidence.map((ev) => (
            <div key={ev.id} className="bg-[#fdfae8] border-2 border-black p-4 space-y-3 shadow-md">
              <div className="flex justify-between items-center font-mono text-xs border-b border-black/20 pb-1">
                <span className="font-bold text-[#4a1c1c]">{ev.number}</span>
                <span className="bg-neutral-200 px-1 border uppercase text-[10px]">{ev.type}</span>
              </div>
              <h4 className="font-serif font-bold text-base text-black">{ev.title}</h4>
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-40 object-cover grayscale border border-black/30"
              />
              <p className="font-sans text-xs text-neutral-700">{ev.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* 3. TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-[#fdfae8] border-2 border-black p-6 space-y-4">
          <h3 className="font-serif text-xl font-bold text-black border-b border-black/20 pb-2">
            Chronological Statement Tracker
          </h3>
          <div className="space-y-4 font-sans text-xs">
            {mysteryCase.timeline.map((event) => (
              <div key={event.id} className="bg-[#f7f4e2] p-4 border border-black/30 space-y-1">
                <div className="flex justify-between font-mono text-xs text-[#4a1c1c] font-bold">
                  <span>{event.timestamp}</span>
                  <span>Location: {event.location}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-black">{event.title}</h4>
                <p className="text-neutral-800">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SCRATCHPAD */}
      {activeTab === 'notes' && (
        <div className="bg-[#fdfae8] border-2 border-black p-6 space-y-4">
          <h3 className="font-serif text-xl font-bold text-black">Private Investigator Scratchpad</h3>
          <p className="font-sans text-xs text-neutral-600">
            Keep track of alibis, motives, and contradictions during the investigation.
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={12}
            placeholder="Write your detective notes here..."
            className="w-full bg-[#f7f4e2] border border-black p-4 font-mono text-xs text-black focus:outline-none focus:border-[#4a1c1c]"
          />
        </div>
      )}

      {/* 5. ACCUSATION */}
      {activeTab === 'accusation' && (
        <div className="bg-[#fdfae8] border-2 border-black p-6 md:p-8 space-y-6">
          <h2 className="font-serif text-3xl font-bold text-black border-b border-black/20 pb-2">
            Official Accusation Brief
          </h2>

          {!isRevealed ? (
            <form onSubmit={handleSubmitAccusation} className="space-y-6">
              {/* Culprit Selection */}
              <div>
                <label className="block font-mono text-xs uppercase font-bold text-black mb-2">
                  1. Who is the Culprit?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {mysteryCase.characters.map((char) => (
                    <div
                      key={char.id}
                      onClick={() => setAccusation({ ...accusation, culpritId: char.id })}
                      className={`p-3 border cursor-pointer font-sans text-xs flex items-center space-x-3 transition-all ${
                        accusation.culpritId === char.id
                          ? 'bg-black text-white border-black font-bold'
                          : 'bg-[#f7f4e2] border-black/30 hover:bg-[#ffdea5]'
                      }`}
                    >
                      <img src={char.avatar} alt={char.name} className="w-10 h-10 object-cover" />
                      <div>
                        <div>{char.name}</div>
                        <div className="font-mono text-[10px] opacity-75">{char.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Motive */}
              <div>
                <label className="block font-mono text-xs uppercase font-bold text-black mb-2">
                  2. What was their Motive?
                </label>
                <textarea
                  value={accusation.motive}
                  onChange={(e) => setAccusation({ ...accusation, motive: e.target.value })}
                  placeholder="Explain why they committed the crime..."
                  rows={3}
                  className="w-full bg-[#f7f4e2] border border-black p-3 font-sans text-xs text-black focus:outline-none"
                />
              </div>

              {/* Supporting Evidence */}
              <div>
                <label className="block font-mono text-xs uppercase font-bold text-black mb-2">
                  3. Key Evidence Items (Select supporting proof)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mysteryCase.evidence.map((ev) => (
                    <label
                      key={ev.id}
                      className="flex items-center space-x-2 bg-[#f7f4e2] p-2.5 border border-black/30 cursor-pointer text-xs font-sans"
                    >
                      <input
                        type="checkbox"
                        checked={accusation.evidenceIds.includes(ev.id)}
                        onChange={() => handleToggleAccusationEvidence(ev.id)}
                        className="accent-[#4a1c1c]"
                      />
                      <span>
                        <strong className="font-mono">{ev.number}:</strong> {ev.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!accusation.culpritId}
                className="w-full bg-[#4a1c1c] text-white font-sans text-xs uppercase tracking-wider font-bold py-4 hover:bg-black transition-colors disabled:opacity-50"
              >
                Submit Accusation to Bureau
              </button>
            </form>
          ) : (
            /* Solution Reveal */
            <div className="space-y-6">
              <div
                className={`p-6 border-2 text-center font-serif text-2xl font-bold ${
                  isCulpritCorrect
                    ? 'bg-emerald-100 border-emerald-800 text-emerald-950'
                    : 'bg-rose-100 border-rose-800 text-rose-950'
                }`}
              >
                {isCulpritCorrect ? '🎉 CASE SOLVED! EXCELLENT DEDUCTION!' : '❌ INCORRECT CULPRIT ACCUSED!'}
              </div>

              <div className="bg-[#f7f4e2] border border-black/30 p-6 space-y-4 font-sans text-xs text-black">
                <h3 className="font-serif text-xl font-bold border-b border-black/20 pb-2">
                  Official Bureau Solution Breakdown
                </h3>
                <p>
                  <strong>Actual Culprit:</strong> {mysteryCase.solution.culpritName}
                </p>
                <p>
                  <strong>Official Motive:</strong> {mysteryCase.solution.motive}
                </p>
                <p>
                  <strong>How It Happened:</strong> {mysteryCase.solution.howItHappened}
                </p>

                <div className="bg-white p-4 border border-black/20 font-mono text-xs">
                  <span className="font-bold uppercase text-[10px] text-[#4a1c1c] block mb-1">
                    Key Proof Items:
                  </span>
                  <ul className="list-disc pl-5">
                    {mysteryCase.solution.keyEvidence.map((ke, i) => (
                      <li key={i}>{ke}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
