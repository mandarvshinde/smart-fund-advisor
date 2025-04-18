
import { Fund } from '@/types';
import { fetchAmfiData } from './api/amfiAPI';
import { fetchFundReturns, fetchFundDetails } from './api/mfAPI';
import { sortFunds } from './utils/sortUtils';

// Get list of all mutual funds
export const fetchFundsList = async (category: string, sortBy: string, fundHouse?: string): Promise<Fund[]> => {
  try {
    const funds = await fetchAmfiData();
    
    if (funds.length === 0) {
      console.warn('No funds data available from AMFI');
      return [];
    }

    // Add returns data from MFAPI for each fund
    const fundsWithReturns = await Promise.all(
      funds.slice(0, 100).map(fund => fetchFundReturns(fund))
    );

    let filteredFunds = fundsWithReturns;
    if (category && category !== 'all') {
      filteredFunds = filteredFunds.filter(fund => fund.category === category.toLowerCase());
    }

    if (fundHouse && fundHouse !== 'all') {
      filteredFunds = filteredFunds.filter(fund => fund.fundHouse.toLowerCase().includes(fundHouse.toLowerCase()));
    }

    return sortFunds(filteredFunds, sortBy);
  } catch (error) {
    console.error('Error fetching mutual funds list:', error);
    return [];
  }
};

// Get list of all fund houses
export const getFundHouses = async (): Promise<string[]> => {
  const funds = await fetchAmfiData();
  const fundHousesSet = new Set<string>();
  
  funds.forEach(fund => {
    if (fund.fundHouse) {
      fundHousesSet.add(fund.fundHouse);
    }
  });
  
  return Array.from(fundHousesSet).sort();
};

export { fetchFundDetails };

