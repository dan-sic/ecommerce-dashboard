import { getStore } from "@/modules/store/data"

import { apiRequestMiddleware } from "@/lib/api-request-middleware"
import { getSessionUser } from "@/lib/auth-options"
import { pathParamsSchema } from "@/lib/params-schema"
import { validateSchema } from "@/lib/validate-schema"

const GET = apiRequestMiddleware({
  handler: async (_, { params }) => {
    const { storeId } = validateSchema(
      { params },
      pathParamsSchema.pick({ storeId: true })
    )
    const user = await getSessionUser()

    const store = await getStore({ storeId, userId: user.id })

    return new Response(JSON.stringify(store), { status: 200 })
  },
  isProtectedRoute: false,
})

export { GET }
