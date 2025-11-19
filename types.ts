export enum UrgencyLevel {
  URGENT = 'Urgente',
  STANDARD = 'Padrão',
  LOW = 'Baixo'
}

export interface Patient {
  id: string;
  name: string;
  avatar: string;
  waitTime: string;
  urgency: UrgencyLevel;
  symptoms: string; // Description for AI analysis
  email?: string;
}

export interface Metric {
  label: string;
  value: string | number;
  icon: 'users' | 'activity' | 'calendar';
  trend?: string;
  positive?: boolean;
}

export interface FinancialData {
  month: string;
  value: number;
}

export interface AISummary {
  summary: string;
  suggestedAction: string;
  riskScore: number; // 1-10
}