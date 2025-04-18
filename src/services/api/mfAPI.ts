
import axios from 'axios';
import { Fund, FundDetails } from '@/types';
import { calculateReturns } from '../utils/returnCalculator';

const MFAPI_BASE_URL = 'https://api.mfapi.in/mf/';

export const fetchFundReturns = async (fund: Fund): Promise<Fund> => {
  try {
    const response = await axios.get(`${MFAPI_BASE_URL}${fund.schemeCode}`);
    if (response.data && response.data.data) {
      const navHistory = response.data.data;
      if (navHistory.length > 0) {
        const returns = calculateReturns(navHistory);
        return { ...fund, returns };
      }
    }
    return fund;
  } catch (error) {
    console.error(`Error fetching returns data for fund ${fund.schemeCode}:`, error);
    return fund;
  }
};

export const fetchFundDetails = async (fundCode: string): Promise<FundDetails | null> => {
  try {
    const response = await axios.get(`${MFAPI_BASE_URL}${fundCode}`);
    if (!response.data || !response.data.meta) {
      return null;
    }
    
    const mfapiData = response.data;
    const navHistory = mfapiData.data?.map((item: any) => ({
      date: item.date,
      nav: parseFloat(item.nav)
    })) || [];
    
    const returns = calculateReturns(mfapiData.data);
    
    return {
      schemeCode: fundCode,
      schemeName: mfapiData.meta.scheme_name,
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
  } catch (error) {
    console.error('Error fetching fund details:', error);
    return null;
  }
};

