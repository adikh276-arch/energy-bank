export interface Activity {
  id: string;
  name: string;
  emoji: string;
  cost: number; // negative = deposit/recovery
  category: ActivityCategory;
  isInvestment?: boolean;
}

export type ActivityCategory = 'basic' | 'work' | 'household' | 'recovery' | 'social' | 'health' | 'transport' | 'leisure';

export interface Transaction {
  id: string;
  activityId: string;
  activityName: string;
  emoji: string;
  cost: number;
  time: string; // HH:MM
  balanceAfter: number;
  timestamp: number;
}

export interface DayRecord {
  date: string; // YYYY-MM-DD
  startingEnergy: number;
  expectedEnergy: number;
  transactions: Transaction[];
  tags: EnergyTag[];
  isCrashMode: boolean;
}

export type EnergyTag = 'slept-poorly' | 'high-pain' | 'flare-up' | 'feeling-good' | 'stressed' | 'medicated';

export type EnergyZone = 'high' | 'medium' | 'low' | 'critical';

export interface WeekSummary {
  date: string;
  started: number;
  spent: number;
  netBalance: number;
}

export type ShareStyle = 'minimal' | 'illustrated' | 'bold';
