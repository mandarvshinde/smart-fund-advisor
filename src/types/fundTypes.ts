// --- NEW: API Response Types ---
export interface ApiFundBasicInfo {
  schemeCode: number; // API returns number
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
  nav: string; // API returns NAV as string
}

export interface ApiFundDetailsResponse {
  meta: ApiFundMeta;
  data: ApiFundNav[];
  status: string;
}
// --- End NEW ---


// --- Fund Type ---
// Represents basic info, primarily from the /mf list endpoint
export interface Fund {
  schemeCode: string; // Use string consistently
  schemeName: string;
  // These fields are NOT available from the basic /mf list endpoint
  nav?: string;
  date?: string;
  fundHouse?: string;
  category?: string;
  returns?: { // Not directly available from API list/details
    oneYear?: number;
    threeYear?: number;
    fiveYear?: number;
  };
}

// --- FundDetails Type ---
export interface FundDetails extends Fund {
  // Fields directly from API (/mf/{schemeCode})
  nav: string;         // Latest NAV (string)
  date: string;        // Date of Latest NAV
  fundHouse: string;
  schemeType?: string; // From API meta
  category: string;    // From API meta (scheme_category)
  
  // Derived fields
  riskLevel?: string;
  launchDate?: string;
  
  // Performance data calculated from historical NAVs
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
  type: string; // 'Equity', 'Debt', 'Hybrid', 'ELSS' etc.
  amount: number; // Current value or total invested? Clarify usage
  units?: number;
  currentValue: number;
  sipAmount?: number; // Optional SIP amount
  lastTransactionDate?: Date; // Date of last SIP or investment
  returns?: number; // Overall or annualized? Clarify usage (e.g., 15.86 means 15.86%)
  totalInvested?: number;
  annualizedReturn?: number;
}


export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: string; // Keep as string for simplicity, parse when needed
  currentAmount: number;
  monthlyContribution: number;
  progress: number; // Percentage (e.g., 22.5 means 22.5%)
  investments: string[]; // List of associated fund names or IDs
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
