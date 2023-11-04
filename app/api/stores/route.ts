import { getServerSession } from "next-auth"

import { apiRequestMiddleware } from "@/lib/api-request-middleware"
import { authOptions, getSessionUser } from "@/lib/auth-options"
import db from "@/lib/db"
import { validateSchema } from "@/lib/validate-schema"
import { storeSchema } from "@/lib/validation-schemas/create-store"

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

export { POST }
