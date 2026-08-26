import React, { useState } from 'react';
import { MysteryCase } from '../types';

interface AICaseGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaseGenerated: (newCase: MysteryCase) => void;
}

export const AICaseGeneratorModal: React.FC<AICaseGeneratorModalProps> = ({
  isOpen,
  onClose,
  onCaseGenerated,
}) => {
  const [prompt, setPrompt] = useState('');
  const [difficulty, setDifficulty] = useState<'Rookie' | 'Seasoned' | 'Master Detective'>('Seasoned');
  const [style, setStyle] = useState('Whodunit');
  const [setting, setSetting] = useState('1930s Estate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const presetThemes = [
    { title: '1920s Jazz Club Murder', setting: 'Chicago Speakeasy', prompt: 'A famous saxophonist drops dead mid-solo in a smoky 1928 Chicago speakeasy with a poisoned drink.' },
    { title: 'Cyberpunk Tokyo Hacking', setting: 'Neo-Tokyo 2088', prompt: 'A high-ranking mega-corp executive is found assassinated inside an impenetrable VR vault.' },
    { title: 'Haunted Hollywood Studio', setting: '1940s Film Lot', prompt: 'A famous leading star vanishes from a locked dressing room during the premiere of her biggest movie.' },
    { title: 'Highland Express Train', setting: 'Steam Locomotive', prompt: 'A wealthy lord is found dead in his private train carriage while crossing a snowy Scottish viaduct.' }
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setError('');
    setStatusMessage('Connecting to AI Case Architect...');

    try {
      const messages = [
        'Connecting to AI Case Architect...',
        'Drafting suspect dossiers & hidden motives...',
        'Planting physical evidence & financial trails...',
        'Building timeline events & contradictions...',
        'Constructing 3-tier hint system & official breakdown...'
      ];

      let msgIndex = 0;
      const interval = setInterval(() => {
        msgIndex = (msgIndex + 1) % messages.length;
        setStatusMessage(messages[msgIndex]);
      }, 1800);

      const response = await fetch('/api/generate-case', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt || 'A classic high-stakes murder mystery with 4 suspects and hidden secrets.',
          difficulty,
          style,
          setting,
        }),
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error('Server error generating case file');
      }

      const data = await response.json();
      if (data.success && data.case) {
        onCaseGenerated(data.case);
        setIsGenerating(false);
        onClose();
      } else {
        throw new Error(data.error || 'Failed to parse generated case');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while generating the case.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-[#fdfae8] border-2 border-black max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative paper-texture max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start border-b-2 border-black pb-4">
          <div>
            <div className="flex items-center space-x-2 text-[#4a1c1c] font-mono text-xs uppercase font-bold tracking-widest">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Gemini AI Case Generator</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-black mt-1">
              Generate Custom AI Mystery Case
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="text-black hover:text-[#4a1c1c] p-1"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-800 text-red-900 p-3 font-mono text-xs">
            {error}
          </div>
        )}

        {isGenerating ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-12 h-12 border-4 border-black border-t-[#4a1c1c] rounded-full animate-spin" />
            <div className="font-serif text-lg font-bold text-[#4a1c1c] animate-pulse">
              {statusMessage}
            </div>
            <p className="font-mono text-xs text-neutral-600 max-w-sm">
              Gemini is weaving suspects, hidden motives, physical evidence, and timeline contradictions...
            </p>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block font-mono text-xs font-bold uppercase text-black mb-2">
                Preset Mystery Concepts (Click to quick-fill)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {presetThemes.map((theme, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setPrompt(theme.prompt);
                      setSetting(theme.setting);
                    }}
                    className="text-left bg-[#f7f4e2] hover:bg-[#ffdea5] border border-black/30 p-2.5 transition-colors"
                  >
                    <div className="font-serif font-bold text-xs text-black">{theme.title}</div>
                    <div className="font-mono text-[10px] text-neutral-600 truncate">{theme.setting}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase text-black mb-1">
                Custom Case Premise & Concept
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your mystery theme, location, murder weapon, or key conflict..."
                rows={3}
                className="w-full bg-[#f7f4e2] border border-black p-3 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <label className="block font-bold uppercase text-black mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full bg-[#f7f4e2] border border-black p-2"
                >
                  <option value="Rookie">Rookie</option>
                  <option value="Seasoned">Seasoned</option>
                  <option value="Master Detective">Master Detective</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-black mb-1">Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-[#f7f4e2] border border-black p-2"
                >
                  <option value="Whodunit">Whodunit</option>
                  <option value="Locked Room">Locked Room</option>
                  <option value="Detective">Detective</option>
                  <option value="Psychological">Psychological</option>
                  <option value="Espionage">Espionage</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-black mb-1">Setting Tag</label>
                <input
                  type="text"
                  value={setting}
                  onChange={(e) => setSetting(e.target.value)}
                  placeholder="e.g. Speakeasy"
                  className="w-full bg-[#f7f4e2] border border-black p-2 font-sans"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-black font-mono text-xs font-bold uppercase hover:bg-neutral-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#4a1c1c] text-[#ffdea5] px-6 py-2.5 font-sans text-xs uppercase tracking-wider font-bold border border-black hover:bg-black transition-colors flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>Generate Case File</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
