
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface InvestmentChartProps {
  data: {
    invested: number;
    returns: number;
  };
}

export const InvestmentChart = ({ data }: InvestmentChartProps) => {
  const chartData = [
    { name: 'Amount Invested', value: data.invested, color: '#8D6E63' },
    { name: 'Est. Returns', value: data.returns, color: '#4CAF50' },
  ];

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `₹${value.toLocaleString()}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
