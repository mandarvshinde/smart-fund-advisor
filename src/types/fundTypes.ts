
export interface Fund {
  schemeCode: string;
  schemeName: string;
  nav: string;
  date: string;
  fundHouse?: string;
  category?: string;
  returns?: {
    oneYear: number;
    threeYear?: number;
    fiveYear?: number;
  };
}

export interface FundDetails extends Fund {
  riskLevel?: string;
  expenseRatio?: string;
  aum?: string;
  launchDate?: string;
  fundManager?: string;
  exitLoad?: string;
  sectorAllocation?: {
    sector: string;
    allocation: number;
  }[];
  portfolioHoldings?: {
    company: string;
    allocation: number;
  }[];
}
