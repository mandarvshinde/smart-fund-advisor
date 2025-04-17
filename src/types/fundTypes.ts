
// --- Fund Type ---
export interface Fund {
  schemeCode: string;
  schemeName: string;
  nav: string;
  date: string;
  fundHouse?: string;
  category?: string;
  returns?: {
    oneYear?: number;
    threeYear?: number;
    fiveYear?: number;
  };
}

// --- FundDetails Type ---
export interface FundDetails extends Fund {
  riskLevel?: string;
  launchDate?: string;
  schemeType?: string;
  navHistory?: Array<{
    date: string;
    nav: number;
  }>;
}

// --- Additional Types ---
export interface Recommendation {
  id: string;
  type: 'buy' | 'sell' | 'switch';
  description: string;
  reason: string;
  isActioned: boolean;
  potentialBenefit: string;
  riskLevel: string;
  date: string;
}

export interface InvestmentHistoryItem {
  id: string;
  fundName: string;
  type: string;
  amount: number;
  units?: number;
  currentValue: number;
  sipAmount?: number;
  lastTransactionDate?: Date;
  returns?: number;
  totalInvested?: number;
  annualizedReturn?: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  currentAmount: number;
  monthlyContribution: number;
  progress: number;
  investments: string[];
  riskAppetite: 'low' | 'moderate' | 'high';
}

export interface MarketInsight {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  category: string;
  date: string;
  source: string;
}
