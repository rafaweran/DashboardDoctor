import React from 'react';
import StatCard from './StatCard';
import InviteCard from './InviteCard';
import PatientTable from './PatientTable';
import { Users, UserCheck } from 'lucide-react';

const PatientsPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8 flex-1 overflow-y-auto">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Gerenciamento de Pacientes</h1>
          <p className="text-gray-500">Visualize e gerencie todos os seus pacientes e conexões.</p>
        </div>

        {/* Top Stats & Invite Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left: Stats */}
          <div className="flex flex-col gap-6">
            <div className="flex-1">
              <StatCard 
                label="Total de Pacientes" 
                value="247" 
                icon={Users} 
                colorClass="bg-teal-500 text-teal-600" 
              />
            </div>
            <div className="flex-1">
              <StatCard 
                label="Pacientes Ativos" 
                value="184" 
                icon={UserCheck} 
                colorClass="bg-blue-500 text-blue-600" 
              />
            </div>
          </div>

          {/* Right: Invite Card */}
          <div className="lg:col-span-2">
            <InviteCard />
          </div>
        </div>

        {/* Patient Table */}
        <div className="flex-1 min-h-[500px]">
          <PatientTable />
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;