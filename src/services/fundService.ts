
import { Fund, FundDetails } from '@/types/fundTypes';
import axios from 'axios';

const AMFI_DATA_URL = 'https://www.amfiindia.com/spages/NAVAll.TXT';
const MFAPI_BASE_URL = 'https://api.mfapi.in/mf/';

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
        const date = parts[5]?.trim() || '';

        // Determine category
        const category = determineFundCategory(schemeName, currentSchemeType);

        funds.push({
          schemeCode,
          schemeName,
          nav,
          date,
          fundHouse: currentFundHouse,
          category,
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
    // Return empty array if API fetch fails - no mock data fallback
    return [];
  }
};

// Get list of all mutual funds
export const fetchFundsList = async (category: string, sortBy: string, fundHouse?: string): Promise<Fund[]> => {
  try {
    const funds = await fetchAmfiData();
    
    if (funds.length === 0) {
      console.warn('No funds data available from AMFI');
      return [];
    }

    // Add returns data from MFAPI for each fund
    const fundsWithReturns = await addReturnDataToFunds(funds);

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

// Add real returns data to funds using MFAPI
const addReturnDataToFunds = async (funds: Fund[]): Promise<Fund[]> => {
  // Limit to processing max 100 funds to avoid rate limiting
  const fundsToProcess = funds.slice(0, 100);
  
  const fundsWithReturns = await Promise.all(
    fundsToProcess.map(async (fund) => {
      try {
        const response = await axios.get(`${MFAPI_BASE_URL}${fund.schemeCode}`);
        if (response.data && response.data.data) {
          const navHistory = response.data.data;
          if (navHistory.length > 0) {
            // Calculate returns
            const currentNav = parseFloat(navHistory[0].nav);
            const oneYearIndex = navHistory.findIndex(item => 
              new Date(item.date).getTime() <= Date.now() - 365 * 24 * 60 * 60 * 1000
            );
            const threeYearIndex = navHistory.findIndex(item => 
              new Date(item.date).getTime() <= Date.now() - 3 * 365 * 24 * 60 * 60 * 1000
            );
            const fiveYearIndex = navHistory.findIndex(item => 
              new Date(item.date).getTime() <= Date.now() - 5 * 365 * 24 * 60 * 60 * 1000
            );
            
            const returns = {
              oneYear: oneYearIndex !== -1 ? (currentNav / parseFloat(navHistory[oneYearIndex].nav) - 1) * 100 : undefined,
              threeYear: threeYearIndex !== -1 ? (Math.pow(currentNav / parseFloat(navHistory[threeYearIndex].nav), 1/3) - 1) * 100 : undefined,
              fiveYear: fiveYearIndex !== -1 ? (Math.pow(currentNav / parseFloat(navHistory[fiveYearIndex].nav), 1/5) - 1) * 100 : undefined
            };
            
            return { ...fund, returns };
          }
        }
        return fund;
      } catch (error) {
        console.error(`Error fetching returns data for fund ${fund.schemeCode}:`, error);
        return fund;
      }
    })
  );
  
  return fundsWithReturns;
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
    // Get basic fund info from AMFI data
    const funds = await fetchAmfiData();
    const fund = funds.find(f => f.schemeCode === fundCode);
    
    if (!fund) {
      return null;
    }
    
    // Fetch detailed info from MFAPI
    const response = await axios.get(`${MFAPI_BASE_URL}${fundCode}`);
    if (!response.data || !response.data.meta) {
      return null;
    }
    
    const mfapiData = response.data;
    const navHistory = mfapiData.data?.map((item: any) => ({
      date: item.date,
      nav: parseFloat(item.nav)
    })) || [];
    
    // Calculate returns if we have nav history
    let returns = fund.returns;
    if (navHistory.length > 0 && !returns) {
      const currentNav = navHistory[0].nav;
      const oneYearIndex = navHistory.findIndex((item: any) => 
        new Date(item.date).getTime() <= Date.now() - 365 * 24 * 60 * 60 * 1000
      );
      const threeYearIndex = navHistory.findIndex((item: any) => 
        new Date(item.date).getTime() <= Date.now() - 3 * 365 * 24 * 60 * 60 * 1000
      );
      const fiveYearIndex = navHistory.findIndex((item: any) => 
        new Date(item.date).getTime() <= Date.now() - 5 * 365 * 24 * 60 * 60 * 1000
      );
      
      returns = {
        oneYear: oneYearIndex !== -1 ? (currentNav / navHistory[oneYearIndex].nav - 1) * 100 : undefined,
        threeYear: threeYearIndex !== -1 ? (Math.pow(currentNav / navHistory[threeYearIndex].nav, 1/3) - 1) * 100 : undefined,
        fiveYear: fiveYearIndex !== -1 ? (Math.pow(currentNav / navHistory[fiveYearIndex].nav, 1/5) - 1) * 100 : undefined
      };
    }
    
    // Construct FundDetails
    const fundDetails: FundDetails = {
      ...fund,
      returns,
      navHistory: navHistory.slice(0, 365), // Limit to 1 year of history
      launchDate: mfapiData.meta?.scheme_launch_date || 'N/A',
      schemeType: mfapiData.meta?.scheme_type || fund.category?.charAt(0).toUpperCase() + fund.category?.slice(1) || 'N/A',
      expenseRatio: mfapiData.meta?.scheme_expense_ratio || 'N/A',
      aum: mfapiData.meta?.scheme_aum || 'N/A',
      exitLoad: mfapiData.meta?.scheme_load || 'N/A',
      fundManager: mfapiData.meta?.fund_manager || 'N/A',
      benchmark: mfapiData.meta?.scheme_benchmark || getBenchmarkForCategory(fund.category || 'equity'),
      holdings: [],
      sectorAllocation: []
    };
    
    return fundDetails;
  } catch (error) {
    console.error('Error fetching fund details:', error);
    return null;
  }
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
