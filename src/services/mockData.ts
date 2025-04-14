import { Fund, FundCategory, Recommendation, Goal, InvestmentHistoryItem } from '@/types';

// Utility function to generate a random number within a range
const getRandomNumber = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Utility function to generate a random integer within a range
const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate a random price
const generateRandomPrice = (): number => {
  return parseFloat((Math.random() * 200).toFixed(2));
};

// Function to generate a realistic-looking fund name
const generateFundName = (): string => {
  const prefixes = ['SBI', 'HDFC', 'ICICI Prudential', 'Axis', 'Kotak', 'Reliance'];
  const fundTypes = ['Bluechip', 'Midcap', 'Smallcap', 'Tax Saver', 'Balanced'];
  const suffixes = ['Fund', 'Growth Fund', 'Equity Fund', 'Scheme'];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const fundType = fundTypes[Math.floor(Math.random() * fundTypes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return `${prefix} ${fundType} ${suffix}`;
};

// Function to generate a random fund category
const generateRandomCategory = (): FundCategory => {
  const categories: FundCategory[] = ['equity', 'debt', 'hybrid', 'index', 'elss'];
  return categories[Math.floor(Math.random() * categories.length)];
};

// Function to generate a random fund object
const generateRandomFund = (id: string): Fund => {
  const category = generateRandomCategory();
  const name = generateFundName();
  const price = generateRandomPrice();

  return {
    id,
    name,
    category,
    price,
    returns: parseFloat((Math.random() * 20).toFixed(2)), // Example: returns as a percentage
    rating: getRandomInteger(1, 5),
    volatility: parseFloat((Math.random() * 5).toFixed(2)),
    expenseRatio: parseFloat((Math.random() * 2).toFixed(2)),
    aum: getRandomNumber(100, 10000),
  };
};

// Function to generate multiple random fund objects
export const generateRandomFunds = (count: number): Fund[] => {
  const funds: Fund[] = [];
  for (let i = 0; i < count; i++) {
    funds.push(generateRandomFund(String(i + 1)));
  }
  return funds;
};

// Function to filter funds by category
export const filterFundsByCategory = (funds: Fund[], category: FundCategory): Fund[] => {
  return funds.filter(fund => fund.category === category);
};

// Recommendations
export const fetchRecommendations = (): Recommendation[] => {
  const recommendations: Recommendation[] = [
    {
      id: '1',
      type: 'buy',
      description: 'Increase exposure to mid-cap equity',
      reason: 'Current portfolio is underweight in mid-cap which has growth potential',
      isActioned: false,
    },
    {
      id: '2',
      type: 'rebalance',
      description: 'Rebalance fixed income allocation',
      reason: 'Interest rate changes have created opportunities in corporate bonds',
      isActioned: false,
    },
    {
      id: '3',
      type: 'sell',
      description: 'Reduce exposure to thematic funds',
      reason: 'Current allocation exceeds recommended portfolio percentage',
      isActioned: true,
    },
  ];
  
  return recommendations;
};

export const actOnRecommendation = (id: string): void => {
  console.log(`Action taken on recommendation: ${id}`);
  // In a real app, this would make an API call to implement the recommendation
};

// Investment data
export const fetchInvestments = (): InvestmentHistoryItem[] => {
  const investments: InvestmentHistoryItem[] = [
    {
      id: '1',
      fundName: 'ICICI Prudential Bluechip Fund',
      type: 'Equity',
      amount: 250000,
      units: 4826.25,
      currentValue: 289651.27,
      sipAmount: 5000,
      lastTransactionDate: new Date('2023-12-20'),
      returns: 15.86,
    },
    {
      id: '2',
      fundName: 'Axis Long Term Equity Fund',
      type: 'ELSS',
      amount: 180000,
      units: 2765.43,
      currentValue: 214532.19,
      sipAmount: 3000,
      lastTransactionDate: new Date('2023-12-15'),
      returns: 19.18,
    },
    {
      id: '3',
      fundName: 'SBI Corporate Bond Fund',
      type: 'Debt',
      amount: 300000,
      units: 9283.71,
      currentValue: 318293.45,
      sipAmount: 0,
      lastTransactionDate: new Date('2023-06-10'),
      returns: 6.09,
    },
    {
      id: '4',
      fundName: 'Kotak Emerging Equity Fund',
      type: 'Equity',
      amount: 125000,
      units: 1837.28,
      currentValue: 156984.63,
      sipAmount: 2500,
      lastTransactionDate: new Date('2023-12-18'),
      returns: 25.59,
    },
  ];
  
  return investments;
};

// Goals
export const fetchGoals = (): Goal[] => {
  const goals: Goal[] = [
    {
      id: '1',
      name: 'Child Education',
      targetAmount: 2000000,
      targetDate: new Date('2035-07-01'),
      currentAmount: 450000,
      monthlyContribution: 7500,
      linkedFunds: ['HDFC Index Fund', 'Axis Long Term Equity Fund'],
      progress: 22.5,
    },
    {
      id: '2',
      name: 'Retirement',
      targetAmount: 10000000,
      targetDate: new Date('2045-01-01'),
      currentAmount: 1200000,
      monthlyContribution: 15000,
      linkedFunds: ['SBI Corporate Bond Fund', 'ICICI Prudential Bluechip Fund', 'Kotak Emerging Equity Fund'],
      progress: 12,
    },
    {
      id: '3',
      name: 'Home Purchase',
      targetAmount: 5000000,
      targetDate: new Date('2028-10-01'),
      currentAmount: 1800000,
      monthlyContribution: 25000,
      linkedFunds: ['SBI Corporate Bond Fund', 'Kotak Emerging Equity Fund'],
      progress: 36,
    },
    {
      id: '4',
      name: 'Travel',
      targetAmount: 500000,
      targetDate: new Date('2026-05-01'),
      currentAmount: 120000,
      monthlyContribution: 8000,
      linkedFunds: ['HDFC Money Market Fund'],
      progress: 24,
    },
  ];
  
  return goals;
};

export const getGoalById = (id: string): Goal | undefined => {
  const goals = fetchGoals();
  return goals.find(goal => goal.id === id);
};

// Popular funds
export const fetchPopularFunds = (): Fund[] => {
  // Generate 5 random funds for popular funds
  const popularFunds: Fund[] = [];
    for (let i = 0; i < 5; i++) {
        popularFunds.push(generateRandomFund(String(i + 1)));
    }
  return popularFunds;
};

// Market insights
export const fetchMarketInsights = (): string[] => {
  const insights: string[] = [
    'RBI keeps repo rate unchanged at 6.5%',
    'Crude oil prices surge amid supply concerns',
    'US Fed signals potential rate cuts in 2024',
    'Indian economy expected to grow at 7% in FY25',
  ];
  return insights;
};
