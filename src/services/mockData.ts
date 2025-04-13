
import { Fund } from "@/types";

// Mock data for mutual funds
export const mockFunds: Fund[] = [
  {
    schemeCode: "119551",
    schemeName: "Axis Bluechip Fund Direct Plan Growth",
    nav: "49.93",
    date: "13-04-2025",
    fundHouse: "Axis Mutual Fund",
    category: "equity",
    returns: {
      oneYear: 18.7,
    }
  },
  {
    schemeCode: "122639",
    schemeName: "SBI Equity Hybrid Fund Direct Growth",
    nav: "255.59",
    date: "13-04-2025",
    fundHouse: "SBI Mutual Fund",
    category: "hybrid",
    returns: {
      oneYear: 15.3,
    }
  },
  {
    schemeCode: "118568",
    schemeName: "HDFC Mid-Cap Opportunities Fund Direct Plan Growth",
    nav: "122.88",
    date: "13-04-2025",
    fundHouse: "HDFC Mutual Fund",
    category: "equity",
    returns: {
      oneYear: 22.6,
    }
  },
  {
    schemeCode: "118560",
    schemeName: "Kotak Corporate Bond Fund Direct Growth",
    nav: "3354.45",
    date: "13-04-2025",
    fundHouse: "Kotak Mahindra Mutual Fund",
    category: "debt",
    returns: {
      oneYear: 7.2,
    }
  },
  {
    schemeCode: "119598",
    schemeName: "Nippon India Small Cap Fund Direct Growth Plan",
    nav: "108.54",
    date: "13-04-2025",
    fundHouse: "Nippon India Mutual Fund",
    category: "equity",
    returns: {
      oneYear: 25.4,
    }
  },
  {
    schemeCode: "120505",
    schemeName: "Mirae Asset Large Cap Fund Direct Plan Growth",
    nav: "97.72",
    date: "13-04-2025",
    fundHouse: "Mirae Asset Mutual Fund",
    category: "equity",
    returns: {
      oneYear: 16.9,
    }
  },
  {
    schemeCode: "118560",
    schemeName: "Aditya Birla Sun Life Corporate Bond Fund Direct Growth",
    nav: "89.92",
    date: "13-04-2025",
    fundHouse: "Aditya Birla Sun Life Mutual Fund",
    category: "debt",
    returns: {
      oneYear: 6.8,
    }
  },
  {
    schemeCode: "119600",
    schemeName: "ICICI Prudential Ultra Short Term Fund Direct Plan Growth",
    nav: "24.66",
    date: "13-04-2025",
    fundHouse: "ICICI Prudential Mutual Fund",
    category: "debt",
    returns: {
      oneYear: 5.9,
    }
  },
  {
    schemeCode: "118561",
    schemeName: "Parag Parikh Flexi Cap Fund Direct Growth",
    nav: "62.14",
    date: "13-04-2025",
    fundHouse: "PPFAS Mutual Fund",
    category: "equity",
    returns: {
      oneYear: 19.8,
    }
  },
  {
    schemeCode: "119709",
    schemeName: "UTI Nifty Index Fund Direct Growth",
    nav: "143.25",
    date: "13-04-2025",
    fundHouse: "UTI Mutual Fund",
    category: "other",
    returns: {
      oneYear: 17.2,
    }
  },
  {
    schemeCode: "119710",
    schemeName: "DSP Midcap Fund Direct Plan Growth",
    nav: "96.48",
    date: "13-04-2025",
    fundHouse: "DSP Mutual Fund",
    category: "equity",
    returns: {
      oneYear: 21.5,
    }
  },
  {
    schemeCode: "119711",
    schemeName: "Franklin India Ultra Short Bond Fund Super Institutional Direct Growth",
    nav: "32.87",
    date: "13-04-2025",
    fundHouse: "Franklin Templeton Mutual Fund",
    category: "debt",
    returns: {
      oneYear: 5.6,
    }
  }
];

// Mock data for goals
export const mockGoals = [
  {
    id: "1",
    title: "Home Down Payment",
    targetAmount: 2500000,
    currentAmount: 750000,
    targetDate: "2028-03-01",
    createdAt: "2023-01-15",
    icon: "home",
    progress: 30,
  },
  {
    id: "2",
    title: "Child's Education",
    targetAmount: 5000000,
    currentAmount: 1200000,
    targetDate: "2030-06-01",
    createdAt: "2022-12-05",
    icon: "graduation-cap",
    progress: 24,
  },
  {
    id: "3",
    title: "Retirement Fund",
    targetAmount: 10000000,
    currentAmount: 2500000,
    targetDate: "2045-05-01",
    createdAt: "2020-06-10",
    icon: "umbrella",
    progress: 25,
  },
];

// Mock data for market insights
export const mockMarketData = {
  indices: [
    { name: "Sensex", value: 72563.15, change: 0.89 },
    { name: "Nifty 50", value: 21943.25, change: 0.83 },
    { name: "Nifty Bank", value: 47568.50, change: 1.25 },
  ],
  topGainers: [
    { name: "Tata Motors", change: 3.87 },
    { name: "Bajaj Finance", change: 3.25 },
    { name: "HDFC Bank", change: 2.93 },
  ],
  topLosers: [
    { name: "Infosys", change: -1.45 },
    { name: "HUL", change: -0.98 },
    { name: "Bharti Airtel", change: -0.75 },
  ],
};

// Mock portfolio data
export const mockPortfolioData = {
  totalValue: 875000,
  invested: 750000,
  returns: 125000,
  returnPercentage: 16.67,
  allocation: [
    { category: "Equity", value: 60 },
    { category: "Debt", value: 30 },
    { category: "Gold", value: 5 },
    { category: "Others", value: 5 },
  ],
  funds: [
    { 
      name: "Axis Bluechip Fund", 
      value: 210000, 
      invested: 180000, 
      returns: 30000, 
      returnPercentage: 16.67 
    },
    { 
      name: "HDFC Small Cap Fund", 
      value: 190000, 
      invested: 150000, 
      returns: 40000, 
      returnPercentage: 26.67
    },
    { 
      name: "SBI Balanced Advantage Fund", 
      value: 175000, 
      invested: 150000, 
      returns: 25000, 
      returnPercentage: 16.67
    },
    { 
      name: "Kotak Corporate Bond Fund", 
      value: 195000, 
      invested: 180000, 
      returns: 15000, 
      returnPercentage: 8.33
    },
    { 
      name: "DSP Gold ETF", 
      value: 105000, 
      invested: 90000, 
      returns: 15000, 
      returnPercentage: 16.67
    },
  ]
};
