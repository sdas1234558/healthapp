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
  prompt: `You are an AI-powered medical triage assistant. Given the following patient symptoms, determine a risk score (between 0 and 1), suggest a next step (self-care, consult nurse, or urgent care), and provide a brief rationale for your decision.\n\nSymptoms: {{{symptoms}}}`,
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
