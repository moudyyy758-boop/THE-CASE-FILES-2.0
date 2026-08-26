import React from 'react';
import { MysteryCase } from '../types';

interface CaseCardProps {
  mysteryCase: MysteryCase;
  onSelectCase: (caseId: string) => void;
  onAddToCart: (mysteryCase: MysteryCase) => void;
  onToggleWishlist: (caseId: string) => void;
  isWishlisted: boolean;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  mysteryCase,
  onSelectCase,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  return (
    <div className="dossier-card border border-black/30 p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1">
      {/* Paper clip icon */}
      <div className="paper-clip" />

      <div>
        {/* Cover Image & Tags */}
        <div className="relative mb-4 overflow-hidden border border-black/20 group">
          <img
            src={mysteryCase.coverImage}
            alt={mysteryCase.title}
            className="w-full h-48 object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute top-2 left-2 bg-black text-white font-mono text-[10px] px-2 py-0.5 uppercase tracking-widest font-bold">
            {mysteryCase.fileNumber}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(mysteryCase.id);
            }}
            className="absolute top-2 right-2 bg-[#fdfae8] text-black p-1.5 border border-black hover:bg-[#ffdea5] transition-colors"
            title="Save to Wishlist"
          >
            <span className="material-symbols-outlined text-sm">
              {isWishlisted ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>

        {/* Difficulty & Player Count */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#4a1c1c] font-bold mb-2">
          <span className="bg-[#ffdea5] px-2 py-0.5 border border-black/20">
            {mysteryCase.difficulty}
          </span>
          <span>{mysteryCase.playerCount} • {mysteryCase.durationMinutes}</span>
        </div>

        {/* Title & Subtitle */}
        <h3
          onClick={() => onSelectCase(mysteryCase.id)}
          className="font-serif text-xl font-bold text-black hover:text-[#a17f3b] cursor-pointer transition-colors leading-tight mb-2"
        >
          {mysteryCase.title}
        </h3>
        <p className="font-sans text-xs text-neutral-700 line-clamp-2 mb-4 leading-relaxed">
          {mysteryCase.subtitle}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {mysteryCase.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] bg-neutral-200 text-neutral-800 px-1.5 py-0.5 border border-neutral-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer & CTAs */}
      <div className="border-t border-black/20 pt-3 flex items-center justify-between mt-2">
        <span className="font-mono text-[11px] text-emerald-800 font-bold uppercase tracking-wider flex items-center space-x-1">
          <span className="material-symbols-outlined text-sm">folder_open</span>
          <span>Archival Dossier</span>
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onSelectCase(mysteryCase.id)}
            className="font-sans text-xs uppercase tracking-wider font-bold border border-black px-3 py-1.5 hover:bg-neutral-200 transition-colors"
          >
            Inspect
          </button>
          <button
            onClick={() => onAddToCart(mysteryCase)}
            className="font-sans text-xs uppercase tracking-wider font-bold bg-black text-white px-3 py-1.5 hover:bg-[#4a1c1c] transition-colors flex items-center space-x-1"
          >
            <span className="material-symbols-outlined text-xs">folder_special</span>
            <span>Add to Folder</span>
          </button>
        </div>
      </div>
    </div>
  );
};
