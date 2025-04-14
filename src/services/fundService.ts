
import { Fund, FundDetails } from '@/types';
import { fetchMutualFunds } from '@/services/mockData';

// In a real app, we would fetch this data from mfapi.com
// For demo purposes, we're using mock data and simulating API calls

export const fetchFundsList = async (category: string, sortBy: string): Promise<Fund[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get funds from mockData
  const mockFunds = fetchMutualFunds();
  
  // Filter by category if needed
  let filteredFunds = [...mockFunds];
  if (category !== 'all') {
    filteredFunds = mockFunds.filter(fund => fund.category?.toLowerCase() === category);
  }
  
  // Sort the data based on sortBy parameter
  return sortFunds(filteredFunds, sortBy);
};

export const fetchFundDetails = async (schemeCode: string): Promise<FundDetails | null> => {
  // Simulate API call to mfapi.com/mf/{schemeCode}
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Find the fund in our mock data
  const mockFunds = fetchMutualFunds();
  const fund = mockFunds.find(f => f.schemeCode === schemeCode);
  
  if (!fund) return null;
  
  // Return enhanced details (in a real app, this would come from the API)
  return {
    ...fund,
    riskLevel: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
    expenseRatio: (Math.random() * 2 + 0.5).toFixed(2),
    aum: `₹${(Math.random() * 20000 + 1000).toFixed(2)} Cr`,
    launchDate: '12-06-2010',
    fundManager: 'Experienced Fund Manager',
    exitLoad: '1% if redeemed within 1 year',
    returns: fund.returns || {
      oneYear: (Math.random() * 30 - 5),
      threeYear: (Math.random() * 40 + 5),
      fiveYear: (Math.random() * 60 + 10),
    },
    sectorAllocation: [
      { sector: 'Financial Services', allocation: 32.5 },
      { sector: 'Technology', allocation: 18.7 },
      { sector: 'Consumer Goods', allocation: 12.3 },
      { sector: 'Automobile', allocation: 9.8 },
      { sector: 'Healthcare', allocation: 8.4 },
    ],
    portfolioHoldings: [
      { company: 'HDFC Bank Ltd', allocation: 8.7 },
      { company: 'ICICI Bank Ltd', allocation: 7.2 },
      { company: 'Reliance Industries Ltd', allocation: 6.5 },
      { company: 'Infosys Ltd', allocation: 5.8 },
      { company: 'TCS Ltd', allocation: 4.9 },
    ]
  };
};

const sortFunds = (funds: Fund[], sortBy: string): Fund[] => {
  const sortedFunds = [...funds];
  
  switch (sortBy) {
    case 'returns':
      return sortedFunds.sort((a, b) => (b.returns?.oneYear || 0) - (a.returns?.oneYear || 0));
    case 'returns-asc':
      return sortedFunds.sort((a, b) => (a.returns?.oneYear || 0) - (b.returns?.oneYear || 0));
    case 'nav':
      return sortedFunds.sort((a, b) => parseFloat(b.nav) - parseFloat(a.nav));
    case 'nav-asc':
      return sortedFunds.sort((a, b) => parseFloat(a.nav) - parseFloat(b.nav));
    case 'alpha':
      return sortedFunds.sort((a, b) => a.schemeName.localeCompare(b.schemeName));
    default:
      return sortedFunds;
  }
};
