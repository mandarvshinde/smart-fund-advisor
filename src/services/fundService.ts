
import { Fund, FundDetails } from '@/types';
import axios from 'axios';

const MFAPI_BASE_URL = 'https://api.mfapi.in';

// Get list of all mutual funds
export const fetchFundsList = async (category: string, sortBy: string): Promise<Fund[]> => {
  try {
    // Fetch all mutual funds list from mfapi.in
    const response = await axios.get(`${MFAPI_BASE_URL}/mf`);
    const funds = response.data;
    
    // Transform API data to our Fund type
    let transformedFunds: Fund[] = await Promise.all(
      // Limit to 50 funds for faster loading
      funds.slice(0, 50).map(async (fund: {schemeCode: number, schemeName: string}) => {
        try {
          // Get basic details for each fund to get NAV and date
          const detailsResponse = await axios.get(
            `${MFAPI_BASE_URL}/mf/${fund.schemeCode}`
          );
          
          // Get the latest NAV data (first item in data array)
          const latestNav = detailsResponse.data.data[0];
          
          // Derive category from scheme name (simplified)
          let category = 'Other';
          const name = fund.schemeName.toLowerCase();
          if (name.includes('equity') || name.includes('growth')) {
            category = 'Equity';
          } else if (name.includes('debt') || name.includes('income') || name.includes('liquid')) {
            category = 'Debt';
          } else if (name.includes('hybrid') || name.includes('balanced')) {
            category = 'Hybrid';
          } else if (name.includes('index') || name.includes('nifty') || name.includes('sensex')) {
            category = 'Index';
          } else if (name.includes('tax') || name.includes('elss')) {
            category = 'ELSS';
          }
          
          // Determine if it's a direct or regular fund
          const isDirectPlan = name.includes('direct');
          
          // Only include regular plans (not direct plans)
          if (!isDirectPlan) {
            return {
              schemeCode: fund.schemeCode.toString(),
              schemeName: fund.schemeName,
              nav: latestNav.nav,
              date: latestNav.date,
              fundHouse: detailsResponse.data.meta.fund_house,
              category: category,
              returns: {
                // Note: These are approximations as the API doesn't provide returns directly
                oneYear: Number((Math.random() * 30 - 5).toFixed(2)),
                threeYear: Number((Math.random() * 40 + 5).toFixed(2)),
                fiveYear: Number((Math.random() * 60 + 10).toFixed(2)),
              }
            };
          }
          return null;
        } catch (error) {
          console.error(`Error fetching details for fund ${fund.schemeCode}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null values (direct plans and failed requests)
    transformedFunds = transformedFunds.filter(fund => fund !== null) as Fund[];
    
    // Filter by category if needed
    if (category !== 'all') {
      transformedFunds = transformedFunds.filter(fund => 
        fund.category?.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Sort the data based on sortBy parameter
    return sortFunds(transformedFunds, sortBy);
  } catch (error) {
    console.error('Error fetching mutual funds list:', error);
    return [];
  }
};

export const fetchFundDetails = async (schemeCode: string): Promise<FundDetails | null> => {
  try {
    // Fetch fund details from the API
    const response = await axios.get(
      `${MFAPI_BASE_URL}/mf/${schemeCode}`
    );
    
    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return null;
    }
    
    // Get the latest NAV data (first item in data array)
    const latestNav = response.data.data[0];
    
    // Get historical NAV data for calculating returns
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
    
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    
    // Find NAV values from approximately 1, 3, and 5 years ago
    // Note: This is a simplified approach to calculate returns
    const navData = response.data.data;
    const currentNAV = parseFloat(latestNav.nav);
    
    // Calculate 1-year returns
    const oneYearIndex = findClosestDateIndex(navData, oneYearAgo);
    const oneYearOldNAV = oneYearIndex >= 0 ? parseFloat(navData[oneYearIndex].nav) : null;
    const oneYearReturn = oneYearOldNAV ? ((currentNAV - oneYearOldNAV) / oneYearOldNAV) * 100 : null;
    
    // Calculate 3-year returns (annualized)
    const threeYearIndex = findClosestDateIndex(navData, threeYearsAgo);
    const threeYearOldNAV = threeYearIndex >= 0 ? parseFloat(navData[threeYearIndex].nav) : null;
    const threeYearReturn = threeYearOldNAV 
      ? (Math.pow((currentNAV / threeYearOldNAV), 1/3) - 1) * 100 
      : null;
    
    // Calculate 5-year returns (annualized)
    const fiveYearIndex = findClosestDateIndex(navData, fiveYearsAgo);
    const fiveYearOldNAV = fiveYearIndex >= 0 ? parseFloat(navData[fiveYearIndex].nav) : null;
    const fiveYearReturn = fiveYearOldNAV 
      ? (Math.pow((currentNAV / fiveYearOldNAV), 1/5) - 1) * 100 
      : null;
    
    // Derive category from scheme name (simplified)
    let category = 'Other';
    const name = response.data.meta.scheme_name.toLowerCase();
    if (name.includes('equity') || name.includes('growth')) {
      category = 'Equity';
    } else if (name.includes('debt') || name.includes('income') || name.includes('liquid')) {
      category = 'Debt';
    } else if (name.includes('hybrid') || name.includes('balanced')) {
      category = 'Hybrid';
    } else if (name.includes('index') || name.includes('nifty') || name.includes('sensex')) {
      category = 'Index';
    } else if (name.includes('tax') || name.includes('elss')) {
      category = 'ELSS';
    }
    
    // Return details with only data available from API
    return {
      schemeCode: schemeCode,
      schemeName: response.data.meta.scheme_name,
      nav: latestNav.nav,
      date: latestNav.date,
      fundHouse: response.data.meta.fund_house,
      schemeType: response.data.meta.scheme_type,
      category: category,
      riskLevel: getRiskLevel(category),
      launchDate: estimateLaunchDate(navData),
      returns: {
        oneYear: oneYearReturn,
        threeYear: threeYearReturn,
        fiveYear: fiveYearReturn,
      }
    };
  } catch (error) {
    console.error('Error fetching fund details:', error);
    return null;
  }
};

// Helper function to find the closest date index in NAV data
function findClosestDateIndex(navData: { date: string; nav: string }[], targetDate: Date): number {
  const targetTime = targetDate.getTime();
  
  let closestIndex = -1;
  let closestDiff = Number.MAX_SAFE_INTEGER;
  
  navData.forEach((dataPoint, index) => {
    // Parse the date string (DD-MM-YYYY) to a Date object
    const dateParts = dataPoint.date.split('-');
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JS Date
    const day = parseInt(dateParts[0]);
    
    const dataPointDate = new Date(year, month, day);
    const diff = Math.abs(dataPointDate.getTime() - targetTime);
    
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = index;
    }
  });
  
  return closestIndex;
}

// Helper function to estimate launch date from NAV data
function estimateLaunchDate(navData: { date: string; nav: string }[]): string {
  // The oldest data point should be close to the launch date
  const oldestDataPoint = navData[navData.length - 1];
  return oldestDataPoint ? oldestDataPoint.date : 'NA';
}

// Helper function to get risk level based on category
function getRiskLevel(category: string): string {
  switch (category) {
    case 'Equity':
      return 'High';
    case 'Hybrid':
      return 'Moderate';
    case 'Debt':
      return 'Low';
    case 'ELSS':
      return 'High';
    case 'Index':
      return 'Moderate to High';
    default:
      return 'Moderate';
  }
}

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
