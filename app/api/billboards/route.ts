import { getBillboards } from "@/modules/billboard/data"
import { storeIdParam, storeSchema } from "@/modules/store/consts/store-schema"
import { getServerSession } from "next-auth"

import { apiRequestMiddleware } from "@/lib/api-request-middleware"
import { getSessionUser } from "@/lib/auth-options"
import db from "@/lib/db"
import { validateSchema } from "@/lib/validate-schema"

const GET = apiRequestMiddleware({
  handler: async (_, params) => {
    const { storeId } = validateSchema(params, storeIdParam)

    const billboards = await getBillboards(storeId)

    return new Response(JSON.stringify(billboards), { status: 200 })
  },
  isProtectedRoute: false,
})

const POST = apiRequestMiddleware({
  handler: async (req: Request) => {
    const body = await req.json()
    const { name } = validateSchema(body, storeSchema)
    const user = await getSessionUser()

    const store = await db.store.create({
      data: {
        name,
        userId: user!.id,
      },
    })

    return new Response(JSON.stringify(store), { status: 201 })
  },
})

export { POST, GET }
