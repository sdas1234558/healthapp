'use server';

/**
 * @fileOverview A flow for providing personalized health tips based on logged symptoms and risk assessments.
 *
 * - getPersonalizedHealthTips - A function that generates personalized health tips.
 * - PersonalizedHealthTipsInput - The input type for the getPersonalizedHealthTips function.
 * - PersonalizedHealthTipsOutput - The return type for the getPersonalizedHealthTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHealthTipsInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A detailed description of the user\'s logged symptoms.'),
  riskAssessment: z
    .string()
    .describe(
      'The risk assessment based on the user\'s symptoms, including the risk score and suggested next steps.'
    ),
});
export type PersonalizedHealthTipsInput = z.infer<
  typeof PersonalizedHealthTipsInputSchema
>;

const PersonalizedHealthTipsOutputSchema = z.object({
  tips: z
    .string()
    .describe(
      'Personalized health tips based on the user\'s symptoms and risk assessment.'
    ),
});
export type PersonalizedHealthTipsOutput = z.infer<
  typeof PersonalizedHealthTipsOutputSchema
>;

export async function getPersonalizedHealthTips(
  input: PersonalizedHealthTipsInput
): Promise<PersonalizedHealthTipsOutput> {
  return personalizedHealthTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedHealthTipsPrompt',
  input: {schema: PersonalizedHealthTipsInputSchema},
  output: {schema: PersonalizedHealthTipsOutputSchema},
  prompt: `You are an expert AI health advisor specializing in providing personalized health recommendations. Your role is to analyze symptoms and risk assessments to offer practical, evidence-based advice tailored to each individual's situation.

Consider these aspects when providing recommendations:
1. Immediate symptom management
2. Lifestyle modifications
3. Preventive measures
4. Self-monitoring guidelines
5. When to seek additional medical help

Categories of advice to consider:
- Symptom management techniques
- Dietary recommendations
- Physical activity adjustments
- Sleep hygiene
- Stress management
- Environmental modifications
- Monitoring and tracking suggestions

Current User Information:
Symptoms: {{{symptoms}}}
Risk Assessment: {{{riskAssessment}}}

Provide detailed, actionable health tips that:
1. Address the specific symptoms and concerns
2. Are practical and easy to implement
3. Include both short-term relief and long-term management strategies
4. Consider the assessed risk level
5. Include clear indicators for when to seek additional medical help

Format your response with:
- Immediate actions for symptom relief
- Daily management strategies
- Preventive measures
- Warning signs to watch for

Remember to:
- Be specific and practical
- Prioritize evidence-based recommendations
- Consider the user's likely limitations
- Maintain a supportive and encouraging tone
- Emphasize the importance of following medical advice`,
});

const personalizedHealthTipsFlow = ai.defineFlow(
  {
    name: 'personalizedHealthTipsFlow',
    inputSchema: PersonalizedHealthTipsInputSchema,
    outputSchema: PersonalizedHealthTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);