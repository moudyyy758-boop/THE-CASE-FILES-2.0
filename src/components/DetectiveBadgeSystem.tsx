import React from 'react';

export interface DetectiveRank {
  id: string;
  title: string;
  minCompleted: number;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export const DETECTIVE_RANKS: DetectiveRank[] = [
  {
    id: 'rank-rookie',
    title: 'Rookie Sleuth',
    minCompleted: 0,
    icon: 'search',
    color: 'text-[#4a1c1c]',
    bgColor: 'bg-[#f7f4e2]',
    borderColor: 'border-[#4a1c1c]',
    description: 'Fresh out of the Bureau Academy. Learning the ropes of evidence collection.',
  },
  {
    id: 'rank-junior',
    title: 'Junior Investigator',
    minCompleted: 1,
    icon: 'badge',
    color: 'text-amber-800',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-800',
    description: 'Solved first official murder file. Sharpening spatial deduction skills.',
  },
  {
    id: 'rank-senior',
    title: 'Senior Detective',
    minCompleted: 3,
    icon: 'shield',
    color: 'text-[#a17f3b]',
    bgColor: 'bg-amber-200/60',
    borderColor: 'border-[#a17f3b]',
    description: 'A trusted detective called in for high-profile cold cases and locked rooms.',
  },
  {
    id: 'rank-chief',
    title: 'Chief Inspector',
    minCompleted: 5,
    icon: 'military_tech',
    color: 'text-[#4a1c1c]',
    bgColor: 'bg-[#ffdea5]',
    borderColor: 'border-black',
    description: 'Bureau veteran. Unmasks culprits, exposes forged manifests, and cracks impossible alibis.',
  },
  {
    id: 'rank-legend',
    title: 'Master Sleuth Legend',
    minCompleted: 8,
    icon: 'workspace_premium',
    color: 'text-amber-400',
    bgColor: 'bg-[#1a120b]',
    borderColor: 'border-amber-400',
    description: 'Hall of Fame legend. No mystery remains unsolved under your watch.',
  },
];

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export function getDetectiveRank(completedCount: number): DetectiveRank {
  let currentRank = DETECTIVE_RANKS[0];
  for (const rank of DETECTIVE_RANKS) {
    if (completedCount >= rank.minCompleted) {
      currentRank = rank;
    }
  }
  return currentRank;
}

export function getNextDetectiveRank(completedCount: number): DetectiveRank | null {
  for (const rank of DETECTIVE_RANKS) {
    if (completedCount < rank.minCompleted) {
      return rank;
    }
  }
  return null;
}

export function getDetectiveAchievements(
  completedCaseIds: string[],
  purchasedCaseIds: string[]
): AchievementBadge[] {
  const count = completedCaseIds.length;
  return [
    {
      id: 'ach-first-case',
      title: 'First Blood',
      description: 'Solved your very first cold mystery case file.',
      icon: 'verified',
      isUnlocked: count >= 1,
    },
    {
      id: 'ach-[#4a1c1c]',
      title: 'Dossier Collector',
      description: 'Added 3 or more cases to your bureau library.',
      icon: 'folder_special',
      isUnlocked: purchasedCaseIds.length >= 3,
    },
    {
      id: 'ach-trio',
      title: 'Triple Deduction',
      description: 'Successfully closed 3 official homicide files.',
      icon: 'hotel_class',
      isUnlocked: count >= 3,
    },
    {
      id: 'ach-daily',
      title: '24h Cold Case Solver',
      description: 'Investigated a fresh Case of the Day.',
      icon: 'schedule',
      isUnlocked: completedCaseIds.some((id) => id.startsWith('cotd-') || id.startsWith('daily-')),
    },
    {
      id: 'ach-ai',
      title: 'AI Case Pioneer',
      description: 'Generated a custom case file with Gemini AI.',
      icon: 'auto_awesome',
      isUnlocked: completedCaseIds.some((id) => id.startsWith('ai-case-') || id.startsWith('FILE #')),
    },
    {
      id: 'ach-mastermind',
      title: 'Mastermind Inspector',
      description: 'Solved 5 or more cases and attained Chief Inspector rank.',
      icon: 'military_tech',
      isUnlocked: count >= 5,
    },
  ];
}

interface DetectiveBadgeCardProps {
  completedCaseIds: string[];
  purchasedCaseIds: string[];
  userEmail?: string;
  onOpenModal?: () => void;
  onToggleCompleteCase?: (caseId: string) => void;
}

export const DetectiveBadgeCard: React.FC<DetectiveBadgeCardProps> = ({
  completedCaseIds,
  purchasedCaseIds,
  userEmail = 'detective@bureau.org',
  onOpenModal,
}) => {
  const completedCount = completedCaseIds.length;
  const currentRank = getDetectiveRank(completedCount);
  const nextRank = getNextDetectiveRank(completedCount);

  let progressPercent = 100;
  if (nextRank) {
    const prevMin = currentRank.minCompleted;
    const nextMin = nextRank.minCompleted;
    progressPercent = Math.min(
      100,
      Math.max(0, Math.round(((completedCount - prevMin) / (nextMin - prevMin)) * 100))
    );
  }

  const achievements = getDetectiveAchievements(completedCaseIds, purchasedCaseIds);
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="bg-[#fdfae8] border-2 border-black p-6 relative shadow-xl paper-texture space-y-6">
      {/* Bureau Stamp */}
      <div className="absolute top-4 right-4 opacity-20 pointer-events-none font-mono text-[10px] uppercase border-2 border-[#4a1c1c] p-1 text-[#4a1c1c] transform rotate-12">
        OFFICIAL BUREAU BADGE
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-black/20 pb-4">
        <div className="flex items-center space-x-4">
          {/* Badge Icon Shield */}
          <div className={`w-16 h-16 ${currentRank.bgColor} ${currentRank.borderColor} border-2 rounded-full flex items-center justify-center shadow-md`}>
            <span className={`material-symbols-outlined text-3xl ${currentRank.color}`}>
              {currentRank.icon}
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2 font-mono text-[11px] text-[#4a1c1c] font-bold uppercase tracking-wider">
              <span>BADGE #DET-{Math.abs(userEmail.length * 137 % 9000 + 1000)}</span>
              <span>•</span>
              <span>LEVEL {completedCount + 1}</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-black flex items-center gap-2">
              <span>{currentRank.title}</span>
            </h2>
            <p className="font-mono text-xs text-neutral-600">Investigator: {userEmail}</p>
          </div>
        </div>

        {onOpenModal && (
          <button
            onClick={onOpenModal}
            className="bg-black text-white font-sans text-xs uppercase tracking-wider font-bold px-4 py-2 hover:bg-[#4a1c1c] transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">badge</span>
            <span>View Full Credentials</span>
          </button>
        )}
      </div>

      {/* Rank Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between font-mono text-xs text-black">
          <span>
            Progress to <strong>{nextRank ? nextRank.title : 'Max Rank Achieved'}</strong>
          </span>
          <span>
            <strong>{completedCount}</strong> {nextRank ? `/ ${nextRank.minCompleted} Cases Solved` : 'Cases Solved'}
          </span>
        </div>
        <div className="w-full bg-black/10 border border-black/30 h-3 p-0.5">
          <div
            className="bg-[#4a1c1c] h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="font-sans text-xs text-neutral-600 italic">{currentRank.description}</p>
      </div>

      {/* Reputation Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs border-t border-black/20">
        <div className="bg-[#f7f4e2] border border-black/20 p-2.5 text-center">
          <div className="text-neutral-500 text-[10px] uppercase">Cases Solved</div>
          <div className="font-serif text-xl font-bold text-black">{completedCount}</div>
        </div>

        <div className="bg-[#f7f4e2] border border-black/20 p-2.5 text-center">
          <div className="text-neutral-500 text-[10px] uppercase">Reputation Score</div>
          <div className="font-serif text-xl font-bold text-[#4a1c1c]">
            {completedCount * 150 + unlockedCount * 50} pts
          </div>
        </div>

        <div className="bg-[#f7f4e2] border border-black/20 p-2.5 text-center">
          <div className="text-neutral-500 text-[10px] uppercase">Badges Unlocked</div>
          <div className="font-serif text-xl font-bold text-amber-800">
            {unlockedCount} / {achievements.length}
          </div>
        </div>

        <div className="bg-[#f7f4e2] border border-black/20 p-2.5 text-center">
          <div className="text-neutral-500 text-[10px] uppercase">Bureau Rank</div>
          <div className="font-serif text-sm font-bold text-black truncate mt-1">
            {currentRank.title}
          </div>
        </div>
      </div>

      {/* Quick Badges Showcase */}
      <div>
        <div className="font-mono text-xs uppercase font-bold text-black mb-2 flex items-center justify-between">
          <span>Earned Detective Medals ({unlockedCount})</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {achievements.map((a) => (
            <div
              key={a.id}
              title={`${a.title}: ${a.description} (${a.isUnlocked ? 'Unlocked' : 'Locked'})`}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 border text-xs font-mono transition-all ${
                a.isUnlocked
                  ? 'bg-[#ffdea5] border-black text-black font-bold shadow-sm'
                  : 'bg-black/5 border-black/20 text-neutral-400 opacity-60'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{a.icon}</span>
              <span>{a.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DetectiveBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedCaseIds: string[];
  purchasedCaseIds: string[];
  userEmail?: string;
}

export const DetectiveBadgeModal: React.FC<DetectiveBadgeModalProps> = ({
  isOpen,
  onClose,
  completedCaseIds,
  purchasedCaseIds,
  userEmail = 'detective@bureau.org',
}) => {
  if (!isOpen) return null;

  const completedCount = completedCaseIds.length;
  const currentRank = getDetectiveRank(completedCount);
  const achievements = getDetectiveAchievements(completedCaseIds, purchasedCaseIds);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-[#fdfae8] border-2 border-black max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative paper-texture max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-black pb-4">
          <div>
            <div className="flex items-center space-x-2 text-[#4a1c1c] font-mono text-xs uppercase font-bold tracking-widest">
              <span className="material-symbols-outlined text-sm">badge</span>
              <span>Central Bureau Credentials</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-black mt-1">
              Investigator Reputation & Badges
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:text-[#4a1c1c] p-1"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Official Detective ID Card */}
        <div className="bg-[#1a120b] border-2 border-amber-900 text-[#fdfae8] p-6 relative shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className={`w-24 h-24 rounded-full ${currentRank.bgColor} border-2 ${currentRank.borderColor} flex items-center justify-center shrink-0 shadow-xl`}>
              <span className={`material-symbols-outlined text-5xl ${currentRank.color}`}>
                {currentRank.icon}
              </span>
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest">
                OFFICIAL DETECTIVE RANK: {currentRank.title}
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">{userEmail}</h3>
              <p className="font-mono text-xs text-amber-200/80">
                Total Cold Cases Closed: <strong>{completedCount} Files</strong>
              </p>
              <p className="font-sans text-xs text-neutral-300 italic">
                "{currentRank.description}"
              </p>
            </div>
          </div>
        </div>

        {/* All Rank Progression Tier List */}
        <div>
          <h3 className="font-serif text-lg font-bold text-black mb-3">Bureau Rank Hierarchy</h3>
          <div className="space-y-2 font-mono text-xs">
            {DETECTIVE_RANKS.map((rank) => {
              const isAchieved = completedCount >= rank.minCompleted;
              const isCurrent = currentRank.id === rank.id;
              return (
                <div
                  key={rank.id}
                  className={`p-3 border flex items-center justify-between ${
                    isCurrent
                      ? 'bg-[#ffdea5] border-black font-bold shadow-sm'
                      : isAchieved
                      ? 'bg-[#f7f4e2] border-black/40 text-black'
                      : 'bg-black/5 border-black/20 text-neutral-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="material-symbols-outlined text-lg">{rank.icon}</span>
                    <div>
                      <div className="font-serif text-sm font-bold">{rank.title}</div>
                      <div className="text-[10px] opacity-80">{rank.description}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase block font-bold">
                      {rank.minCompleted === 0 ? 'Starter' : `${rank.minCompleted}+ Solved`}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] bg-black text-white px-1.5 py-0.5 uppercase font-bold">
                        ACTIVE RANK
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievement Badges Grid */}
        <div>
          <h3 className="font-serif text-lg font-bold text-black mb-3">Special Detective Medals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3 border flex items-start space-x-3 ${
                  ach.isUnlocked
                    ? 'bg-[#f7f4e2] border-black text-black'
                    : 'bg-black/5 border-black/20 text-neutral-400'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                    ach.isUnlocked
                      ? 'bg-[#4a1c1c] text-[#ffdea5] border-black'
                      : 'bg-neutral-200 text-neutral-500 border-neutral-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{ach.icon}</span>
                </div>
                <div className="space-y-0.5">
                  <div className="font-serif font-bold text-sm text-black flex items-center gap-1.5">
                    <span>{ach.title}</span>
                    {ach.isUnlocked && (
                      <span className="material-symbols-outlined text-emerald-700 text-sm">
                        check_circle
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-neutral-600">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-black text-white px-6 py-2.5 font-sans text-xs uppercase tracking-wider font-bold hover:bg-[#4a1c1c] transition-colors"
          >
            Close Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
