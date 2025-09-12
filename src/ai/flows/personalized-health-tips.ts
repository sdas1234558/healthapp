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
  prompt: `You are a helpful AI assistant that provides personalized health tips based on the user's logged symptoms and risk assessment.

Symptoms: {{{symptoms}}}
Risk Assessment: {{{riskAssessment}}}

Provide personalized health tips to help the user manage their health and make informed decisions.`,
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
