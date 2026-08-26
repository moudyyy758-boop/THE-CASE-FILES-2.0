import React, { useState } from 'react';
import { MysteryCase, Character, EvidenceItem, TimelineEvent } from '../types';

interface CaseDetailViewProps {
  mysteryCase: MysteryCase;
  onAddToCart: (mysteryCase: MysteryCase) => void;
  onHostSession: (caseId: string) => void;
  onOpenRiddleBot: () => void;
  onBack: () => void;
}

export const CaseDetailView: React.FC<CaseDetailViewProps> = ({
  mysteryCase,
  onAddToCart,
  onHostSession,
  onOpenRiddleBot,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'dossiers' | 'evidence' | 'timeline' | 'hints' | 'reviews'>('overview');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    mysteryCase.characters[0] || null
  );
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(
    mysteryCase.evidence[0] || null
  );
  const [revealedHintIds, setRevealedHintIds] = useState<number[]>([]);

  const toggleHint = (id: number) => {
    setRevealedHintIds((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-8">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-mono text-xs uppercase tracking-widest font-bold flex items-center space-x-1 text-black hover:text-[#a17f3b] transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Archives</span>
        </button>

        <div className="font-mono text-xs text-[#4a1c1c] font-bold bg-[#ffdea5] px-3 py-1 border border-black/20">
          CONFIDENTIAL BUREAU DOSSIER • {mysteryCase.fileNumber}
        </div>
      </div>

      {/* Hero Case Details */}
      <div className="bg-[#f7f4e2] border-2 border-black p-6 md:p-10 relative paper-texture">
        <div className="dossier-clip" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Cover image */}
          <div className="lg:col-span-5 border-2 border-black overflow-hidden relative shadow-lg">
            <img
              src={mysteryCase.coverImage}
              alt={mysteryCase.title}
              className="w-full h-80 object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-3 font-mono text-xs flex justify-between items-center">
              <span>{mysteryCase.setting} Era</span>
              <span>{mysteryCase.playerCount}</span>
            </div>
          </div>

          {/* Details Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#4a1c1c] font-bold">
              <span className="bg-[#ffdea5] px-2 py-0.5 border border-black/20">
                {mysteryCase.difficulty} Difficulty
              </span>
              <span>•</span>
              <span>{mysteryCase.durationMinutes}</span>
              <span>•</span>
              <span>Ages {mysteryCase.recommendedAge}</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-bold text-black leading-tight">
              {mysteryCase.title}
            </h1>

            <p className="font-serif italic text-lg text-neutral-800 leading-relaxed">
              "{mysteryCase.subtitle}"
            </p>

            <div className="border-t border-b border-black/20 py-3 flex items-center space-x-6 font-mono text-xs">
              <div>
                <span className="text-neutral-500 block">Rating:</span>
                <span className="font-bold text-black flex items-center">
                  ★ {mysteryCase.rating} ({mysteryCase.reviewCount} reviews)
                </span>
              </div>
              <div>
                <span className="text-neutral-500 block">Style:</span>
                <span className="font-bold text-black">{mysteryCase.style}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Status:</span>
                <span className="font-bold text-emerald-800 uppercase flex items-center space-x-1">
                  <span className="material-symbols-outlined text-xs">folder_open</span>
                  <span>Unlocked File</span>
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onAddToCart(mysteryCase)}
                className="bg-black text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 hover:bg-[#4a1c1c] transition-colors flex items-center space-x-2 shadow-md"
              >
                <span className="material-symbols-outlined text-sm">folder_special</span>
                <span>Save to Case Folder</span>
              </button>

              <button
                onClick={() => onHostSession(mysteryCase.id)}
                className="bg-[#4a1c1c] text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 hover:bg-black transition-colors flex items-center space-x-2 shadow-md"
              >
                <span className="material-symbols-outlined text-sm">groups</span>
                <span>Host Game Session</span>
              </button>

              <button
                onClick={onOpenRiddleBot}
                className="bg-[#a17f3b] text-white font-sans text-xs uppercase tracking-wider font-bold px-5 py-3 hover:bg-amber-900 transition-colors flex items-center space-x-2 border border-black/20"
              >
                <span className="material-symbols-outlined text-sm">psychology</span>
                <span>AI Riddle Hint Bot</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b-2 border-black flex flex-wrap gap-2 md:gap-6 font-sans text-xs font-bold uppercase tracking-wider">
        {[
          { id: 'overview', label: 'Case Overview' },
          { id: 'dossiers', label: `Suspect Dossiers (${mysteryCase.characters.length})` },
          { id: 'evidence', label: `Evidence Locker (${mysteryCase.evidence.length})` },
          { id: 'timeline', label: `Event Timeline (${mysteryCase.timeline.length})` },
          { id: 'hints', label: 'Progressive Hints & Riddles' },
          { id: 'reviews', label: `Reviews (${mysteryCase.reviews.length})` },
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

      {/* Tab Contents */}
      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#fdfae8] border border-black/30 p-6 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-black border-b border-black/20 pb-2">
                The Premise
              </h2>
              <p className="font-sans text-sm text-neutral-800 leading-relaxed">
                {mysteryCase.premise}
              </p>

              <h3 className="font-serif text-lg font-bold text-black pt-2">
                Setting & Atmosphere
              </h3>
              <p className="font-sans text-sm text-neutral-700 leading-relaxed italic bg-[#f7f4e2] p-4 border-l-4 border-[#4a1c1c]">
                {mysteryCase.settingDescription}
              </p>
            </div>

            {/* Included in dossier */}
            <div className="bg-[#fdfae8] border border-black/30 p-6 space-y-3">
              <h3 className="font-serif text-xl font-bold text-black">
                What's Included in This Mystery File
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs text-neutral-800">
                {mysteryCase.whatsIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-emerald-700 text-sm">
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Host helper box */}
            <div className="bg-[#4a1c1c] text-white p-6 border-2 border-black space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#ffdea5]">
                Host Requirements
              </h3>
              <ul className="space-y-2 font-mono text-xs text-amber-100/90">
                {mysteryCase.whatsNeeded.map((needed, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#ffdea5]">•</span>
                    <span>{needed}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-amber-950">
                <button
                  onClick={onOpenRiddleBot}
                  className="w-full bg-[#ffdea5] text-black font-sans text-xs uppercase tracking-wider font-bold py-2.5 hover:bg-white transition-colors flex items-center justify-center space-x-2"
                >
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  <span>Ask Agent Cipher for Riddles</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DOSSIERS */}
      {activeTab === 'dossiers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* List of Suspects */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-serif text-lg font-bold text-black">Select Suspect File</h3>
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
                  <p className="font-mono text-xs opacity-80">{char.role}, {char.age}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Suspect File */}
          <div className="lg:col-span-8">
            {selectedCharacter ? (
              <div className="bg-[#fdfae8] border-2 border-black p-6 md:p-8 space-y-6 paper-texture">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-black/20 pb-4">
                  <img
                    src={selectedCharacter.avatar}
                    alt={selectedCharacter.name}
                    className="w-24 h-24 object-cover border-2 border-black shadow-md grayscale"
                  />
                  <div>
                    <span className="font-mono text-xs uppercase text-[#4a1c1c] font-bold">
                      SUSPECT DOSSIER #0{mysteryCase.characters.indexOf(selectedCharacter) + 1}
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-black">
                      {selectedCharacter.name}
                    </h2>
                    <p className="font-mono text-xs text-neutral-600">
                      {selectedCharacter.role} • Age {selectedCharacter.age}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 font-sans text-xs leading-relaxed text-neutral-800">
                  <div>
                    <h4 className="font-mono uppercase font-bold text-black mb-1">
                      Background Summary
                    </h4>
                    <p>{selectedCharacter.background}</p>
                  </div>

                  <div>
                    <h4 className="font-mono uppercase font-bold text-black mb-1">
                      Key Relationships
                    </h4>
                    <p>{selectedCharacter.relationships}</p>
                  </div>

                  <div>
                    <h4 className="font-mono uppercase font-bold text-black mb-1">
                      Known Information to Bureau
                    </h4>
                    <p className="bg-[#f7f4e2] p-3 border-l-2 border-black">
                      {selectedCharacter.knownInfo}
                    </p>
                  </div>

                  <div className="border-t border-black/20 pt-4">
                    <h4 className="font-mono uppercase font-bold text-[#4a1c1c] mb-1 flex items-center space-x-1">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <span>Private Objectives & Secrets (Player Only)</span>
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-neutral-700 italic font-serif">
                      {selectedCharacter.personalObjectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <p className="font-mono text-xs text-neutral-500">Select a suspect to view dossier.</p>
            )}
          </div>
        </div>
      )}

      {/* 3. EVIDENCE LOCKER */}
      {activeTab === 'evidence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-serif text-lg font-bold text-black">Archival Evidence Index</h3>
            {mysteryCase.evidence.map((ev) => (
              <div
                key={ev.id}
                onClick={() => setSelectedEvidence(ev)}
                className={`p-4 border border-black/30 cursor-pointer transition-all ${
                  selectedEvidence?.id === ev.id
                    ? 'bg-black text-white border-black'
                    : 'bg-[#f7f4e2] text-black hover:bg-[#ffdea5]'
                }`}
              >
                <div className="flex justify-between items-center font-mono text-xs mb-1">
                  <span className="font-bold">{ev.number}</span>
                  <span className="uppercase text-[10px] bg-neutral-200 text-neutral-800 px-1 border">
                    {ev.type}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-sm">{ev.title}</h4>
                <p className="font-mono text-[11px] opacity-75">Found at: {ev.foundAt}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7">
            {selectedEvidence ? (
              <div className="bg-[#fdfae8] border-2 border-black p-6 space-y-6 paper-texture">
                <div className="flex justify-between items-start border-b border-black/20 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#4a1c1c]">
                      {selectedEvidence.number}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-black">
                      {selectedEvidence.title}
                    </h2>
                  </div>
                  <span className="font-mono text-xs bg-black text-white px-2 py-1">
                    Location: {selectedEvidence.foundAt}
                  </span>
                </div>

                <div className="border border-black overflow-hidden max-h-72">
                  <img
                    src={selectedEvidence.image}
                    alt={selectedEvidence.title}
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <div className="space-y-3 font-sans text-xs">
                  <h4 className="font-mono uppercase font-bold text-black">Description</h4>
                  <p className="text-neutral-800">{selectedEvidence.description}</p>

                  {selectedEvidence.transcription && (
                    <div className="bg-[#f7f4e2] p-4 border border-black/30 font-mono text-xs space-y-1">
                      <span className="font-bold uppercase text-[10px] text-[#4a1c1c] block border-b border-black/10 pb-1">
                        Official Transcription:
                      </span>
                      <p className="whitespace-pre-wrap italic">{selectedEvidence.transcription}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="font-mono text-xs text-neutral-500">Select evidence to inspect.</p>
            )}
          </div>
        </div>
      )}

      {/* 4. TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-[#fdfae8] border-2 border-black p-6 md:p-8 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-black border-b border-black/20 pb-3">
            Chronological Event Timeline
          </h2>

          <div className="relative border-l-2 border-black pl-6 space-y-6 font-sans">
            {mysteryCase.timeline.map((event: TimelineEvent) => (
              <div key={event.id} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 bg-black rounded-full border-2 border-[#fdfae8]" />

                <div className="bg-[#f7f4e2] border border-black/30 p-4 space-y-2">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="font-bold text-[#4a1c1c] bg-[#ffdea5] px-2 py-0.5 border border-black/20">
                      {event.timestamp}
                    </span>
                    <span className="text-neutral-600">Location: {event.location}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-black">{event.title}</h3>
                  <p className="text-xs text-neutral-800">{event.description}</p>

                  {event.hasContradiction && (
                    <div className="bg-amber-100 border-l-4 border-amber-800 p-2 text-xs font-mono text-amber-950 flex items-start space-x-2">
                      <span className="material-symbols-outlined text-sm text-amber-800">warning</span>
                      <div>
                        <span className="font-bold block">CONTRADICTION FLAG:</span>
                        {event.contradictionNote}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. HINTS & RIDDLE BOT */}
      {activeTab === 'hints' && (
        <div className="space-y-6">
          {/* AI Riddle Bot Banner */}
          <div className="bg-[#4a1c1c] text-white p-6 border-2 border-black flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#ffdea5] uppercase font-bold tracking-widest">
                Interactive AI Cryptographer
              </span>
              <h2 className="font-serif text-2xl font-bold">
                Solve Riddles with Agent Cipher for Official Hints
              </h2>
              <p className="font-sans text-xs text-amber-100/90 max-w-xl">
                Chat with our AI Riddle Bot! Answer mysterious noir riddles to unlock progressive case clues without spoiling the solution.
              </p>
            </div>

            <button
              onClick={onOpenRiddleBot}
              className="bg-[#ffdea5] text-black font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 hover:bg-white transition-colors flex items-center space-x-2 whitespace-nowrap shadow-md"
            >
              <span className="material-symbols-outlined text-sm">psychology</span>
              <span>Launch Riddle Hint Bot</span>
            </button>
          </div>

          {/* Standard Hints manual reveal */}
          <div className="bg-[#fdfae8] border-2 border-black p-6 space-y-4">
            <h3 className="font-serif text-xl font-bold text-black border-b border-black/20 pb-2">
              Standard 3-Tier Progressive Hint System
            </h3>

            <div className="space-y-4">
              {mysteryCase.hints.map((hint) => {
                const isRevealed = revealedHintIds.includes(hint.id);
                return (
                  <div
                    key={hint.id}
                    className="border border-black/30 p-4 bg-[#f7f4e2] space-y-2"
                  >
                    <div className="flex justify-between items-center font-mono text-xs">
                      <span className="font-bold text-[#4a1c1c] uppercase">
                        Tier {hint.id}: {hint.levelName} Hint
                      </span>
                      <button
                        onClick={() => toggleHint(hint.id)}
                        className="underline text-black font-bold hover:text-[#a17f3b]"
                      >
                        {isRevealed ? 'Hide Hint' : 'Reveal Hint'}
                      </button>
                    </div>

                    {isRevealed ? (
                      <p className="font-sans text-xs text-black p-3 bg-white border border-black/20">
                        {hint.text}
                      </p>
                    ) : (
                      <div className="bg-neutral-300 p-3 text-center text-xs font-mono text-neutral-600 select-none">
                        [ HINT HIDDEN • CLICK REVEAL OR SOLVE RIDDLE WITH AGENT CIPHER ]
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 6. REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="bg-[#fdfae8] border-2 border-black p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-black/20 pb-3">
            <h2 className="font-serif text-2xl font-bold text-black">
              Investigator Field Reports ({mysteryCase.reviews.length})
            </h2>
            <span className="font-mono text-xs font-bold text-black">
              ★ {mysteryCase.rating} / 5.0 Rating
            </span>
          </div>

          {mysteryCase.reviews.length > 0 ? (
            <div className="space-y-4 font-sans text-xs">
              {mysteryCase.reviews.map((rev) => (
                <div key={rev.id} className="bg-[#f7f4e2] p-4 border border-black/30 space-y-2">
                  <div className="flex justify-between items-center font-mono text-[11px]">
                    <span className="font-bold text-black">{rev.author}</span>
                    <span className="text-neutral-500">{rev.date}</span>
                  </div>
                  <div className="text-amber-700">{'★'.repeat(rev.rating)}</div>
                  <h4 className="font-serif font-bold text-sm text-black">{rev.title}</h4>
                  <p className="text-neutral-800 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="font-mono text-xs text-neutral-600">
              No reviews submitted yet for this newly released mystery file.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
