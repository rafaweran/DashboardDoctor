
import React from 'react';
import { LayoutDashboard, MessageSquare, Calendar, Wallet, Settings, Users, LogOut } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Home', id: 'home' },
    { icon: Users, label: 'Pacientes', id: 'patients' },
    { icon: MessageSquare, label: 'Chat', id: 'chat' },
    { icon: Calendar, label: 'Agenda', id: 'agenda' },
    { icon: Wallet, label: 'Financeiro', id: 'financeiro' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
        <span className="text-xl font-bold text-gray-800">Med.co</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeView === item.id
                ? 'bg-teal-50 text-teal-700 font-medium'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
         <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl">
            <Settings size={20} />
            <span>Configurações</span>
          </button>
           <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl mt-1">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;
