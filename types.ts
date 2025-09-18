
export type View = 'home' | 'analysis' | 'records' | 'booking';

export interface HealthAnalysisData {
  age: string;
  gender: string;
  symptoms: string;
  lifestyle: string[];
  history: string;
}

export interface HealthAnalysisResult {
  summary: string;
  potentialRisks: string[];
  recommendations: string[];
}

export interface HealthRecord extends HealthAnalysisResult {
  id: string;
  date: string;
}

export interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  department: string;
  reason: string;
}
