import React from 'react';
import { UserPlus, ArrowRight } from 'lucide-react';

const ConnectionStatsCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-lg hover:shadow-indigo-200/50 transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between p-6 text-white group">
      
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-indigo-900 opacity-20 rounded-full blur-xl pointer-events-none"></div>

      <div className="relative z-10 flex justify-between items-start">
        <div>
            <div className="flex items-center gap-2 mb-2">
                {/* Indicador de atividade pulsante */}
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-200 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </div>
                <p className="text-indigo-100 text-sm font-bold tracking-wide uppercase">Solicitações</p>
            </div>
            <h3 className="text-4xl font-bold tracking-tight drop-shadow-md">5</h3>
        </div>
        <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner group-hover:bg-white/20 transition-colors">
            <UserPlus size={24} className="text-white" />
        </div>
      </div>
      
      <div className="relative z-10 mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
            <span className="text-xs text-indigo-100 font-medium opacity-80">
               Novos pacientes
            </span>
            <button className="group/btn flex items-center gap-2 px-4 py-2 bg-white text-indigo-700 text-sm font-bold rounded-lg hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg active:scale-95">
               Visualizar
               <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatsCard;