import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Netflix', value: 649, color: '#E50914' },
  { name: 'Prime', value: 1499, color: '#FF9900' },
  { name: 'Spotify', value: 119, color: '#1DB954' },
  { name: 'Hotstar', value: 899, color: '#0F79AF' },
  { name: 'Zomato', value: 149, color: '#E23744' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#334155] border border-[#475569] rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{label}</p>
        <p className="text-sm text-gray-300">₹{payload[0].value}/month</p>
      </div>
    );
  }
  return null;
};

export function Top5ServicesChart() {
  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 hover:border-[#475569] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <h3 className="text-white text-lg font-semibold mb-4">Top 5 Costliest Services</h3>
      
      <div className="h-64" data-name="chart-bar-top5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="horizontal"
          >
            <XAxis 
              type="number"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <YAxis 
              type="category"
              dataKey="name"
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#3B82F6"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Service list with costs */}
      <div className="mt-4 space-y-2">
        {data.map((service, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{service.name}</span>
            <span className="text-white font-medium">₹{service.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}