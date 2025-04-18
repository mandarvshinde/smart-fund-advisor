import axios from 'axios';
import { LocalFund } from '@/types';

// AMFI data source URL
const AMFI_DATA_URL = 'https://www.amfiindia.com/spages/NAVAll.TXT';

// Cache for AMFI data
let cachedAmfiData: LocalFund[] | null = null;
let lastAmfiFetchTime = 0;

// Parse AMFI data into structured data
const parseAmfiData = (data: string): LocalFund[] => {
  const lines = data.split('\n');
  const funds: LocalFund[] = [];
  let currentFundHouse = '';
  let currentSchemeType = '';

  lines.forEach(line => {
    line = line.trim();
    if (!line) return; // Skip empty lines

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
      const schemeName = parts[3]?.trim() || '';

      // Skip empty scheme names or Direct plans
      if (!schemeName || schemeName.toLowerCase().includes('direct')) {
        return;
      }

      const schemeCode = parts[0]?.trim() || '';
      const nav = parts[4]?.trim() || '0';
      const date = parts[5]?.trim() || '';

      // Skip invalid entries
      if (!schemeCode || !nav || nav === 'N.A.' || nav === 'N.A' || !date) {
        return;
      }

      try {
        // Validate NAV is a number
        if (isNaN(parseFloat(nav))) {
          return;
        }

        funds.push({
          schemeCode,
          schemeName,
          nav,
          date,
          fundHouse: currentFundHouse,
          category: 'other', // Default category
          riskLevel: 'Moderate', // Default risk level
        });
      } catch (error) {
        console.error(`Error parsing fund ${schemeCode}:`, error);
      }
    }
  });

  console.log(`Parsed ${funds.length} funds from AMFI data`);
  return funds;
};

// Fetch AMFI data
export const fetchAmfiData = async (): Promise<LocalFund[]> => {
  const now = Date.now();
  // Use cached data if less than 15 minutes old
  if (cachedAmfiData && cachedAmfiData.length > 0 && now - lastAmfiFetchTime < 15 * 60 * 1000) {
    console.log(`Using cached AMFI data with ${cachedAmfiData.length} funds`);
    return cachedAmfiData;
  }

  try {
    console.log('Fetching fresh AMFI data...');
    const response = await axios.get(AMFI_DATA_URL, {
      responseType: 'text',
      timeout: 30000, // 30 seconds timeout
    });

    if (!response.data) {
      console.error('Empty response from AMFI');
      return [];
    }

    cachedAmfiData = parseAmfiData(response.data);
    lastAmfiFetchTime = now;
    return cachedAmfiData;
  } catch (error) {
    console.error('Error fetching AMFI data:', error);
    return [];
  }
};