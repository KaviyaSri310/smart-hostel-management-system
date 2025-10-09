'use server';
/**
 * @fileOverview Determines whether an image would be helpful for a repair request based on the issue description.
 *
 * - `getImageGuidance` - A function that processes the repair request description and determines if an image would be helpful.
 * - `ImageGuidanceInput` - The input type for the `getImageGuidance` function.
 * - `ImageGuidanceOutput` - The return type for the `getImageGuidance` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageGuidanceInputSchema = z.object({
  issueDescription: z
    .string()
    .describe('The description of the repair issue reported by the student.'),
  repairType: z.string().describe('The type of repair needed (e.g., Fan, Light, Bathroom, Furniture).'),
});
export type ImageGuidanceInput = z.infer<typeof ImageGuidanceInputSchema>;

const ImageGuidanceOutputSchema = z.object({
  isImageHelpful: z
    .boolean()
    .describe(
      'Whether or not including an image with the repair request would be helpful for diagnosing and resolving the issue.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the determination of whether an image would be helpful.'),
});
export type ImageGuidanceOutput = z.infer<typeof ImageGuidanceOutputSchema>;

export async function getImageGuidance(
  input: ImageGuidanceInput
): Promise<ImageGuidanceOutput> {
  return imageGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageGuidancePrompt',
  input: {schema: ImageGuidanceInputSchema},
  output: {schema: ImageGuidanceOutputSchema},
  prompt: `You are an AI assistant helping students submit repair requests for their hostel.

  A student has submitted a repair request with the following details:
  - Repair Type: {{{repairType}}}
  - Issue Description: {{{issueDescription}}}

  Based on the repair type and the issue description, determine whether including an image would be helpful for the admin and technician to understand and resolve the issue.

  Respond with a JSON object containing the following fields:
  - isImageHelpful: true if an image would be helpful, false otherwise.
  - reasoning: A brief explanation of why you think an image would or would not be helpful.

  Example:
  {
    "isImageHelpful": true,
    "reasoning": "An image would help the technician understand the specific damage to the furniture."
  }

  Ensure your response is valid JSON.
`,
});

const imageGuidanceFlow = ai.defineFlow(
  {
    name: 'imageGuidanceFlow',
    inputSchema: ImageGuidanceInputSchema,
    outputSchema: ImageGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
