import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Runs } from '@/features/runs'
import { statuses } from '@/features/runs/data/data'

const runSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z
    .array(z.enum(statuses.map((status) => status.value)))
    .optional()
    .catch([]),
  filter: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/runs/')({
  validateSearch: runSearchSchema,
  component: Runs,
})
