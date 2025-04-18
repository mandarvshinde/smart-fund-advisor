
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
  riskLevel?: string;
}

// --- FundDetails Type ---
export interface FundDetails extends Fund {
  launchDate?: string;
  schemeType?: string;
  expenseRatio?: string;
  aum?: string;
  exitLoad?: string;
  fundManager?: string;
  benchmark?: string;
  navHistory?: Array<{
    date: string;
    nav: number;
  }>;
  holdings?: Array<{
    name: string;
    percentage: number;
  }>;
  sectorAllocation?: Array<{
    sector: string;
    percentage: number;
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
