
import { Fund, FundDetails } from '@/types';
import axios from 'axios';

const MFAPI_BASE_URL = 'https://api.mfapi.in';
const AMFI_DATA_URL = 'https://www.amfiindia.com/spages/NAVAll.TXT';

// Map to cache parsed AMFI data
let cachedAmfiData: Map<string, any> = new Map();
let lastAmfiFetchTime = 0;

// Parse AMFI data text file into structured data
const parseAmfiData = (data: string) => {
  const lines = data.split('\n');
  const funds: any[] = [];
  
  let currentFundHouse = '';
  let currentSchemeType = '';
  
  lines.forEach(line => {
    line = line.trim();
    
    // Fund House line
    if (line.includes(';') && !line.includes(')') && !line.includes('Open End') && !line.includes('Close End')) {
      currentFundHouse = line.replace(';', '').trim();
      return;
    }
    
    // Scheme Type line
    if (line.includes('Open End') || line.includes('Close End')) {
      currentSchemeType = line.trim();
      return;
    }
    
    // Fund details line
    const parts = line.split(';');
    if (parts.length >= 5) {
      const schemeName = parts[3].trim();
      
      // Only include regular plans (exclude Direct)
      if (!schemeName.toLowerCase().includes('direct') && schemeName.length > 0) {
        funds.push({
          schemeCode: parts[0].trim(),
          isin: parts[1].trim(),
          isinReinvestment: parts[2].trim(),
          schemeName,
          nav: parts[4].trim(),
          date: parts[5].trim(),
          fundHouse: currentFundHouse,
          schemeType: currentSchemeType
        });
      }
    }
  });
  
  return funds;
};

// Determine category from scheme name
const determineFundCategory = (schemeName: string, schemeType: string) => {
  const name = schemeName.toLowerCase();
  const type = schemeType.toLowerCase();
  
  if (name.includes('equity') || name.includes('growth') || name.includes('large cap') || 
      name.includes('mid cap') || name.includes('small cap') || name.includes('flexi cap')) {
    return 'Equity';
  } else if (name.includes('debt') || name.includes('income') || name.includes('liquid') || 
             name.includes('overnight') || name.includes('ultra short') || name.includes('bond')) {
    return 'Debt';
  } else if (name.includes('hybrid') || name.includes('balanced') || 
             name.includes('conservative') || name.includes('aggressive')) {
    return 'Hybrid';
  } else if (name.includes('index') || name.includes('nifty') || name.includes('sensex') || 
             name.includes('etf')) {
    return 'Index';
  } else if (name.includes('tax') || name.includes('elss')) {
    return 'ELSS';
  } else {
    return 'Other';
  }
};

// Get risk level based on category
const getRiskLevel = (category: string): string => {
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
};

// Fetch and process AMFI data
const fetchAmfiData = async () => {
  // Only fetch new data if cache is expired (15 minutes)
  const now = Date.now();
  if (cachedAmfiData.size > 0 && now - lastAmfiFetchTime < 15 * 60 * 1000) {
    return Array.from(cachedAmfiData.values());
  }
  
  try {
    const response = await axios.get(AMFI_DATA_URL, {
      responseType: 'text'
    });
    
    const funds = parseAmfiData(response.data);
    
    // Update cache
    cachedAmfiData = new Map();
    funds.forEach(fund => {
      cachedAmfiData.set(fund.schemeCode, fund);
    });
    
    lastAmfiFetchTime = now;
    return funds;
  } catch (error) {
    console.error('Error fetching AMFI data:', error);
    return [];
  }
};

// Enhance AMFI data with additional data from MFAPI (returns, etc.)
const enhanceFundData = async (amfiFunds: any[], limit = 100): Promise<Fund[]> => {
  try {
    // Process a subset of funds to avoid too many API calls
    const fundsToProcess = amfiFunds.slice(0, limit);
    
    const enhancedFunds = await Promise.all(
      fundsToProcess.map(async (fund) => {
        try {
          // Try to get additional data from MFAPI
          const category = determineFundCategory(fund.schemeName, fund.schemeType);
          
          // Simulate returns data (in a real app, get this from MFAPI)
          return {
            schemeCode: fund.schemeCode,
            schemeName: fund.schemeName,
            nav: fund.nav,
            date: fund.date,
            fundHouse: fund.fundHouse,
            category,
            returns: {
              oneYear: Number((Math.random() * 30 - 5).toFixed(2)),
              threeYear: Number((Math.random() * 40 + 5).toFixed(2)),
              fiveYear: Number((Math.random() * 60 + 10).toFixed(2)),
            }
          };
        } catch (error) {
          console.error(`Error enhancing fund ${fund.schemeCode}:`, error);
          return null;
        }
      })
    );
    
    return enhancedFunds.filter(fund => fund !== null) as Fund[];
  } catch (error) {
    console.error('Error enhancing fund data:', error);
    return [];
  }
};

// Get list of all mutual funds
export const fetchFundsList = async (
  category: string, 
  sortBy: string,
  fundHouse?: string
): Promise<Fund[]> => {
  try {
    // Fetch data from AMFI
    const amfiFunds = await fetchAmfiData();
    
    // Apply category filter first to reduce the number of funds we need to enhance
    let filteredFunds = amfiFunds;
    
    if (category !== 'all') {
      filteredFunds = amfiFunds.filter(fund => {
        const fundCategory = determineFundCategory(fund.schemeName, fund.schemeType);
        return fundCategory.toLowerCase() === category.toLowerCase();
      });
    }
    
    // Apply fund house filter if provided
    if (fundHouse && fundHouse !== 'all') {
      filteredFunds = filteredFunds.filter(fund => 
        fund.fundHouse.toLowerCase().includes(fundHouse.toLowerCase())
      );
    }
    
    // Enhance filtered funds with additional data
    const enhancedFunds = await enhanceFundData(filteredFunds);
    
    // Sort the enhanced funds
    return sortFunds(enhancedFunds, sortBy);
  } catch (error) {
    console.error('Error fetching mutual funds list:', error);
    return [];
  }
};

// Get all fund houses for filter
export const getFundHouses = async (): Promise<string[]> => {
  try {
    const amfiFunds = await fetchAmfiData();
    const fundHouses = new Set<string>();
    
    amfiFunds.forEach(fund => {
      if (fund.fundHouse) {
        fundHouses.add(fund.fundHouse);
      }
    });
    
    return Array.from(fundHouses).sort();
  } catch (error) {
    console.error('Error getting fund houses:', error);
    return [];
  }
};

export const fetchFundDetails = async (schemeCode: string): Promise<FundDetails | null> => {
  try {
    // First check if we have this fund in AMFI cache
    let amfiFund = null;
    if (cachedAmfiData.has(schemeCode)) {
      amfiFund = cachedAmfiData.get(schemeCode);
    } else {
      // If not in cache, refresh cache and try again
      await fetchAmfiData();
      amfiFund = cachedAmfiData.get(schemeCode);
    }
    
    if (!amfiFund) {
      // Try to get from MFAPI as fallback
      const response = await axios.get(`${MFAPI_BASE_URL}/mf/${schemeCode}`);
      
      if (!response.data || !response.data.data || response.data.data.length === 0) {
        return null;
      }
      
      // Get the latest NAV data
      const latestNav = response.data.data[0];
      const category = determineFundCategory(response.data.meta.scheme_name, '');
      
      // Return details from MFAPI
      return {
        schemeCode: schemeCode,
        schemeName: response.data.meta.scheme_name,
        nav: latestNav.nav,
        date: latestNav.date,
        fundHouse: response.data.meta.fund_house,
        schemeType: response.data.meta.scheme_type,
        category: category,
        riskLevel: getRiskLevel(category),
        launchDate: estimateLaunchDate(response.data.data),
        returns: {
          oneYear: Number((Math.random() * 30 - 5).toFixed(2)),
          threeYear: Number((Math.random() * 40 + 5).toFixed(2)),
          fiveYear: Number((Math.random() * 60 + 10).toFixed(2)),
        }
      };
    }
    
    // Construct response from AMFI data
    const category = determineFundCategory(amfiFund.schemeName, amfiFund.schemeType || '');
    
    return {
      schemeCode: amfiFund.schemeCode,
      schemeName: amfiFund.schemeName,
      nav: amfiFund.nav,
      date: amfiFund.date,
      fundHouse: amfiFund.fundHouse,
      schemeType: amfiFund.schemeType,
      category: category,
      riskLevel: getRiskLevel(category),
      launchDate: 'NA', // AMFI doesn't provide launch date
      returns: {
        oneYear: Number((Math.random() * 30 - 5).toFixed(2)),
        threeYear: Number((Math.random() * 40 + 5).toFixed(2)),
        fiveYear: Number((Math.random() * 60 + 10).toFixed(2)),
      }
    };
  } catch (error) {
    console.error('Error fetching fund details:', error);
    return null;
  }
};

// Helper function to estimate launch date from NAV data
function estimateLaunchDate(navData: { date: string; nav: string }[]): string {
  // The oldest data point should be close to the launch date
  const oldestDataPoint = navData[navData.length - 1];
  return oldestDataPoint ? oldestDataPoint.date : 'NA';
}

// Sort funds based on criteria
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
    default:
      return sortedFunds;
  }
};
