
interface NavDataPoint {
  date: string;
  nav: string;
}

export const calculateReturns = (navHistory: NavDataPoint[]) => {
  if (!navHistory || navHistory.length === 0) return undefined;

  try {
    // Make sure the data is sorted with newest dates first
    const sortedHistory = [...navHistory].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Current NAV is the most recent one
    const currentNavStr = sortedHistory[0].nav;
    if (!currentNavStr || isNaN(parseFloat(currentNavStr))) {
      console.warn('Invalid current NAV value');
      return undefined;
    }
    
    const currentNav = parseFloat(currentNavStr);
    
    // Find index for 1, 3, and 5 year returns
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
    
    const fiveYearsAgo = new Date();
    fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
    
    const oneYearIndex = sortedHistory.findIndex(item => 
      new Date(item.date) <= oneYearAgo
    );
    
    const threeYearIndex = sortedHistory.findIndex(item => 
      new Date(item.date) <= threeYearsAgo
    );
    
    const fiveYearIndex = sortedHistory.findIndex(item => 
      new Date(item.date) <= fiveYearsAgo
    );
    
    // Calculate returns
    let oneYearReturn: number | undefined = undefined;
    let threeYearReturn: number | undefined = undefined;
    let fiveYearReturn: number | undefined = undefined;
    
    if (oneYearIndex !== -1) {
      const oneYearNavStr = sortedHistory[oneYearIndex].nav;
      if (oneYearNavStr && !isNaN(parseFloat(oneYearNavStr))) {
        const oneYearNav = parseFloat(oneYearNavStr);
        if (oneYearNav > 0) {
          oneYearReturn = (currentNav / oneYearNav - 1) * 100;
        }
      }
    }
    
    if (threeYearIndex !== -1) {
      const threeYearNavStr = sortedHistory[threeYearIndex].nav;
      if (threeYearNavStr && !isNaN(parseFloat(threeYearNavStr))) {
        const threeYearNav = parseFloat(threeYearNavStr);
        if (threeYearNav > 0) {
          // Calculate annualized returns for 3 years
          threeYearReturn = (Math.pow(currentNav / threeYearNav, 1/3) - 1) * 100;
        }
      }
    }
    
    if (fiveYearIndex !== -1) {
      const fiveYearNavStr = sortedHistory[fiveYearIndex].nav;
      if (fiveYearNavStr && !isNaN(parseFloat(fiveYearNavStr))) {
        const fiveYearNav = parseFloat(fiveYearNavStr);
        if (fiveYearNav > 0) {
          // Calculate annualized returns for 5 years
          fiveYearReturn = (Math.pow(currentNav / fiveYearNav, 1/5) - 1) * 100;
        }
      }
    }
    
    return {
      oneYear: oneYearReturn,
      threeYear: threeYearReturn,
      fiveYear: fiveYearReturn
    };
  } catch (error) {
    console.error('Error calculating returns:', error);
    return undefined;
  }
};
