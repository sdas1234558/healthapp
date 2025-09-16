'use server';

/**
 * @fileOverview Test scenarios for AI flows to ensure comprehensive coverage of real-life situations
 */

import type { AISymptomTriageInput } from './ai-symptom-triage';
import type { PersonalizedHealthTipsInput } from './personalized-health-tips';

export const symptomTriageScenarios: AISymptomTriageInput[] = [
  // Low Risk Scenarios
  {
    symptoms: "Mild headache for 2 hours, no other symptoms. Pain is dull and manageable. Have been working at computer all day."
  },
  {
    symptoms: "Slight congestion and runny nose for 1 day. No fever. Able to breathe normally. Minor sore throat in the morning."
  },
  
  // Moderate Risk Scenarios
  {
    symptoms: "Persistent cough for 5 days, yellow phlegm. Low-grade fever (99.5°F). Fatigue and mild body aches. No shortness of breath."
  },
  {
    symptoms: "Migraine headache for 8 hours. Sensitivity to light and sound. Mild nausea. Previous history of migraines."
  },
  
  // High Risk Scenarios
  {
    symptoms: "Severe chest pain radiating to left arm. Shortness of breath. Sweating profusely. Nausea. No previous history of heart problems."
  },
  {
    symptoms: "High fever (103°F) for 2 days. Severe abdominal pain in lower right side. Nausea and vomiting. Pain worse with movement."
  },
  
  // Complex Mixed Scenarios
  {
    symptoms: "Chronic lower back pain worsening over 2 weeks. Now having numbness in right leg. No injury but sitting long hours at work. Pain affecting sleep."
  },
  {
    symptoms: "Dizziness and balance issues for 3 days. Mild headache. Ringing in ears. Recent international flight. No fever or nausea."
  },
  
  // Special Population Scenarios
  {
    symptoms: "37 weeks pregnant. Mild swelling in ankles. Slight headache. Blood pressure slightly elevated at home check (138/88)."
  },
  {
    symptoms: "75 years old. Fell yesterday. Mild hip pain. Can walk but uncomfortable. No head injury. Taking blood thinners."
  }
];

export const healthTipsScenarios: PersonalizedHealthTipsInput[] = [
  // Lifestyle-Related
  {
    symptoms: "Frequent headaches, neck stiffness, and eye strain. Works at computer 10+ hours daily.",
    riskAssessment: "Risk Score: 0.3 (Low-Moderate). Suggested next step: self-care. Symptoms suggest tension headaches from poor ergonomics and screen time."
  },
  
  // Chronic Condition Management
  {
    symptoms: "Type 2 diabetes. Blood sugar readings higher than usual for past week. Feeling more thirsty than normal. No other symptoms.",
    riskAssessment: "Risk Score: 0.5 (Moderate). Suggested next step: consult nurse. Blood sugar trends need professional review."
  },
  
  // Acute Illness Recovery
  {
    symptoms: "Recovering from flu. Lingering fatigue and mild cough. Appetite returning but still low energy.",
    riskAssessment: "Risk Score: 0.2 (Low). Suggested next step: self-care. Normal recovery progression from viral illness."
  },
  
  // Mental Health
  {
    symptoms: "Difficulty sleeping, racing thoughts, feeling overwhelmed. Appetite changes. No thoughts of self-harm.",
    riskAssessment: "Risk Score: 0.4 (Moderate). Suggested next step: consult nurse. Symptoms suggest anxiety/stress requiring professional guidance."
  },
  
  // Sports/Exercise Related
  {
    symptoms: "Muscle soreness and joint stiffness after starting new workout routine. No sharp pains or swelling.",
    riskAssessment: "Risk Score: 0.2 (Low). Suggested next step: self-care. Normal response to increased physical activity."
  },
  
  // Seasonal/Environmental
  {
    symptoms: "Seasonal allergies acting up. Itchy eyes, sneezing, congestion. Usually controlled with OTC medication.",
    riskAssessment: "Risk Score: 0.1 (Low). Suggested next step: self-care. Typical seasonal allergy symptoms."
  },
  
  // Diet-Related
  {
    symptoms: "Frequent heartburn, especially after meals. Worse when lying down. No chest pain or breathing issues.",
    riskAssessment: "Risk Score: 0.3 (Low-Moderate). Suggested next step: self-care. Likely diet and lifestyle-related acid reflux."
  },
  
  // Sleep-Related
  {
    symptoms: "Chronic insomnia. Taking 2+ hours to fall asleep. Daytime fatigue affecting work. No other health issues.",
    riskAssessment: "Risk Score: 0.4 (Moderate). Suggested next step: consult nurse. Sleep patterns requiring professional evaluation."
  },
  
  // Age-Specific
  {
    symptoms: "Senior citizen with gradual balance issues and mild memory changes. No falls. Independent in daily activities.",
    riskAssessment: "Risk Score: 0.5 (Moderate). Suggested next step: consult nurse. Age-related changes requiring professional assessment."
  },
  
  // Medication-Related
  {
    symptoms: "New medication side effects: mild nausea and dizziness. Able to eat and function normally.",
    riskAssessment: "Risk Score: 0.3 (Low-Moderate). Suggested next step: consult nurse. Medication effects need monitoring."
  }
];