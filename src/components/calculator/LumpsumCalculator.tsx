
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvestmentChart } from "@/components/calculator/InvestmentChart";

export const LumpsumCalculator = () => {
  const [investment, setInvestment] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  // Calculate future value of lumpsum investment
  const calculateLumpsum = () => {
    const futureValue = investment * Math.pow((1 + expectedReturn / 100), timePeriod);
    return Math.round(futureValue);
  };

  const futureValue = calculateLumpsum();
  const estimatedReturns = futureValue - investment;

  const chartData = {
    invested: investment,
    returns: estimatedReturns
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="investment-amount">Investment Amount (₹)</Label>
                <div className="text-lg font-semibold text-[#5D4037]">₹{investment.toLocaleString()}</div>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="investment-amount"
                  value={[investment]}
                  min={1000}
                  max={10000000}
                  step={1000}
                  onValueChange={(value) => setInvestment(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="expected-return">Expected Return (% p.a.)</Label>
                <div className="text-lg font-semibold text-[#5D4037]">{expectedReturn}%</div>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="expected-return"
                  value={[expectedReturn]}
                  min={1}
                  max={30}
                  step={0.5}
                  onValueChange={(value) => setExpectedReturn(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="time-period">Time Period (Years)</Label>
                <div className="text-lg font-semibold text-[#5D4037]">{timePeriod} years</div>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="time-period"
                  value={[timePeriod]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(value) => setTimePeriod(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-[#5D4037]">Investment Growth</h3>
              <p className="text-sm text-gray-500">See how your investment can grow over time</p>
            </div>
            
            <InvestmentChart data={chartData} />
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-[#EFEBE9] p-4 rounded-lg text-center">
                <p className="text-xs text-gray-500">Invested Amount</p>
                <p className="text-lg font-semibold text-[#5D4037]">₹{investment.toLocaleString()}</p>
              </div>
              <div className="bg-[#E6F4EA] p-4 rounded-lg text-center">
                <p className="text-xs text-gray-500">Est. Returns</p>
                <p className="text-lg font-semibold text-green-700">₹{estimatedReturns.toLocaleString()}</p>
              </div>
              <div className="bg-[#FEF7CD] p-4 rounded-lg text-center">
                <p className="text-xs text-gray-500">Total Value</p>
                <p className="text-lg font-semibold text-[#8D6E63]">₹{futureValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
