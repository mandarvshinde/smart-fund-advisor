// --- NEW: API Response Types ---
export interface ApiFundBasicInfo {
  schemeCode: string; 
  schemeName: string;
}

export interface ApiFundMeta {
  fund_house: string;
  scheme_type: string;
  scheme_category: string;
  scheme_code: number;
  scheme_name: string;
}

export interface ApiFundNav {
  date: string;
  nav: string;
}

export interface ApiFundDetailsResponse {
  meta: ApiFundMeta;
  data: ApiFundNav[];
  status: string;
}

// --- AMFI Data Types ---
export interface AmfiData {
  schemeCode: string;
  isin: string;
  isinReinvestment: string;
  schemeName: string;
  nav: string;
  date: string;
  fundHouse: string;
  schemeType: string;
}

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
  nav: string;
  date: string;
  fundHouse: string;
  schemeType?: string;
  category: string;
  riskLevel?: string;
  launchDate?: string;
  returns?: {
    oneYear?: number;
    threeYear?: number;
    fiveYear?: number;
  };
}

// --- Keep existing types if used elsewhere ---
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
