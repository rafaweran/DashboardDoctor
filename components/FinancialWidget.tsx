import React from 'react';
import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Jan', val: 400 },
  { name: 'Fev', val: 600 },
  { name: 'Mar', val: 800 },
  { name: 'Abr', val: 750 },
  { name: 'Mai', val: 1100 },
  { name: 'Jun', val: 1250 },
];

const FinancialWidget: React.FC = () => {
  return (
    <div className="bg-teal-900 text-white p-6 rounded-2xl shadow-md relative overflow-hidden h-full flex flex-col">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800 rounded-full mix-blend-overlay filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-teal-200 text-sm font-medium mb-1">Ganhos deste mês</p>
            <h3 className="text-3xl font-bold">R$ 1.250,00</h3>
            <div className="flex items-center gap-2 mt-2 text-teal-300 text-sm">
              <TrendingUp size={16} />
              <span>+12% vs mês anterior</span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-[140px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.1)'}}
                contentStyle={{ backgroundColor: '#115e59', borderColor: '#134e4a', color: '#fff' }}
              />
              <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#2dd4bf' : '#115e59'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 pt-4 border-t border-teal-800 text-xs text-teal-400 flex justify-between items-center">
           <span>Último repasse: 05/11</span>
           <button className="hover:text-white transition-colors flex items-center gap-1">
             Ver detalhes <span>&rarr;</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialWidget;