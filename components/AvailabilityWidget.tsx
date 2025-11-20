import React, { useState } from 'react';

const AvailabilityWidget: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center min-w-[320px]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 text-base">Disponibilidade</h3>
          <span className={`h-2.5 w-2.5 rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}></span>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium transition-colors ${isAvailable ? 'text-green-500' : 'text-gray-400'}`}>
            {isAvailable ? 'Disponível' : 'Indisponível'}
          </span>
          <button 
            onClick={() => setIsAvailable(!isAvailable)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              isAvailable ? 'bg-green-500' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                isAvailable ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">
        Seu status aparece para os pacientes conforme sua agenda.
      </p>
    </div>
  );
};

export default AvailabilityWidget;