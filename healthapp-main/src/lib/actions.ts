'use server';

import { aiSymptomTriage } from '@/ai/flows/ai-symptom-triage';
import { getPersonalizedHealthTips } from '@/ai/flows/personalized-health-tips';
import { z } from 'zod';

const triageSchema = z.object({
  symptoms: z.string().min(10, 'Please provide a more detailed description.'),
});

export async function getAITriage(prevState: any, formData: FormData) {
  const validatedFields = triageSchema.safeParse({
    symptoms: formData.get('symptoms'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { symptoms } = validatedFields.data;

  try {
    const result = await aiSymptomTriage({
      symptoms,
    });
    let tips = null;

    try {
      const riskAssessment = `Risk Score: ${result.riskScore.toFixed(
        2
      )}, Suggestion: ${result.suggestedNextStep}, Rationale: ${result.rationale}`;
      tips = await getPersonalizedHealthTips({
        symptoms,
        riskAssessment,
      });
    } catch (tipsError) {
      console.error(tipsError);
    }

    return { data: result, symptoms, tips };
  } catch (error) {
    console.error(error);
    return {
      error: 'An error occurred while getting AI triage. Please try again.',
    };
  }
}
