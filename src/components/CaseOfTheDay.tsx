import React, { useEffect, useState } from 'react';
import { MysteryCase } from '../types';

interface CaseOfTheDayProps {
  onSelectCase: (caseId: string) => void;
  onPlayCase?: (mysteryCase: MysteryCase) => void;
}

export const CaseOfTheDay: React.FC<CaseOfTheDayProps> = ({
  onSelectCase,
  onPlayCase,
}) => {
  const [dailyCase, setDailyCase] = useState<MysteryCase | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const fetchDailyCase = async (force: boolean = false) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/case-of-the-day${force ? '?force=true' : ''}`);
      if (!res.ok) throw new Error('Failed to fetch Case of the Day');
      const data = await res.json();
      if (data.success && data.case) {
        setDailyCase(data.case);
      } else {
        throw new Error(data.error || 'Invalid response format');
      }
    } catch (err: any) {
      console.error(err);
      setError('Could not load Case of the Day. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyCase();
  }, []);

  // Countdown timer to midnight UTC/local
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const nextMidnight = new Date();
      nextMidnight.setHours(24, 0, 0, 0);

      const diffMs = nextMidnight.getTime() - now.getTime();
      if (diffMs <= 0) {
        fetchDailyCase();
        return;
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="bg-[#1a120b] border-2 border-black text-[#fdfae8] p-6 md:p-8 relative shadow-2xl overflow-hidden my-6">
      {/* Background Vintage Watermark Accent */}
      <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none font-serif text-9xl text-amber-200 uppercase tracking-tighter select-none">
        DAILY
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/50 pb-4">
          <div className="flex items-center space-x-3">
            <span className="bg-[#4a1c1c] text-[#ffdea5] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest border border-amber-800 flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              <span>Case of the Day</span>
            </span>
            <span className="font-mono text-xs text-amber-200/70">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>

          {/* 24h Countdown Timer */}
          <div className="flex items-center space-x-2 font-mono text-xs bg-black/50 border border-amber-900/60 px-3 py-1.5">
            <span className="material-symbols-outlined text-amber-400 text-sm">schedule</span>
            <span className="text-amber-200/80">Next Case In:</span>
            <span className="font-bold text-amber-400">
              {formatNumber(timeLeft.hours)}h {formatNumber(timeLeft.minutes)}m {formatNumber(timeLeft.seconds)}s
            </span>
          </div>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center">
            <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p className="font-serif text-base text-amber-200 animate-pulse">
              Retrieving Today's Classified Mystery Dossier from Bureau Headquarters...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-950/80 border border-red-700 p-4 text-red-200 font-mono text-xs flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => fetchDailyCase(true)}
              className="underline hover:text-white font-bold"
            >
              Retry
            </button>
          </div>
        ) : dailyCase ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Image Thumbnail */}
            <div className="md:col-span-4 relative group">
              <div className="aspect-[4/3] w-full overflow-hidden border border-amber-900/80 shadow-lg relative bg-black">
                <img
                  src={dailyCase.coverImage}
                  alt={dailyCase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-2 left-2 bg-black/80 text-amber-300 font-mono text-[10px] px-2 py-0.5 border border-amber-800">
                  {dailyCase.fileNumber}
                </div>
              </div>
            </div>

            {/* Case Information */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="bg-amber-900/40 text-amber-300 text-[10px] font-mono uppercase px-2 py-0.5 border border-amber-800">
                    {dailyCase.difficulty}
                  </span>
                  <span className="bg-amber-900/40 text-amber-300 text-[10px] font-mono uppercase px-2 py-0.5 border border-amber-800">
                    {dailyCase.style}
                  </span>
                  <span className="bg-amber-900/40 text-amber-300 text-[10px] font-mono uppercase px-2 py-0.5 border border-amber-800">
                    {dailyCase.setting}
                  </span>
                  <span className="text-amber-200/60 font-mono text-[10px] ml-auto">
                    {dailyCase.durationMinutes} • {dailyCase.playerCount}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#fdfae8] tracking-tight">
                  {dailyCase.title}
                </h3>
                <p className="font-serif italic text-sm text-amber-200/80 mt-1 line-clamp-2">
                  {dailyCase.subtitle}
                </p>
              </div>

              <p className="font-sans text-xs text-neutral-300 line-clamp-3 leading-relaxed bg-black/30 p-3 border-l-2 border-amber-600">
                {dailyCase.premise}
              </p>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      if (onPlayCase) {
                        onPlayCase(dailyCase);
                      } else {
                        onSelectCase(dailyCase.id);
                      }
                    }}
                    className="bg-[#ffdea5] text-black font-sans text-xs uppercase tracking-wider font-bold px-5 py-2.5 hover:bg-white transition-colors flex items-center space-x-2 border border-black shadow-md"
                  >
                    <span className="material-symbols-outlined text-base">play_arrow</span>
                    <span>Launch Investigation</span>
                  </button>

                  <button
                    onClick={() => onSelectCase(dailyCase.id)}
                    className="bg-black/60 text-amber-200 border border-amber-800 font-mono text-xs font-bold uppercase px-4 py-2.5 hover:bg-amber-950/80 transition-colors"
                  >
                    Inspect Dossier
                  </button>
                </div>

                <button
                  onClick={() => fetchDailyCase(true)}
                  title="Generate a fresh daily case variant"
                  className="text-amber-400/80 hover:text-amber-300 font-mono text-[11px] flex items-center space-x-1 underline"
                >
                  <span className="material-symbols-outlined text-sm">refresh</span>
                  <span>Re-roll Daily Case</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
