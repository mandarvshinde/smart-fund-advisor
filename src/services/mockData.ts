
import { MutualFund, Investment, Goal, Recommendation, MarketInsight, Fund } from '@/types';

// Mock data for mutual funds
export const mockMutualFunds: MutualFund[] = [
  {
    id: '101',
    name: 'HDFC Mid-Cap Opportunities Fund',
    category: 'Equity',
    subcategory: 'Mid Cap',
    nav: 135.67,
    oneYearReturn: 18.5,
    threeYearReturn: 45.2,
    fiveYearReturn: 85.7,
    riskLevel: 'moderate',
    expenseRatio: 1.25,
    aum: 4500,
    fundManager: 'Chirag Setalvad',
    fundHouse: 'HDFC Mutual Fund'
  },
  {
    id: '102',
    name: 'Axis Bluechip Fund',
    category: 'Equity',
    subcategory: 'Large Cap',
    nav: 45.89,
    oneYearReturn: 15.2,
    threeYearReturn: 35.1,
    fiveYearReturn: 65.4,
    riskLevel: 'low',
    expenseRatio: 0.95,
    aum: 7800,
    fundManager: 'Shreyas Devalkar',
    fundHouse: 'Axis Mutual Fund'
  },
  {
    id: '103',
    name: 'SBI Small Cap Fund',
    category: 'Equity',
    subcategory: 'Small Cap',
    nav: 89.23,
    oneYearReturn: 22.7,
    threeYearReturn: 52.3,
    fiveYearReturn: 95.2,
    riskLevel: 'high',
    expenseRatio: 1.75,
    aum: 2800,
    fundManager: 'R. Srinivasan',
    fundHouse: 'SBI Mutual Fund'
  },
  {
    id: '104',
    name: 'Kotak Tax Saver Fund',
    category: 'Equity',
    subcategory: 'ELSS Tax Saving',
    nav: 56.78,
    oneYearReturn: 16.9,
    threeYearReturn: 38.6,
    fiveYearReturn: 72.1,
    riskLevel: 'moderate',
    expenseRatio: 1.45,
    aum: 1950,
    fundManager: 'Harsha Upadhyaya',
    fundHouse: 'Kotak Mutual Fund'
  },
  {
    id: '105',
    name: 'ICICI Prudential Balanced Advantage Fund',
    category: 'Hybrid',
    subcategory: 'Dynamic Asset Allocation',
    nav: 78.34,
    oneYearReturn: 14.3,
    threeYearReturn: 32.8,
    fiveYearReturn: 58.9,
    riskLevel: 'low',
    expenseRatio: 1.15,
    aum: 5600,
    fundManager: 'S. Naren',
    fundHouse: 'ICICI Prudential Mutual Fund'
  },
  {
    id: '106',
    name: 'Aditya Birla Sun Life Corporate Bond Fund',
    category: 'Debt',
    subcategory: 'Corporate Bond',
    nav: 34.56,
    oneYearReturn: 8.2,
    threeYearReturn: 22.9,
    fiveYearReturn: 41.3,
    riskLevel: 'low',
    expenseRatio: 0.65,
    aum: 4200,
    fundManager: 'Maneesh Dangi',
    fundHouse: 'Aditya Birla Sun Life Mutual Fund'
  }
];

// Mock data for investments
export const mockInvestments: Investment[] = [
  {
    id: '201',
    fundId: '101',
    investmentType: 'SIP',
    amount: 5000,
    units: 36.854,
    startDate: '2021-06-15',
    lastTransactionDate: '2023-01-15',
    sipFrequency: 'monthly',
    currentValue: 250000,
    totalInvested: 200000,
    absoluteReturn: 25,
    annualizedReturn: 12.5
  },
  {
    id: '202',
    fundId: '102',
    investmentType: 'lumpsum',
    amount: 100000,
    units: 2179.125,
    startDate: '2022-03-10',
    lastTransactionDate: '2022-03-10',
    currentValue: 115000,
    totalInvested: 100000,
    absoluteReturn: 15,
    annualizedReturn: 16.2
  },
  {
    id: '203',
    fundId: '105',
    investmentType: 'SIP',
    amount: 10000,
    units: 127.65,
    startDate: '2020-11-22',
    lastTransactionDate: '2023-01-22',
    sipFrequency: 'monthly',
    currentValue: 350000,
    totalInvested: 300000,
    absoluteReturn: 16.67,
    annualizedReturn: 8.3
  }
];

// Mock data for goals
export const mockGoals: Goal[] = [
  {
    id: '301',
    name: 'Retirement',
    targetAmount: 2000000,
    currentAmount: 350000,
    targetDate: '2045-01-01',
    investments: ['201', '203'],
    progress: 17.5,
    riskAppetite: 'moderate',
    monthlyContribution: 15000,
    expectedReturn: 12
  },
  {
    id: '302',
    name: 'Home Purchase',
    targetAmount: 5000000,
    currentAmount: 1250000,
    targetDate: '2028-06-30',
    investments: ['202'],
    progress: 25,
    riskAppetite: 'low',
    monthlyContribution: 30000,
    expectedReturn: 8
  },
  {
    id: '303',
    name: 'Child Education',
    targetAmount: 1500000,
    currentAmount: 600000,
    targetDate: '2030-04-15',
    investments: [],
    progress: 40,
    riskAppetite: 'high',
    monthlyContribution: 10000,
    expectedReturn: 15
  }
];

// Mock data for recommendations
export const mockRecommendations: Recommendation[] = [
  {
    id: '401',
    type: 'buy',
    description: 'Add SBI Small Cap Fund to your portfolio',
    recommendedFundId: '103',
    reason: 'Small caps are likely to outperform in the current market environment',
    potentialBenefit: 'Higher returns due to small cap rally',
    riskLevel: 'high',
    date: '2023-01-05',
    isActioned: false
  },
  {
    id: '402',
    type: 'increase_sip',
    description: 'Increase your SIP in HDFC Mid-Cap Opportunities Fund',
    currentFundId: '101',
    reason: 'You are underinvested in mid-caps compared to your risk profile',
    potentialBenefit: 'Better portfolio balancing and potential for higher returns',
    riskLevel: 'moderate',
    date: '2023-01-10',
    isActioned: true
  },
  {
    id: '403',
    type: 'switch',
    description: 'Switch from Aditya Birla Sun Life Corporate Bond Fund to ICICI Prudential Balanced Advantage Fund',
    currentFundId: '106',
    recommendedFundId: '105',
    reason: 'Interest rates are likely to rise, which may impact debt funds',
    potentialBenefit: 'Protection against interest rate risk and better returns',
    riskLevel: 'low',
    date: '2023-01-15',
    isActioned: false
  }
];

// Mock data for market insights
export const mockMarketInsights: MarketInsight[] = [
  {
    id: '501',
    title: 'RBI Hikes Interest Rate by 25 bps',
    description: 'The Reserve Bank of India raised its key lending rate by 25 basis points as inflation concerns remain.',
    category: 'economy',
    impact: 'negative',
    date: '2023-01-05',
    source: 'Economic Times'
  },
  {
    id: '502',
    title: 'IT Sector Shows Strong Q3 Results',
    description: 'Major IT companies have reported better than expected Q3 results, driven by digital transformation deals.',
    category: 'sector',
    impact: 'positive',
    date: '2023-01-12',
    source: 'Business Standard'
  },
  {
    id: '503',
    title: 'Government Announces New Infrastructure Projects',
    description: 'The government has announced infrastructure projects worth ₹2 lakh crore to boost economic growth.',
    category: 'policy',
    impact: 'positive',
    date: '2023-01-18',
    source: 'Financial Express'
  }
];

// Mock data for chat messages
export const mockChatMessages = [
  {
    id: '601',
    sender: 'user',
    content: 'How should I invest ₹10,000 per month?',
    timestamp: '2023-01-15T10:30:00'
  },
  {
    id: '602',
    sender: 'ai',
    content: 'Based on your risk profile, I recommend a diversified approach: 60% in equity funds like HDFC Mid-Cap Opportunities Fund, 30% in balanced funds like ICICI Prudential Balanced Advantage Fund, and 10% in debt funds for stability.',
    timestamp: '2023-01-15T10:30:30'
  },
  {
    id: '603',
    sender: 'user',
    content: 'What is the difference between SIP and lumpsum investment?',
    timestamp: '2023-01-15T10:31:15'
  },
  {
    id: '604',
    sender: 'ai',
    content: 'A SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly (usually monthly) over a period of time, while a lumpsum investment is when you invest the entire amount at once. SIPs help in rupee cost averaging and reducing the impact of market volatility.',
    timestamp: '2023-01-15T10:31:45'
  }
];

// Mock market data (for dashboard)
export const mockMarketData = {
  indices: [
    { name: 'NIFTY 50', value: 17865.75, change: 1.25 },
    { name: 'SENSEX', value: 59958.42, change: 1.18 },
    { name: 'NIFTY Bank', value: 41829.30, change: 0.95 },
    { name: 'NIFTY IT', value: 29574.15, change: -0.45 }
  ],
  topGainers: [
    { name: 'Adani Ports', change: 3.78 },
    { name: 'HDFC Bank', change: 2.65 },
    { name: 'Axis Bank', change: 2.42 },
    { name: 'Tata Motors', change: 2.35 }
  ],
  topLosers: [
    { name: 'Tech Mahindra', change: -1.89 },
    { name: 'HCL Tech', change: -1.65 },
    { name: 'Infosys', change: -1.28 },
    { name: 'TCS', change: -0.95 }
  ],
  insights: [
    { 
      id: '701',
      title: 'Budget 2023 Expectations',
      snippet: 'Markets are expecting increased capex and fiscal consolidation in the upcoming budget.',
      date: '2023-01-18',
      category: 'economy'
    },
    { 
      id: '702',
      title: 'Earnings Season Update',
      snippet: 'Most companies have reported in-line or better than expected Q3 results so far.',
      date: '2023-01-17',
      category: 'market'
    },
    { 
      id: '703',
      title: 'FII Flows Turn Positive',
      snippet: 'After months of selling, FIIs have turned net buyers in the Indian market.',
      date: '2023-01-16',
      category: 'market'
    }
  ]
};

// Mock funds for API data
export const mockFunds: Fund[] = [
  {
    schemeCode: '100027',
    schemeName: 'HDFC Flexi Cap Fund - Direct Plan - Growth',
    nav: '927.25',
    date: '12-Apr-2023',
    fundHouse: 'HDFC Mutual Fund',
    category: 'Equity: Flexi Cap',
    returns: {
      oneYear: 16.8,
      threeYear: 42.5,
      fiveYear: 82.3
    }
  },
  {
    schemeCode: '118989',
    schemeName: 'Axis Bluechip Fund - Direct Plan - Growth',
    nav: '45.89',
    date: '12-Apr-2023',
    fundHouse: 'Axis Mutual Fund',
    category: 'Equity: Large Cap',
    returns: {
      oneYear: 15.2,
      threeYear: 35.1,
      fiveYear: 65.4
    }
  },
  {
    schemeCode: '135796',
    schemeName: 'SBI Small Cap Fund - Direct Plan - Growth',
    nav: '120.63',
    date: '12-Apr-2023',
    fundHouse: 'SBI Mutual Fund',
    category: 'Equity: Small Cap',
    returns: {
      oneYear: 22.7,
      threeYear: 52.3,
      fiveYear: 95.2
    }
  },
  {
    schemeCode: '147363',
    schemeName: 'Mirae Asset Emerging Bluechip Fund - Direct Plan - Growth',
    nav: '101.25',
    date: '12-Apr-2023',
    fundHouse: 'Mirae Asset Mutual Fund',
    category: 'Equity: Large & Mid Cap',
    returns: {
      oneYear: 18.9,
      threeYear: 45.6,
      fiveYear: 88.7
    }
  },
  {
    schemeCode: '120505',
    schemeName: 'Parag Parikh Flexi Cap Fund - Direct Plan - Growth',
    nav: '56.78',
    date: '12-Apr-2023',
    fundHouse: 'PPFAS Mutual Fund',
    category: 'Equity: Flexi Cap',
    returns: {
      oneYear: 19.5,
      threeYear: 48.3,
      fiveYear: 92.1
    }
  },
  {
    schemeCode: '118535',
    schemeName: 'Kotak Emerging Equity Fund - Direct Plan - Growth',
    nav: '78.34',
    date: '12-Apr-2023',
    fundHouse: 'Kotak Mutual Fund',
    category: 'Equity: Mid Cap',
    returns: {
      oneYear: 17.3,
      threeYear: 44.8,
      fiveYear: 86.5
    }
  },
  {
    schemeCode: '122639',
    schemeName: 'Edelweiss Balanced Advantage Fund - Direct Plan - Growth',
    nav: '34.56',
    date: '12-Apr-2023',
    fundHouse: 'Edelweiss Mutual Fund',
    category: 'Hybrid: Balanced Advantage',
    returns: {
      oneYear: 12.7,
      threeYear: 32.5,
      fiveYear: 58.9
    }
  },
  {
    schemeCode: '118560',
    schemeName: 'ICICI Prudential Bluechip Fund - Direct Plan - Growth',
    nav: '67.89',
    date: '12-Apr-2023',
    fundHouse: 'ICICI Prudential Mutual Fund',
    category: 'Equity: Large Cap',
    returns: {
      oneYear: 14.8,
      threeYear: 38.7,
      fiveYear: 71.2
    }
  }
];

// Add missing functions
export const fetchInvestments = async (): Promise<Investment[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockInvestments;
};

export const fetchMutualFunds = async (): Promise<MutualFund[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockMutualFunds;
};

export const fetchGoals = async (): Promise<Goal[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 900));
  return mockGoals;
};

export const fetchRecommendations = async (): Promise<Recommendation[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 750));
  return mockRecommendations;
};

export const fetchMarketInsights = async (): Promise<MarketInsight[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 850));
  return mockMarketInsights;
};

export const fetchMarketData = async (): Promise<typeof mockMarketData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  return mockMarketData;
};
