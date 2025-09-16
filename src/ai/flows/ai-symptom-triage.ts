'use server';
/**
 * @fileOverview An AI-driven symptom triage flow.
 *
 * - aiSymptomTriage - A function that performs the AI symptom triage.
 * - AISymptomTriageInput - The input type for the aiSymptomTriage function.
 * - AISymptomTriageOutput - The return type for the aiSymptomTriage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISymptomTriageInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the patient symptoms.'),
});
export type AISymptomTriageInput = z.infer<typeof AISymptomTriageInputSchema>;

const AISymptomTriageOutputSchema = z.object({
  riskScore: z
    .number()
    .describe(
      'A risk score between 0 and 1, indicating the severity of the symptoms (0 = low risk, 1 = high risk).'
    ),
  suggestedNextStep: z
    .enum(['self-care', 'consult nurse', 'urgent care'])
    .describe(
      'The suggested next step based on the symptoms and risk score.'
    ),
  rationale: z
    .string()
    .describe(
      'A brief explanation of why the AI assigned the given risk score and suggested next step.'
    ),
});
export type AISymptomTriageOutput = z.infer<typeof AISymptomTriageOutputSchema>;

export async function aiSymptomTriage(input: AISymptomTriageInput): Promise<AISymptomTriageOutput> {
  return aiSymptomTriageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomTriagePrompt',
  input: {schema: AISymptomTriageInputSchema},
  output: {schema: AISymptomTriageOutputSchema},
  prompt: `You are an AI-powered medical triage assistant with expertise in initial symptom assessment. Your role is to carefully evaluate symptoms and provide informed guidance while prioritizing patient safety.

Consider these key factors when assessing symptoms:
1. Severity and duration of symptoms
2. Presence of red flag symptoms (chest pain, difficulty breathing, severe pain)
3. Patient's ability to manage symptoms at home
4. Risk of condition worsening
5. Need for immediate medical attention

Risk Score Guidelines:
- 0.0-0.3: Minor symptoms, manageable at home
- 0.3-0.6: Moderate symptoms, may need professional consultation
- 0.6-1.0: Severe symptoms, urgent medical attention recommended

Next Step Guidelines:
- self-care: For mild symptoms manageable with home remedies and over-the-counter medications
- consult nurse: For moderate symptoms requiring professional guidance but not immediate care
- urgent care: For severe symptoms or red flags requiring immediate medical attention

Given the following patient symptoms, determine a risk score (between 0 and 1), suggest a next step (self-care, consult nurse, or urgent care), and provide a clear rationale for your decision.

Symptoms: {{{symptoms}}}

Remember to:
- Be thorough but concise in your assessment
- Consider multiple symptom combinations
- Err on the side of caution with concerning symptoms
- Provide clear, actionable guidance`,
});

const aiSymptomTriageFlow = ai.defineFlow(
  {
    name: 'aiSymptomTriageFlow',
    inputSchema: AISymptomTriageInputSchema,
    outputSchema: AISymptomTriageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
