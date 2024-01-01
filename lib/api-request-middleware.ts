import { apiErrorHandler } from "@/lib/api-error-handler"
import { getSessionUser } from "@/lib/auth-options"

export const apiRequestMiddleware =
  ({
    handler,
    isProtectedRoute = true,
  }: {
    handler: (
      req: Request,
      params: { params?: Record<string, unknown> }
    ) => Promise<Response>
    isProtectedRoute?: boolean
  }) =>
  async (req: Request, params: { params?: Record<string, unknown> }) => {
    try {
      if (isProtectedRoute) {
        await getSessionUser()

        return handler(req, params)
      }

      return handler(req, params)
    } catch (e: unknown) {
      return apiErrorHandler(e)
    }
  }
