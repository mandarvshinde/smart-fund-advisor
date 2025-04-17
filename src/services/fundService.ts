
import { Fund, FundDetails } from '@/types/fundTypes';
import axios from 'axios';

const AMFI_DATA_URL = 'https://www.amfiindia.com/spages/NAVAll.TXT';

// Fallback data in case API is down
const FALLBACK_FUNDS: Fund[] = [
  {
    schemeCode: '119551',
    schemeName: 'Axis Bluechip Fund - Growth',
    nav: '45.87',
    date: new Date().toLocaleDateString('en-IN'),
    fundHouse: 'Axis Mutual Fund',
    category: 'equity',
    returns: {
      oneYear: 12.5,
      threeYear: 15.8,
      fiveYear: 18.2
    }
  },
  {
    schemeCode: '120505',
    schemeName: 'HDFC Balanced Advantage Fund - Regular Plan - Growth',
    nav: '268.75',
    date: new Date().toLocaleDateString('en-IN'),
    fundHouse: 'HDFC Mutual Fund',
    category: 'hybrid',
    returns: {
      oneYear: 8.3,
      threeYear: 12.7,
      fiveYear: 14.1
    }
  },
  {
    schemeCode: '118759',
    schemeName: 'SBI Liquid Fund - Regular Plan - Growth',
    nav: '3342.05',
    date: new Date().toLocaleDateString('en-IN'),
    fundHouse: 'SBI Mutual Fund',
    category: 'debt',
    returns: {
      oneYear: 5.2,
      threeYear: 6.8,
      fiveYear: 7.3
    }
  }
];

// Cache for AMFI data
let cachedAmfiData: Map<string, any> = new Map();
let lastAmfiFetchTime = 0;
let parsedFunds: Fund[] = [];

// Parse AMFI data text file into structured data
const parseAmfiData = (data: string): Fund[] => {
  const lines = data.split('\n');
  const funds: Fund[] = [];
  
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
        const schemeCode = parts[0].trim();
        const nav = parts[4].trim();
        const date = parts[5]?.trim() || new Date().toLocaleDateString('en-IN');
        
        // Determine category
        const category = determineFundCategory(schemeName, currentSchemeType);
        
        funds.push({
          schemeCode,
          schemeName,
          nav,
          date,
          fundHouse: currentFundHouse,
          category,
          returns: {
            oneYear: getEstimatedReturn(category, 'oneYear'),
            threeYear: getEstimatedReturn(category, 'threeYear'),
            fiveYear: getEstimatedReturn(category, 'fiveYear')
          }
        });
      }
    }
  });
  
  return funds;
};

// Determine category from scheme name and type
const determineFundCategory = (schemeName: string, schemeType: string): string => {
  const name = schemeName.toLowerCase();
  const type = schemeType.toLowerCase();
  
  if (name.includes('equity') || name.includes('growth') || 
      name.includes('large cap') || name.includes('mid cap') || 
      name.includes('small cap') || name.includes('flexi cap')) {
    return 'equity';
  } else if (name.includes('debt') || name.includes('income') || 
             name.includes('liquid') || name.includes('overnight') || 
             name.includes('ultra short') || name.includes('bond')) {
    return 'debt';
  } else if (name.includes('hybrid') || name.includes('balanced') || 
             name.includes('conservative') || name.includes('aggressive')) {
    return 'hybrid';
  } else if (name.includes('index') || name.includes('nifty') || 
             name.includes('sensex') || name.includes('etf')) {
    return 'index';
  } else if (name.includes('tax') || name.includes('elss')) {
    return 'elss';
  } else {
    return 'other';
  }
};

// Get estimated returns based on fund category and time period
const getEstimatedReturn = (category: string, period: 'oneYear' | 'threeYear' | 'fiveYear'): number => {
  const baseReturns: Record<string, Record<string, number>> = {
    equity: { oneYear: 10, threeYear: 12, fiveYear: 14 },
    debt: { oneYear: 5, threeYear: 6, fiveYear: 7 },
    hybrid: { oneYear: 8, threeYear: 10, fiveYear: 12 },
    index: { oneYear: 9, threeYear: 11, fiveYear: 13 },
    elss: { oneYear: 11, threeYear: 13, fiveYear: 15 },
    other: { oneYear: 7, threeYear: 9, fiveYear: 11 }
  };
  
  // Add small random fluctuation
  const baseReturn = baseReturns[category]?.[period] || 8;
  const fluctuation = Math.random() * 4 - 2; // Random number between -2 and 2
  return parseFloat((baseReturn + fluctuation).toFixed(2));
};

// Fetch and process AMFI data
const fetchAmfiData = async (): Promise<Fund[]> => {
  try {
    // Only fetch new data if cache is expired (15 minutes)
    const now = Date.now();
    if (parsedFunds.length > 0 && now - lastAmfiFetchTime < 15 * 60 * 1000) {
      return parsedFunds;
    }
    
    console.log('Fetching fresh AMFI data...');
    const response = await axios.get(AMFI_DATA_URL, {
      responseType: 'text'
    });
    
    // Parse the data
    parsedFunds = parseAmfiData(response.data);
    
    // Update cache
    cachedAmfiData = new Map();
    parsedFunds.forEach(fund => {
      cachedAmfiData.set(fund.schemeCode, fund);
    });
    
    lastAmfiFetchTime = now;
    console.log(`Parsed ${parsedFunds.length} mutual funds from AMFI data`);
    return parsedFunds;
  } catch (error) {
    console.error('Error fetching AMFI data:', error);
    // Return fallback data if there's an error
    console.warn('Returning fallback fund data due to API error');
    return FALLBACK_FUNDS;
  }
};

// Get list of all mutual funds
export const fetchFundsList = async (
  category: string,
  sortBy: string,
  fundHouse?: string
): Promise<Fund[]> => {
  try {
    const funds = await fetchAmfiData();
    
    // Apply filters
    let filteredFunds = funds;
    
    if (category && category !== 'all') {
      filteredFunds = filteredFunds.filter(fund => fund.category === category.toLowerCase());
    }
    
    if (fundHouse && fundHouse !== 'all') {
      filteredFunds = filteredFunds.filter(fund => 
        fund.fundHouse.toLowerCase().includes(fundHouse.toLowerCase())
      );
    }
    
    // Sort the filtered funds
    return sortFunds(filteredFunds, sortBy);
  } catch (error) {
    console.error('Error fetching mutual funds list:', error);
    return FALLBACK_FUNDS;
  }
};

// Get all fund houses for filter
export const getFundHouses = async (): Promise<string[]> => {
  try {
    const funds = await fetchAmfiData();
    const fundHouses = new Set<string>();
    
    funds.forEach(fund => {
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
    await fetchAmfiData(); // Ensure data is loaded
    
    const fund = cachedAmfiData.get(schemeCode);
    
    if (!fund) {
      console.error(`Fund with scheme code ${schemeCode} not found in cache`);
      return null;
    }
    
    // Get risk level based on category
    const getRiskLevel = (category: string): string => {
      switch (category) {
        case 'equity':
          return 'High';
        case 'hybrid':
          return 'Moderate';
        case 'debt':
          return 'Low';
        case 'elss':
          return 'High';
        case 'index':
          return 'Moderate to High';
        default:
          return 'Moderate';
      }
    };
    
    // Create historical NAV data for demo
    const createHistoricalNavData = () => {
      const data = [];
      const currentNav = parseFloat(fund.nav);
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      
      // Generate monthly data points for the past year
      for (let i = 0; i <= 12; i++) {
        const date = new Date(startDate);
        date.setMonth(date.getMonth() + i);
        
        // Fluctuate NAV based on category volatility
        const volatility = fund.category === 'equity' ? 0.05 : 
                          fund.category === 'debt' ? 0.01 : 0.03;
        
        // Create a somewhat realistic upward trend with fluctuations
        const change = (i / 12) * ((fund.returns.oneYear || 0) / 100) + 
                      (Math.random() * 2 - 1) * volatility;
                      
        const navValue = currentNav / (1 + ((fund.returns.oneYear || 0) / 100)) * (1 + change);
        
        data.push({
          date: date.toISOString().split('T')[0],
          nav: parseFloat(navValue.toFixed(2))
        });
      }
      
      return data;
    };
    
    return {
      schemeCode: fund.schemeCode,
      schemeName: fund.schemeName,
      nav: fund.nav,
      date: fund.date,
      fundHouse: fund.fundHouse,
      category: fund.category,
      riskLevel: getRiskLevel(fund.category),
      returns: fund.returns,
      launchDate: '01-01-2015', // Mock date
      schemeType: fund.category.charAt(0).toUpperCase() + fund.category.slice(1),
      navHistory: createHistoricalNavData()
    };
  } catch (error) {
    console.error('Error fetching fund details:', error);
    return null;
  }
};

// Sort funds based on criteria
const sortFunds = (funds: Fund[], sortBy: string): Fund[] => {
  const sortedFunds = [...funds];
  
  switch (sortBy) {
    case 'returns':
      return sortedFunds.sort((a, b) => ((b.returns?.oneYear || 0) - (a.returns?.oneYear || 0)));
    case 'returns-asc':
      return sortedFunds.sort((a, b) => ((a.returns?.oneYear || 0) - (b.returns?.oneYear || 0)));
    case 'nav':
      return sortedFunds.sort((a, b) => parseFloat(b.nav) - parseFloat(a.nav));
    case 'nav-asc':
      return sortedFunds.sort((a, b) => parseFloat(a.nav) - parseFloat(b.nav));
    default:
      return sortedFunds;
  }
};
