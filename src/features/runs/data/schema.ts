import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const runSchema = z.object({
  id: z.string(),
  model: z.enum(['rfdiffusion', 'proteinmpnn', 'alphafold', 'ligandmpnn']),
  status: z.enum(['queued', 'running', 'completed', 'failed']),
  params: z.record(z.string(), z.any()),
  s3_path: z.string().optional(),
  created_at: z.string(),
})

export type Run = z.infer<typeof runSchema>
