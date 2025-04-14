
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  riskAppetite: 'low' | 'moderate' | 'high';
  agenticAIEnabled: boolean;
}

export interface MutualFund {
  id: string;
  name: string;
  category: 'Equity' | 'Debt' | 'Hybrid' | 'Solution Oriented' | 'Other';
  subcategory: string;
  nav: number;
  oneYearReturn: number;
  threeYearReturn: number;
  fiveYearReturn: number;
  riskLevel: 'low' | 'moderate' | 'high';
  expenseRatio: number;
  aum: number; // Assets Under Management in crores
  fundManager: string;
  fundHouse: string;
}

export interface Investment {
  id: string;
  fundId: string;
  investmentType: 'SIP' | 'lumpsum';
  amount: number;
  units: number;
  startDate: string;
  lastTransactionDate: string;
  sipFrequency?: 'monthly' | 'quarterly' | 'yearly';
  currentValue: number;
  totalInvested: number;
  absoluteReturn: number;
  annualizedReturn: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  investments: string[];
  progress: number;
  riskAppetite: 'low' | 'moderate' | 'high';
  monthlyContribution?: number;
  expectedReturn?: number;
  linkedFunds?: string[];
}

export interface Recommendation {
  id: string;
  type: 'buy' | 'sell' | 'switch' | 'increase_sip' | 'decrease_sip';
  description: string;
  currentFundId?: string;
  recommendedFundId?: string;
  reason: string;
  potentialBenefit: string;
  riskLevel: 'low' | 'moderate' | 'high';
  date: string;
  isActioned: boolean;
}

export interface MarketInsight {
  id: string;
  title: string;
  description: string;
  category: 'market' | 'economy' | 'stock' | 'sector' | 'policy';
  impact: 'positive' | 'negative' | 'neutral';
  date: string;
  source: string;
}

export type ChatMessage = {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
};

// Re-export Fund types from fundTypes.ts to maintain compatibility
export type { Fund, FundDetails } from './fundTypes';
