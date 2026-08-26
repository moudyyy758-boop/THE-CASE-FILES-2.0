import React from 'react';

interface HowItWorksViewProps {
  onBrowseCases: () => void;
  onOpenRiddleBot: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onBrowseCases,
  onOpenRiddleBot,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-12 space-y-12">
      {/* Title Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="font-mono text-xs uppercase text-[#4a1c1c] font-bold tracking-widest bg-[#ffdea5] px-3 py-1 border border-black/20">
          INVESTIGATION MANUAL
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-black">
          How To Host a Murder Mystery Evening
        </h1>
        <p className="font-sans text-sm text-neutral-700 leading-relaxed">
          From intimate 4-player dinner parties to 10-player corporate events, The Case Files provides everything you need to run an unforgettable interactive investigation.
        </p>
      </div>

      {/* 4 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            step: '01',
            title: 'Choose Your Mystery',
            desc: 'Browse our archival cases filtered by setting, player count, and difficulty level.',
            icon: 'folder_open',
          },
          {
            step: '02',
            title: 'Assign Dossiers',
            desc: 'Send private digital files or print character sheets for each guest before game night.',
            icon: 'badge',
          },
          {
            step: '03',
            title: 'Examine Evidence',
            desc: 'Walk through chronological timeline events, cross-reference records, and spot contradictions.',
            icon: 'find_in_page',
          },
          {
            step: '04',
            title: 'Solve Riddles & Accuse',
            desc: 'Use Agent Cipher (AI Riddle Bot) to unlock hints, then submit your final accusation!',
            icon: 'gavel',
          },
        ].map((item) => (
          <div key={item.step} className="bg-[#f7f4e2] border-2 border-black p-6 space-y-4 relative">
            <span className="font-mono font-bold text-3xl text-[#4a1c1c]">{item.step}</span>
            <div className="w-10 h-10 bg-black text-[#ffdea5] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-black">{item.title}</h3>
            <p className="font-sans text-xs text-neutral-700 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* AI Riddle Bot Highlight */}
      <div className="bg-[#4a1c1c] text-white p-8 border-2 border-black flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="font-mono text-xs text-[#ffdea5] uppercase tracking-widest font-bold">
            Interactive Feature
          </span>
          <h2 className="font-serif text-3xl font-bold">AI Cryptographer & Riddle Hint Bot</h2>
          <p className="font-sans text-xs text-amber-100/90 leading-relaxed">
            Stuck during a session? Instead of giving away the mystery, investigators can talk to Agent Cipher! Solve clever noir riddles to earn official case hints step by step.
          </p>
        </div>

        <button
          onClick={onOpenRiddleBot}
          className="bg-[#ffdea5] text-black font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 hover:bg-white transition-colors flex items-center space-x-2 whitespace-nowrap shadow-md"
        >
          <span className="material-symbols-outlined text-sm">psychology</span>
          <span>Test The Riddle Bot</span>
        </button>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={onBrowseCases}
          className="bg-black text-white font-sans text-xs uppercase tracking-widest font-bold px-8 py-4 hover:bg-[#4a1c1c] transition-colors shadow-lg"
        >
          Browse All Mystery Files
        </button>
      </div>
    </div>
  );
};
