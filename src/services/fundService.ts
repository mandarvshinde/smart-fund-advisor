
import { Fund, FundDetails } from '@/types/fundTypes';
import axios from 'axios';

const AMFI_DATA_URL = 'https://www.amfiindia.com/spages/NAVAll.TXT';

// Cache for AMFI data
let cachedAmfiData: Fund[] | null = null;
let lastAmfiFetchTime = 0;

// Parse AMFI data into structured data
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
            oneYear: calculateReturnForCategory(category),
            threeYear: calculateReturnForCategory(category) + 2,
            fiveYear: calculateReturnForCategory(category) + 4
          },
          riskLevel: determineRiskLevel(category)
        });
      }
    }
  });

  return funds;
};

// Determine category based on scheme name
const determineFundCategory = (schemeName: string, schemeType: string): string => {
  const name = schemeName.toLowerCase();
  const type = schemeType.toLowerCase();

  if (name.includes('equity') || name.includes('growth')) return 'equity';
  if (name.includes('debt') || name.includes('income')) return 'debt';
  if (name.includes('hybrid') || name.includes('balanced')) return 'hybrid';
  if (name.includes('index') || name.includes('etf')) return 'index';
  if (name.includes('elss') || name.includes('tax')) return 'elss';
  return 'other';
};

// Generate random returns based on category (since we don't have real return data)
const calculateReturnForCategory = (category: string): number => {
  const baseReturn = Math.random() * 20 - 5; // Random between -5 and 15
  
  switch(category) {
    case 'equity': return baseReturn + 5;
    case 'debt': return baseReturn - 2;
    case 'hybrid': return baseReturn + 2;
    case 'index': return baseReturn + 3;
    case 'elss': return baseReturn + 6;
    default: return baseReturn;
  }
};

// Determine risk level based on category
const determineRiskLevel = (category: string): string => {
  switch(category) {
    case 'equity': return 'High';
    case 'debt': return 'Low';
    case 'hybrid': return 'Moderate';
    case 'index': return 'Moderate';
    case 'elss': return 'High';
    default: return 'Moderate';
  }
};

// Fetch AMFI data
const fetchAmfiData = async (): Promise<Fund[]> => {
  const now = Date.now();
  if (cachedAmfiData && now - lastAmfiFetchTime < 15 * 60 * 1000) {
    return cachedAmfiData; // Return cached data if less than 15 minutes
  }

  try {
    console.log('Fetching fresh AMFI data...');
    const response = await axios.get(AMFI_DATA_URL, { responseType: 'text' });
    cachedAmfiData = parseAmfiData(response.data);
    lastAmfiFetchTime = now;
    return cachedAmfiData;
  } catch (error) {
    console.error('Error fetching AMFI data:', error);
    return [];
  }
};

// Get list of all mutual funds
export const fetchFundsList = async (category: string, sortBy: string, fundHouse?: string): Promise<Fund[]> => {
  try {
    const funds = await fetchAmfiData();

    let filteredFunds = funds;
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

// Fetch details for a specific fund
export const fetchFundDetails = async (fundCode: string): Promise<FundDetails | null> => {
  try {
    const funds = await fetchAmfiData();
    const fund = funds.find(f => f.schemeCode === fundCode);
    
    if (!fund) {
      return null;
    }
    
    // Convert Fund to FundDetails by adding additional information
    return {
      ...fund,
      launchDate: generateRandomLaunchDate(),
      expenseRatio: (Math.random() * 2).toFixed(2) + '%',
      aum: (Math.random() * 10000).toFixed(2) + ' Cr',
      exitLoad: Math.random() > 0.5 ? 'NIL' : '1% if redeemed before 1 year',
      fundManager: generateRandomManagerName(),
      riskLevel: fund.riskLevel || determineRiskLevel(fund.category),
      benchmark: getBenchmarkForCategory(fund.category),
      holdings: [],
      sectorAllocation: []
    };
  } catch (error) {
    console.error('Error fetching fund details:', error);
    return null;
  }
};

// Helper function to generate random launch date
const generateRandomLaunchDate = (): string => {
  const year = 2000 + Math.floor(Math.random() * 20);
  const month = 1 + Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
};

// Helper function to generate random fund manager name
const generateRandomManagerName = (): string => {
  const firstNames = ['Rakesh', 'Sanjay', 'Priya', 'Aditya', 'Neha', 'Vikram', 'Anurag', 'Deepika'];
  const lastNames = ['Sharma', 'Patel', 'Gupta', 'Iyer', 'Singh', 'Reddy', 'Joshi', 'Kapoor'];
  
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
};

// Helper function to get benchmark based on category
const getBenchmarkForCategory = (category: string): string => {
  switch(category) {
    case 'equity': return 'NIFTY 50';
    case 'debt': return 'CRISIL Composite Bond Fund Index';
    case 'hybrid': return 'CRISIL Hybrid 35+65 - Aggressive Index';
    case 'index': return 'NIFTY 50';
    case 'elss': return 'NIFTY 500';
    default: return 'NIFTY 50';
  }
};
