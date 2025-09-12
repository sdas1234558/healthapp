'use server';

import { aiSymptomTriage } from '@/ai/flows/ai-symptom-triage';
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

  try {
    const result = await aiSymptomTriage({
      symptoms: validatedFields.data.symptoms,
    });
    return { data: result };
  } catch (error) {
    console.error(error);
    return {
      error: 'An error occurred while getting AI triage. Please try again.',
    };
  }
}
