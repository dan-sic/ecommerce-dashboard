import { billboardIdParams } from "@/modules/billboard/consts/billboard-schema"
import { getBillboard } from "@/modules/billboard/data"

import { apiRequestMiddleware } from "@/lib/api-request-middleware"
import { validateSchema } from "@/lib/validate-schema"

const GET = apiRequestMiddleware({
  handler: async (_, params) => {
    const { storeId, billboardId } = validateSchema(params, billboardIdParams)

    const store = await getBillboard(billboardId, storeId)

    return new Response(JSON.stringify(store), { status: 200 })
  },
  isProtectedRoute: false,
})

export { GET }
