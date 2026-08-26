export type Difficulty = 'Rookie' | 'Seasoned' | 'Master Detective' | 'Expert';

export interface Character {
  id: string;
  name: string;
  role: string;
  age: number;
  avatar: string;
  background: string;
  relationships: string;
  knownInfo: string;
  personalObjectives: string[];
  secrets: string;
  privateClues: string[];
  isCulprit?: boolean;
  culpritMotive?: string;
}

export interface EvidenceItem {
  id: string;
  number: string; // e.g. "EVIDENCE #014"
  title: string;
  type: 'Document' | 'Physical' | 'Financial' | 'Photo' | 'Statement' | 'Map';
  foundAt: string;
  image: string;
  description: string;
  transcription?: string;
  relatedSuspectIds: string[];
  relatedObjects: string[];
}

export interface TimelineEvent {
  id: string;
  timestamp: string; // e.g. "8:05 PM"
  title: string;
  description: string;
  location: string;
  involvedSuspectIds: string[];
  hasContradiction?: boolean;
  contradictionNote?: string;
}

export interface Hint {
  id: number; // 1, 2, 3
  levelName: 'Gentle' | 'Moderate' | 'Strong';
  text: string;
}

export interface CaseReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  containsSpoilers: boolean;
}

export interface MysteryCase {
  id: string;
  fileNumber: string; // e.g., "FILE #402-A"
  title: string;
  subtitle: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  difficulty: Difficulty;
  playerCount: string; // e.g. "4–8 Players"
  minPlayers: number;
  maxPlayers: number;
  durationMinutes: string; // e.g. "90–120 min"
  minDurationMinutes: number;
  recommendedAge: string; // e.g. "13+"
  setting: string; // e.g. "Victorian", "Speakeasy", "Espionage", "Suburban"
  style: string; // e.g. "Whodunit", "Detective", "Psychological"
  tags: string[];
  premise: string;
  settingDescription: string;
  whatsNeeded: string[];
  whatsIncluded: string[];
  difficultyExplanation: string;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  characters: Character[];
  evidence: EvidenceItem[];
  timeline: TimelineEvent[];
  hints: Hint[];
  solution: {
    culpritId: string;
    culpritName: string;
    motive: string;
    howItHappened: string;
    keyEvidence: string[];
    breakdown: string;
  };
  reviews: CaseReview[];
}

export interface CartItem {
  caseId: string;
  format: 'Digital Download' | 'Physical Deluxe Box Set';
  price: number;
}

export interface GameSession {
  id: string; // e.g., "session-402"
  roomCode: string; // e.g., "TOAST-892"
  caseId: string;
  hostName: string;
  status: 'SETUP' | 'INVESTIGATION' | 'FINAL_ACCUSATION' | 'REVEAL' | 'COMPLETED';
  currentStage: number; // 1 to 3
  assignedPlayers: {
    id: string;
    name: string;
    characterId: string;
    isHost: boolean;
    joined: boolean;
  }[];
  revealedHintIds: number[];
  revealedEvidenceIds: string[];
  createdAt: string;
}

export interface UserNote {
  id: string;
  text: string;
  createdAt: string;
  tags?: string[];
}

export interface AccusationSubmission {
  culpritId: string;
  motive: string;
  evidenceIds: string[];
  deductionNotes: string;
  submittedAt: string;
}

export type ActiveView = 
  | 'home'
  | 'cases'
  | 'case-detail'
  | 'how-it-works'
  | 'host-mystery'
  | 'about'
  | 'my-cases'
  | 'host-setup'
  | 'player-investigation'
  | 'admin';
