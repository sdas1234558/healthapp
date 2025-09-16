import type { Medication, Symptom } from '@/lib/types';

export const mockMedications: Medication[] = [
  {
    id: 'med1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Daily',
    time: '08:00',
  },
  {
    id: 'med2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice a day',
    time: '09:00',
  },
  {
    id: 'med3',
    name: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'As needed',
    time: 'N/A',
  },
];

export const mockSymptomHistory: Symptom[] = [
  {
    id: 'sym1',
    symptoms: 'Headache and sensitivity to light.',
    severity: 'Moderate',
    onset: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    triage: {
      riskScore: 0.4,
      suggestedNextStep: 'self-care',
      rationale:
        'Symptoms are consistent with a migraine. Rest and over-the-counter pain relievers are recommended.',
    },
  },
  {
    id: 'sym2',
    symptoms: 'Sore throat, cough, and slight fever.',
    severity: 'Mild',
    onset: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    triage: {
      riskScore: 0.2,
      suggestedNextStep: 'self-care',
      rationale:
        'Symptoms align with a common cold. Rest, fluids, and monitoring are suggested.',
    },
  },
];
