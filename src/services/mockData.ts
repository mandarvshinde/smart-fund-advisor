import { User, MutualFund, Investment, Goal, Recommendation, MarketInsight } from '@/types';

// Mock user
export const mockUser: User = {
  id: 'user-1',
  name: 'John Smith',
  email: 'john.smith@example.com',
  profileImage: 'https://ui-avatars.com/api/?name=John+Smith&background=0A6EBD&color=fff',
  riskAppetite: 'moderate',
  agenticAIEnabled: false,
};

// Mock mutual funds
export const mockMutualFunds: MutualFund[] = [
  {
    id: 'fund-1',
    name: 'Bluechip Large Cap Fund',
    category: 'Equity',
    subcategory: 'Large Cap',
    nav: 134.56,
    oneYearReturn: 12.5,
    threeYearReturn: 15.2,
    fiveYearReturn: 14.8,
    riskLevel: 'moderate',
    expenseRatio: 1.2,
    aum: 12500,
    fundManager: 'Jane Doe',
    fundHouse: 'Fidelity Investments',
  },
  {
    id: 'fund-2',
    name: 'Mid Cap Growth Opportunities',
    category: 'Equity',
    subcategory: 'Mid Cap',
    nav: 87.34,
    oneYearReturn: 18.7,
    threeYearReturn: 16.8,
    fiveYearReturn: 17.2,
    riskLevel: 'high',
    expenseRatio: 1.8,
    aum: 5600,
    fundManager: 'Robert Johnson',
    fundHouse: 'Vanguard Investments',
  },
  {
    id: 'fund-3',
    name: 'Corporate Bond Fund',
    category: 'Debt',
    subcategory: 'Corporate Bonds',
    nav: 32.45,
    oneYearReturn: 6.2,
    threeYearReturn: 7.1,
    fiveYearReturn: 7.5,
    riskLevel: 'low',
    expenseRatio: 0.8,
    aum: 8900,
    fundManager: 'Michael Chen',
    fundHouse: 'PIMCO',
  },
  {
    id: 'fund-4',
    name: 'Balanced Advantage Fund',
    category: 'Hybrid',
    subcategory: 'Dynamic Asset Allocation',
    nav: 45.67,
    oneYearReturn: 9.8,
    threeYearReturn: 11.2,
    fiveYearReturn: 10.5,
    riskLevel: 'moderate',
    expenseRatio: 1.5,
    aum: 7800,
    fundManager: 'Sarah Williams',
    fundHouse: 'BlackRock',
  },
  {
    id: 'fund-5',
    name: 'Small Cap Discovery Fund',
    category: 'Equity',
    subcategory: 'Small Cap',
    nav: 56.78,
    oneYearReturn: 22.4,
    threeYearReturn: 19.7,
    fiveYearReturn: 18.9,
    riskLevel: 'high',
    expenseRatio: 2.1,
    aum: 3400,
    fundManager: 'David Brown',
    fundHouse: 'Franklin Templeton',
  },
  {
    id: 'fund-6',
    name: 'Liquid Fund',
    category: 'Debt',
    subcategory: 'Liquid',
    nav: 21.33,
    oneYearReturn: 3.8,
    threeYearReturn: 4.2,
    fiveYearReturn: 4.5,
    riskLevel: 'low',
    expenseRatio: 0.5,
    aum: 15600,
    fundManager: 'Linda Martinez',
    fundHouse: 'HDFC Mutual Fund',
  },
  {
    id: 'fund-7',
    name: 'Tax Saver ELSS Fund',
    category: 'Equity',
    subcategory: 'Tax Saving ELSS',
    nav: 78.92,
    oneYearReturn: 16.8,
    threeYearReturn: 14.5,
    fiveYearReturn: 15.2,
    riskLevel: 'moderate',
    expenseRatio: 1.7,
    aum: 6300,
    fundManager: 'Amit Sharma',
    fundHouse: 'Axis Mutual Fund',
  },
  {
    id: 'fund-8',
    name: 'Small Cap Emerging Opportunities',
    category: 'Equity',
    subcategory: 'Small Cap',
    nav: 42.55,
    oneYearReturn: 25.6,
    threeYearReturn: 21.3,
    fiveYearReturn: 19.8,
    riskLevel: 'high',
    expenseRatio: 2.3,
    aum: 2800,
    fundManager: 'Patricia Lee',
    fundHouse: 'SBI Mutual Fund',
  },
  {
    id: 'fund-9',
    name: 'Large Cap Index Fund',
    category: 'Equity',
    subcategory: 'Large Cap',
    nav: 115.29,
    oneYearReturn: 11.7,
    threeYearReturn: 13.5,
    fiveYearReturn: 12.8,
    riskLevel: 'moderate',
    expenseRatio: 0.9,
    aum: 18500,
    fundManager: 'James Wilson',
    fundHouse: 'UTI Mutual Fund',
  },
  {
    id: 'fund-10',
    name: 'Tax Saving Retirement Fund',
    category: 'Solution Oriented',
    subcategory: 'Tax Saving Retirement',
    nav: 52.37,
    oneYearReturn: 14.2,
    threeYearReturn: 12.8,
    fiveYearReturn: 13.5,
    riskLevel: 'moderate',
    expenseRatio: 1.6,
    aum: 5100,
    fundManager: 'Rajiv Patel',
    fundHouse: 'ICICI Prudential',
  },
  {
    id: 'fund-11',
    name: 'High Growth Equity Fund',
    category: 'Equity',
    subcategory: 'Multi Cap',
    nav: 92.68,
    oneYearReturn: 19.8,
    threeYearReturn: 18.3,
    fiveYearReturn: 16.9,
    riskLevel: 'high',
    expenseRatio: 1.9,
    aum: 4700,
    fundManager: 'Emily Thompson',
    fundHouse: 'Kotak Mutual Fund',
  },
  {
    id: 'fund-12',
    name: 'Multi Asset Allocation Fund',
    category: 'Hybrid',
    subcategory: 'Multi Asset Allocation',
    nav: 38.45,
    oneYearReturn: 10.5,
    threeYearReturn: 11.8,
    fiveYearReturn: 10.9,
    riskLevel: 'moderate',
    expenseRatio: 1.4,
    aum: 8200,
    fundManager: 'Daniel Garcia',
    fundHouse: 'DSP Mutual Fund',
  },
];

// Mock investments
export const mockInvestments: Investment[] = [
  {
    id: 'inv-1',
    fundId: 'fund-1',
    investmentType: 'SIP',
    amount: 5000,
    units: 37.15,
    startDate: '2022-01-15',
    lastTransactionDate: '2023-06-15',
    sipFrequency: 'monthly',
    currentValue: 65000,
    totalInvested: 60000,
    absoluteReturn: 8.33,
    annualizedReturn: 10.2,
  },
  {
    id: 'inv-2',
    fundId: 'fund-2',
    investmentType: 'lumpsum',
    amount: 100000,
    units: 1145.07,
    startDate: '2022-03-10',
    lastTransactionDate: '2022-03-10',
    currentValue: 118000,
    totalInvested: 100000,
    absoluteReturn: 18.00,
    annualizedReturn: 14.5,
  },
  {
    id: 'inv-3',
    fundId: 'fund-3',
    investmentType: 'SIP',
    amount: 2000,
    units: 61.63,
    startDate: '2021-11-05',
    lastTransactionDate: '2023-06-05',
    sipFrequency: 'monthly',
    currentValue: 42000,
    totalInvested: 40000,
    absoluteReturn: 5.00,
    annualizedReturn: 6.8,
  },
  {
    id: 'inv-4',
    fundId: 'fund-4',
    investmentType: 'SIP',
    amount: 3000,
    units: 65.69,
    startDate: '2022-06-20',
    lastTransactionDate: '2023-06-20',
    sipFrequency: 'monthly',
    currentValue: 39000,
    totalInvested: 36000,
    absoluteReturn: 8.33,
    annualizedReturn: 9.7,
  },
];

// Mock goals
export const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    name: 'Retirement',
    targetAmount: 5000000,
    currentAmount: 650000,
    targetDate: '2050-01-01',
    investments: ['inv-1', 'inv-3'],
    progress: 13,
    riskAppetite: 'moderate',
  },
  {
    id: 'goal-2',
    name: 'House Down Payment',
    targetAmount: 1000000,
    currentAmount: 157000,
    targetDate: '2028-01-01',
    investments: ['inv-2'],
    progress: 15.7,
    riskAppetite: 'high',
  },
  {
    id: 'goal-3',
    name: 'Child Education',
    targetAmount: 2000000,
    currentAmount: 39000,
    targetDate: '2035-01-01',
    investments: ['inv-4'],
    progress: 1.95,
    riskAppetite: 'moderate',
  },
];

// Mock recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'switch',
    description: 'Switch from Corporate Bond Fund to Gilt Fund',
    currentFundId: 'fund-3',
    recommendedFundId: 'fund-6',
    reason: 'Rising interest rates may affect corporate bond returns',
    potentialBenefit: 'Better protection against interest rate movements',
    riskLevel: 'low',
    date: '2023-06-10',
    isActioned: false,
  },
  {
    id: 'rec-2',
    type: 'increase_sip',
    description: 'Increase SIP in Bluechip Large Cap Fund',
    currentFundId: 'fund-1',
    reason: 'Market valuation is attractive for long-term investments',
    potentialBenefit: 'Higher returns through cost averaging',
    riskLevel: 'moderate',
    date: '2023-06-12',
    isActioned: false,
  },
  {
    id: 'rec-3',
    type: 'buy',
    description: 'Invest in Small Cap Discovery Fund',
    recommendedFundId: 'fund-5',
    reason: 'Small caps are undervalued and poised for growth',
    potentialBenefit: 'Higher growth potential in the next market cycle',
    riskLevel: 'high',
    date: '2023-06-15',
    isActioned: false,
  },
];

// Mock market insights
export const mockMarketInsights: MarketInsight[] = [
  {
    id: 'insight-1',
    title: 'Fed Rate Cut Expected Next Quarter',
    description: 'Analysts predict the Federal Reserve may cut interest rates by 25 basis points in the next quarter due to slowing inflation.',
    category: 'economy',
    impact: 'positive',
    date: '2023-06-18',
    source: 'Financial Times',
  },
  {
    id: 'insight-2',
    title: 'IT Sector Showing Strong Growth',
    description: 'The IT sector has shown robust growth in the last quarter with major companies beating earnings expectations.',
    category: 'sector',
    impact: 'positive',
    date: '2023-06-15',
    source: 'Bloomberg',
  },
  {
    id: 'insight-3',
    title: 'New Regulatory Changes for Mutual Funds',
    description: 'The regulatory body has introduced new rules for mutual fund categorization and expense ratio calculations.',
    category: 'policy',
    impact: 'neutral',
    date: '2023-06-12',
    source: 'Economic Times',
  },
];

// Mock service functions
export const fetchUser = (): Promise<User> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockUser);
    }, 500);
  });
};

export const fetchMutualFunds = (): Promise<MutualFund[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockMutualFunds);
    }, 800);
  });
};

export const fetchInvestments = (): Promise<Investment[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockInvestments);
    }, 700);
  });
};

export const fetchGoals = (): Promise<Goal[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockGoals);
    }, 600);
  });
};

export const fetchRecommendations = (): Promise<Recommendation[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockRecommendations);
    }, 900);
  });
};

export const fetchMarketInsights = (): Promise<MarketInsight[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockMarketInsights);
    }, 1000);
  });
};

export const updateUserSettings = (user: User): Promise<User> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(user);
    }, 500);
  });
};

export const actOnRecommendation = (recommendationId: string): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 800);
  });
};

// Fetch a single goal by ID
export const fetchGoalById = async (id: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const goals = await fetchGoals();
  const goal = goals.find(goal => goal.id === id);
  
  if (!goal) {
    throw new Error(`Goal with ID ${id} not found`);
  }
  
  return goal;
};
