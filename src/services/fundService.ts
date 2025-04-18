import { fetchAmfiData } from './api/amfiAPI';
import { sortFunds } from './utils/sortUtils';
import { Fund } from '@/types';

// Get list of all mutual funds
export const fetchFundsList = async (category: string, sortBy: string, fundHouse?: string): Promise<Fund[]> => {
  try {
    console.log('Fetching funds with filters:', { category, sortBy, fundHouse });
    const funds = await fetchAmfiData();

    if (funds.length === 0) {
      console.warn('No funds data available from AMFI');
      return [];
    }

    console.log(`Got ${funds.length} funds from AMFI`);

    // Apply filters
    let filteredFunds = funds;
    if (category && category !== 'all') {
      filteredFunds = filteredFunds.filter(fund =>
        fund.category === category.toLowerCase() ||
        (fund.category?.includes(category.toLowerCase()))
      );
      console.log(`Filtered by category '${category}': ${filteredFunds.length} funds remaining`);
    }

    if (fundHouse && fundHouse !== 'all') {
      filteredFunds = filteredFunds.filter(fund =>
        fund.fundHouse && fund.fundHouse.toLowerCase().includes(fundHouse.toLowerCase())
      );
      console.log(`Filtered by fund house '${fundHouse}': ${filteredFunds.length} funds remaining`);
    }

    // Sort the filtered funds
    const sortedFunds = sortFunds(filteredFunds, sortBy);
    console.log(`Returning ${sortedFunds.length} sorted funds`);

    return sortedFunds;
  } catch (error) {
    console.error('Error fetching mutual funds list:', error);
    return [];
  }
};

// Get list of all fund houses
export const getFundHouses = async (): Promise<string[]> => {
  try {
    const funds = await fetchAmfiData();
    const fundHousesSet = new Set<string>();

    funds.forEach(fund => {
      if (fund.fundHouse) {
        fundHousesSet.add(fund.fundHouse);
      }
    });

    return Array.from(fundHousesSet).sort();
  } catch (error) {
    console.error('Error fetching fund houses:', error);
    return [];
  }
};