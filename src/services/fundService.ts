import { Fund, FundDetails } from '@/types/fundTypes';
import axios from 'axios';

const AMFI_DATA_URL = 'https://www.amfiindia.com/spages/NAVAll.TXT';
const TRADEFEEDS_API_URL = 'https://api.tradefeeds.com'; // Replace with actual Tradefeeds API URL

// Cache for AMFI data and Tradefeeds data
let cachedAmfiData: Map<string, any> = new Map();
let lastAmfiFetchTime = 0;
let parsedFunds: Fund[] = [];

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
            oneYear: 10, // Default value, will be overwritten by Tradefeeds data
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
  try {
    const now = Date.now();
    if (parsedFunds.length > 0 && now - lastAmfiFetchTime < 15 * 60 * 1000) {
      return parsedFunds;
    }

    console.log('Fetching fresh AMFI data...');
    const response = await axios.get(AMFI_DATA_URL, { responseType: 'text' });
    parsedFunds = parseAmfiData(response.data);
    lastAmfiFetchTime = now;

    return parsedFunds;
  } catch (error) {
    console.error('Error fetching AMFI data:', error);
    return [];
  }
};

// Fetch Tradefeeds data (Fund Performance, Holdings, Risk, Fees, Sector Allocation)
const fetchTradefeedsData = async (schemeCode: string): Promise<any> => {
  try {
    const response = await axios.get(`${TRADEFEEDS_API_URL}/funds/${schemeCode}`);
    return response.data; // Assuming it returns the required data
  } catch (error) {
    console.error(`Error fetching data for scheme ${schemeCode} from Tradefeeds:`, error);
    return null;
  }
};

// Combine AMFI and Tradefeeds data
const combineData = async (): Promise<Fund[]> => {
  const funds = await fetchAmfiData();

  const combinedFunds = await Promise.all(
    funds.map(async (fund) => {
      const tradefeedsData = await fetchTradefeedsData(fund.schemeCode);

      if (tradefeedsData) {
        // Combine AMFI data with Tradefeeds data
        return {
          ...fund,
          returns: {
            oneYear: tradefeedsData.performance.oneYear || fund.returns.oneYear,
            threeYear: tradefeedsData.performance.threeYear || fund.returns.threeYear,
            fiveYear: tradefeedsData.performance.fiveYear || fund.returns.fiveYear
          },
          holdings: tradefeedsData.holdings,
          riskData: tradefeedsData.riskData,
          fees: tradefeedsData.fees,
          sectorAllocation: tradefeedsData.sectorAllocation
        };
      }

      return fund; // If Tradefeeds data is unavailable, return AMFI data as fallback
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
