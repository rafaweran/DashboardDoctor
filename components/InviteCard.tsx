import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const InviteCard: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-6 h-full flex flex-col justify-center">
      <h3 className="text-gray-900 font-semibold text-lg mb-2">Convidar Pacientes</h3>
      <p className="text-gray-600 text-sm mb-5">
        Envie convites para seus pacientes se conectarem com você na Med.co.
      </p>
      
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition-shadow shadow-sm"
            placeholder="Digite um ou mais e-mails"
          />
        </div>
        <button className="w-full bg-[#1e293b] hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10">
          <span>Enviar convite</span>
          <Send size={16} className="text-teal-400" />
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Separe vários e-mails por vírgula.
      </p>
    </div>
  );
};

export default InviteCard;