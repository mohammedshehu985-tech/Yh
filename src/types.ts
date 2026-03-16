export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  history: { time: string; value: number }[];
}

export interface InvestmentPlan {
  initialAmount: number;
  monthlyContribution: number;
  years: number;
  expectedReturn: number;
}
