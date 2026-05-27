export type ArchetypeSlug =
  | 'zeus'
  | 'hades'
  | 'ares'
  | 'odin'
  | 'anubis'
  | 'athena'
  | 'apollo'
  | 'artemis'
  | 'hermes'
  | 'aphrodite';

export type IdentityQuestionType = 'psychological' | 'visual' | 'style' | 'behavior';

export type IdentityOption = {
  id: string;
  label: string;
};

export type IdentityQuestion = {
  id: string;
  version: number;
  prompt: string;
  type: IdentityQuestionType;
  options: IdentityOption[];
  weightsByArchetype: Partial<Record<ArchetypeSlug, number>>;
};

export type IdentityAnswer = {
  questionId: string;
  optionId: string;
};

export type IdentitySession = {
  id: string;
  anonymousId: string | null;
  userId: string | null;
  version: number;
  answers: IdentityAnswer[];
  status: 'active' | 'completed';
  startedAt: string;
  completedAt: string | null;
};

export type IdentityResult = {
  dominantArchetype: ArchetypeSlug;
  secondaryArchetypes: ArchetypeSlug[];
  scores: Record<ArchetypeSlug, number>;
  confidence: number;
  narrativeTitle?: string;
  narrative?: string;
  styleAffinity: number;
  productAffinity: number;
  promptVersion: number;
  schemaVersion: number;
};

export type IdentityProfile = {
  anonymousId: string | null;
  userId: string | null;
  currentResult: IdentityResult | null;
  resultHistory: IdentityResult[];
};
