
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

export interface DirectoryPatient {
  id: string;
  name: string;
  email: string;
  avatar: string;
  age: number;
  gender: 'Masculino' | 'Feminino' | 'Outro';
  phone: string;
  lastVisit: string;
  status: 'Ativo' | 'Inativo';
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

// Chat Types
export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'online' | 'offline';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}