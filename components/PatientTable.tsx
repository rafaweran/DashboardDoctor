import React, { useState } from 'react';
import { Search, Filter, Eye, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { DirectoryPatient } from '../types';

const MOCK_DIRECTORY: DirectoryPatient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    avatar: 'https://picsum.photos/seed/maria/200/200',
    age: 45,
    gender: 'Feminino',
    phone: '(11) 99876-5432',
    lastVisit: '12/11/2024',
    status: 'Ativo'
  },
  {
    id: '2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    avatar: 'https://picsum.photos/seed/joao/200/200',
    age: 32,
    gender: 'Masculino',
    phone: '(11) 91234-5678',
    lastVisit: '10/11/2024',
    status: 'Ativo'
  },
  {
    id: '3',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    avatar: 'https://picsum.photos/seed/ana/200/200',
    age: 28,
    gender: 'Feminino',
    phone: '(21) 99888-7777',
    lastVisit: '28/10/2024',
    status: 'Inativo'
  },
  {
    id: '4',
    name: 'Pedro Alves',
    email: 'pedro.alves@email.com',
    avatar: 'https://picsum.photos/seed/pedro/200/200',
    age: 56,
    gender: 'Masculino',
    phone: '(31) 98765-4321',
    lastVisit: '05/11/2024',
    status: 'Ativo'
  },
  {
    id: '5',
    name: 'Carla Dias',
    email: 'carla.dias@email.com',
    avatar: 'https://picsum.photos/seed/carla/200/200',
    age: 39,
    gender: 'Feminino',
    phone: '(41) 99999-8888',
    lastVisit: '01/11/2024',
    status: 'Ativo'
  },
  {
    id: '6',
    name: 'Roberto Lima',
    email: 'roberto.lima@email.com',
    avatar: 'https://picsum.photos/seed/roberto/200/200',
    age: 62,
    gender: 'Masculino',
    phone: '(11) 97777-6666',
    lastVisit: '15/09/2024',
    status: 'Inativo'
  }
];

const PatientTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Ativo' | 'Inativo'>('Todos');

  const filteredPatients = MOCK_DIRECTORY.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === 'Todos' || patient.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Header & Filters */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-800">Diretório de Pacientes</h2>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-colors"
              placeholder="Buscar por nome..."
            />
          </div>

          {/* Filter */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>{statusFilter}</span>
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover:block z-10">
              {['Todos', 'Ativo', 'Inativo'].map((option) => (
                <button
                  key={option}
                  onClick={() => setStatusFilter(option as any)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${statusFilter === option ? 'text-teal-600 font-medium' : 'text-gray-600'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idade / Gênero</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Consulta</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full object-cover" src={patient.avatar} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.age} anos</div>
                  <div className="text-xs text-gray-500">{patient.gender}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.lastVisit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    patient.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-3">
                     <button className="text-gray-400 hover:text-teal-600 transition-colors" title="Visualizar">
                        <Eye size={18} />
                     </button>
                     <button className="text-gray-400 hover:text-indigo-600 transition-colors" title="Enviar Mensagem">
                        <MessageSquare size={18} />
                     </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> até <span className="font-medium">{filteredPatients.length}</span> de <span className="font-medium">{filteredPatients.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Anterior</span>
                  <ChevronLeft size={16} />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Próximo</span>
                  <ChevronRight size={16} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;