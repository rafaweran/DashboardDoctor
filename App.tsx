
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FinancialWidget from './components/FinancialWidget';
import PatientList from './components/PatientList';
import InviteCard from './components/InviteCard';
import ConnectionStatsCard from './components/ConnectionStatsCard';
import ChatPage from './components/ChatPage';
import { Users, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('home');

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {activeView === 'home' && (
          <>
            <Header />
            <main className="flex-1 overflow-y-auto p-8">
              <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Text */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">Bom dia, Dra. Amanda 👋</h1>
                  <p className="text-gray-500">Aqui está o resumo dos seus atendimentos hoje.</p>
                </div>
                
                {/* Top Section: Grid for Stats/Invite and Finance */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Column Group */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Stats Row - Now 3 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <StatCard 
                        label="Total de Pacientes" 
                        value="247" 
                        icon={Users} 
                        colorClass="bg-teal-500 text-teal-600" 
                      />
                      <StatCard 
                        label="Total de Atendimentos" 
                        value="1.842" 
                        icon={Activity} 
                        colorClass="bg-blue-500 text-blue-600" 
                      />
                      <ConnectionStatsCard />
                    </div>
                    
                    {/* Invite Card (Aligned below stats, same width) */}
                    <div className="flex-1">
                      <InviteCard />
                    </div>
                  </div>

                  {/* Right Column: Financial Widget */}
                  <div className="lg:col-span-4 h-full">
                    <FinancialWidget />
                  </div>
                </div>

                {/* Bottom Section: Patient Queue */}
                <div className="grid grid-cols-1">
                  <PatientList />
                </div>
              </div>
            </main>
          </>
        )}

        {activeView === 'chat' && (
          <ChatPage />
        )}

        {/* Placeholder for other views */}
        {(activeView !== 'home' && activeView !== 'chat') && (
           <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-lg font-medium">Página em construção</p>
                <p className="text-sm">Em breve disponível: {activeView}</p>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default App;
