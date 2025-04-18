
import { Fund } from '@/types';
import { fetchAmfiData } from './api/amfiAPI';
import { fetchFundReturns, fetchFundDetails } from './api/mfAPI';
import { sortFunds } from './utils/sortUtils';

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
    
    // Process a reasonable number of funds for better performance
    // You can increase this number for production use
    const maxFundsToProcess = Math.min(funds.length, 50);
    const fundsToProcess = funds.slice(0, maxFundsToProcess); 
    console.log(`Processing ${fundsToProcess.length} funds for returns data`);

    // Add returns data from MFAPI for each fund
    const fundsWithReturns = await Promise.allSettled(
      fundsToProcess.map(fund => fetchFundReturns(fund))
    );

    // Filter out rejected promises and take successful results
    const validFunds = fundsWithReturns
      .filter((result): result is PromiseFulfilledResult<Fund> => result.status === 'fulfilled')
      .map(result => result.value);

    console.log(`Successfully processed ${validFunds.length} funds with returns data`);

    // Apply filters
    let filteredFunds = validFunds;
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

export { fetchFundDetails };
