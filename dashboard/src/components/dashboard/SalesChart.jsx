import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data reflecting the peaks in your image
const data = [
  { name: '5k', uv: 20 },
  { name: '10k', uv: 45 },
  { name: '15k', uv: 30 },
  { name: '20k', uv: 85 }, // The Peak
  { name: '25k', uv: 40 },
  { name: '30k', uv: 55 },
  { name: '35k', uv: 25 },
  { name: '40k', uv: 45 },
  { name: '45k', uv: 70 },
  { name: '50k', uv: 50 },
  { name: '60k', uv: 55 },
];

const SalesChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#0f766e" stopOpacity={0.1}/>
          <stop offset="95%" stopColor="#0f766e" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
      <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(val) => `${val}%`} />
      <Tooltip 
        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
      />
      <Area 
        type="monotone" 
        dataKey="uv" 
        stroke="#0f766e" 
        strokeWidth={3} 
        fillOpacity={1} 
        fill="url(#colorUv)" 
        dot={{ r: 4, fill: '#0f766e', strokeWidth: 2, stroke: '#fff' }}
        activeDot={{ r: 6, strokeWidth: 0 }}
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default SalesChart;