import React from 'react';
import { MysteryCase } from '../types';
import { DetectiveBadgeCard } from './DetectiveBadgeSystem';

interface MyCasesViewProps {
  purchasedCases: MysteryCase[];
  completedCaseIds: string[];
  onSelectCase: (caseId: string) => void;
  onHostSession: (caseId: string) => void;
  onBrowseCases: () => void;
  onToggleCompleteCase: (caseId: string) => void;
  onOpenBadgeModal: () => void;
  userEmail?: string;
}

export const MyCasesView: React.FC<MyCasesViewProps> = ({
  purchasedCases,
  completedCaseIds,
  onSelectCase,
  onHostSession,
  onBrowseCases,
  onToggleCompleteCase,
  onOpenBadgeModal,
  userEmail,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-12 space-y-8">
      {/* Investigator Credentials & Reputation Card */}
      <DetectiveBadgeCard
        completedCaseIds={completedCaseIds}
        purchasedCaseIds={purchasedCases.map((c) => c.id)}
        userEmail={userEmail}
        onOpenModal={onOpenBadgeModal}
      />

      <div className="flex justify-between items-center border-b-2 border-black pb-4 pt-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-black">My Purchased Case Library</h1>
          <p className="font-mono text-xs text-neutral-600">
            Access your unlocked digital dossiers, host live sessions, and track solved mystery files.
          </p>
        </div>
        <button
          onClick={onBrowseCases}
          className="bg-black text-white font-sans text-xs uppercase tracking-wider font-bold px-4 py-2 hover:bg-[#4a1c1c] transition-colors"
        >
          Browse Archives
        </button>
      </div>

      {purchasedCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCases.map((c) => {
            const isSolved = completedCaseIds.includes(c.id);
            return (
              <div
                key={c.id}
                className={`border-2 border-black p-5 space-y-4 relative transition-colors ${
                  isSolved ? 'bg-amber-50/90 border-amber-900' : 'bg-[#f7f4e2]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="font-mono text-xs text-[#4a1c1c] font-bold">{c.fileNumber}</div>
                  <button
                    onClick={() => onToggleCompleteCase(c.id)}
                    title={isSolved ? 'Mark as Unsolved' : 'Mark as Case Solved'}
                    className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 border flex items-center space-x-1 transition-colors ${
                      isSolved
                        ? 'bg-emerald-800 text-white border-emerald-950'
                        : 'bg-black/10 text-neutral-600 border-black/20 hover:bg-black/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">
                      {isSolved ? 'check_circle' : 'circle'}
                    </span>
                    <span>{isSolved ? 'Case Solved' : 'In Progress'}</span>
                  </button>
                </div>

                <h3 className="font-serif text-xl font-bold text-black">{c.title}</h3>
                <p className="font-sans text-xs text-neutral-700 line-clamp-2">{c.premise}</p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onSelectCase(c.id)}
                    className="flex-1 border border-black font-sans text-xs uppercase tracking-wider font-bold py-2 hover:bg-[#ffdea5]"
                  >
                    View Dossiers
                  </button>
                  <button
                    onClick={() => onHostSession(c.id)}
                    className="flex-1 bg-[#4a1c1c] text-white font-sans text-xs uppercase tracking-wider font-bold py-2 hover:bg-black"
                  >
                    Host Session
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#f7f4e2] border-2 border-black p-12 text-center space-y-4">
          <span className="material-symbols-outlined text-4xl text-neutral-500">folder_off</span>
          <h3 className="font-serif text-2xl font-bold text-black">No Purchased Cases Yet</h3>
          <p className="font-sans text-xs text-neutral-600 max-w-md mx-auto">
            You haven't added any mystery files to your personal library yet. Explore our cold case archives to get started!
          </p>
          <button
            onClick={onBrowseCases}
            className="bg-black text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 hover:bg-[#4a1c1c]"
          >
            Explore Case Archives
          </button>
        </div>
      )}
    </div>
  );
};

