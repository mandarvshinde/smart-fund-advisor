
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

  // More accurate categorization based on scheme name and type
  if (name.includes('equity') || name.includes('share') || type.includes('equity')) return 'equity';
  if (name.includes('debt') || name.includes('income') || name.includes('bond') || type.includes('debt')) return 'debt';
  if (name.includes('hybrid') || name.includes('balanced')) return 'hybrid';
  if (name.includes('index') || name.includes('etf') || name.includes('nifty') || name.includes('sensex')) return 'index';
  if (name.includes('elss') || name.includes('tax') || name.includes('saving')) return 'elss';
  
  // If nothing matches specifically, try to determine from the scheme type
  if (type.includes('equity')) return 'equity';
  if (type.includes('debt')) return 'debt';
  if (type.includes('hybrid')) return 'hybrid';
  
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
      } catch (error) {
        console.error(`Error parsing fund ${schemeCode}:`, error);
      }
    }
  });

  console.log(`Parsed ${funds.length} funds from AMFI data`);
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
  // Use cached data if less than 15 minutes old
  if (cachedAmfiData && cachedAmfiData.length > 0 && now - lastAmfiFetchTime < 15 * 60 * 1000) {
    console.log(`Using cached AMFI data with ${cachedAmfiData.length} funds`);
    return cachedAmfiData;
  }

  try {
    console.log('Fetching fresh AMFI data...');
    const response = await axios.get(AMFI_DATA_URL, { 
      responseType: 'text',
      timeout: 30000 // 30 seconds timeout
    });
    
    if (!response.data) {
      console.error('Empty response from AMFI');
      return cachedAmfiData || [];
    }
    
    cachedAmfiData = parseAmfiData(response.data);
    lastAmfiFetchTime = now;
    return cachedAmfiData;
  } catch (error) {
    console.error('Error fetching AMFI data:', error);
    // Return cached data if available, otherwise empty array
    return cachedAmfiData || [];
  }
};
