import { apiErrorHandler } from "@/lib/api-error-handler"
import { getSessionUser } from "@/lib/auth-options"

export const apiRequestMiddleware =
  ({
    handler,
    isProtectedRoute = true,
  }: {
    handler: (
      req: Request,
      params?: Record<string, unknown>
    ) => Promise<Response>
    isProtectedRoute?: boolean
  }) =>
  async (req: Request) => {
    try {
      if (isProtectedRoute) {
        await getSessionUser()

        return handler(req)
      }

      return handler(req)
    } catch (e: unknown) {
      return apiErrorHandler(e)
    }
  }
