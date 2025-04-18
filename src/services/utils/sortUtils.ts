
import { Fund } from '@/types';

export const sortFunds = (funds: Fund[], sortBy: string): Fund[] => {
  const sortedFunds = [...funds];

  switch (sortBy) {
    case 'returns':
      return sortedFunds.sort((a, b) => {
        const aReturn = a.returns?.oneYear ?? -999; // Use -999 as fallback for missing values
        const bReturn = b.returns?.oneYear ?? -999;
        return bReturn - aReturn; // Descending
      });
    case 'returns-asc':
      return sortedFunds.sort((a, b) => {
        const aReturn = a.returns?.oneYear ?? 999; // Use 999 as fallback for missing values
        const bReturn = b.returns?.oneYear ?? 999;
        return aReturn - bReturn; // Ascending
      });
    case 'nav':
      return sortedFunds.sort((a, b) => {
        const aNav = parseFloat(a.nav) || 0;
        const bNav = parseFloat(b.nav) || 0;
        return bNav - aNav; // Descending
      });
    case 'nav-asc':
      return sortedFunds.sort((a, b) => {
        const aNav = parseFloat(a.nav) || 0;
        const bNav = parseFloat(b.nav) || 0;
        return aNav - bNav; // Ascending
      });
    case 'name':
      return sortedFunds.sort((a, b) => a.schemeName.localeCompare(b.schemeName));
    case 'name-desc':
      return sortedFunds.sort((a, b) => b.schemeName.localeCompare(a.schemeName));
    default:
      return sortedFunds;
  }
};
