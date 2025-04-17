
import { Fund, FundDetails } from '@/types/fundTypes';
import axios from 'axios';

const AMFI_DATA_URL = 'https://www.amfiindia.com/spages/NAVAll.TXT';

// Map to cache parsed AMFI data
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
        
        // Generate random returns for demo
        const oneYearReturn = generateRandomReturn(category);
        
        funds.push({
          schemeCode,
          schemeName,
          nav,
          date,
          fundHouse: currentFundHouse,
          category,
          returns: {
            oneYear: oneYearReturn,
            threeYear: oneYearReturn + Math.random() * 5,
            fiveYear: oneYearReturn + Math.random() * 10
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

// Generate random returns based on fund category
const generateRandomReturn = (category: string): number => {
  switch (category) {
    case 'equity':
      return parseFloat((8 + Math.random() * 12).toFixed(2));
    case 'debt':
      return parseFloat((4 + Math.random() * 6).toFixed(2));
    case 'hybrid':
      return parseFloat((6 + Math.random() * 8).toFixed(2));
    case 'index':
      return parseFloat((7 + Math.random() * 10).toFixed(2));
    case 'elss':
      return parseFloat((9 + Math.random() * 11).toFixed(2));
    default:
      return parseFloat((5 + Math.random() * 10).toFixed(2));
  }
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
    // Return empty array if there's an error
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
    return [];
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
        const change = (i / 12) * (fund.returns.oneYear / 100) + 
                      (Math.random() * 2 - 1) * volatility;
                      
        const navValue = currentNav / (1 + (fund.returns.oneYear / 100)) * (1 + change);
        
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
      expenseRatio: (0.5 + Math.random() * 1.5).toFixed(2) + '%',
      aum: `₹${(Math.random() * 10000 + 1000).toFixed(2)} Cr`,
      exitLoad: fund.category === 'debt' ? 'Nil' : '1% if redeemed within 1 year',
      minInvestment: '₹' + (fund.category === 'debt' ? '5,000' : '1,000'),
      navHistory: createHistoricalNavData(),
      schemeType: fund.category.charAt(0).toUpperCase() + fund.category.slice(1)
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
