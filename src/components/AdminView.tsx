import React, { useState } from 'react';
import { MysteryCase } from '../types';

interface AdminViewProps {
  cases: MysteryCase[];
  onAddNewCase: (newCase: MysteryCase) => void;
  onOpenAIGenerator?: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ cases, onAddNewCase, onOpenAIGenerator }) => {
  const [title, setTitle] = useState('');
  const [fileNumber, setFileNumber] = useState('FILE #505-B');
  const [premise, setPremise] = useState('');
  const [price, setPrice] = useState('29.99');
  const [difficulty, setDifficulty] = useState<'Rookie' | 'Seasoned' | 'Master Detective'>('Seasoned');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !premise) return;

    const newCase: MysteryCase = {
      id: `custom-${Date.now()}`,
      fileNumber,
      title,
      subtitle: premise.substring(0, 90) + '...',
      coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      price: parseFloat(price) || 29.99,
      difficulty,
      playerCount: '4–8 Players',
      minPlayers: 4,
      maxPlayers: 8,
      durationMinutes: '90–120 min',
      minDurationMinutes: 90,
      recommendedAge: '14+',
      setting: 'Noir',
      style: 'Whodunit',
      tags: ['Custom Case', 'Noir'],
      rating: 5.0,
      reviewCount: 1,
      premise,
      settingDescription: 'Custom scenario setting.',
      whatsNeeded: ['4-8 Players', '90 Mins'],
      whatsIncluded: ['Dossiers', 'Evidence', 'Solution'],
      difficultyExplanation: 'Custom logic case.',
      characters: [],
      evidence: [],
      timeline: [],
      hints: [
        { id: 1, levelName: 'Gentle', text: 'Check the financial record logs.' },
      ],
      solution: {
        culpritId: 'char-1',
        culpritName: 'Unknown Suspect',
        motive: 'Greed',
        howItHappened: 'Staged theft',
        keyEvidence: [],
        breakdown: 'Custom breakdown',
      },
      reviews: [],
    };

    onAddNewCase(newCase);
    setTitle('');
    setPremise('');
    alert('New mystery case added to Bureau Archives!');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-12 py-12 space-y-8">
      <div className="border-b-2 border-black pb-4">
        <h1 className="font-serif text-3xl font-bold text-black">Bureau Admin Management</h1>
        <p className="font-mono text-xs text-neutral-600">
          Create new mystery cases or manage active archives.
        </p>
      </div>

      {onOpenAIGenerator && (
        <div className="bg-[#4a1c1c] text-white p-6 border-2 border-black shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[#ffdea5] font-mono text-xs uppercase font-bold tracking-widest">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Instant AI Case Creator</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Generate Full Mystery File with Gemini</h3>
            <p className="font-sans text-xs text-amber-100/80">
              Provide any setting or concept and let AI create suspects, physical evidence, timelines, and secret solutions instantly.
            </p>
          </div>
          <button
            onClick={onOpenAIGenerator}
            className="bg-[#ffdea5] text-black font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 border border-black hover:bg-white transition-colors flex items-center space-x-2 whitespace-nowrap shadow-md"
          >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span>Launch AI Generator</span>
          </button>
        </div>
      )}

      <div className="bg-[#f7f4e2] border-2 border-black p-6 space-y-6 paper-texture">
        <h3 className="font-serif text-xl font-bold text-black">Draft New Mystery Case File</h3>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          <div>
            <label className="block font-mono font-bold uppercase mb-1">File Number</label>
            <input
              type="text"
              value={fileNumber}
              onChange={(e) => setFileNumber(e.target.value)}
              className="w-full bg-[#fdfae8] border border-black p-2 font-mono"
            />
          </div>

          <div>
            <label className="block font-mono font-bold uppercase mb-1">Case Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Midnight Express"
              className="w-full bg-[#fdfae8] border border-black p-2"
              required
            />
          </div>

          <div>
            <label className="block font-mono font-bold uppercase mb-1">Premise</label>
            <textarea
              value={premise}
              onChange={(e) => setPremise(e.target.value)}
              placeholder="Describe the crime and setting..."
              rows={4}
              className="w-full bg-[#fdfae8] border border-black p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-mono font-bold uppercase mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#fdfae8] border border-black p-2"
              />
            </div>

            <div>
              <label className="block font-mono font-bold uppercase mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full bg-[#fdfae8] border border-black p-2 font-mono"
              >
                <option value="Rookie">Rookie</option>
                <option value="Seasoned">Seasoned</option>
                <option value="Master Detective">Master Detective</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-sans text-xs uppercase tracking-wider font-bold py-3 hover:bg-[#4a1c1c]"
          >
            Publish Case to Archives
          </button>
        </form>
      </div>

      <div className="space-y-3">
        <h3 className="font-serif text-xl font-bold text-black">Active Archives Index ({cases.length})</h3>
        <div className="space-y-2 font-mono text-xs">
          {cases.map((c) => (
            <div key={c.id} className="bg-[#f7f4e2] p-3 border border-black/30 flex justify-between">
              <span>{c.fileNumber}: <strong>{c.title}</strong></span>
              <span>${c.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
