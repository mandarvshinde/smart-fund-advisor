
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvestmentChart } from "@/components/calculator/InvestmentChart";

export const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  // Calculate future value of SIP
  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return Math.round(futureValue);
  };

  const futureValue = calculateSIP();
  const totalInvestment = monthlyInvestment * timePeriod * 12;
  const estimatedReturns = futureValue - totalInvestment;

  const chartData = {
    invested: totalInvestment,
    returns: estimatedReturns
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="monthly-investment">Monthly Investment (₹)</Label>
                <div className="text-lg font-semibold text-[#5D4037]">₹{monthlyInvestment}</div>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  id="monthly-investment"
                  value={[monthlyInvestment]}
                  min={500}
                  max={200000}
                  step={500}
                  onValueChange={(value) => setMonthlyInvestment(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-20"
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
                <p className="text-lg font-semibold text-[#5D4037]">₹{totalInvestment.toLocaleString()}</p>
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
