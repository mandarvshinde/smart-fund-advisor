
import axios from 'axios';
import { Fund } from '@/types';

const AMFI_DATA_URL = 'https://www.amfiindia.com/spages/NAVAll.TXT';

// Cache for AMFI data
let cachedAmfiData: Fund[] | null = null;
let lastAmfiFetchTime = 0;

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
export const fetchAmfiData = async (): Promise<Fund[]> => {
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

