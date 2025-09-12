export type Symptom = {
  id: string;
  symptoms: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  onset: Date;
  triage?: {
    riskScore: number;
    suggestedNextStep: 'self-care' | 'consult nurse' | 'urgent care';
    rationale: string;
  };
};

export type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: 'Daily' | 'Twice a day' | 'As needed';
  time: string;
};
