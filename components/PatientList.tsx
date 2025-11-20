import React, { useState } from 'react';
import { Patient, UrgencyLevel, AISummary } from '../types';
import { Video, Clock, Sparkles, X, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { analyzePatientSymptoms } from '../services/geminiService';

const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Maria Silva',
    avatar: 'https://picsum.photos/seed/maria/200/200',
    waitTime: '5 min',
    urgency: UrgencyLevel.URGENT,
    symptoms: 'Dor torácica intensa irradiando para o braço esquerdo, sudorese e náusea.'
  },
  {
    id: '2',
    name: 'João Santos',
    avatar: 'https://picsum.photos/seed/joao/200/200',
    waitTime: '12 min',
    urgency: UrgencyLevel.STANDARD,
    symptoms: 'Dor de garganta leve, febre baixa (37.5) e coriza há 2 dias.'
  },
  {
    id: '3',
    name: 'Ana Costa',
    avatar: 'https://picsum.photos/seed/ana/200/200',
    waitTime: '20 min',
    urgency: UrgencyLevel.STANDARD,
    symptoms: 'Enxaqueca persistente, sensibilidade à luz e tontura leve.'
  }
];

const PatientList: React.FC = () => {
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  // Pre-load Maria's analysis for demo purposes to match screenshot
  const [analysisResults, setAnalysisResults] = useState<Record<string, AISummary>>({
    '1': {
      summary: 'Paciente Maria Silva apresenta dor torácica intensa irradiando para o braço esquerdo, acompanhada de sudorese e náusea, sugerindo um evento cardíaco agudo.',
      suggestedAction: 'Encaminhamento imediato para emergência cardiológica ou SAMU.',
      riskScore: 9
    }
  });
  const [notification, setNotification] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'danger' | 'success';
  } | null>(null);

  const handleAnalyze = async (patient: Patient) => {
    if (analysisResults[patient.id]) {
        return; 
    }

    setAnalyzingId(patient.id);
    
    // Simulate network/processing delay for realism if needed, but Gemini is fast enough
    const result = await analyzePatientSymptoms(patient);
    
    setAnalysisResults(prev => ({ ...prev, [patient.id]: result }));
    setAnalyzingId(null);

    // Real-time High Risk Notification Logic
    if (result.riskScore >= 8) {
      setNotification({
        show: true,
        title: 'ALERTA MÉDICO: Alto Risco Identificado',
        message: `A IA detectou sinais críticos no paciente ${patient.name} (Risco: ${result.riskScore}/10). Atenção imediata recomendada.`,
        type: 'danger'
      });

      // Auto dismiss after 8 seconds
      setTimeout(() => {
        setNotification(prev => prev?.show ? null : prev);
      }, 8000);
    }
  };

  const dismissAnalysis = (id: string) => {
    const newResults = { ...analysisResults };
    delete newResults[id];
    setAnalysisResults(newResults);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full relative">
      
      {/* Real-time Notification Toast */}
      {notification && notification.show && (
        <div className="absolute top-4 left-4 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className={`p-4 rounded-xl shadow-lg border-l-4 flex items-start gap-3 backdrop-blur-sm ${
            notification.type === 'danger' 
              ? 'bg-red-50/95 border-red-500 text-red-900' 
              : 'bg-green-50/95 border-green-500 text-green-900'
          }`}>
            {notification.type === 'danger' ? (
              <AlertTriangle className="shrink-0 text-red-600 mt-0.5" size={20} />
            ) : (
              <CheckCircle className="shrink-0 text-green-600 mt-0.5" size={20} />
            )}
            <div className="flex-1">
              <h4 className="font-bold text-sm mb-0.5">{notification.title}</h4>
              <p className="text-xs opacity-90 leading-relaxed">{notification.message}</p>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className={`p-1 rounded-full hover:bg-black/5 transition-colors ${
                notification.type === 'danger' ? 'text-red-700' : 'text-green-700'
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <h2 className="text-lg font-bold text-gray-800">Aguardando Teleorientação</h2>
           <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-xs font-bold">3</span>
        </div>
        <button className="text-teal-600 text-sm font-medium hover:underline">Ver todos</button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {MOCK_PATIENTS.map((patient) => (
          <div key={patient.id} className="group border border-gray-100 rounded-xl p-5 hover:border-teal-200 hover:shadow-sm transition-all bg-white relative">
            
            {/* Patient Info Row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <img src={patient.avatar} alt={patient.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-base">{patient.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-bold ${
                      patient.urgency === UrgencyLevel.URGENT 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {patient.urgency}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock size={12} />
                    <span>Aguardando há {patient.waitTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                 {/* AI Triage Button */}
                <button 
                  onClick={() => handleAnalyze(patient)}
                  disabled={analyzingId === patient.id}
                  className={`p-2 rounded-lg transition-colors ${analysisResults[patient.id] ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}`}
                  title="Análise IA"
                >
                  {analyzingId === patient.id ? (
                    <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Sparkles size={20} />
                  )}
                </button>

                 <button className="p-2 bg-gray-50 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    <FileText size={20} />
                 </button>

                <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm">
                  <Video size={16} />
                  <span className="hidden sm:inline">Atender</span>
                </button>
              </div>
            </div>

            {/* AI Analysis Result Card (Expandable) */}
            {analysisResults[patient.id] && (
              <div className="mt-5 bg-[#EEF2FF] rounded-lg border border-[#E0E7FF] overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-bold text-[#312E81] flex items-center gap-2">
                            <Sparkles size={16} className="text-[#4F46E5]" /> Análise Gemini
                        </h4>
                        <button onClick={() => dismissAnalysis(patient.id)} className="text-[#6366F1] hover:text-[#4338ca]">
                            <X size={16} />
                        </button>
                    </div>
                    
                    <div className="space-y-2 text-sm text-[#3730A3] leading-relaxed">
                        <p><span className="font-bold text-[#312E81]">Resumo:</span> {analysisResults[patient.id].summary}</p>
                        <p><span className="font-bold text-[#312E81]">Sugestão:</span> {analysisResults[patient.id].suggestedAction}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[#E0E7FF]/60">
                        <span className="text-xs font-bold text-[#312E81] uppercase tracking-wide">Risco Estimado:</span>
                        <div className="h-2.5 w-32 bg-white rounded-full overflow-hidden border border-[#E0E7FF]">
                            <div 
                                className={`h-full rounded-full ${
                                    analysisResults[patient.id].riskScore > 7 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                                    analysisResults[patient.id].riskScore > 4 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                                    'bg-gradient-to-r from-green-400 to-green-500'
                                }`} 
                                style={{ width: `${analysisResults[patient.id].riskScore * 10}%` }}
                            ></div>
                        </div>
                        <span className="text-xs font-bold text-[#312E81]">{analysisResults[patient.id].riskScore}/10</span>
                    </div>
                </div>
              </div>
            )}

            {/* Symptoms Preview */}
            <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100/50">
                <span className="font-bold text-gray-800">Queixa:</span> {patient.symptoms}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;