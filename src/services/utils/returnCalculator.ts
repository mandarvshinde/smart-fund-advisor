
interface NavDataPoint {
  date: string;
  nav: string;
}

export const calculateReturns = (navHistory: NavDataPoint[]) => {
  if (!navHistory || navHistory.length === 0) return undefined;

  const currentNav = parseFloat(navHistory[0].nav);
  const oneYearIndex = navHistory.findIndex(item => 
    new Date(item.date).getTime() <= Date.now() - 365 * 24 * 60 * 60 * 1000
  );
  const threeYearIndex = navHistory.findIndex(item => 
    new Date(item.date).getTime() <= Date.now() - 3 * 365 * 24 * 60 * 60 * 1000
  );
  const fiveYearIndex = navHistory.findIndex(item => 
    new Date(item.date).getTime() <= Date.now() - 5 * 365 * 24 * 60 * 60 * 1000
  );

  return {
    oneYear: oneYearIndex !== -1 ? (currentNav / parseFloat(navHistory[oneYearIndex].nav) - 1) * 100 : undefined,
    threeYear: threeYearIndex !== -1 ? (Math.pow(currentNav / parseFloat(navHistory[threeYearIndex].nav), 1/3) - 1) * 100 : undefined,
    fiveYear: fiveYearIndex !== -1 ? (Math.pow(currentNav / parseFloat(navHistory[fiveYearIndex].nav), 1/5) - 1) * 100 : undefined
  };
};

