
import { Fund } from '@/types';

export const sortFunds = (funds: Fund[], sortBy: string): Fund[] => {
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

