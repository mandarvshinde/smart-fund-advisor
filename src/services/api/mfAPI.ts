
import axios from 'axios';
import { Fund, FundDetails } from '@/types';
import { calculateReturns } from '../utils/returnCalculator';

const MFAPI_BASE_URL = 'https://api.mfapi.in/mf/';

// Add local caching for returns data
const returnsCache = new Map<string, Fund>();

export const fetchFundReturns = async (fund: Fund): Promise<Fund> => {
  try {
    // Check cache first
    if (returnsCache.has(fund.schemeCode)) {
      return returnsCache.get(fund.schemeCode) as Fund;
    }

    const response = await axios.get(`${MFAPI_BASE_URL}${fund.schemeCode}`, {
      timeout: 10000 // 10 seconds timeout
    });
    
    if (!response.data || !response.data.data || !Array.isArray(response.data.data) || response.data.data.length === 0) {
      console.warn(`No NAV history for fund ${fund.schemeCode}`);
      return fund;
    }
    
    const navHistory = response.data.data;
    const returns = calculateReturns(navHistory);
    const fundWithReturns = { ...fund, returns };
    
    // Cache the result
    returnsCache.set(fund.schemeCode, fundWithReturns);
    
    return fundWithReturns;
  } catch (error) {
    console.error(`Error fetching returns data for fund ${fund.schemeCode}:`, error);
    return fund;
  }
};

// Cache for fund details
const detailsCache = new Map<string, FundDetails | null>();

export const fetchFundDetails = async (fundCode: string): Promise<FundDetails | null> => {
  try {
    // Check cache first
    if (detailsCache.has(fundCode)) {
      return detailsCache.get(fundCode);
    }

    const response = await axios.get(`${MFAPI_BASE_URL}${fundCode}`, {
      timeout: 15000 // 15 seconds timeout
    });
    
    if (!response.data || !response.data.meta) {
      console.warn(`No details for fund ${fundCode}`);
      return null;
    }
    
    const mfapiData = response.data;
    const navHistory = mfapiData.data?.map((item: any) => ({
      date: item.date,
      nav: parseFloat(item.nav)
    })) || [];
    
    const returns = calculateReturns(mfapiData.data);
    
    const fundDetails: FundDetails = {
      schemeCode: fundCode,
      schemeName: mfapiData.meta.scheme_name || 'Unknown Fund',
      nav: mfapiData.data[0]?.nav || '0',
      date: mfapiData.data[0]?.date || '',
      returns,
      navHistory: navHistory.slice(0, 365), // Limit to 1 year of history
      launchDate: mfapiData.meta?.scheme_launch_date || 'N/A',
      schemeType: mfapiData.meta?.scheme_type || 'N/A',
      expenseRatio: mfapiData.meta?.scheme_expense_ratio || 'N/A',
      aum: mfapiData.meta?.scheme_aum || 'N/A',
      exitLoad: mfapiData.meta?.scheme_load || 'N/A',
      fundManager: mfapiData.meta?.fund_manager || 'N/A',
      benchmark: mfapiData.meta?.scheme_benchmark || 'N/A',
      holdings: [],
      sectorAllocation: []
    };
    
    // Cache the result
    detailsCache.set(fundCode, fundDetails);
    
    return fundDetails;
  } catch (error) {
    console.error('Error fetching fund details:', error);
    // Cache the null result to prevent repeated failures
    detailsCache.set(fundCode, null);
    return null;
  }
};
