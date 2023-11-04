import createHttpError from "http-errors"
import { getServerSession } from "next-auth"

import { apiErrorHandler } from "@/lib/api-error-handler"
import { authOptions } from "@/lib/auth-options"

export const apiRequestMiddleware =
  ({
    handler,
    isProtectedRoute = true,
  }: {
    handler: (req: Request) => Promise<Response>
    isProtectedRoute?: boolean
  }) =>
  async (req: Request) => {
    try {
      if (isProtectedRoute) {
        const session = await getServerSession(authOptions)

        if (!session?.user) {
          throw new createHttpError.Unauthorized()
        }

        return handler(req)
      }

      return handler(req)
    } catch (e: unknown) {
      return apiErrorHandler(e)
    }
  }
