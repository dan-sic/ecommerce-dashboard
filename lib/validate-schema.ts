import { ZodSchema, z } from 'zod'

export const validateSchema = <T extends ZodSchema>(
  data: unknown,
  schema: T
): z.infer<T> => {
  const result = schema.parse(data)

  return result
}
