import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', spent: 2400, saved: 200 },
  { month: 'Feb', spent: 2100, saved: 300 },
  { month: 'Mar', spent: 2800, saved: 150 },
  { month: 'Apr', spent: 2600, saved: 400 },
  { month: 'May', spent: 2900, saved: 250 },
  { month: 'Jun', spent: 3200, saved: 180 },
  { month: 'Jul', spent: 2800, saved: 320 },
  { month: 'Aug', spent: 2500, saved: 450 },
  { month: 'Sep', spent: 2700, saved: 380 },
  { month: 'Oct', spent: 2400, saved: 520 },
  { month: 'Nov', spent: 2900, saved: 290 },
  { month: 'Dec', spent: 2847, saved: 640 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#334155] border border-[#475569] rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className={`text-sm ${entry.color === '#3B82F6' ? 'text-[#3B82F6]' : 'text-[#10B981]'}`}>
            <span className="font-medium">{entry.name}:</span> ₹{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function SpendTrendChart() {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#475569] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">Spend Trend</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
            <span className="text-gray-400">Spent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
            <span className="text-gray-400">Saved</span>
          </div>
        </div>
      </div>
      
      <div className="h-80" data-name="chart-line-trend">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="spent" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              name="Spent"
            />
            <Line 
              type="monotone" 
              dataKey="saved" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              name="Saved"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}