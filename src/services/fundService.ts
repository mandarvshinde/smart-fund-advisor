import { Fund, FundDetails } from '@/types/fundTypes';
import axios from 'axios';

const AMFI_DATA_URL = 'https://www.amfiindia.com/spages/NAVAll.TXT';
const MFAPI_BASE_URL = 'https://api.mfapi.in/v1/mf'; // Base URL for MFAPI.in

// Cache for AMFI data and MFAPI data
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
            oneYear: 10, // Default value, will be overwritten by MFAPI data
            threeYear: 12,
            fiveYear: 14
          }
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
  return 'other';
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

// Fetch MFAPI data (Performance, Holdings, Sector Allocation, etc.)
const fetchMfapiData = async (schemeCode: string): Promise<any> => {
  try {
    // Fetch performance data
    const [performanceResponse, holdingsResponse, sectorAllocationResponse] = await Promise.all([
      axios.get(`${MFAPI_BASE_URL}/${schemeCode}/performance`),
      axios.get(`${MFAPI_BASE_URL}/${schemeCode}/holdings`),
      axios.get(`${MFAPI_BASE_URL}/${schemeCode}/sector-allocation`),
    ]);

    return {
      performance: performanceResponse.data,
      holdings: holdingsResponse.data,
      sectorAllocation: sectorAllocationResponse.data,
    };
  } catch (error) {
    console.error(`Error fetching data for scheme ${schemeCode} from MFAPI:`, error);
    return null;
  }
};

// Combine AMFI and MFAPI data
const combineData = async (): Promise<Fund[]> => {
  const funds = await fetchAmfiData();

  const combinedFunds = await Promise.all(
    funds.map(async (fund) => {
      const mfapiData = await fetchMfapiData(fund.schemeCode);

      if (mfapiData) {
        // Combine AMFI data with MFAPI data
        return {
          ...fund,
          returns: {
            oneYear: mfapiData.performance.oneYear || fund.returns.oneYear,
            threeYear: mfapiData.performance.threeYear || fund.returns.threeYear,
            fiveYear: mfapiData.performance.fiveYear || fund.returns.fiveYear
          },
          holdings: mfapiData.holdings,
          sectorAllocation: mfapiData.sectorAllocation
        };
      }

      return fund; // If MFAPI data is unavailable, return AMFI data as fallback
    })
  );

  return combinedFunds;
};

// Get list of all mutual funds
export const fetchFundsList = async (category: string, sortBy: string, fundHouse?: string): Promise<Fund[]> => {
  try {
    const funds = await combineData();

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
    case 'nav':
      return sortedFunds.sort((a, b) => parseFloat(b.nav) - parseFloat(a.nav));
    default:
      return sortedFunds;
  }
};
