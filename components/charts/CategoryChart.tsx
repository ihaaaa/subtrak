import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Entertainment', value: 1548, color: '#3B82F6' },
  { name: 'Productivity', value: 648, color: '#8B5CF6' },
  { name: 'Food', value: 298, color: '#10B981' },
  { name: 'Fitness', value: 199, color: '#F59E0B' },
  { name: 'Other', value: 154, color: '#EF4444' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#334155] border border-[#475569] rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{data.name}</p>
        <p className="text-sm text-gray-300">₹{data.value}</p>
        <p className="text-xs text-gray-400">
          {((data.value / data.total) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export function CategoryChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map(item => ({ ...item, total }));

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#475569] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 mb-6">
      <h3 className="text-white text-lg font-semibold mb-4">Spend by Category</h3>
      
      <div className="h-48" data-name="chart-doughnut-category">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {dataWithTotal.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-1 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-400 text-sm">{item.name}</span>
            </div>
            <span className="text-white text-sm font-medium">₹{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}