import { faker } from '@faker-js/faker'

// Set a fixed seed for consistent data generation
faker.seed(12345)

export const runs = Array.from({ length: 100 }, () => {
  const models = [
    'rfdiffusion',
    'proteinmpnn',
    'alphafold',
    'ligandmpnn',
  ] as const
  const statuses = ['queued', 'running', 'completed', 'failed'] as const

  return {
    id: `RUN-${faker.number.int({ min: 1000, max: 9999 })}`,
    model: faker.helpers.arrayElement(models),
    status: faker.helpers.arrayElement(statuses),
    params: {
      iterations: faker.number.int({ min: 1, max: 50 }),
      temperature: faker.number.float({ min: 0, max: 1 }),
    },
    s3_path: `s3://bucket/runs/${faker.string.uuid()}`,
    created_at: faker.date.past().toISOString(), // schema expects string
  }
})
