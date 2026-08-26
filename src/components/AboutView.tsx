import React from 'react';

export const AboutView: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-12 py-12 space-y-8 font-sans">
      <div className="text-center space-y-3">
        <span className="font-mono text-xs uppercase text-[#4a1c1c] font-bold tracking-widest bg-[#ffdea5] px-3 py-1 border border-black/20">
          ARCHIVAL BUREAU HISTORY
        </span>
        <h1 className="font-serif text-4xl font-bold text-black">About The Case Files</h1>
      </div>

      <div className="bg-[#f7f4e2] border-2 border-black p-8 space-y-6 paper-texture leading-relaxed text-sm text-neutral-800">
        <p>
          Founded in 1948 as an archival clearinghouse for unresolved high-society cold cases, <strong className="font-serif text-black font-bold">The Case Files</strong> now delivers immersive murder mystery games for investigators worldwide.
        </p>

        <p>
          Every mystery in our collection is meticulously crafted with authentic period detail, complex financial and personal motives, timeline contradiction puzzles, and interactive character secrets.
        </p>

        <div className="bg-[#fdfae8] p-6 border border-black/30 space-y-3">
          <h3 className="font-serif text-xl font-bold text-black">Our AI Cryptographer: Agent Cipher</h3>
          <p className="text-xs text-neutral-700">
            Powered by Gemini AI, Agent Cipher challenges players with thematic noir riddles during game sessions. Solving riddles unlocks official hints safely without revealing the killer.
          </p>
        </div>
      </div>
    </div>
  );
};
