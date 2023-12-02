import { storeIdParam } from "@/modules/store/consts/store-schema"
import { getStore } from "@/modules/store/data"

import { apiRequestMiddleware } from "@/lib/api-request-middleware"
import { getSessionUser } from "@/lib/auth-options"
import { validateSchema } from "@/lib/validate-schema"

const GET = apiRequestMiddleware({
  handler: async (_, params) => {
    const { storeId } = validateSchema(params, storeIdParam)
    const user = await getSessionUser()

    const store = await getStore({ storeId, userId: user.id })

    return new Response(JSON.stringify(store), { status: 201 })
  },
  isProtectedRoute: false,
})

export { GET }
